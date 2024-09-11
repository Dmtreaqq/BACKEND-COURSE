import { VideoResolutions } from "../types";

export const createVideoValidationSchema = {
    body: true,
    title: { required: true, type: 'string' },
    author: { required: true, type: 'string' },
    availableResolutions: {
        required: false,
        type: 'array',
        allowedValues: Object.values(VideoResolutions),
        minItems: 1
    },
}