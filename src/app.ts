import express from "express";
import { videosController } from "./controllers/videosController";
import { CONFIG } from "./config";
import { testingController } from "./controllers/testingController";

export const app = express();

const baseUrl = '/hometask_01/api';
const videoPathUrl = baseUrl + CONFIG.PATH.VIDEOS;
const testingPathUrl = baseUrl + CONFIG.PATH.TESTING;

app.use(express.json());

app.use(testingPathUrl, testingController);
app.use(videoPathUrl, videosController);