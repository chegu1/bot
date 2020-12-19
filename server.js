const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 3000;


app.use(morgan('dev')); // log every request to the console.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// app routes
require('./routes/webhook_verify')(app);

app.listen(PORT, (err) => {
    if (err) return console.log(`unable to connect the server`)
    console.log(`server connect and running on ${PORT}`)
})