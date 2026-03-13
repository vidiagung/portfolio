import { github } from '$lib/server/auth'
import { generateState } from 'arctic'
import { redirect } from '@sveltejs/kit'

export async function GET( { cookies } ) {

	const state = generateState()

	const url = await github.createAuthorizationURL(
		state,
		['read:user', 'user:email']
	)

	// paksa GitHub menampilkan login
	url.searchParams.set( 'prompt', 'login' )

	cookies.set( 'github_oauth_state', state, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax'
	} )

	throw redirect( 302, url )
}