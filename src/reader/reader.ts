import * as fs from 'fs';
import * as path from 'path';
import { DIGITS, UNKNOWN } from '../assets/chars';
import * as _ from 'lodash';
import { Account } from '../account/account';

interface Sign {
  signArray: string[][];
  resultNumber?: string;
}

export class Reader {
  fileToRead: string = '../assets/nums.txt';
  linesPerToken: number = 4;
  lineBreakDelimiter: string = '\n';
  characterColumnWidth: number = 3;
  characterColumnHeight: number = 3;
  maxDigits: number = 9;
  signs: Sign[] = [];
  fileResult: string[];
  accounts: Account[] = [];

  constructor(config?: any) {
    if (config) {
      this.fileToRead = config.fileToRead;
      this.linesPerToken = config.linesPerToken;
      this.lineBreakDelimiter = config.lineBreakDelimiter;
      this.characterColumnWidth = config.characterColumnWidth;
      this.characterColumnHeight = config.characterColumnHeight;
      this.maxDigits = config.maxDigits;
    }
    if (fs.existsSync(path.join(__dirname, this.fileToRead))) {
      this.fileResult = this.readAndParse(this.fileToRead);
    }
  }

  readAndParse(filePath: string): string[] | null {
    try {
      const fileResult = fs.readFileSync(
        path.join(__dirname, filePath),
        'utf-8',
      );
      return this.analyzeOCR(fileResult);
    } catch (error) {
      throw new Error('Error reading file.');
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

  getAccounts(): Account[] {
    const accounts: Account[] = [];
    this.fileResult.forEach((result) => {
      const account = new Account(result);
      accounts.push(account);
    });
    this.accounts = accounts;
    return accounts;
  }

  validateLineArray(fileContent: string | null): string[] | string {
    if (fileContent === null || fileContent.length === 0) {
      return 'Empty file.';
    }

    const splits = fileContent.split(this.lineBreakDelimiter);
    if (splits.length === 0 || splits.length % this.linesPerToken != 0)
      return 'Invalid file.';

    const lines = splits
      .filter((l) => !this.isBlankLine(l))
      .map((l) => this.trimLineEnd(l));

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
  isBlankLine(s: string): boolean {
    return [this.lineBreakDelimiter, ''].includes(s);
  }

  trimLineEnd(s: string): string {
    return s.substring(0, s.length - (s.length % this.characterColumnWidth));
  }
}
