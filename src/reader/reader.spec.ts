import { config } from '../config';
import { Reader } from './reader';

describe('Reader', () => {
  const reader = new Reader(config);
  const readerNoConfig = new Reader();
  const zero = [
    [' ', '_', ' '],
    ['|', ' ', '|'],
    ['|', '_', '|'],
  ];

  it('should be defined with and without a config', () => {
    expect(reader).toBeDefined();
    expect(readerNoConfig).toBeDefined();
  });

  it('should have fileResult', () => {
    expect(reader.fileResult).toBeDefined();
  });

  it('should have accounts', () => {
    const accounts = reader.getAccounts();
    expect(accounts.length).toBeTruthy();
  });

  it('should readAndParse file', async () => {
    expect(reader.readAndParse(config.fileToRead)).toBeDefined();
  });

  it('should read file and first line should match', async () => {
    expect(
      reader.fileResult &&
        reader.fileResult[0] &&
        reader.fileResult[0] == '345882865',
    ).toBeTruthy();
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
  it('should getNumber 0', async () => {
    const res = reader.getNumber(zero);
    expect(res == '0').toBeTruthy();
  });
  it('should getNumber 0', async () => {
    const res = reader.isEmptySign(zero[0]);
    expect(!res).toBeTruthy();
  });

  it('should get isBlankLine', async () => {
    const res = reader.isBlankLine(' 1234 ');
    expect(res).toBeFalsy();
  });
});
