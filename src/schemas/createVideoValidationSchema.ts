import { VideoResolutions } from "../types";

export const createVideoValidationSchema = {
    body: true,
    title: { required: true, type: 'string', maxLength: 40 },
    author: { required: true, type: 'string', maxLength: 20 },
    availableResolutions: {
        required: false,
        type: 'array',
        allowedValues: Object.values(VideoResolutions),
        minItems: 1
    },
}