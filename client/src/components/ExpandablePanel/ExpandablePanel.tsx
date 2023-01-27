import * as React from "react"
import {ReactElement} from "react"
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

interface Props {
    title: string | ReactElement
    children?: ReactElement
}

const ExpandablePanel = ({title, children}: Props) => {
    return <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
        >
            {title}
        </AccordionSummary>
        <AccordionDetails>
            {children}
        </AccordionDetails>
    </Accordion>
}

export default ExpandablePanel