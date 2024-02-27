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
  async getOcr() {
    const reader = new Reader(config);
    return await reader.readAndParse(config.fileToRead).then((results) => {
      const output = [];
      if (!results) return null;
      results.forEach((result) => {
        const account = new Account(result);
        output.push(account.accountNumber + ' ' + account.status);
      });
      return output.join('<br />');
    });
  }
}
