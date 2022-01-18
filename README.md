<br />
<p align="center">
  <a>
     <img src= alt="Logo" >
  </a>

  <h3 align="center">BackEnd Store EGFWD Second Project </h3>

  <p align="center">
    Project Description
    
</p>

This project is simply a set of backend apis that allow stack holder to create, edit delete and display one record or all records, this project allow their stackholder to creates products and users to issue an order that contains many products to buy next i will display the endpoints apis and hoe to use it,. but first i will show how to install trhe project and ten a detailed explaination of the coide will be displayed.

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
<ol>
<li><a href="#about-this-project">About this project</a></li>
<li><a href="#lests-start">Lets Start</a></li>
<li><a href="#xample-enviroment-varaible">Example Enviroment Varaible</a></li>
<li><a href="#scripts">Scripts</a></li>
<li><a href="#prerequisites">Prerequisites</a></li>
<li><a href="#models">Models</a></li>
<li><a href="#express-handlers">Express Handlers</a></li>
<li><a href="#jwts">Jwts</a></li>
<li><a href="#code-structure">Code Structure</a></li>
<li><a href="#design-methodology-and-code-explaination ">Design Methodology and Code Explaination</a>
<li><a href="#design-considerations-challenges">Design Considerations Challenges</a></li>
<li><a href="#important-code-snippets">Important Code Snippets</a></li>
<li><a href="#udacity-review-and-modifications">Udacity Review and Modifications</a></li>
<li><a href="#udacity-review-Project-acceptance">Udacity Review Project Acceptance</a></li>
<li><a href="#contact">Contact</a></li>
</ol>
</details>

## About This Project
This project is a storefront backend API that I made as part of my Full Stack Developer Nanodegree from Udacity. It was made following the requirements in the REQUIREMENTS.md file.the objective of this project is stand on how student can mange and use Typescript, NodeJS, Express, Postgresql, migrations, Endpoints, Jasmine, Unit Testing, JWT, authorization, authentication, salting and peppering, and how to make the essential requirements to build a server that ues relational database.

## Lets Start
- simply lets git clone our repo as the first step 
```sh
git clone ---------------------
```
- install our packages in one command while i will explain the need of use of every single code
```sh
npm install 
```
- or
```sh
yarn
```
- rename `example.env` file to be `.env`
- create the database, testing database and user and give the user the priviliges
```sh
psql -U postgres
CREATE DATABASE project_db;
CREATE DATABASE project_t;
CREATE USER project_user WITH PASSWORD 'pass';
GRANT PRIVILEGES ON DATABASE project_db TO  project_user;
GRANT PRIVILEGES ON DATABASE project_t TO  project_user;
```
- if there is any change related to you enviroment variable do it in `.env`
- migrate the tables
```sh
db-migrate up --env dev
```
- to test it live import the api json collections to your thunder client in visual studio idetor
- run this command and then try all requests
```sh
npm run watch
```
- you can try test using jasmine through the next command
```sh
npm run test
```
- for fourther use of scriptes you can check the scripts in packages,json script

## Example Enviroment Varaible
- it is already attached to be used and here is the content
```sh
# DATABASE
HOSTING=localhost
PORT=3000
DATABASE_PORT=5432
DATABASE_TEST=project_t
DATABASE_NAME=project_db
DATABASE_USER=project_user
DATABASE_PASSWORD=pass
# Mode
ENV=dev
# JWT
JWT_SECRET_KEY=JWT_SECRET_KEY
# pepper and salt
SALT_ROUNDS_COUNT=10
PEPPER_KEY=peppersecret
```

## Scripts
```sh
  "scripts": {
    "start": "ts-node src/server.ts",
    "watch": "tsc-watch --esModuleInterop src/server.ts --outDir ./dist --onSuccess \"node ./dist/server.js\"",
    "test": "npx tsc && db-migrate reset --env test && set ENV=test& db-migrate up --env test && jasmine && db-migrate reset --env test",
    "tsc": "tsc",
    "prettier": "prettier --write src/**/*.{ts,tsx,js,jsx}",
    "lint": "eslint . --ext .ts",
    "develop": "nodemon src/index.ts"
  }
```  
## Prerequisites
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

the dependaencies as follows

