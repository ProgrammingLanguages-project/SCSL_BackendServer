const express = require('express');
const cors = require('cors');
const printRequestType = require('./middlewares/requestType');
const translateRouter = require('./routes/translate');


const app = express();


app.use(printRequestType);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', translateRouter);

app.listen(3000, () => console.log('Example app is listening on port 3000.'));