# stackOverflow
A CRUD operation that allows users to ask or answer questions and vote for answers.


## Table of Contents

 * [Technologies](#technologies)
 * [Features](#features)
 * [Installation](#installation)
 * [HowTo](#howto)
 * [FAQ](#faq)
 * [Api-endpoints](#api-endpoints)

## Technologies

* [ES6](http://es6-features.org/) - ECMAScript version six
* [Typescript](https://www.typescriptlang.org/) - Typed superset of JavaScript Progamming Language
* [Node](https://nodejs.org/) - Runtime Environment
* [Express](https://expressjs.com/) - Web Application Framework 
* [Mysql](https://www.mysql.com/) - Database Management Tool


## Features

* User can create account and login
* User can create a question
* User can search for question by query
* User can answer a question by question Id
* User can vote for an answer


### Getting Started

### Installation

* git clone [stackOverflow Repository](https://github.com/marufdeen/stackOverflow.git) 
* Run `yarn install` or `npm install` to install packages
* Create `.env` file. Use the `.xample.env` file as a model for your .env file
* Globally install sequelize-cli
* Using sequelize db:migrate migrate the database
* Start mysql 
* Run `yarn start` or `npm start`to start the development server
* Navigate to [localhost:8080/api-docs](http://127.0.0.1:8080/api-docs) in your browser to test APIs endpoint from swagger.

### OR 
* use 
[Postman](https://getpostman.com/) or [Insomnia](https://insomnia.rest/) to test endpoints.
***You can test endpoints with the following routes listed on the [table](#api-endpoints) provided below:***


### HowTo

Ensure you have follow the above installation process.
You can test endpoints by using the swagger application on [swagger-api-docs](http://127.0.0.1:8080/api-docs) or [Postman or Insomia](#or)

### FAQ
* What language is used to build this application ?
The application (back-end) is entirely built with typescript
* Is this an open-source project ?
Yes, Is an open-source project.
* Who can contribute ?
Anyone can contribute as long as you would follow the contribution guides outlined above
* Is the application hosted online ?
Yes, the application is hosted on heroku platform. You can always visit it via this link https://dashboard.heroku.com/apps/stack-overflown
* Does the application have an API ?
Yes, The application has a well documented API that can be viewed via a link in the API documentation section below
* Is the application licensed ?
Yes, the application and its contents is under MIT license

## Api-endpoints

##### Open the postman or insomnia and test the following existing routes


|API            | HTTP Verb       | Action
-------------------|-------------------|--------------
_`/api/register`_ | _`POST`_ | Create an account|
_`/api/login`_ | _`POST`_ | Login into account|
_`/api/questions`_ | _`POST`_ | Create a question|
_`/api/answers/{questionId}`_ | _`POST`_ | Answer a question |
_`/api/questions?search=searchword`_ | _`GET`_ | Search for a question |
_`/api/answers/{answerId}/upvote`_ | _`PATCH`_ | up-vote an answer |
_`/api/answers/{answerId}/downvote`_ | _`PATCH`_ | down-vote an answer |
