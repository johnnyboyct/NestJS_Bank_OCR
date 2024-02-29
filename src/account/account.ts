import { config } from '../config';
import { REPLACEMENTS, STATUS_CODES } from '../assets/chars';
export class Account {
  accountNumber: string;
  inputValid: boolean = false;
  checksumValid: boolean = false;
  status: string = '';
  lengthValid: boolean = false;
  unknownCount: number = 0;
  isNums: boolean = false;
  hasAmbiguous: boolean = false;
  ambiguousAccountNumbers: string[] = [];

  constructor(accountNumber: string) {
    this.accountNumber = accountNumber.toString();
    this.checkInput(accountNumber);
  }

  checkInput(accountNumber: string) {
    this.inputValid = false;
    this.lengthValid = this.checkLength(accountNumber);
    this.isNums = this.checkIsNums(accountNumber);
    this.unknownCount = this.checkUnknowns(accountNumber);

    if (this.lengthValid && this.isNums && !this.unknownCount) {
      this.inputValid = true;
      this.checksumValid = this.checksum(accountNumber);

      if (!this.checksumValid) {
        this.status = STATUS_CODES.ERR;
      }
    }
    if (this.status === STATUS_CODES.ERR && !this.unknownCount) {
      this.checkAmbiguous(accountNumber);
    }
  }
  checkAmbiguous(accountNumber: string) {
    const replacements = this.tryReplacement(accountNumber);
    if (replacements.length) {
      this.hasAmbiguous = true;
      this.status = STATUS_CODES.AMB;
      return true;
    }
    return false;
  }

  tryReplacement(accountNumber: string) {
    const ambiguousAccountNumbers = [];
    const accountArr = accountNumber.split('');
    for (let i = 0; i < accountArr.length; i++) {
      if (REPLACEMENTS[accountArr[i]] && REPLACEMENTS[accountArr[i]].length) {
        for (let j = 0; j < REPLACEMENTS[accountArr[i]].length; j++) {
          const newAcc = accountArr.slice();
          newAcc[i] = REPLACEMENTS[accountArr[i]][j];
          const newAccStr = newAcc.join('');
          if (this.checksum(newAccStr)) {
            ambiguousAccountNumbers.push(newAccStr);
          }
        }
      }
    }
    this.ambiguousAccountNumbers = ambiguousAccountNumbers;
    return ambiguousAccountNumbers;
  }
  checkIsNums(accountNumber: string) {
    return (accountNumber.match(/(\d){9}/gm) || []).length === 1;
  }
  checkLength(accountNumber: string) {
    return accountNumber.length === config.maxDigits;
  }
  checkUnknowns(accounNumber: string) {
    const unknowns = accounNumber.split('').filter((x) => x === '?').length;
    if (unknowns > 0) {
      this.status = STATUS_CODES.ILL;
      this.unknownCount = unknowns;
    }
    return unknowns;
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
    const valid = sum % 11 === 0;
    this.checksumValid = valid;
    return valid;
  }
}
