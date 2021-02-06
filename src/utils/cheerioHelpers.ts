/**
 * Allows typing Cheerio's toArray, and filters out any falsy entries
 */

export function typedToArray<T>(c: any) {
  return (c.toArray().filter(Boolean) as unknown) as Array<T>;
}
