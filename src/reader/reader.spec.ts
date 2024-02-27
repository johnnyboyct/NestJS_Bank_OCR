import { Reader } from './reader';
import { config } from '../config';
import * as fs from 'fs';
import * as path from 'path';

describe('Reader', () => {
  const reader = new Reader(config);
  it('should be defined', () => {
    expect(reader).toBeDefined();
  });
  it('should readAndParse file', async () => {
    await reader.readAndParse(config.fileToRead).then((result) => {
      expect(result).toBeDefined();
    });
  });
  it('should read file and first line should match', async () => {
    const reader = new Reader(config);
    const fileResult = await fs.promises.readFile(
      path.join(__dirname, config.fileToRead),
      {
        encoding: 'utf-8',
      },
    );
    const res = reader.analyzeOCR(fileResult);

    expect(res && res[0] && res[0] == '345882865').toBeTruthy();
  });

  it('should validateLineArray', async () => {
    const fileResult = await fs.promises.readFile(
      path.join(__dirname, config.fileToRead),
      {
        encoding: 'utf-8',
      },
    );
    const res = reader.validateLineArray(fileResult);
    expect(res).not.toBeNull();
  });
  it('should analyzeRow', async () => {
    const accounNumber = '345882865';
    const accountNumberCharacters = [
      ' _     _  _  _  _  _  _  _  ',
      ' _||_||_ |_||_| _||_||_ |_ ',
      ' _|  | _||_||_||_ |_||_| _|',
    ];
    const res = reader.analyzeRow(accountNumberCharacters);
    expect(res == accounNumber).toBeTruthy();
  });
});
