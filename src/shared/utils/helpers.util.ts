export function convertUnknownToUndefined(prop: any): any {
  return prop !== 'unknown' ? prop : undefined;
}
