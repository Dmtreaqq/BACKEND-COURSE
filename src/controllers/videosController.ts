import { Router, Request, Response } from 'express';
import videosDB from "../db";
import { createVideoValidationSchema } from "../schemas/createVideoValidationSchema";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { Video } from "../types";
import { getVideoValidationSchema } from "../schemas/getVideoValidationSchema";

let counter = 1;

export const videosController = Router();

videosController.get('/', async (req: Request, res: Response) => {
    return res.json(videosDB);
})

videosController.get('/:id', validationMiddleware(getVideoValidationSchema), async (req: Request, res: Response) => {
    const { id } = req.params;

    const video = videosDB.find(video => video.id === Number(id));

    if (!video) {
        return res.sendStatus(404);
    }

    return res.json(video);
})

videosController.post('/', validationMiddleware(createVideoValidationSchema), async (req: Request, res: Response) => {
    const body = req.body;

    const videoInput: Video = {
        id: counter++,
        title: String(body.title),
        author: String(body.author),
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        availableResolutions: body.availableResolutions ?? null
    }

    videosDB.push(videoInput)

    return res.status(201).json(videoInput);
})