import { config } from '../config';
export class Account {
  accountNumber: string;
  inputValid: boolean = false;
  checksumValid: boolean = false;
  status: string = '';

  constructor(accountNumber: string) {
    this.accountNumber = accountNumber.toString();
    this.checkInput(accountNumber);
  }

  checkInput(accountNumber: string) {
    this.inputValid = false;
    const lengthValid = accountNumber.length == config.maxDigits;
    const isNums = accountNumber.match(/(\d|\?){9}/gm);
    const hasUnknowns = accountNumber.includes('?');
    this.status = hasUnknowns ? 'ILL' : '';
    if (lengthValid && !!isNums && !hasUnknowns) {
      this.inputValid = true;
      this.checksumValid = this.checksum(accountNumber);
      this.status = !this.checksumValid ? 'ERR' : '';
    }
  }

  /*policy number: 3 4 5 8 8 2 8 6 5
position names: d9 d8 d7 d6 d5 d4 d3 d2 d1
(5+(2*6)+(3*8)+(4*2)+(5*8)+(6*8)+(7*5)+(8*4)+(9*3)) %11
checksum calculation:
(d1+(2*d2)+(3*d3)+...+(9*d9)) mod 11 = 0
*/
  checksum(accountNumber) {
    const digits = accountNumber.split('');
    const reversed = digits.reverse();
    let sum = 0;
    for (let i = 0; i < reversed.length; i++) {
      sum += parseInt(reversed[i]) * (i + 1);
    }
    return sum % 11 === 0;
  }
}
