const { faker } = require('@faker-js/faker');

const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test'
});

let getRandomUser=()=>{
    return{
        id:faker.datatype.uuid(),
        username:faker.internet.username(),
        email:faker.internet.email(),
        password:faker.internet.password(),
    };
};


console.log(getRandomUser());