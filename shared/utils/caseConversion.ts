// utils/caseConversion.ts

// Convert snake_case to camelCase
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// Recursively convert object keys from snake_case to camelCase
export function keysToCamel<T>(obj: any): T {
  if (Array.isArray(obj)) {
    return obj.map((item) => keysToCamel(item)) as any;
  } else if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        snakeToCamel(key),       // convert key properly
        keysToCamel(value),      // recurse into value
      ])
    ) as T;
  } else {
    return obj;
  }
}


export const camelToSnake = (str: string) => {
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

// Recursive function to convert keys of object(s)
export const keysToSnake = <T>(obj: any): T => {
  if (Array.isArray(obj)) {
    return obj.map((item) => keysToSnake(item)) as any;
  } else if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        camelToSnake(key),
        keysToSnake(value),
      ])
    ) as T;
  } else {
    return obj;
  }
};
