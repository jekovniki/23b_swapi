import { BadRequestException, createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Request } from 'express';
import { Filtering } from '../interface/basic.interface';
import { FilterRule } from '../enum/basic.enum';

export const FilteringParams = createParamDecorator(
  (data, ctx: ExecutionContextHost): Filtering[] | null => {
    const request: Request = ctx.switchToHttp().getRequest();
    const filters = request?.query.filter as string;
    if (!filters) {
      return null;
    }

    if (typeof data != 'object' || !Array.isArray(data)) {
      throw new BadRequestException('Invalid filter parameter configuration');
    }

    const filterArray = Array.isArray(filters) ? filters : [filters];
    const parsedFilters: Filtering[] = [];

    for (const filter of filterArray) {
      if (typeof filter !== 'string') {
        throw new BadRequestException('Invalid filter parameter format');
      }

      if (
        !filter.match(
          /^[a-zA-Z0-9_]+:(eq|neq|gt|gte|lt|lte|like|nlike|in|nin):[a-zA-Z0-9_ ,]+$/,
        ) &&
        !filter.match(/^[a-zA-Z0-9_]+:(isnull|isnotnull)$/)
      ) {
        throw new BadRequestException(
          `Invalid filter parameter format: ${filter}`,
        );
      }

      const [property, rule, value] = filter.split(':');

      if (!data.includes(property)) {
        throw new BadRequestException(`Invalid filter property: ${property}`);
      }

      if (!Object.values(FilterRule).includes(rule as FilterRule)) {
        throw new BadRequestException(`Invalid filter rule: ${rule}`);
      }

      parsedFilters.push({ property, rule, value });
    }

    return parsedFilters;
  },
);
