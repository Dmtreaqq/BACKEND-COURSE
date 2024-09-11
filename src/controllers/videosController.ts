import { Router, Request, Response } from 'express';
import videosDB from "../db";
import {CreateVideoInputModel} from "../models/CreateVideoInputModel";

export const videosController = Router();

videosController.get('/', async (req: Request, res: Response) => {
    return res.json(videosDB);
})

videosController.post('/', async (req: Request, res: Response) => {
    const { title, author, availableResolutions }: CreateVideoInputModel = req.body;

    if (title === undefined || author === undefined) {
        return res.status(400).json({})
    }

    return res.sendStatus(200);
})