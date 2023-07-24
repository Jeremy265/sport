import * as React from "react";
import {getTimeLineChartDataFromTrainings} from "../../utils/chart.utils";
import {getTrainings} from "../../services/trainings.service";
import Evolution from "./Evolution";

const TrainingEvolution = () =>
    <Evolution getData={getTrainings}
               getTimeLineChartData={getTimeLineChartDataFromTrainings}/>

export default TrainingEvolution