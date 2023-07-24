import {useTheme} from '@mui/material/styles'
import {Card, CardContent, CardHeader, Divider, IconButton, Typography} from '@mui/material'
import {ReactNode} from "react";

interface Props {
    title?: string
    shadow?: boolean
    children?: ReactNode
    action?: ReactNode
}

const MainCard = ({
                      title,
                      shadow,
                      children,
                      action,
                  }: Props) => {

    const theme: any = useTheme()

    return (
        <Card
            sx={{
                boxShadow: shadow ? theme.shadows[16] : 'inherit',
                p: 2
            }}
        >
            <CardHeader
                title={<Typography variant="h3">{title}</Typography>}
                action={action}
                sx={{p: 0, mb: 1}}
            />
            <Divider/>
            <CardContent sx={{p: 0.5}}>
                {children}
            </CardContent>
        </Card>
    )
}

export default MainCard
