import { ISampleEntity, SampleEntity } from "../entities/sampleEntity";
import { ISampleDao } from "../daos/sampleDao";
import { ISample } from "../models";

export interface ISampleService {
    addSample(name: string): Promise<void>;
    getSample(name: string): Promise<ISampleEntity>;
}

export class SampleService implements ISampleService {
    private sampleDao: ISampleDao;

    constructor(sampleDao: ISampleDao) {
        this.sampleDao = sampleDao;
    }

    public async addSample(name: string): Promise<void> {
        await this.sampleDao.addSample(name);
    }

    public async getSample(name: string): Promise<ISampleEntity> {
        const sample: ISample =  await this.sampleDao.getSample(name);
        if (!sample) return null;
        const sampleEntity: ISampleEntity = new SampleEntity(sample.name, sample._id);
        return sampleEntity;
    }
}