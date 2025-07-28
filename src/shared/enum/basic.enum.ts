export enum Gender {
  Male = 'male',
  Female = 'female',
  Hermaphrodite = 'hermaphrodite',
  NotApplicable = 'n/a',
  None = 'none',
}

export enum SortOrder {
  Ascending = 'asc',
  Descending = 'desc',
}

export enum FilterRule {
  EQUALS = 'eq',
  NOT_EQUALS = 'neq',
  GREATER_THAN = 'gt',
  GREATER_THAN_OR_EQUALS = 'gte',
  LESS_THAN = 'lt',
  LESS_THAN_OR_EQUALS = 'lte',
  LIKE = 'like',
  NOT_LIKE = 'nlike',
  IN = 'in',
  NOT_IN = 'nin',
  IS_NULL = 'isnull',
  IS_NOT_NULL = 'isnotnull',
}
