import { Request } from 'express'

export type ApiErrorResult = {
    errorsMessages: FieldError[]
}

export enum HTTP_STATUSES {
    OK_200 = 200,
    CREATED_201 = 201,
    NO_CONTENT_204 = 204,
    BAD_REQUEST_400 = 400,
    NOT_AUTHORIZED_401 = 401,
    FORBIDDEN_403 = 403,
    NOT_FOUND_404 = 404,
}

export type FieldError = {
    message: string;
    field: string;
}

export type RequestWbody<T> = Request<{}, {}, T>
export type RequestWquery<T> = Request<{}, {}, {}, T>
export type RequestWparams<T> = Request<T>
export type RequestWparamsAndBody<T, L> = Request<T, {}, L>

export type Video = {
    id: number;
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    createdAt: string;
    publicationDate: string;
    availableResolutions: VideoResolutions | null;
}

export enum VideoResolutions {
    P144 = 'P144',
    P240 = 'P240',
    P360 = 'P360',
    P480 = 'P480',
    P720 = 'P720',
    P1080 = 'P1080',
    P1440 = 'P1440',
    P2160 = 'P2160',
}