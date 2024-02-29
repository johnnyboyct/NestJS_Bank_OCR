import { Account } from './account';
import { REPLACEMENTS } from '../assets/chars';

describe('Account', () => {
  //Good accounts
  const account = new Account('345882865');
  const account2 = new Account('987654322');
  const account3 = new Account('123456789');
  //Bad accounts
  const invAccount = new Account('1234567??');
  const badInputAccount = new Account('1234567');
  const errAccount = new Account('222222222');
  const ambAccount = new Account('111111111');

  it('should be defined', () => {
    expect(account).toBeDefined();
  });
  it('should be VALID input', () => {
    expect(account.inputValid).toBeTruthy();
    expect(account.checkLength('345882865')).toBeTruthy();
    expect(account.checkIsNums('345882865')).toBeTruthy();
    expect(account.checkUnknowns('3458828??')).toBeTruthy();
  });
  it('should be INVALID input', () => {
    expect(badInputAccount.inputValid).toBeFalsy();
  });
  it('should be a INVALID checksum', () => {
    expect(errAccount.checksumValid).toBeFalsy();
  });
  it('should be a VALID checksum', () => {
    expect(
      account.checksumValid && account2.checksumValid && account3.checksumValid,
    ).toBeTruthy();
  });
  it('should have no status', () => {
    expect(account3.status == '').toBeTruthy();
  });
  it('should have ILL status', () => {
    expect(invAccount.status == 'ILL').toBeTruthy();
  });
  it('should have AMB  status', () => {
    expect(
      ambAccount.status == 'AMB' &&
        ambAccount.ambiguousAccountNumbers.length > 0,
    ).toBeTruthy();
  });
  it('should have 1 AMB  replacement', () => {
    expect(ambAccount.tryReplacement('111111111').length == 1).toBeTruthy();
  });
  it('should get AMB  replacements', () => {
    expect(ambAccount.checkAmbiguous('111111111')).toBeTruthy();
  });

  it('should have ERR  status', () => {
    expect(errAccount.status == 'ERR').toBeTruthy();
  });
  it('should get Replacements  status', () => {
    expect(
      account.getReplacement('2').length == REPLACEMENTS[2].length,
    ).toBeTruthy();
    expect(
      account.getReplacement('9').length == REPLACEMENTS[9].length,
    ).toBeTruthy();
  });
});
