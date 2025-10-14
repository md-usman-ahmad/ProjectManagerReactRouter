
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { HomePage } from "./HomePage.jsx";
import { PageNotFound } from "./PageNotFound.jsx";
import { SignupPage } from "./SignupPage.jsx";
import { LoginPage } from "./LoginPage.jsx"


const routes = createBrowserRouter([
    {
        path : "/",
        Component : HomePage,
        errorElement : <PageNotFound></PageNotFound>,
        children : [
            {
                path : "/signup",
                Component : SignupPage
            },
            {
                path : "/login",
                Component : LoginPage,
            }
        ]
    }
])

export function App(){
    return (
        <>
            <RouterProvider router={routes} ></RouterProvider>
        </>
    )
}