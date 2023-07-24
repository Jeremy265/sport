import {IBodyComposition} from "../../services/bodyCompositions.service"
import {Grid} from "@mui/material";
import {groupBodyCompositionsByCategory, IBodyCompositionsByCategory} from "../../utils/body.utils";
import MainCard from "../../ui-component/cards/MainCard";
import BodyCompositionCategory from "./BodyCompositionCategory";
import {sortObject} from "../../utils/object.utils";
import config from "../../config"

interface Props {
    bodyCompositions: IBodyComposition[]
    onUpdate: (bodyComposition: IBodyComposition) => void
    onDelete: (bodyComposition: IBodyComposition) => void
}

const BodyCompositionCategories = ({bodyCompositions, onUpdate, onDelete}: Props) => {
    return <Grid container spacing={config.gridSpacing}>
        {
            sortObject({array: groupBodyCompositionsByCategory(bodyCompositions), key: 'category', dataType: 'string'}).map((bodyCompositionsByCategory: IBodyCompositionsByCategory) =>
                <Grid key={bodyCompositionsByCategory.category} item xs={12} sm={6}>
                    <MainCard
                        title={bodyCompositionsByCategory.category}
                    >
                        <BodyCompositionCategory
                            bodyCompositions={bodyCompositionsByCategory.bodyCompositions}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        />
                    </MainCard>
                </Grid>
            )
        }

    </Grid>
}

export default BodyCompositionCategories
