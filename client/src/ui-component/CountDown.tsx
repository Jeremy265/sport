import * as React from 'react'
import {useEffect, useState} from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import {Fab, Grid, Paper, Tooltip} from "@mui/material"
import StopRoundedIcon from '@mui/icons-material/StopRounded'
import PauseRoundedIcon from '@mui/icons-material/PauseRounded'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import MainCard from "./cards/MainCard";

const Countdown = () => {
    const [duration, setDuration] = useState<number>(60)
    const [progress, setProgress] = useState<number>(0)
    const [isRunning, setIsRunning] = useState<boolean>(false)

    const onStart = (duration: number) => {
        setDuration(duration)
        setProgress(0)
        setIsRunning(true)
    }

    const onStop = () => {
        setIsRunning(false)
        setProgress(0)
    }

    let countdownInterval: NodeJS.Timeout

    useEffect(() => {
        if (isRunning) {
            countdownInterval = setInterval(() => {
                setProgress((prevProgress) => {
                    if (Number(prevProgress) >= Number(duration)) {
                        onStop()
                        return
                    }
                    return prevProgress + 1
                })
            }, 1000)
        }
        return () => {
            clearInterval(countdownInterval)
        }
    }, [duration, isRunning])

    return <Grid container spacing={1}>
        <Grid item xs={12} sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            {[5, 30, 45, 60, 90].map((duration: number) =>
                <Tooltip key={duration}
                         title={`Count down from ${duration}`}
                >
                    <Fab size="small"
                         color="primary"
                         aria-label="add"
                         sx={{margin: 0.5}}
                         onClick={() => onStart(duration)}>
                        {duration}
                    </Fab>
                </Tooltip>
            )}
            <Tooltip title="Stop and reset">
                <Fab size="small"
                     color="primary"
                     aria-label="Stop coutdown"
                     sx={{margin: 0.5}}
                     onClick={onStop}>
                    <StopRoundedIcon/>
                </Fab>
            </Tooltip>
            <Tooltip title={isRunning ? "Pause" : "Play"}>
                <Fab size="small"
                     color="primary"
                     aria-label="Pause coutdown"
                     sx={{margin: 0.5}}
                     onClick={() => {
                         setIsRunning(!isRunning)
                     }}>
                    {isRunning ? <PauseRoundedIcon/> : <PlayArrowRoundedIcon/>}
                </Fab>
            </Tooltip>
        </Grid>
        {(isRunning || progress > 0) &&
            <Grid item xs={12} sx={{textAlign: 'center'}}>
                <Box sx={{position: 'relative', display: 'inline-flex'}}>
                    <CircularProgress variant="determinate" value={100 * (1 - Number((progress / duration)))}/>
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            variant="caption"
                            component="div"
                            color="text.secondary"
                        >{(duration - progress)}s</Typography>
                    </Box>
                </Box>
            </Grid>
        }
    </Grid>
}

export default Countdown