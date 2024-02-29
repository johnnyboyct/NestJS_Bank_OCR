<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
Done for an interview.

[Nest](https://github.com/nestjs/nest) framework TypeScript repository for [https://codingdojo.org/kata/BankOCR](https://codingdojo.org/kata/BankOCR).

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Kata Bank OCR

Original kata description [available on
codingdojo.org](http://codingdojo.org/cgi-bin/wiki.pl?KataBankOCR).

The following sections briefly describe the features to be supported.

## Parsing Account Numbers

Given a string of characters representing an account number
When I run the OCR parser
Then I should have a numeric representation of the account number

In this scenario, account numbers will be provided as a 3- or 4-line string of
characters, using spaces, pipes & underscores (the 4th line, if provided, will
be blank).

So, given the following example input...

```
    _  _     _  _  _  _  _
  | _| _||_||_ |_   ||_||_|
  ||_  _|  | _||_|  ||_| _|

```

The output should be `123456789`.

## Validating Account Numbers

Given a string of characters representing an account number
When I run the OCR parser
Then the output should have a valid checksum

Checksum should be calculated as follows:

account number:   3  4  5  8  8  2  8  6  5
position names:  d9 d8 d7 d6 d5 d4 d3 d2 d1

`(d1+2*d2+3*d3 +..+9*d9) mod 11 = 0`

## Outputting to a Report

Given an input file of up to 500 account number strings
When I run the OCR parser
Then I should have an output file containing 1 line per processed account number
And any illegible digits should be replaced by "?"
And any account number containing illegible digits should be followed by "ILL"
And any account number failing checksum validation should be followed by "ERR"

So, an example of the output file might read as follows:

```
457508000
664371495 ERR
86110??36 ILL
```

## Guessing illegible & invalid account numbers

Given an account number with illegible digits or an invalid checksum
And a valid checksum can be obtained by adding or removing at most a single pipe or underscore character to each input digit
When I run the OCR parser
Then I should have a numeric representation of the account number

Given an account number with illegible digits or an invalid checksum
And a valid checksum can be obtained in multiple ways by adding or removing at most a single pipe or underscore character to each input digit
When I run the OCR parser
Then the result should be marked with "AMB"

Given an account number with illegible digits or an invalid checksum
And a valid checksum cannot be obtained by adding or removing at most a single pipe or underscore character to each input digit
When I run the OCR parser
Then the result should be marked with "ILL" or "ERR"

