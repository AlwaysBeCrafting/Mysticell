const tail = (str: string, delim: string): string =>
  str.substring(str.lastIndexOf(delim) + 1);

export { tail };
