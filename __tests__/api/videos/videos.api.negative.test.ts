import {agent} from 'supertest'
import {app} from '../../../src/app'
import { CONFIG } from "../../../src/config";
import { CreateVideoInputModel } from "../../../src/models/CreateVideoInputModel";
import { HTTP_STATUSES, Video } from "../../../src/types";

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

    it('should return 404 for GET not existing video', async () => {
        await request
            .get(`${baseUrl}${CONFIG.PATH.VIDEOS}/999`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it('should return 404 for DELETE not existing video', async () => {
        await request
            .delete(`${baseUrl}${CONFIG.PATH.VIDEOS}/999`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it('should return 404 for PUT not existing video', async () => {
        await request
            .put(`${baseUrl}${CONFIG.PATH.VIDEOS}/999`)
            .send({ title: 'New Title', author: 'New Author' })
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it('should return 400 for incorrect data while POST video', async () => {
        const response = await request
            .post(baseUrl + CONFIG.PATH.VIDEOS)
            .send({ title: 'Some Title' })
            .expect(HTTP_STATUSES.BAD_REQUEST_400);

        expect(response.body).toEqual({
            errorsMessages: [{
                field: 'author',
                message: 'Field is required',
            }]
        })
    })

    it('should return 400 for incorrect data while PUT video', async () => {
        const createResponse = await request
            .post(baseUrl + CONFIG.PATH.VIDEOS)
            .send(body)

        const { id } = createResponse.body

        const editResponse = await request
            .put(`${baseUrl}${CONFIG.PATH.VIDEOS}/${id}`)
            .send({ title: 'Some Title' })
            .expect(HTTP_STATUSES.BAD_REQUEST_400);

        expect(editResponse.body).toEqual({
            errorsMessages: [{
                field: 'author',
                message: 'Field is required',
            }]
        })
    })
})