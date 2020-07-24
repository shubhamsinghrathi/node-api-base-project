import { Response } from 'express';

export interface ICommonRespose {
    failed: boolean;
    statusCode: number;
    main: any;
}

export const sendResponse = (res: Response , input: ICommonRespose): void => {
    res.status(input.statusCode);
    res.json(input.main);
}

export const errorHandler = (res: Response, err: Error): void => {
    res.status(500)
    res.json(err.message || "Some error occurred");
}