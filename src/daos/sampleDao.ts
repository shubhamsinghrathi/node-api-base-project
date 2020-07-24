import { SampleModel, ISample } from '../models';

export interface ISampleDao {
    addSample(name: string): Promise<void>;
    getSample(name: string): Promise<ISample>;
}

export class SampleDao implements ISampleDao {
    public async addSample(name: string): Promise<void> {
        await SampleModel.create({ name });
    }

    public async getSample(name: string): Promise<ISample> {
        return await SampleModel.findOne({ name });
    }
}