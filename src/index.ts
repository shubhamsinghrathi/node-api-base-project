import * as mongoose from 'mongoose';
import * as express from 'express';
import { Express } from 'express';
import * as bodyParser from 'body-parser';
import { Constants } from './common/Constants';
import { myRoutes } from './routes';

class App {
    private app: Express;

    constructor() {
        this.app = express();
        this.init();
    }

    private init() {
        this.connectDatabase();
        this.setBodyParser();
        this.setRouter();
    }

    private connectDatabase() {
        mongoose.connect(Constants.databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(err => {
            console.log("Error while connecting to DB: ", err.message);
            process.exit();
        });
    }

    private setBodyParser() {
        // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: false }))
        // parse application/json
        this.app.use(bodyParser.json());
    }

    private setRouter() {
        this.app.use(myRoutes);
    }

    public run() {
        this.app.listen(Constants.port, () => {
            console.log(`server is listening in port ${Constants.port}`);
        });
    }
}

new App().run();