import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
    PORT: process.env.PORT || 3006,
    PATH: {
        VIDEOS: '/videos',
        TESTING: '/testing',
    }
}