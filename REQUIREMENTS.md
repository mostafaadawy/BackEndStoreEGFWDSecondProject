# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints
 There are json files exported from ***`thunder client`*** that can be used for testing the endpoints there are collection for every group of ***`apis users, products, orders, and services`***  
### Root
| Endpoint | Usage | Http Verb | Token | req.body | req.params |
| -------- | ------|-----------| ----- | -------- | ---------- |
|     /    | Roote-Home | GET |  X  | X  | X |

### Users:
| Endpoint | Usage | Http Verb | Token | req.body | req.params |
| -------- | ------|-----------| ----- | -------- | ---------- |
| /users | create new user | POST |  X  | {firstname, lastname, password, email}  | X |
| /login | authenticate-get token | POST |  X  | { password, email}  | X |
| /users | update users' info | PUT |  ✔  | {id, firstname, lastname, password, email}  | X |
| /users | Get all Users | GET |  ✔  | X | X |
| /users/:id | Get certain user info | GET |  ✔  | X | {id} |
| /users | Delete certain user info | DELETE |  ✔  | {id} | X |

### Products:
| Endpoint | Usage | Http Verb | Token | req.body | req.params |
| -------- | ------|-----------| ----- | -------- | ---------- |
| /products | create new product | POST |  ✔  | {productname, price, category}  | X |
| /products | update products' info | PUT |  ✔  | {id, productname, price, category}  | X |
| /products | Get all products | GET |  ✔  | X | X |
| /products/:id | Get certain product info | GET |  ✔  | X | {id} |
| /products | Delete certain product info | DELETE |  ✔  | {id} | X |

### Orders:
| Endpoint | Usage | Http Verb | Token | req.body | req.params |
| -------- | ------|-----------| ----- | -------- | ---------- |
| /orders | create new order | POST |  ✔  | {order_status, user_id}  | X |
| /orders | update orders' info | PUT |  ✔  | {id, order_status, user_id}  | X |
| /orders | Get all orders | GET |  ✔  | X | X |
| /orders/:id | Get certain order info | GET |  ✔  | X | {id} |
| /orders | Delete certain order info | DELETE |  ✔  | {id} | X |
| /orders/:id/products | Delete certain order info | POST |  ✔  | {product_id, quantity} | {order_id} |

### Services:

| Endpoint | Usage | Http Verb | Token | req.body | req.params |
| -------- | ------|-----------| ----- | -------- | ---------- |
| /products/category | get products filtered by its category | POST |  ✔  | {category}  | X |
| /orders/active | get orders filtered by its order_status to be active | POST |  ✔  | {user_id} | X |
| /orders/completed | get orders filtered by its order_status to be completed | POST |  ✔  | {user_id} | X |
| /products/top | get the top 5 products | GET |  ✔  | X |  X |

### JWT Token can be obtained creating new user then using his credintial email and password to get the token.

## Database Schema
### User

| Field               | Type             |  Attributes |
| ------------------- | ---------------- | ------------------ |
| id              | SERIAL    | PRIMARY KEY |     |
| firstname       | VARCHAR(100) |  -----------|
| lastname        | VARCHAR(100) |  -----------|
| hashedPassword  | VARCHAR      |  -----------|
| email           | VARCHAR(100) |  -----------|

#### Product
| Field               | Type             |  Attributes |
| ------------------- | ---------------- | ------------------ |
| id              | SERIAL    | PRIMARY KEY |     |
| productname | VARCHAR(100) |  -----------|
| price      | INTEGER      |  -----------|
| category   | VARCHAR(100) |  -----------|

#### Orders
| Field               | Type             |  Attributes |
| ------------------- | ---------------- | ------------------ |
| id              | SERIAL    | PRIMARY KEY |     |
| order_status | VARCHAR(100) |  -----------|
| user_id      | BIGINT NOT NULL |  FOREIGN KEY|
| category   | VARCHAR(100) |  -----------|

#### Orders_Products
| Field               | Type             |  Attributes |
| ------------------- | ---------------- | ------------------ |
| id              | SERIAL    | PRIMARY KEY |     |
| quantity | INTEGER |  -----------|
| order_id      | BIGINT NOT NULL |  FOREIGN KEY|
| product_id   | BIGINT NOT NULL |  FOREIGN KEY|



















