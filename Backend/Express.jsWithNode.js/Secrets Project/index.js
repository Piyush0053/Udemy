import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { dirname } from "path";
import { fileURLToPath } from "url";

// To get the path of the file used in app.get/post function
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
app.use(morgan('tiny'));

// To check that password is valid or not
var checkfortruepassord = false;

app.use(bodyParser.urlencoded({ extended: false }));

function secrets(req, res, next) {
    // take input password from user
    const password = req.body["password"];
    //   check for condition
    if (password === "ILoveProgramming") {
        checkfortruepassord = true;
    }
    next();
}
app.use(secrets);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res, next) => {
    if (checkfortruepassord) {
        res.sendFile(__dirname + "/public/secret.html");
    }
    else {
        res.sendFile(__dirname + "/public/index.html");
    }
});
app.listen(port, () => {
    console.log(`The Listeninig port is ${port}`);
})
