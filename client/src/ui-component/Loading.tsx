import * as React from "react";
import {ReactElement, ReactNode} from "react";
import CardSkeleton from "./Skeleton/CardSkeleton";

interface Props {
    isLoading: boolean
    loadingElement?: ReactElement
    children?: ReactNode
}

const Loading = ({isLoading, loadingElement = <CardSkeleton/>, children}: Props) =>
    <>
        {isLoading
            ? loadingElement
            : children
        }
    </>

export default Loading