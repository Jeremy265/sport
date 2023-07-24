import logo from '../assets/images/sport.png'
import {Stack, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const Logo = () => {

    const theme: any = useTheme()

    return (
        <Stack direction="row"
               width="100%"
               height="100%"
               spacing={1}
               alignItems="center"
               justifyContent="center"
        >
            <Typography
                color={theme.palette.secondary.main}
                variant={'h4'}
            >Les Sportifs !</Typography>
            <img src={logo} alt='Logo' loading="lazy" style={{height: '34px', width: 'auto'}}/>
        </Stack>
    )
}

export default Logo