|`Package Name`|`need and discription`|
|-----|--------|
|**`dependencies`**|  |
| @types/express|typescript for express for server|
| @types/pg|typescript for database postgres|
| bcrypt|to make hash to the key|
| body-parser|to get json from the request|
| dotenv|to use the enviroment variable file|
| express|to set up a server server|
| jasmine|for unit testing|
| jsonwebtoken| to generate and validate tokens|
| pg| to use database pg migrations api|
| typescript| to allow using typescript language|
| **`devDependencies`**
| @types/bcrypt|typescript fro bcrypt hash to the key|
| @types/jasmine|typescript for unit testing|
| @types/jsonwebtoken|typescript for token generation validation|
| @types/supertest|typescript for test and simulationg requests|
| @typescript-eslint/eslint-plugin|typescript for synatacs coreections|
| @typescript-eslint/parser|typescriptfor synatacs coreections|
| eslint|for synatacs coreections|
| eslint-config-prettier|for formating a code in pretty representation|
| eslint-plugin-prettier|for formating a code in pretty representation|
| httpie|as postman to send and simulate requests|
| jasmine-spec-reporter| to put standard reporting method|
| jasmine-ts|for unit testing typescript files|
| nodemon| to run node as monitor|
| prettier| for code formating|
| supertest| for simulating the requests and http verbs|
| ts-node| node typescript run|
| tsc-watch| convert typescript files to js and watch it runing lif and show cahnge with save live|

## Models
 All tables in database requires crude model to deal with it even to create ,update delete or even show all this models is represented according to the requirement and it is expalined in `REQUIREMENTS.md` file

## Express Handlers
The Express handlers to route incoming requests to the correct model method. are explained match up with the enpoints and listed in `REQUIREMENTS.md`. 

## JWTs
JWT is used and also authentication and autherization is implemented in middleware.

## Code Structure

```sh
|   Example.env
|   packages.json
|   README.md
|   REQUIREMENTS.md
|   .preetierrc
|   .prettierignore
|   .eslintrrs
|   .eslinignore
|   .gitignore
|   .database.json
+---migrations
|   |   users-table.js
|   |   products-table.js
|   |   orders-table.js
|   |   order-products-table.js
|   |
|   \---sqls
|           users-table-down.sql
|           users-table-up.sql
|           products-table-down.sql
|           products-table-up.sql
|           orders-table-down.sql
|           orders-table-up.sql
|           order-products-table-down.sql
|           order-products-table-up.sql
|
+---spec
|   \---support
|           jasmine.json
|
\---src
    |   config.ts
    |   server.ts
    |
    +---database
    |       index.ts
    |
    +---helpers
    |       traites.ts
    |
    +---handlers
    |       dashboard.ts
    |       orders.ts
    |       products.ts
    |       users.ts
    |
    +---middlewares
    |       authenticate.ts
    |       autherizeexists.ts
    |       autherizematchparams.ts
    |       index
    |       logger
    |     
    +---models
    |       order.ts
    |       product.ts
    |       user.ts
    |       order_products
    |
    +---services
    |       dashboard.ts
    |
    \---tests
          +--\helpers
          |       reporter  
          \---specs
              |   databaseSpec.ts
              |   serverSpec.ts
              |
              +---helpers
              |       traitesSpec.ts
              |
              +---handlers
              |       dashboardSpec.ts
              |       orderSpec.ts
              |       productSpec.ts
              |       userSpec.ts
              |
              +---middlewares
              |       middlewaresSpec.ts
              +---models
              |       orderSpec.ts
              |       productSpec.ts
              |       userSpec.ts
              |       order_productsSpec.ts
              |
              +---services
                       dashboard.ts
              
```

