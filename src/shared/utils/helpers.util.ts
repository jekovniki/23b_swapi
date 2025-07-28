import {
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';
import { FilterRule } from '../enum/basic.enum';
import { Filtering } from '../interface/basic.interface';

export function convertUnknownToUndefined(prop: any): any {
  return prop !== 'unknown' ? prop : undefined;
}

export function getRangeValue(range: string, type: 'min' | 'max') {
  const parts = range.split('-');
  if (parts.length === 1) {
    return Number(parts[0]);
  }

  return type === 'max' ? Number(parts[1]) : Number(parts[0]);
}

export const getWhere = (filter: Filtering) => {
  if (!filter) return {};

  if (filter.rule == FilterRule.IS_NULL) return { [filter.property]: IsNull() };
  if (filter.rule == FilterRule.IS_NOT_NULL)
    return { [filter.property]: Not(IsNull()) };
  if (filter.rule == FilterRule.EQUALS)
    return { [filter.property]: filter.value };
  if (filter.rule == FilterRule.NOT_EQUALS)
    return { [filter.property]: Not(filter.value) };
  if (filter.rule == FilterRule.GREATER_THAN)
    return { [filter.property]: MoreThan(filter.value) };
  if (filter.rule == FilterRule.GREATER_THAN_OR_EQUALS)
    return { [filter.property]: MoreThanOrEqual(filter.value) };
  if (filter.rule == FilterRule.LESS_THAN)
    return { [filter.property]: LessThan(filter.value) };
  if (filter.rule == FilterRule.LESS_THAN_OR_EQUALS)
    return { [filter.property]: LessThanOrEqual(filter.value) };
  if (filter.rule == FilterRule.LIKE)
    return { [filter.property]: ILike(`%${filter.value}%`) };
  if (filter.rule == FilterRule.NOT_LIKE)
    return { [filter.property]: Not(ILike(`%${filter.value}%`)) };
  if (filter.rule == FilterRule.IN)
    return { [filter.property]: In(filter.value.split(',')) };
  if (filter.rule == FilterRule.NOT_IN)
    return { [filter.property]: Not(In(filter.value.split(','))) };
};
