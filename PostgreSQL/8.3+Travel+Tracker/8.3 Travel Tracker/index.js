import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Day1",
  password: "123456",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisisted(params) {
  const result = await db.query("SELECT country_code FROM visited_countries");
  // Define the countries array
  let countries = [];

  // push all the values into the array

  // yaha pai result mai pahele sara data aa gya
  // phir result se sara data hum foreach loop se de rahe h countries array mai
  // here (country) acts as a =i iterator;
  // country_code mai data hai
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  // It shows the o/p for the data (rows -- shows the data into our database)
  // console.log(result.rows);

  return countries;
}

// Creating the API so that it can send the manually added database to Give the colour on the MAP
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  res.render("index.ejs", { countries: countries, total: countries.length });

  // Here  db.end() is not used because it ends the server
  // db.end();
});

app.post("/add", async (req, res) => {
  // here the user gives the input in the text field name="country"
  const input = req.body["country"];

  try {
    // here it checks that the country exits in our DB or not
    const result = await db.query(
        // '%' can easily search the name related to that country 
        // for example -- "Tanzania Union of Republic is a country name in our DB , Now when we search only
        // for Tanzania is got searches it uses as  '%Tanzania%' the word before and after got ignored 

        // And if user can write the country name in lower case also
      "SELECT country_code FROM countries where LOWER(country_name) LIKE '%' ||  $1 || '%;'",
      [input.toLowerCase()]
    );
    const data = result.rows[0];
    const countryCode = data.country_code;

    // This try block is for if the country is already present in it
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
    } catch (err) {
      console.log(err);
      const countries = await checkVisisted();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again",
      });
    }
  } catch (err) {
    console.log(err);
    const countries = await checkVisisted();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
