import express, { Request, Response }  from "express";
import {videosController} from "./controllers/videosController";

export const app = express();

const baseUrl = '/hometask_01/api'

app.use(express.json());

app.use(`${baseUrl}/videos`, videosController);