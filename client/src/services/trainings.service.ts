import axios, {AxiosPromise} from "axios";

export const API_URL = "/api/trainings";

export interface CreateTraining {
    title: string;
    date: Date;
}

export const createTraining = (training: CreateTraining) =>
    axios.post(API_URL + "/", training);
