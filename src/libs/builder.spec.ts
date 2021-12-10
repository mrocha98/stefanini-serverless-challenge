import { Builder } from './builder'

describe('libs/builder', () => {
  it('should create a valid update expression', () => {
    const object = { a: 1, b: 'test' }
    const builder = new Builder(object)
    expect(builder.createUpdateExpression()).toEqual('set a = :a, b = :b')
  })

  it('should create a valid attribute values object', () => {
    const object = { a: 1, b: 'test' }
    const builder = new Builder(object)
    expect(builder.createExpressionAttributeValues()).toMatchObject({
      ':a': 1,
      ':b': 'test',
    })
  })
})
