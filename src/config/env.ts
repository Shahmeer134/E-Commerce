// import dotenv from 'dotenv'
// import type { SignOptions } from 'jsonwebtoken'

// dotenv.config()

// const requiredEnv = ['ACCESS_TOKEN_SECRET', 'MONGO_URI'] as const

// const parseExpiresIn = (value?: string): SignOptions['expiresIn'] => {
//   if (!value) {
//     return '15m'
//   }

//   const numeric = Number(value)

//   return Number.isNaN(numeric) ? value as SignOptions['expiresIn'] : numeric
// }

// requiredEnv.forEach((key) => {
//   if (!process.env[key]) {
//     throw new Error(`Missing required env var ${key}`)
//   }
// })

// type EnvConfig = {
//   port: number
//   accessTokenSecret: string
//   accessTokenExpiresIn: SignOptions['expiresIn']
//   hashSaltRounds: number
//   mongoUri: string
//   corsOrigin: string[]
//   cookieKey?: string
//   nodeEnv: string
// }

// export const env: EnvConfig = {
//   port: Number(process.env.PORT ?? 3000),
//   accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
//   accessTokenExpiresIn: parseExpiresIn(process.env.ACCESS_TOKEN_EXPIRES_IN),
//   hashSaltRounds: Number(process.env.HASH_SALT_ROUNDS ?? 10),
//   mongoUri: process.env.MONGO_URI as string,
//   corsOrigin: process.env.CORS_ORIGIN?.split(',').map((origin) => origin.trim()) || ['http://localhost:3000'],
//   cookieKey: process.env.COOKIE_KEY,
//   nodeEnv: process.env.NODE_ENV || 'development'
// }
