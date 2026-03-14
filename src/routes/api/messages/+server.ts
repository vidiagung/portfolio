import { json } from '@sveltejs/kit'
import { db } from '$lib/server/db'

export async function GET() {

	const messages = await db.message.findMany( {
		where: {
			roomId: 'general'
		},
		orderBy: {
			createdAt: 'asc'
		},
		include: {
			user: true
		}
	} )

	return json( messages )
}

export async function POST( { request, locals } ) {

	console.log( 'API HIT' )

	const user = locals.user

	if ( !user ) {
		return json( { error: 'Unauthorized' }, { status: 401 } )
	}

	const { content } = await request.json()

	const message = await db.message.create( {
		data: {
			text: content,
			userId: user.id,
			roomId: 'general'
		},
		include: {
			user: true
		}
	} )

	return json( message )
}