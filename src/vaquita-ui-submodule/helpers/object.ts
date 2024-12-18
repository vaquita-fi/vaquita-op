export function isStringJson(str: any): boolean {
  try {
    if (typeof str === 'string') {
      JSON.parse(str);
      return true;
    }
  } catch (e) {
    return false;
  }
  return false;
}

export function isObjectJson(obj: any): boolean {
  try {
    return typeof JSON.stringify(obj) === 'string';
  } catch (e) {
    return false;
  }
}

export const stringifyObject = function (obj: any, depth: number, indent = 0) {
  if (depth < 0) {
    return '';
  }

  if (typeof obj === 'function') {
    return obj.toString();
  } else if (typeof obj === 'object' && obj !== null) {
    const indentStr = ' '.repeat(indent);
    const entries: string = Object.entries(obj)
      .map(([key, value]) => {
        if (typeof value === 'function') {
          return `${indentStr}    ${key}: ${value.toString()},`;
        } else if (typeof value === 'object' && value !== null) {
          return `${indentStr}    ${key}: ${stringifyObject(
            value,
            depth - 1,
            indent + 4
          )},`;
        }
        return `${indentStr}    ${key}: ${JSON.stringify(value)},`;
      })
      .join('\n');
    return `{\n${entries}\n${indentStr}}`;
  }

  return JSON.stringify(obj);
};
