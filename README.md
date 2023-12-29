## initial setup
!!  mysql + nestjs + typeorm

    git clone https://github.com/edy477/testprj

## Installation
```bash

$ npm install
$ npm run migration:run


```

## Running the app

$ 

```bash
# development
$ npm run start



```
 it will run on localhost:300/
## Usage
test on postman or browser using this format with a get request:

     http://localhost:3000/url/api/www.youtube.com
     http://localhost:3000/url/api/ + "url"

to  view  of a list of  the shortened urls:  http://localhost:3000/

copy and paste the shortened url in the Shortened URL  column on a new window  redirect to the original URL

## Description 
to short the url the code uses a  base62 encoding algorithm

## Tessting with jest

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


