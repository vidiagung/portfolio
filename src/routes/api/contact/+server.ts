import type { RequestHandler } from './$types'
import { EMAIL_USER, EMAIL_PASS } from '$env/static/private'
import nodemailer from 'nodemailer'

export const POST: RequestHandler = async ( { request } ) => {
	const { firstName, lastName, email, message } = await request.json()

	if ( !firstName || !email || !message ) {
		return new Response( JSON.stringify( { error: 'Missing fields' } ), {
			status: 400
		} )
	}

	const transporter = nodemailer.createTransport( {
		service: 'gmail',
		auth: {
			user: EMAIL_USER,
			pass: EMAIL_PASS
		}
	} )

	try {
		await transporter.sendMail( {
			from: `"${firstName} ${lastName}" <${email}>`,
			to: EMAIL_USER,
			subject: 'New Contact Message',
			html: `
        <h3>New Message from Portfolio</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
		} )

		return new Response( JSON.stringify( { success: true } ) )
	} catch ( error ) {
		console.error( error )
		return new Response( JSON.stringify( { error: 'Email failed' } ), {
			status: 500
		} )
	}
}
