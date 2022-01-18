CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR UNIQUE,
    hashedPassword VARCHAR NOT NULL
);