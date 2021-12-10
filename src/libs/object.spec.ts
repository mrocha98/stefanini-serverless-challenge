import { withoutUndefinedOrNullEntries } from './object'

describe('libs/object', () => {
  it('should return the provided object without undefined values', () => {
    const object = { a: 1, b: undefined, c: '' }
    expect(withoutUndefinedOrNullEntries(object)).toEqual({ a: 1, c: '' })
  })

  it('should return the provided object without null values', () => {
    const object = { a: 1, b: null, c: '' }
    expect(withoutUndefinedOrNullEntries(object)).toEqual({ a: 1, c: '' })
  })
})
