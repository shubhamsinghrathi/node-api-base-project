import { ISampleEntity } from "../entities/sampleEntity";
import { ISampleService } from "../services/sampleService";
import { ICommonRespose } from "../common/responseHandler";

export interface ISampleController {
    addSample(name: string): Promise<ICommonRespose>;
    getSample(name: string): Promise<ICommonRespose>;
}

export class SampleController implements ISampleController {
    private sampleService: ISampleService;

    constructor(sampleService: ISampleService) {
        this.sampleService = sampleService;
    }

    public async addSample(name: string): Promise<ICommonRespose> {
        await this.sampleService.addSample(name);
        return {
            failed: false,
            statusCode: 201,
            main: {
                message: "success"
            }
        };
    }

    public async getSample(name: string): Promise<any> {
        const sampleEntity: ISampleEntity = await this.sampleService.getSample(name);
        if (!sampleEntity) {
            return {
                failed: true,
                statusCode: 404,
                main: {
                    message: "invalid name"
                }
            }
        }
        return {
            failed: false,
            statusCode: 200,
            main: {
                message: "success",
                data: {
                    _id: sampleEntity.getId(),
                    name: sampleEntity.getName()
                }
            }
        }
    }
}