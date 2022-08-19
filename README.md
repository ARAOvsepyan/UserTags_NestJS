# Test task for NodeJS developer

<div align="center">
  
| What am I using?                                          ||
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
|Programming language|![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)                                                                     
| Runtime system                                            | ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)                |
| Framework       | ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) |
| DB | ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) |
| ORM | ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white) |
| Documentation | ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white) |
| Access control | ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

</div>

## **BackEnd Code folder structure**

- src
  - auth
    - dto
      - jwt
      - singin
      - login
    - auth comtroller/model/module/service/guard
  - tags
    - dto
      - create
      - search
      - update
    - tags comtroller/model/module/service
  - user_tags
    - dto
      - add
    - user_tags comtroller/model/module/service/guard
  - users
    - dto
      - update
    - users comtroller/model/module/service/guard
  - pipes
    - validation
  - exceptions
    - validation.exception
- test
  - e2e
  - unit
  - integration
- app.module
- main

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

It will launch the server on [http://localhost:8000](http://localhost:8000) this url.

Swagger documentation is located at [localhost:8000/api/docs](localhost:8000/api/docs) .
