import express from "express";
import { videosController } from "./controllers/videosController";
import { CONFIG } from "./config";

export const app = express();

const baseUrl = '/hometask_01/api';
const videoPathUrl = baseUrl + CONFIG.PATH.VIDEOS

app.use(express.json());

app.use(videoPathUrl, videosController);