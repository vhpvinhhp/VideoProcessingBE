import * as express from "express";
import * as bodyParser from 'body-parser';
import apiRouter from '../routers/api.router';
import Locals from './locals';

class ExpressProvider {
    constructor(
        private app = express.application
    ) {
        this.app = express()
    }
    public main() {
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        
        this.app.use('/storages', express.static('storages'))
        this.app.use('/api', apiRouter);
        this.app.set('port', Locals.config().PORT || 3000);

        this.app.listen(this.app.get('port'), () => {
            console.log(`Express running → PORT ${this.app.get('port')}`);
        });
    }
}

export default new ExpressProvider();