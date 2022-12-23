import * as React from 'react';
import {useEffect, useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Title from "../Title/Title";
import {Fab, Grid, Paper} from "@mui/material";
import StopRoundedIcon from '@mui/icons-material/StopRounded';
const Chronometer = () => {
    const [duration, setDuration] = useState<number>(60);
    const [progress, setProgress] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false)

    const onStart = (duration: number) => {
        setDuration(duration)
        setIsRunning(true)
    }

    const onStop = () => {
        setIsRunning(false)
        setProgress(0)
    }

    let chronometerInterval: NodeJS.Timeout;

    useEffect(() => {
        if (isRunning) {
            chronometerInterval = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= duration) {
                        setIsRunning(false)
                        return 0
                    }
                    return prevProgress + 1
                });
            }, 1000);
        }
        return () => {
            clearInterval(chronometerInterval);
        };
    }, [duration, isRunning]);

    return (
        <Paper sx={{p: 2}}>
            <Title>Countdown</Title>
            <Grid container spacing={1}>
                <Grid item xs={12} sx={{display: 'flex', flexWrap: 'wrap', justifyContent:'space-evenly'}}>
                    {[30, 45, 60, 90].map((duration: number) =>
                        <Fab key={duration}
                             size="small"
                             color="primary"
                             aria-label="add"
                             onClick={() => onStart(duration)}>
                            {duration}
                        </Fab>
                    )}
                    <Fab size="small"
                         color="primary"
                         aria-label="Stop coutdown"
                         onClick={onStop}>
                        <StopRoundedIcon />
                    </Fab>
                </Grid>
                {isRunning &&
                    <Grid item xs={12} sx={{textAlign: 'center'}}>
                        <Box sx={{position: 'relative', display: 'inline-flex'}}>
                            <CircularProgress variant="determinate" value={100 * (1 - (progress / duration))}/>
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
                                >{Math.round(duration - progress)}s</Typography>
                            </Box>
                        </Box>
                    </Grid>
                }
            </Grid>
        </Paper>
    );
}

export default Chronometer