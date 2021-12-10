export const withoutUndefinedOrNullEntries = (object: Record<string, any>) =>
  Object.entries(object).reduce(
    (memo, [key, value]) =>
      [undefined, null].includes(value) ? memo : { ...memo, [key]: value },
    {}
  )
