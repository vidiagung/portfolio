import { redirect } from '@sveltejs/kit'
import { github } from '$lib/server/auth'
import { db } from '$lib/server/db'

type GithubUser = {
	id: number
	login: string
	name: string | null
	avatar_url: string
}

type GithubEmail = {
	email: string
	primary: boolean
	verified: boolean
	visibility: string | null
}

export async function GET( { url, cookies } ) {
	const code = url.searchParams.get( 'code' )
	const state = url.searchParams.get( 'state' )

	const storedState = cookies.get( 'github_oauth_state' )

	if ( !code || !state || state !== storedState ) {
		return new Response( 'Invalid OAuth request', { status: 400 } )
	}

	// hapus state cookie setelah valid
	cookies.delete( 'github_oauth_state', { path: '/' } )

	const tokens = await github.validateAuthorizationCode( code )

	// ─────────────────────────────────────────
	// ambil data user github
	// ─────────────────────────────────────────
	const githubUser: GithubUser = await fetch(
		'https://api.github.com/user',
		{
			headers: {
				Authorization: `Bearer ${tokens.accessToken()}`
			}
		}
	).then( ( res ) => res.json() )

	// ─────────────────────────────────────────
	// ambil email github
	// ─────────────────────────────────────────
	const emails: GithubEmail[] = await fetch(
		'https://api.github.com/user/emails',
		{
			headers: {
				Authorization: `Bearer ${tokens.accessToken()}`
			}
		}
	).then( ( res ) => res.json() )

	// pilih email verified
	const primaryEmail = emails.find( ( e ) => e.primary && e.verified )
	const verifiedEmail = emails.find( ( e ) => e.verified )

	const email =
		primaryEmail?.email ??
		verifiedEmail?.email ??
		`${githubUser.login}@github.local`

	const name = githubUser.name ?? githubUser.login
	const avatar = githubUser.avatar_url
	const providerId = githubUser.id.toString()

	// ─────────────────────────────────────────
	// cek account provider
	// ─────────────────────────────────────────
	const existingAccount = await db.account.findUnique( {
		where: {
			provider_providerAccountId: {
				provider: 'github',
				providerAccountId: providerId
			}
		},
		include: { user: true }
	} )

	let user

	if ( existingAccount ) {
		// user sudah pernah login github
		user = existingAccount.user
	} else {
		// cek apakah email sudah ada (misalnya login Google sebelumnya)
		let existingUser = await db.user.findUnique( {
			where: { email }
		} )

		if ( !existingUser ) {
			// create user baru
			existingUser = await db.user.create( {
				data: {
					email,
					name,
					avatar,
					initials: name.slice( 0, 2 ).toUpperCase()
				}
			} )
		}

		user = existingUser

		// buat account link
		await db.account.create( {
			data: {
				userId: user.id,
				provider: 'github',
				providerAccountId: providerId
			}
		} )
	}

	// ─────────────────────────────────────────
	// buat session login
	// ─────────────────────────────────────────
	const session = await db.session.create( {
		data: {
			userId: user.id,
			expiresAt: new Date( Date.now() + 1000 * 60 * 60 * 24 * 30 )
		}
	} )

	// set cookie session
	cookies.set( 'session', session.token, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax'
	} )

	throw redirect( 302, '/chat' )
}