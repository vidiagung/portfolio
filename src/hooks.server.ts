import { db } from '$lib/server/db'

export async function handle( { event, resolve } ) {

	const sessionToken = event.cookies.get( 'session' )

	if ( !sessionToken ) {
		event.locals.user = null
		return resolve( event )
	}

	const session = await db.session.findUnique( {
		where: { token: sessionToken },
		include: { user: true }
	} )

	if ( !session || session.expiresAt < new Date() ) {
		event.locals.user = null
		return resolve( event )
	}

	event.locals.user = session.user

	return resolve( event )
}