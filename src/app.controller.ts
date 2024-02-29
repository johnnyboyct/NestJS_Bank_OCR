import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Reader } from './reader/reader';
import { Account } from './account/account';

import { config } from './config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/ocr')
  getOcr() {
    const output = [];
    const reader = new Reader(config);

    if (!reader.fileResult) return null;

    const accounts = reader.getAccounts();

    accounts.forEach((account) => {
      let ambig = '';
      if (account.hasAmbiguous && account.ambiguousAccountNumbers.length) {
        ambig = '  [' + account.ambiguousAccountNumbers.join(', ') + ']';
      }
      output.push(account.accountNumber + ' ' + account.status + ambig);
    });

    return output.join('<br />');
  }
}
