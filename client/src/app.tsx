import {createTheme, ThemeProvider} from '@mui/material/styles'
import {CssBaseline, StyledEngineProvider} from '@mui/material'
import Router from './routes/router'
import NavigationScroll from './layout/NavigationScroll'
import colors from "./assets/scss/_themes-vars.module.scss";
import themePalette from "./themes/palette";
import themeTypography from "./themes/typography";
import componentStyleOverrides from "./themes/compStyleOverride";
import {useDispatch} from "react-redux";
import {signInUserFromLocalStorage} from "./store/slices/userSlice";

const App = () => {
    const color = colors

    const themeOption = {
        colors: color,
        heading: color.grey900,
        paper: color.paper,
        backgroundDefault: color.paper,
        background: color.primaryLight,
        darkTextPrimary: color.grey700,
        darkTextSecondary: color.grey500,
        textDark: color.grey900,
        menuSelected: color.secondaryDark,
        menuSelectedBack: color.secondaryLight,
        divider: color.grey200,
    }

    const themeOptions: any = {
        direction: 'ltr',
        palette: themePalette(themeOption),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        typography: themeTypography(themeOption)
    }

    const theme = {
        ...createTheme(themeOptions),
        components: componentStyleOverrides(themeOption)
    }

    const dispatch = useDispatch()
    dispatch(signInUserFromLocalStorage())

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <NavigationScroll>
                    <Router/>
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    )
}

export default App
