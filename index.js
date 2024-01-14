const express = require("express");
const app = express();
const setHeaders = require("./middleware/headers");
const Router = require("./router/Router");

app.use(express.json());
app.use(setHeaders);
app.use(express.static("public"));

app.use(Router)

const port = 4000
app.listen(port, (err) => { console.log(`App Listen to port ${port}`) })

