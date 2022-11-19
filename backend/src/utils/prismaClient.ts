import { PrismaClient } from '@prisma/client'
import { __prod__ } from './constants'

// import { env } from '~/env/server.mjs'

declare global {
	// eslint-disable-next-line no-var, vars-on-top
	var prisma: PrismaClient | undefined
}

export const dbClient = global.prisma || new PrismaClient()

if (!__prod__) {
	global.prisma = dbClient
}