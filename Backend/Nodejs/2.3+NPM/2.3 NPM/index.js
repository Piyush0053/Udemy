// var generateName = require('sillyname');

// import function is used in the ECMAScript(EJS)
// import generateName from "sillyname";
// var sillyName = generateName();

// console.log(`My name is ${sillyName}`);


// Now use the superHero package to generate the randon superhero name
import {randomSuperhero} from 'superheroes';

const name= randomSuperhero();

console.log(`I am  ${name}`);
