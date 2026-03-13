import 'dotenv/config'
import { GitHub, Google } from 'arctic'

export const google = new Google(
	process.env.GOOGLE_CLIENT_ID!,
	process.env.GOOGLE_CLIENT_SECRET!,
	'http://localhost:5173/auth/google/callback'
)

export const github = new GitHub(
	process.env.GITHUB_CLIENT_ID!,
	process.env.GITHUB_CLIENT_SECRET!,
	'http://localhost:5173/auth/github/callback'
)