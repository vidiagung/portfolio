import { redirect } from '@sveltejs/kit'
import { db } from '$lib/server/db'
import { google } from '$lib/server/auth'

export async function GET( { url, cookies } ) {

	const code = url.searchParams.get( 'code' )
	const state = url.searchParams.get( 'state' )

	const storedState = cookies.get( 'google_oauth_state' )
	const codeVerifier = cookies.get( 'google_code_verifier' )

	if ( !code || !state || state !== storedState || !codeVerifier ) {
		return new Response( 'Invalid OAuth request', { status: 400 } )
	}

	const tokens = await google.validateAuthorizationCode( code, codeVerifier )

	const googleUser = await fetch(
		'https://www.googleapis.com/oauth2/v2/userinfo',
		{
			headers: {
				Authorization: `Bearer ${tokens.accessToken()}`
			}
		}
	).then( res => res.json() )

	const email = googleUser.email
	const name = googleUser.name
	const avatar = googleUser.picture
	const providerId = googleUser.id   // sekarang akan dipakai

	// cek apakah account sudah ada
	const existingAccount = await db.account.findUnique( {
		where: {
			provider_providerAccountId: {
				provider: 'google',
				providerAccountId: providerId
			}
		},
		include: { user: true }
	} )

	let user

	if ( existingAccount ) {
		user = existingAccount.user
	} else {

		user = await db.user.create( {
			data: {
				email,
				name,
				avatar,
				initials: name.slice( 0, 2 ).toUpperCase()
			}
		} )

		await db.account.create( {
			data: {
				userId: user.id,
				provider: 'google',
				providerAccountId: providerId
			}
		} )
	}

	const session = await db.session.create( {
		data: {
			userId: user.id,
			expiresAt: new Date( Date.now() + 1000 * 60 * 60 * 24 * 30 )
		}
	} )

	cookies.set( 'session', session.token, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax'
	} )

	throw redirect( 302, '/chat' )
}