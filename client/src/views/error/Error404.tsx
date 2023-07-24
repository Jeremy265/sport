import image from '../../assets/images/error-404.png'
import {Box, Button, Container, Typography} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link} from "react-router-dom";

const Error404 = () => (
    <>
        <Box
            component="main"
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                minHeight: '100%'
            }}
        >
            <Container maxWidth="md">
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Box
                        sx={{
                            mb: 3,
                            textAlign: 'center'
                        }}
                    >
                        <img
                            alt="Under development"
                            src={image}
                            style={{
                                display: 'inline-block',
                                maxWidth: '100%',
                                width: 400
                            }}
                        />
                    </Box>
                    <Typography
                        align="center"
                        sx={{mb: 3}}
                        variant="h3"
                    >
                        404: The page you are looking for isn’t here
                    </Typography>
                    <Typography
                        align="center"
                        color="text.secondary"
                        variant="body1"
                    >
                        You either tried some shady route or you came here by mistake.
                        Whichever it is, try using the navigation
                    </Typography>
                    <Link to={'/'} style={{textDecoration: "none"}}>
                        <Button
                            startIcon={(
                                <ArrowBackIcon/>
                            )}
                            sx={{mt: 3}}
                            variant="contained"
                        >
                            Go back to dashboard
                        </Button>
                    </Link>
                </Box>
            </Container>
        </Box>
    </>
);

export default Error404;