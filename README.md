# **Papel**
[![Build Status](https://travis-ci.org/kabundege/Papel.svg?branch=develop)](https://travis-ci.org/kabundege/Papel)

[![Coverage Status](https://coveralls.io/repos/github/kabundege/Papel/badge.svg?branch=develop)](https://coveralls.io/github/kabundege/Papel?branch=develop)

[![Maintainability](https://api.codeclimate.com/v1/badges/a7e35ba5f19cad3dca80/maintainability)](https://codeclimate.com/github/kabundege/Papel/maintainability)

#**Project Description**

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
- [Admin can activate,Deactivate,view and delete an account](https://kabundege.github.io/Papel/UI/html/admin.html)
- [Admin can change a to a staff or an Admin](https://kabundege.github.io/Papel/UI/html/upgrade.html)
- [Staff can view  all or specififc and delete any bank account](https://kabundege.github.io/Papel/UI/html/staff.html)
- [Staff can make a transaction ](https://kabundege.github.io/Papel/UI/html/transactions.html)
- [Users can view all or specific transaction](https://kabundege.github.io/Papel/UI/html/dashboard.html)
- [Users can can create an account](https://kabundege.github.io/Papel/UI/html/createAcc.html)


# **Technonlogies**

- **Node** - run time environment for JavaScript
- **Express JS** - API development framework
- **Eslint** - code analysis tool for identifying problematic patterns found in JavaScript code
- **Babel JS** - JavaScript compiler (**ES5** to **ES6**)
- **Mocha and Chai** - for testing

## **You need the following to be able to run the application**

[Node](https://nodejs.org/en/download/) a runtime environment for JavaScript

[Postman](https://www.getpostman.com/downloads/) to test the Api endpoints

[Visual studio code](https://code.visualstudio.com/download) for editing and running the app

## **Clone the project**

    - git clone https://github.com/kabundege/Papel.git
    - cd /Papel
    - npm install (to install required dependencies)
    - npm start (to start the development server)

## **Testing**

    - npm  test

## **API endpoints**
`- POST api/v1/auth/signin - User Signin`

`- POST api/v1/auth/signup - User to create an account`

`- POST api/v1/accounts - User can create a Bank account`

`- PATCH api/v1//account/<account-number> - admin can activate or deactivate a Bank account`

`-DELETE api/v1/accounts/<account-number> -
 Admin can delete a Bank account`;

`-Post api/v1/transactions/<account-number>/debit - a Cashier can Debit an account`;

`-post api/v1/transactions/<account-number>/credit - a Cashier can credit an account`

`-GET /accounts?status=dormant -  
 Admin can view all dormant accounts`

`-GET /accounts?status=active - 
 Admin can view all active accounts`

`-GET api/v1/accounts - Admin/staff can view all bank account`

`-GET api/v1 /accounts/<account-number> - Admin/staff can view a specific bank account`

`-GET api/v1/user/<user-email-address>/accounts - Admin/staff can get all account owned by one user`

`-GET api/v1/transactions/<transaction-id> - 
 get a specific transaction `

`- GET accounts/<account-number>/transactionsAdmin/ - Staff can view transaction made by one user;
`

## **Pivotal Tracker Stories**

[https://www.pivotaltracker.com/n/projects/2432290](https://www.pivotaltracker.com/n/projects/2432290)

# **Author**

## **Kabundege Kwizera Christophe**
