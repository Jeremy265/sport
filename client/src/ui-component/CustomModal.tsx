import {Backdrop, Box, Divider, Fade, Modal, Stack, Tooltip, Typography} from "@mui/material"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import IconButton from "@mui/material/IconButton";
import {ReactNode} from "react";
import {useTheme} from "@mui/material/styles";

interface Props {
    title: string
    open: boolean
    onClose: () => void
    children?: ReactNode
}

const CustomModal = ({title, open, onClose, children}: Props) => {

    const theme: any = useTheme()

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
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
                        <Typography color={theme.palette.secondary.main} variant="h3">{title}</Typography>
                        <Tooltip title="Close">
                            <IconButton
                                edge="end"
                                onClick={onClose}
                            >
                                <CloseRoundedIcon/>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    <Divider/>
                    {children}
                </Box>
            </Fade>
        </Modal>
    )
}

export default CustomModal
