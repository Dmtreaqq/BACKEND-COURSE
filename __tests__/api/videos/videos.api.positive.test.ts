import { agent } from 'supertest'
import { app } from '../../../src/app'
import { CONFIG } from "../../../src/config";
import { CreateVideoInputModel } from "../../../src/models/CreateVideoInputModel";
import { HTTP_STATUSES, Video } from "../../../src/types";
import { UpdateVideoInputModel } from "../../../src/models/UpdateVideoInputModel";

export const request = agent(app)

const baseUrl = '/hometask_01/api';

const body: CreateVideoInputModel = {
    title: 'Doctor Who',
    author: 'Steven Moffat',
    availableResolutions: null
}

const editBody: UpdateVideoInputModel = {
    title: 'Doctor Who 2',
    author: 'Steven Moffattt'
} as any

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

    let createdVideo: Video;

    it('should GET empty array', async () => {
        const response = await request
            .get(baseUrl + CONFIG.PATH.VIDEOS)
            .expect(HTTP_STATUSES.OK_200)

        expect(response.body.length).toBe(0)
    })

    it('should POST video successfully', async () => {
        const response = await request
            .post(baseUrl + CONFIG.PATH.VIDEOS)
            .send(body)
            .expect(HTTP_STATUSES.CREATED_201);

        createdVideo = response.body;

        expect(response.body).toEqual({
            ...body,
            ...responseBody,
            id: expect.any(Number),
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
        })
    })

    it('should GET created video successfully', async () => {
        const response = await request
            .get(`${baseUrl}${CONFIG.PATH.VIDEOS}/${createdVideo.id}`)
            .expect(HTTP_STATUSES.OK_200);

        expect(response.body).toEqual(createdVideo)
    })

    it('should GET videos array including created video', async () => {
        const response = await request
            .get(`${baseUrl}${CONFIG.PATH.VIDEOS}`)
            .expect(HTTP_STATUSES.OK_200);

        expect(response.body).toEqual([createdVideo])
    })

    it('should PUT video successfully', async () => {
        await request
            .put(`${baseUrl}${CONFIG.PATH.VIDEOS}/${createdVideo.id}`)
            .send(editBody)
            .expect(HTTP_STATUSES.NO_CONTENT_204);

        const getResponse = await request
            .get(`${baseUrl}${CONFIG.PATH.VIDEOS}/${createdVideo.id}`)
            .expect(HTTP_STATUSES.OK_200);

        expect(getResponse.body).toEqual({ ...createdVideo, ...editBody })
    })

    it('should DELETE video successfully', async () => {
        await request
            .delete(`${baseUrl}${CONFIG.PATH.VIDEOS}/${createdVideo.id}`)
            .expect(HTTP_STATUSES.NO_CONTENT_204);

        await request
            .get(`${baseUrl}${CONFIG.PATH.VIDEOS}/${createdVideo.id}`)
            .expect(HTTP_STATUSES.NOT_FOUND_404);
    })
})