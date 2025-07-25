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

export function removeCommaFromNumber(input: string) {}
