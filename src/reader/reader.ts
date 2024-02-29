import * as fs from 'fs';
import * as path from 'path';
import { DIGITS, UNKNOWN } from '../assets/chars';
import * as _ from 'lodash';

interface Sign {
  sign: string[];
  signArray: string[][];
  resultNumber?: string;
  resultNumber2?: string;
}

export class Reader {
  fileToRead: string = '../assets/nums.txt';
  linesPerToken: number = 4;
  lineBreakDelimiter: string = '\n';
  characterColumnWidth: number = 3;
  characterColumnHeight: number = 3;
  maxDigits: number = 9;
  signs: Sign[] = [];

  constructor(config: any) {
    if (config) {
      this.fileToRead = config.fileToRead;
      this.linesPerToken = config.linesPerToken;
      this.lineBreakDelimiter = config.lineBreakDelimiter;
      this.characterColumnWidth = config.characterColumnWidth;
      this.characterColumnHeight = config.characterColumnHeight;
      this.maxDigits = config.maxDigits;
    }
  }

  async readAndParse(filePath: string): Promise<string[] | null> {
    try {
      const fileResult = await fs.promises.readFile(
        path.join(__dirname, filePath),
        {
          encoding: 'utf-8',
        },
      );
      return this.analyzeOCR(fileResult);
    } catch (error) {
      console.error('Error: No file found under given path.');
      return null;
    }
  }

  analyzeOCR(fileContent: string | null): string[] {
    const codeLines = this.validateLineArray(fileContent);
    const result: string[] = [];

    for (let i = 0; i < codeLines.length; i = i + this.characterColumnHeight) {
      const accountNumberCharacters = [
        codeLines[i],
        codeLines[i + 1],
        codeLines[i + 2],
      ];
      const row = this.analyzeRow(accountNumberCharacters);
      result.push(row);
    }

    return result;
  }
  validateLineArray(fileContent: string | null): string[] | string {
    if (fileContent === null || fileContent.length === 0) {
      return 'Empty file.';
    }

    const splits = fileContent.split(this.lineBreakDelimiter);
    if (splits.length === 0 || splits.length % this.linesPerToken != 0)
      return 'Invalid file.';

    const isBlankLine = (s: string) =>
      [this.lineBreakDelimiter, ''].includes(s);
    const trimLineEnd = (s: string) =>
      s.substring(0, s.length - (s.length % this.characterColumnWidth));

    const lines = splits
      .filter((l) => !isBlankLine(l))
      .map((l) => trimLineEnd(l));
    if (!lines.length) return 'No valid lines found.';
    if (lines.length % this.characterColumnHeight != 0)
      return 'Invalid number of lines.';
    return lines;
  }
  analyzeRow(row: string[]): string {
    let result = '';

    for (let i = 0; i < this.maxDigits; i++) {
      const startFrom = i * this.characterColumnHeight;
      const sign = [
        row[0].substring(startFrom, startFrom + this.characterColumnWidth),
        row[1].substring(startFrom, startFrom + this.characterColumnWidth),
        row[2].substring(startFrom, startFrom + this.characterColumnWidth),
      ];
      const signArray = [
        row[0]
          .substring(startFrom, startFrom + this.characterColumnWidth)
          .split(''),
        row[1]
          .substring(startFrom, startFrom + this.characterColumnWidth)
          .split(''),
        row[2]
          .substring(startFrom, startFrom + this.characterColumnWidth)
          .split(''),
      ];

      if (this.isEmptySign(sign)) {
        continue;
      }

      const resultNumber = this.getNumber(signArray);
      const signObject: Sign = {
        sign: sign,
        signArray: signArray,
        resultNumber: resultNumber,
      };
      this.signs.push(signObject);

      if (resultNumber === undefined) {
        return 'Error in data.';
      } else {
        result += resultNumber;
      }
    }
    return result;
  }
  getNumber(signArray: string[][]): string {
    const result = Object.keys(DIGITS).find((digit) => {
      const sign = DIGITS[digit];
      if (_.isEqual(signArray, sign)) {
        return digit;
      }
    });
    return result || UNKNOWN;
  }

  isEmptySign(sign: string[]): boolean {
    return sign.every((s) => s === undefined || s === '');
  }
}
