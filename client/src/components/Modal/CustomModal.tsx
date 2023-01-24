import {Box, Divider, Fade, Grid, Modal, Stack, Typography} from "@mui/material";
import * as React from "react";
import CustomIconButton from "../Form/CustomIconButton";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Title from "../Title/Title";

interface Props {
    title: string;
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const CustomModal = ({title, open, onClose, children}: Props) => {

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={onClose}
            closeAfterTransition
        >
            <Fade in={open}>
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '10%',
                    left: '50%',
                    transform: 'translate(-50%, -10%)',
                    width: '95%',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >
                        <Title>{title}</Title>
                        <CustomIconButton
                            onClick={onClose}
                            icon={<CloseRoundedIcon/>}
                            toolTip={"Close"}
                        />
                    </Stack>
                    <Divider/>
                    {children}
                </Box>
            </Fade>
        </Modal>
    )
}

export default CustomModal
