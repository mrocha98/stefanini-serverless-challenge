import { formatJSONResponse } from './apiGateway'

describe('libs/apiGateway', () => {
  const contentType = { 'Content-Type': 'application/json' }

  it('should have the header Content-Type with application/json as value by default', () => {
    const res = formatJSONResponse({})
    expect(res.headers).toMatchObject(contentType)
  })

  it('should have the provided header', () => {
    const testHeader = { test: 'test' }
    const res = formatJSONResponse({ headers: testHeader })
    expect(res.headers).toMatchObject({ ...contentType, ...testHeader })
  })
})
