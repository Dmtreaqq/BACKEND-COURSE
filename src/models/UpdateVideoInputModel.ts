import { VideoResolutions } from "../types";

export type UpdateVideoInputModel = {
    title: string;
    author: string;
    availableResolutions: VideoResolutions | null;
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    publicationDate: string;
}