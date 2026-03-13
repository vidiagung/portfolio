import { redirect } from '@sveltejs/kit'
import { db } from '$lib/server/db'

export async function GET( { cookies } ) {

	const token = cookies.get( 'session' )

	if ( token ) {
		await db.session.deleteMany( {
			where: { token }
		} )
	}

	cookies.delete( 'session', { path: '/' } )

	throw redirect( 302, '/chat' )
}