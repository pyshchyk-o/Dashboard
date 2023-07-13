/**
 * debounce can be used with a function having any number of arguments of any type,
 * which is represented by 'any[]'.
 * Because this utility function will be able to handle any kind of function,
 * regardless of the number and types of arguments it accepts.
 */
export const debounce = <T extends any[]>(fn: (...args: T) => void, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return function (...args: T) {
    if(timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  };
};

export const orderBy = <T extends object>(data: T[], column: keyof T, direction: 'asc' | 'desc'): T[] => {
  return [...data].sort((a, b) => {
    if (String(a[column]) < String(b[column])) {
      return direction === 'asc' ? -1 : 1;
    }
    if (String(a[column]) > String(b[column])) {
      return direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
};
