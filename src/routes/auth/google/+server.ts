import { google } from '$lib/server/auth'
import { generateCodeVerifier, generateState } from 'arctic'
import { redirect } from '@sveltejs/kit'

export async function GET( { cookies } ) {
	const state = generateState()
	const codeVerifier = generateCodeVerifier()

	const url = await google.createAuthorizationURL(
		state,
		codeVerifier,
		['openid', 'profile', 'email']
	)

	cookies.set( 'google_oauth_state', state, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax'
	} )

	cookies.set( 'google_code_verifier', codeVerifier, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax'
	} )

	throw redirect( 302, url )
}