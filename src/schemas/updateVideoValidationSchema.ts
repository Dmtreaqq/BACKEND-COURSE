import { VideoResolutions } from "../types";

export const updateVideoValidationSchema = {
    body: true,
    title: { required: true, type: 'string', maxLength: 40 },
    author: { required: true, type: 'string', maxLength: 20 },
    availableResolutions: {
        required: false,
        type: 'array',
        allowedValues: Object.values(VideoResolutions),
        minItems: 1
    },
    canBeDownloaded: { required: false, type: 'boolean' },
    minAgeRestriction: { required: false, type: 'number', min: 1, max: 18 },
    publicationDate: { required: false, type: 'string' },
}