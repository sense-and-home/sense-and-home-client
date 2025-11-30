function camelToSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function keysToSnakeCase<T extends object>(obj: T): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => keysToSnakeCase(item));
  }

  if (obj instanceof Date) {
    return obj;
  }

  if (typeof obj === "object") {
    const result: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const snakeKey = camelToSnakeCase(key);
        result[snakeKey] = keysToSnakeCase((obj as any)[key]);
      }
    }
    return result;
  }

  return obj;
}

function snakeToCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_match, letter) => letter.toUpperCase());
}

export function keysToCamelCase(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(keysToCamelCase);
  }

  if (obj instanceof Date || typeof obj !== "object") {
    return obj;
  }

  const result: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = snakeToCamelCase(key);
      result[camelKey] = keysToCamelCase(obj[key]);
    }
  }

  return result;
}
