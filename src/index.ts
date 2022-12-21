import * as express from "express";
import * as bodyParser from 'body-parser'

require('dotenv').config();

if (!process.env.PORT) {
    process.exit(1);
}

const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${app.get('port')}`);
});