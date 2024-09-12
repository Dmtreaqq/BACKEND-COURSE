import {agent} from 'supertest'
import {app} from '../src/app'
import { CONFIG } from "../src/config";
import { CreateVideoInputModel } from "../src/models/CreateVideoInputModel";
import { Video } from "../src/types";

export const request = agent(app)

const baseUrl = '/hometask_01/api';

const body: CreateVideoInputModel = {
    title: 'Doctor Who',
    author: 'Steven Moffat',
    availableResolutions: null
}

const responseBody: Video = {
    id: 1,
    title: 'Doctor Who',
    author: 'Steven Moffat',
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
    availableResolutions: null
}

describe('/videos', () => {
    beforeAll(async () => {
        await request.delete(`${baseUrl}/${CONFIG.PATH.TESTING}/all-data`);
    })

    it('should get empty array', async () => {
        const res = await request
            .get(baseUrl + CONFIG.PATH.VIDEOS)
            .expect(200)

        console.log(res.body)

        expect(res.body.length).toBe(0)
    })

    it('should create video successfully', async () => {
        const response = await request
            .post(baseUrl + CONFIG.PATH.VIDEOS)
            .send(body)
            .expect(201);

        expect(response.body).toEqual({
            ...body,
            ...responseBody,
            id: expect.any(Number),
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
        })
    })
})