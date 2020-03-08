# **Papel**
[![Build Status](https://travis-ci.org/kabundege/Papel.svg?branch=develop)](https://travis-ci.org/kabundege/Papel) [![Coverage Status](https://coveralls.io/repos/github/kabundege/Papel/badge.svg?branch=develop)](https://coveralls.io/github/kabundege/Papel?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/a7e35ba5f19cad3dca80/maintainability)](https://codeclimate.com/github/kabundege/Papel/maintainability)

**Project Description**

Papel is a light-weight core banking application that powers banking operations like account
creation, customer deposits, and withdrawals. This app is meant to support a single bank, where
users can signup and create bank accounts online, but must visit the branch to withdraw or
deposit money.

## **UI Templates**

[https://kabundege.github.io/Papel/](https://kabundege.github.io/Papel/)


## **UI Required features**

- [Landing page](https://kabundege.github.io/Papel/)
- [Sign up.](https://kabundege.github.io/Papel/UI/html/signup.html)
- [Sign in.](https://kabundege.github.io/Papel/)
- [Admin can activate, Deactivate, view and delete an account](https://kabundege.github.io/Papel/UI/html/admin.html)
- [Admin can change a staff or an Admin](https://kabundege.github.io/Papel/UI/html/upgrade.html)
- [Staff can view  all or specififc bank account](https://kabundege.github.io/Papel/UI/html/staff.html)
- [Staff/admin can delete a bank account](https://kabundege.github.io/Papel/UI/html/staff.html)
- [Staff can make a transaction ](https://kabundege.github.io/Papel/UI/html/transactions.html)
- [Users can view all or a specific transaction](https://kabundege.github.io/Papel/UI/html/dashboard.html)
- [Users can create an account](https://kabundege.github.io/Papel/UI/html/createAcc.html)


# **Technonlogies**

- **Node** - run time environment for JavaScript
- **Express JS** - API development framework
- **Eslint** - code analysis tool for identifying problematic patterns found in JavaScript code
- **Babel JS** - JavaScript compiler (**ES6** to **ES5**)
- **Mocha and Chai** - for testing

## **You need the following to be able to run the application**

[Node](https://nodejs.org/en/download/) a runtime environment for JavaScript

[Postman](https://www.getpostman.com/downloads/) to test the Api endpoints

[Visual studio code](https://code.visualstudio.com/download) for editing and running the app

### PROJECT SETUP
First you need to clone it to your machine:
```
https://github.com/kabundege/Papel.git
```
Open it using your favorite IDE
I used ([vs code](https://code.visualstudio.com/download))

Install all necessary node modules
```
npm install
```
To start the app
```
npm start
```
To run tests
```
npm test
```

### API ENDPOINTS
| API | Methods  | Description  |
| ------- | --- | --- 
| `/api/v1/auth/signup` | POST | user signup |
| `/api/v1/auth/signup/admin` | POST | Admin/staff signup |
| `/api/v1/auth/login` | POST | user login |
| `/api/v1/account` | POST | create account |
| `/api/v1/account/<accountNo>` | POST | activate or deactivate account |
| `/api/v1/accounts` | GET | display all bank accounts |
| `/api/v1/accounts/<accountNo>` | GET | display a specific account by account Number|
| `/api/v1/user/<email>/accounts` | GET | display a specific account by email |
| `/api/v1/account?<status>` | GET | display a specific account by status active/dormant|
| `/api/v1/account/<accountNo>` | DELETE | admin/staff can delete an account |
| `/api/v1/account/<accountenumber>` | UPDATE | admin/staff canchange account status |
| `/api/v1/transactions/<accountNo>/debit` | POST | staff can debit a bank account |
| `/api/v1/transactions/<accountNo>/credit` | POST | staff can credit a bank account |
| `/api/v1/accounts/<accountNo>/transactions` | GET | display a specific account transaction history |
| `/api/v1/transactions/<transactionId>` | GET | display a specific transaction details |

### Papel can be Tested using **Heroku** [Through Here](papel--andela.herokuapp.com)
### How can it be manually tested
- Using [postman](https://www.getpostman.com/downloads/)

## **Pivotal Tracker Stories**

[https://www.pivotaltracker.com/n/projects/2432290](https://www.pivotaltracker.com/n/projects/2432290)

## **Author**
# *Kabundege Kwizera Christophe*
