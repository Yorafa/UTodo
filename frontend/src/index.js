import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error404 from './pages/Error404';
import MainPage from './pages/MainPage';
import SignIn from './pages/SigninPage';
import SignUp from './pages/SignupPage';
import PublicCoursesPage from './pages/PublicCoursesPage';
import ProfilePage from './pages/ProfilePage';
import AllCoursesPage from './pages/AllCoursesPage';
import CoursesPage from './pages/CoursePage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <MainPage />,
            }, 
            {
                path: 'signin',
                element: <SignIn />,
            },
            {
                path: 'signup',
                element: <SignUp />,
            },
            {
                path: 'publiccourses',
                element: <PublicCoursesPage />,
            },
            {
                path: 'profile',
                element: <ProfilePage />,
            },
            {
                path: 'myallcourses',
                element: <AllCoursesPage />,
            },
            {
                path: 'course/:courseId',
                element: <CoursesPage />,
            },
            {
                path: '*',
                element: <Error404 />,
            }
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();