import * as React from "react";
import {getTimeLineChartDataFromBodyCompositions} from "../../utils/chart.utils";
import Evolution from "./Evolution";
import {getBodyCompositions} from "../../services/bodyCompositions.service";

const BodyEvolution = () =>
    <Evolution getData={getBodyCompositions}
               getTimeLineChartData={getTimeLineChartDataFromBodyCompositions}/>

export default BodyEvolution