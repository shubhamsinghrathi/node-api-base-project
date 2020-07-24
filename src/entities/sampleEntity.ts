import { ObjectID } from "bson";

export interface ISampleEntity {
    getId(): ObjectID;
    getName(): string;
}

export class SampleEntity implements ISampleEntity {
    private id: ObjectID;
    private name: string;

    constructor(name: string, id: ObjectID = null) {
        this.name = name;
        this.id = id;
    }

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }
}