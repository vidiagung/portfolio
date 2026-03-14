import { json } from '@sveltejs/kit'
import { db } from '$lib/server/db'

export async function GET() {

	const messages = await db.message.findMany( {
		orderBy: { createdAt: 'asc' },
		include: {
			user: true
		}
	} )

	return json( messages )
}