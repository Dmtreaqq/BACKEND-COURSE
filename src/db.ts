import { Video } from "./types";

const video = {
    id: 1,
    title: 'Doctor Who',
    author: 'Steven Moffat',
    canBeDownloaded: false,
    minAgeRestriction: 6,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
    availableResolutions: null
}

const videosDB: Video[] = [];

export default videosDB;