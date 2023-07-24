import {createTraining, deleteTraining, ITraining} from "../../services/trainings.service";
import BarChart from "../../ui-component/charts/BarChart";
import {getChartDataFromSets} from "../../utils/chart.utils";
import {dateToString} from "../../utils/date.utils";
import {createSet, ISet} from "../../services/sets.service";
import MainCard from "../../ui-component/cards/MainCard";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomMenu from "../../ui-component/menu/CustomMenu";
import CustomMenuItem from "../../ui-component/menu/CustomMenuItem";
import Sets from "../set/Sets";
import {updateObjectOfArray} from "../../utils/object.utils";
import Loading from "../../ui-component/Loading";
import {useDispatch} from "react-redux";
import {setMessage} from "../../store/slices/messageSlice";

interface Props {
    training: ITraining
    onDuplicateTraining: (training: ITraining) => void
    onUpdateTraining: (training: ITraining) => void
    onDeleteTraining: (training: ITraining) => void
    loading?: boolean
}

const Training = ({training, onDuplicateTraining, onUpdateTraining, onDeleteTraining, loading}: Props) => {

    const dispatch = useDispatch()

    const handleDuplicateTraining = () => {
        createTraining(
            {
                title: 'My training of ' + dateToString(new Date()),
                date: new Date()
            }
        ).then((newTraining: ITraining) => {
            Promise.all(training.sets.map(async (set: ISet) => {
                    return await createSet({
                        ...set,
                        training_id: newTraining.training_id
                    }).then((newSet: ISet) => {
                        newTraining.sets.push(newSet)
                    }).catch((error: Error) => {
                        dispatch(setMessage({text : `Error duplicating set ${set.set_id} : ${error.message}`, severity: 'error'}))
                    })
                })
            ).then(() => {
                onDuplicateTraining(newTraining)
            }).catch((error: Error) => {
                dispatch(setMessage({text : `An error occured : ${error.message}`, severity: 'error'}))
            })
        }).catch((error: Error) =>
            dispatch(setMessage({text: error.message, severity: 'error'}))
        )
    }

    const handleDeleteTraining = () => {
        deleteTraining(training.training_id)
            .then((training: ITraining) => {
                onDeleteTraining(training)
                dispatch(setMessage({text: 'Training deleted !', severity: 'success'}))
            })
            .catch((error: Error) =>
                dispatch(setMessage({text: error.message, severity: 'error'}))
            )
    }

    const handleUpdateSet = (setToUpdate: ISet) => {
        training.sets = updateObjectOfArray(setToUpdate, 'set_id', training.sets)
        onUpdateTraining(training)
    }

    const handleDeleteSet = (setToDelete: ISet) => {
        training.sets = training.sets.filter((set: ISet) =>
            set.set_id !== setToDelete.set_id
        )
        onUpdateTraining(training)
    }

    const data = getChartDataFromSets(training.sets)

    return <MainCard title={training.title}
                     action={
                         <CustomMenu>
                             <CustomMenuItem text="Duplicate"
                                             icon={<ContentCopyIcon/>}
                                             onClick={handleDuplicateTraining}/>
                             <CustomMenuItem text="Delete"
                                             icon={<DeleteIcon/>}
                                             onClick={handleDeleteTraining}/>
                         </CustomMenu>
                     }
    >
        {
            training.sets.length > 0
                ? <BarChart<number> categories={Object.keys(data)}
                                    data={[{name: 'Somme', data: Object.values(data)}]}
                                    isLoading={loading}/>
                : <></>
        }
        <Sets sets={training.sets}
              onUpdate={handleUpdateSet}
              onDelete={handleDeleteSet}
              loading={loading}
        />
    </MainCard>

}

export default Training