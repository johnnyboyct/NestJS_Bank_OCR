import { Account } from './account';

describe('Account', () => {
  //Good accounts
  const account = new Account('345882865');
  const account2 = new Account('987654322');
  const account3 = new Account('123456789');
  //Bad accounts
  const invAccount = new Account('1234567??');
  const badInputAccount = new Account('1234567');
  const errAccount = new Account('111111111');

  it('should be defined', () => {
    expect(account).toBeDefined();
  });
  it('should be VALID input', () => {
    expect(account.inputValid).toBeTruthy();
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
    expect(
      account.status == '' && account.status == '' && account3.status == '',
    ).toBeTruthy();
  });
  it('should have ILL status', () => {
    expect(invAccount.status == 'ILL').toBeTruthy();
  });
  it('should have ERR  status', () => {
    expect(errAccount.status == 'ERR').toBeTruthy();
  });
});
