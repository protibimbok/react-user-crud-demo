import { Home } from './views/Home';
import { createBrowserRouter } from "react-router-dom";
import MainLayout from './layouts/main';
import Register from './views/Register';
  
const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        //errorElement: <div>Error</div>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "register",
                element: <Register/>
            }
        ]
    },
]);

export default router;