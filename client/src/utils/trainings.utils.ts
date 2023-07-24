import {ITraining} from "../services/trainings.service";
import {isSameDay} from "./date.utils";
import {ISet} from "../services/sets.service";

export const filterTrainingsByDate = (trainings: ITraining[], date: Date): ITraining[] =>
    trainings.filter((training: ITraining) =>
        isSameDay(training.date, date)
    )

export const extractSetsFromTrainings = (trainings: ITraining[]) =>
    trainings.map((training: ITraining) =>
        training.sets
    ).reduce((acc: ISet[], sets: ISet[]) =>
        [...acc, ...sets], []
    )
