import { Router, Request, Response } from 'express';
import { Video } from "../types";

export const videosController = Router();

const videosDB: Video[] = [{
    id: 1,
    title: 'Doctor Who',
    author: 'Steven Moffat',
    canBeDownloaded: false,
    minAgeRestriction: 6,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
    availableResolutions: null
}];

videosController.get('/', async (req: Request, res: Response): Promise<Video[]> => {
    return videosDB;
})