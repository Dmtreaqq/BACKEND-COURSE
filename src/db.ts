import { Video } from "./types";

const videosDB: Video[] = [{
    id: 1,
    title: 'Doctor Who',
    author: 'Steven Moffat',
    canBeDownloaded: false,
    minAgeRestriction: 6,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
    availableResolutions: null
}];

export default videosDB;