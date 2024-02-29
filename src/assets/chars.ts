export const PIPE = '|'; // pipe
export const SPACE = ' '; // whitespace
export const UNDERSCORE = '_'; // underscore
export const UNKNOWN = '?'; // unknown

export const ERR_STATUS = 'ERR';
export const ILL_STATUS = 'ILL';
export const AMB_STATUS = 'AMB';
export const VALID_STATUS = '';

export const STATUS_CODES = {
  ERR: ERR_STATUS,
  ILL: ILL_STATUS,
  AMB: AMB_STATUS,
  VALID: VALID_STATUS,
};

export const ZERO = [
  [SPACE, UNDERSCORE, SPACE],
  [PIPE, SPACE, PIPE],
  [PIPE, UNDERSCORE, PIPE],
];
export const ONE = [
  [SPACE, SPACE, SPACE],
  [SPACE, SPACE, PIPE],
  [SPACE, SPACE, PIPE],
];
export const TWO = [
  [SPACE, UNDERSCORE, SPACE],
  [SPACE, UNDERSCORE, PIPE],
  [PIPE, UNDERSCORE, SPACE],
];
export const THREE = [
  [SPACE, UNDERSCORE, SPACE],
  [SPACE, UNDERSCORE, PIPE],
  [SPACE, UNDERSCORE, PIPE],
];
export const FOUR = [
  [SPACE, SPACE, SPACE],
  [PIPE, UNDERSCORE, PIPE],
  [SPACE, SPACE, PIPE],
];
export const FIVE = [
  [SPACE, UNDERSCORE, SPACE],
  [PIPE, UNDERSCORE, SPACE],
  [SPACE, UNDERSCORE, PIPE],
];
export const SIX = [
  [SPACE, UNDERSCORE, SPACE],
  [PIPE, UNDERSCORE, SPACE],
  [PIPE, UNDERSCORE, PIPE],
];
export const SEVEN = [
  [SPACE, UNDERSCORE, SPACE],
  [SPACE, SPACE, PIPE],
  [SPACE, SPACE, PIPE],
];
export const EIGHT = [
  [SPACE, UNDERSCORE, SPACE],
  [PIPE, UNDERSCORE, PIPE],
  [PIPE, UNDERSCORE, PIPE],
];
export const NINE = [
  [SPACE, UNDERSCORE, SPACE],
  [PIPE, UNDERSCORE, PIPE],
  [SPACE, UNDERSCORE, PIPE],
];
export const DIGITS = {
  0: ZERO,
  1: ONE,
  2: TWO,
  3: THREE,
  4: FOUR,
  5: FIVE,
  6: SIX,
  7: SEVEN,
  8: EIGHT,
  9: NINE,
};

export const REPLACEMENTS: { [key: string]: string[] } = {
  '0': ['8'],
  '1': ['7'],
  '2': [],
  '3': ['9'],
  '4': [],
  '5': ['9', '6'],
  '6': ['8', '5'],
  '7': ['1'],
  '8': ['0', '9', '6'],
  '9': ['3', '8', '5'],
};
