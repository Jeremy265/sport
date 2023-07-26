import {useEffect, useState} from 'react'
import {Grid} from '@mui/material'
import config from '../../config'
import Calendar from "../../ui-component/forms/customfields/Calendar";
import MainCard from "../../ui-component/cards/MainCard";
import {getTrainings, ITraining} from "../../services/trainings.service";
import {filterTrainingsByDate} from "../../utils/trainings.utils";
import {dateToString, extractDistinctDatesString} from "../../utils/date.utils";
import Training from "../training/Training";
import {addObjectToArray, removeObjectOfArray, updateObjectOfArray} from "../../utils/object.utils";
import {useNavigate} from "react-router-dom";
import Loading from "../../ui-component/Loading";
import DetailedPageSkeleton from "../../ui-component/Skeleton/DetailedPageSkeleton";
import {useDispatch} from "react-redux";
import {setMessage} from "../../store/slices/messageSlice";

const Dashboard = () => {
    const [date, setDate] = useState<Date>(new Date())
    const [trainings, setTrainings] = useState<ITraining[]>([])
    const [selectedTrainings, setSelectedTrainings] = useState<ITraining[]>([])
    const [trainingsLoading, setTrainingsLoading] = useState<boolean>(true)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleResumeTraining = (training: ITraining) => {
        localStorage.setItem('current_training', JSON.stringify(training))
        navigate(config.defaultPath + 'training-mode')
    }

    const handleDuplicateTraining = (newTraining: ITraining) => {
        setTrainings(addObjectToArray(newTraining, trainings))
        localStorage.setItem('current_training', JSON.stringify(newTraining))
        navigate(config.defaultPath + 'training-mode')
    }

    const handleUpdateTraining = (trainingToUpdate: ITraining) =>
        setTrainings(updateObjectOfArray(trainingToUpdate, 'training_id', trainings))

    const handleDeleteTraining = (trainingToDelete: ITraining) =>
        setTrainings(removeObjectOfArray(trainingToDelete, 'training_id', trainings))

    useEffect(() => {
        setSelectedTrainings(filterTrainingsByDate(trainings, date))
    }, [trainings, date])

    useEffect(() => {
        getTrainings()
            .then((trainings: ITraining[]) => {
                setTrainings(trainings)
                setSelectedTrainings(filterTrainingsByDate(trainings, date))
            })
            .catch((error: Error) =>
                dispatch(setMessage({text: error.message, severity: 'error'}))
            )
            .finally(() =>
                setTrainingsLoading(false)
            )
    }, [])

    return <Grid container spacing={config.gridSpacing}>
        <Grid item xs={12} sm={4}>
            <MainCard title="My recent trainings">
                <Calendar
                    onChange={
                        (date: Date) =>
                            setDate(date)
                    }
                    datesToHighlight={
                        extractDistinctDatesString(trainings)
                    }/>
            </MainCard>
        </Grid>
        <Grid item xs={12} sm={8}>
            <MainCard
                title={`${selectedTrainings.length} training${selectedTrainings.length > 1 ? 's' : ''} found on ${dateToString(date)}`}>
                <Loading isLoading={trainingsLoading}
                         loadingElement={<DetailedPageSkeleton/>}>
                    {
                        selectedTrainings.map((training: ITraining) =>
                            <Training key={training.training_id}
                                      training={training}
                                      onResumeTraining={handleResumeTraining}
                                      onDuplicateTraining={handleDuplicateTraining}
                                      onUpdateTraining={handleUpdateTraining}
                                      onDeleteTraining={handleDeleteTraining}
                                      loading={trainingsLoading}
                            />
                        )
                    }
                </Loading>
            </MainCard>
        </Grid>
    </Grid>
}

export default Dashboard
