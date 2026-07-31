import { Response } from 'express'

export type ApiResponse<T> = {
  statusCode: number
  message: string
  data: T | null
}

export const generateResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T | null
) => {
  const payload: ApiResponse<T> = {
    statusCode,
    message,
    data
  }

  return res.status(statusCode).json(payload)
}
