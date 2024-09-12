import { Router, Request, Response } from "express";
import videosDB from "../db";

export const testingController = Router();

testingController.delete("/all-data", async (req: Request, res: Response) => {
    videosDB.splice(0);

    return res.sendStatus(204);
})
