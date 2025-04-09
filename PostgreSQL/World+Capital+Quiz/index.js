import express from "express";
import bodyParser from "body-parser";

//step 1 -->  First import the postgres package from -- npm i pg
import pg from "pg";

const app = express();
const port = 3000;

// Step2 --> Add the details to connect the database 
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Day1",
  password: "123456",
  // The default port number for postgres is same it not be changed
  port: 5432,
});

// Step3 --> Connect the database
db.connect();


// Query for fetching the db from the tables
// Here capitals is the name of the table which we hve defined into the db
let quiz = [];
db.query("SELECT * FROM capitals", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    quiz = res.rows;
  }
  db.end();
})

let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];

  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
