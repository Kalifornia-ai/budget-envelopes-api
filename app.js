const express = require('express');
const app = express();
const envelopeRouter = require('../personalBudget/envelopes')
const bodyParser = require('body-parser')
const morgan = require('morgan');



const PORT = 3000;


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/envelopes', envelopeRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });


app.get("/", (req, res, next)=>{
    res.send('Hello World')
})
