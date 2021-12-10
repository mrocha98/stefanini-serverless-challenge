export class Builder {
  constructor(private readonly object: Record<string, any>) {}

  createUpdateExpression() {
    const expression = Object.keys(this.object)
      .map((key) => `${key} = :${key}`)
      .join(', ')
    return `set ${expression}`
  }

  createExpressionAttributeValues() {
    return Object.entries(this.object).reduce(
      (memo, [key, value]) => ({ ...memo, [`:${key}`]: value }),
      {}
    )
  }
}