## Design Methodology and Code Explaination
the starter code i got from udacity doesnt have a lot of issues it was just as can be seen in this [repo link](https://github.com/udacity/nd0067-c2-creating-an-api-with-postgresql-and-express-project-starter). after downloading the starter code we need to do the following steps. and we got restirected to the [rubric](https://review.udacity.com/#!/rubrics/3061/view):
- install
```sh
yarn/npm install
npm i --save-dev ts-node
```
- modify scripts to ts-node insteade of node
- modify script single quate to slach and double questes in script 
- modify the database as follows

```sh
# To reach to database
psql -U postgres
# Create the essential database
postgres=# CREATE DATABASE project_db;
CREATE DATABASE
# Create the testing database
postgres=# CREATE DATABASE project_t;  
CREATE DATABASE
# Create the user
postgres=# CREATE USER project_user WITH PASSWORD 'pass';
CREATE ROLE
# add & link and add permission to the user to the database
postgres=# GRANT ALL PRIVILEGES ON DATABASE project_t TO project_user;
GRANT
# add & link and add permission to the user to the testing database
postgres=# GRANT ALL PRIVILEGES ON DATABASE project_db TO project_user; 
GRANT
# all this user to make insertion to the tables
postgres=# GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO project_user;    
GRANT
postgres=#\q
```

- craete .env and adding the following lines to it
```sh
# DATABASE
HOSTING=localhost
PORT=3000
DATABASE_PORT=3306
DATABASE_TEST=project_t
DATABASE_NAME=project_db
DATABASE_USER=project_user
DATABASE_PASSWORD=pass
# Mode
ENV=develope_mode
# JWT
JWT_SECRET_KEY=JWT_SECRET_KEY
# pepper and salt
SALT_ROUNDS_COUNT=10
PEPPER_KEY=peppersecret
```
- create database json for every mode where it is used as configuration file that is used by the db-migrate packages to connect with the database and migrate while .env convey all private info that is used by developer himself intintianally
```sh
{
    "dev": {
      "driver": "pg",
      "user": "project_user",
      "password": "pass",
      "host": "localhost",
      "database": "project_db"
    },
    "test": {
        "driver": "pg",
        "user": "project_user",
        "password": "pass",
        "host": "localhost",
        "database": "project_t"
    }
  }
  ```
- install dotenv
```sh
npm i dotenv
```
- create database file requiring pool from pg and dotenv from dotenv and instaanisaite its configuration for pool from rnv 
- make folders handlers helpers models
- install db-migrate db-migrate-pg
```sh
npm i db-migrate -g
npm i db-migrate-pg
```
- create models for every table as requiremnts using db-migrate create
```sh
db-migrate create users-table --sql-file
db-migrate create products-table --sql-file
db-migrate create orders-table --sql-file
db-migrate create order_products-table --sql-file
```
- create the up and down files in migration for every table as required
- make migration
```sh
db-migrate up
```
- install httpie for testing apis with postman
```sh
npm i httpie --save-dev
```

- from extensions install thunder client for http verbs requests
- made trais in helper make the function contains db.connect and sql and release to reduce repeatation
- i want to modifiy the table to useuuid insread of serial so i make 
i changed the table file to use uuid
```sh
db-migrate reset
db-migrate up 
```
- make function hashingKey in traits to be used widley
- to allow usinhg bcrypt we have to install it first to allaow use of hashsync and comparesync to check it issame hashed key
```sh
npm i bcrypt
npm i --save-dev @types/bcrypt
```
- time to install  jsonwebtoken to generate token tha will be used in api like session to give authentication by sig method first to generate token while verify method is used to validate 
```sh
 npm i jsonwebtoken
 npm i --save-dev @types/jsonwebtoken
 ```
add this installation for format and syntax errro 
```sh
npm i --save-dev prettier
npm i --save-dev eslint
```
and add next script
```sh
 "prettier": "prettier --write src/**/*.{ts,tsx,js,jsx}",
    "lint": "eslint . --ext .ts"
```

- add suppertest to test requests
```sh
npm i --save-dev supertest
npm i --save-dev @types/supertest
```
### Now the enviroment 99% ready for our work next the design itself
the design can be done in one structure of the next two 
- MVC, models, routes, controllers
- models, handelers, 
we selected the second method and there are other common folders just as;
- database contains the configuration and calling pool for connecting database
- helpers that containes traites the functions that we use to reduce repeated peace of code to make our code clean anf efficent
- middlewares folders that contains every middleware where in our project we have the following:
    - authenticate: to check data validation and check its belongancy to our secret JWT 
    - authorizeexists: that makes sure that although it passes the aunticate stage it also confirms that this user is still existes in our database 
    - autherize has rights: that checks that certain id works only on his id
- services: that is simply a modle for non crud process and shered join db apis
- test: have two folders
    - first folder is also called helpers that contains the following
        - reporter: to allow standard reporting method
    - second folder is specs: that contains amaping for all src ts folder and files for every function or every endpoint
- handeler folder containes the api methods for every model where handelers containes the logics for every operation begining from calling the validation to check entry then make some logics and call crud mmodel methods. routes also called for all methods or apis and we add the needed middlewere at this point to esplicial methods or from outer to make the middleware work on widder scope
- models is the api for every table in database
- models we create is explained in requirement.md
- next section explians some of the challanges that we faced  
## Design Considerations Challenges
1. error TS6054: File 'dist/server.js'' has an unsupported extension. The only supported extensions are '.ts', '.tsx', '.d.ts', '.cts', '.d.cts', '.mts', '.d.mts'.
it is solved byt 
```sh
The error was due to the use of single quotes in the npm script "watch": "tsc-watch --onSuccess 'node ./dist/server.js' ", .

Solved the issue by escaping double quotes. Don't know if its an OS thing. Am using VSCode editor on Windows 10.

"watch": "tsc-watch --onSuccess \"node ./dist/server.js\"",

```

2. SyntaxError: Cannot use import statement outside a module
that was as a result of trying to node run up the server.ts not server.js the solution was one of two 
- change the path in the script in package.json to run node on js file on dist folder
### or 
- change the no to ts-node in the script

3. error  Environment(s) 'dev, development' not found.
- solution
edit file database.json develop_mode to be dev
and test_mode to be test

- // console.log(keyToken) to have console work comment expect in it function

## Important Code Snippets
- the idea of collecting the commands that repeated for every model method in crud methods in traites also we collect some spreaded repeated functions in this traites as follows:
```sh
//@ts-ignore
import CLI from "../database"
import bcrypt from "bcrypt"
import { sign } from "jsonwebtoken"
import supertest from "supertest"
import app from "../server"
const req = supertest(app)

const pepper_addational_key = process.env.PEPPER_KEY
const salt_No_rounds = process.env.SALT_ROUNDS_COUNT
export const crud = async (query_statement: string, data: any, errMsg: string) => {
  try {
    //@ts-ignore
    const dbConnIni = await CLI.connect()
    let result
    if (!data || data.length > 0) {
      result = await dbConnIni.query(query_statement, data)
    } else {
      result = await dbConnIni.query(query_statement)
    }
    dbConnIni.release()
    return result.rows
  } catch (e) {
    throw new Error(`${errMsg}, ${e}`)
  }
}
export const hashingKey = (password: string) => {
  return bcrypt.hashSync(password + pepper_addational_key, parseInt(String(salt_No_rounds)))
}
export const isSameKey = (password: string, password_digest: string): boolean => {
  return bcrypt.compareSync(password + pepper_addational_key, password_digest)
}
export const generateToken = (id: number, firstname: string, lastname: string, email: string) => {
  return sign({ user: { id, firstname, lastname, email } }, process.env.JWT_SECRET_KEY as string)
}
export const prepareUser = async () => {
  const res = await req
    .post("/users")
    .set("Content-type", "application/json")
    .send({ firstname: "ufname", lastname: "ulname", password: "pass", email: "testmail@mail.com" })
}
export const getUserToken = async () => {
  const res = await req
    .post("/login")
    .set("Content-type", "application/json")
    .send({ email: "testmail@mail.com", password: "pass" })
  return res.body.token as string
}

```
## Vision for Better Security
- my concerns to have a good security we have to send with every modufication api even for prod or order in the body the userid hashed value of the user id that is hashed in conjunction with secret hashed password of the user so we combine the user id password extracted from saved user info in database using decoded data from the token 
- we get his hashed key and combine with the plain data sent from user get hashed value then compare it with the hashed sent with encoded data that we decode 
using this method prevent using genereated old token for other users
other issue is to use expiration of token after short time
- client side (payload+secret hashed pw
- using role from config to allow action and prevent others with varity unlimited access level where config.role id can take any number and we can prevent or allow certain actions with each role
- and it can also be solved where every table of action should havew user_id 
so before we do any action we can check first the user_id if match the token decoded id
## Udacity Review and Modifications, Acceptance
  - 
## Contact

# [GitHub](https://github.com/mostafaadawy). [FaceBook](https://web.facebook.com/mostafa.adawy.96/). [Mail](mailto:mostafa_adawy@ymail.com). [LinkedIn](https://www.linkedin.com/in/mostafaamsadawy/)