import * as React from 'react';
import {lazy, useEffect} from 'react';
import {useRoutes} from 'react-router-dom';
import MainLayout from '../layout/MainLayout/MainLayout';
import Loadable from '../ui-component/Loadable';
import {useDispatch} from "react-redux";
import {setCurrent} from "../store/slices/menuSlice";

const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const TrainingMode = Loadable(lazy(() => import('../views/training/TrainingMode')));
const Body = Loadable(lazy(() => import('../views/body/Body')));
const TrainingEvolution = Loadable(lazy(() => import('../views/evolution/TrainingEvolution')));
const BodyEvolution = Loadable(lazy(() => import('../views/evolution/BodyEvolution')));
const SignIn = Loadable(lazy(() => import('../views/authentication/SignIn')));
const SignUp = Loadable(lazy(() => import('../views/authentication/SignUp')));
const Error404 = Loadable(lazy(() => import('../views/error/Error404')));

export default function ThemeRoutes() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCurrent(location.pathname))
    }, [location.pathname]);

    return useRoutes([
        {
            path: '/',
            element: <MainLayout/>,
            children: [
                {
                    path: '',
                    element: <Dashboard/>
                },
                {
                    path: 'training-mode',
                    element: <TrainingMode/>
                },
                {
                    path: 'training-evolution',
                    element: <TrainingEvolution/>
                },
                {
                    path: 'body-evolution',
                    element: <BodyEvolution/>
                },
                {
                    path: 'signin',
                    element: <SignIn/>
                },
                {
                    path: 'signup',
                    element: <SignUp/>
                },
                {
                    path: 'body-compositions',
                    element: <Body/>
                }
            ]
        },
        {
            path: '*',
            element: <MainLayout/>,
            children: [
                {
                    path: '*',
                    element: <Error404/>
                }
            ]
        },
    ]);
}
