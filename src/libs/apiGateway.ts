import { StatusCodes } from 'http-status-codes'

type HeaderValue = boolean | number | string

type Data = {
  statusCode?: number
  response?: Record<string, unknown>
  headers?: {
    [header: string]: HeaderValue
  }
}

export const formatJSONResponse = ({
  statusCode = StatusCodes.OK,
  response = {},
  headers = {},
}: Data) => {
  const headersMap = new Map<string, HeaderValue>().set(
    'Content-Type',
    'application/json'
  )

  for (const [key, value] of Object.entries(headers)) {
    headersMap.set(key, value)
  }

  return {
    body: JSON.stringify(response),
    statusCode,
    headers: Object.fromEntries(headersMap),
  }
}
