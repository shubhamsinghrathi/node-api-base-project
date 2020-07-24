import { ISampleController, SampleController } from "./controllers/sampleController";
import { ISampleService, SampleService } from "./services/sampleService";
import { ISampleDao, SampleDao } from "./daos/sampleDao";
import { Router } from "express";
import { ICommonRespose, sendResponse, errorHandler } from "./common/responseHandler";

class MyRoutes {
    private router: Router = Router();
    private sampleController: ISampleController;

    constructor() {
        this.initSampleController();
        this.setRoutes();
    }

    private initSampleController() {
        const sampleDao: ISampleDao = new SampleDao();
        const sampleService: ISampleService = new SampleService(sampleDao);
        this.sampleController = new SampleController(sampleService);
    }

    private setRoutes() {
        this.router.post(
            "/sample",
            async (req, res) => {
                try {
                    const { name } = req.body;
                    const data: ICommonRespose = await this.sampleController.addSample(name);
                    return sendResponse(res, data);
                } catch(err) {
                    return errorHandler(res, err);
                }
            }
        );

        this.router.get(
            "/sample",
            async (req, res) => {
                try {
                    const { name } = req.query;
                    const data: ICommonRespose = await this.sampleController.getSample(name as string);
                    return sendResponse(res, data);
                } catch(err) {
                    return errorHandler(res, err);
                }
            }
        );
    }

    public getRouter() {
        return this.router;
    }
}

export const myRoutes: Router = (new MyRoutes()).getRouter();