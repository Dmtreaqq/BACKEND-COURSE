import { Router, Request, Response } from 'express';
import videosDB from "../db";
import { createVideoValidationSchema } from "../schemas/createVideoValidationSchema";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { RequestWbody, RequestWparams, RequestWparamsAndBody, RequestWquery, Video } from "../types";
import { getVideoValidationSchema } from "../schemas/getVideoValidationSchema";
import { CreateVideoInputModel } from "../models/CreateVideoInputModel";
import { UpdateVideoInputModel } from "../models/UpdateVideoInputModel";
import { updateVideoValidationSchema } from "../schemas/updateVideoValidationSchema";

let counter = 1;

export const videosController = Router();

videosController.get('/', async (req: Request, res: Response) => {
    return res.json(videosDB);
})

videosController.get('/:id', validationMiddleware(getVideoValidationSchema), async (req: RequestWparams<{ id: string }>, res: Response<Video>) => {
    const { id } = req.params;
    const video = videosDB.find(video => video.id === Number(id));

    if (!video) {
        return res.sendStatus(404);
    }

    return res.json(video);
})

videosController.post('/', validationMiddleware(createVideoValidationSchema), async (req: RequestWbody<CreateVideoInputModel>, res: Response<Video>) => {
    const body = req.body;
    const videoInput: Video = {
        id: counter++,
        title: body.title,
        author: body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        availableResolutions: body.availableResolutions ?? null
    }

    videosDB.push(videoInput)

    return res.status(201).json(videoInput);
})

videosController.put('/:id', validationMiddleware(updateVideoValidationSchema), async (req: RequestWparamsAndBody<{ id: string }, UpdateVideoInputModel>, res: Response) => {
    const video = videosDB.find(video => Number(req.params.id) === video.id);
    if (!video) {
        return res.sendStatus(404);
    }

    const updatedVideoFromBody = req.body;
    const newVideo = { ...video, ...updatedVideoFromBody  };

    videosDB.forEach((video, index) => {
        if (video.id === newVideo.id) {
            videosDB[index] = newVideo
        }
    })

    return res.sendStatus(204);
})

videosController.delete('/:id', validationMiddleware(getVideoValidationSchema), async (req: RequestWparams<{ id: string }>, res: Response) => {
    const video = videosDB.find(video => Number(req.params.id) === video.id);
    if (!video) {
        return res.sendStatus(404);
    }

    const foundVideoIndex = videosDB.findIndex(video => video.id === Number(req.params.id));
    videosDB.splice(foundVideoIndex, 1);

    return res.sendStatus(204);
})
