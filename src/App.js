import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import RootLayout from "./pages/RootLayout";



const BrowserRouter = createBrowserRouter([
  { 
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/home", element: <Home /> },
      // { path: "/home/fileupload", element: <FileUploader />},
      // { path: "/home/profile", element: <Profile />},
      // { path: "/home/workspace", element: <Workspaces/>}

    ],
  },
]
);


function App() {
  return <RouterProvider router={BrowserRouter} />;
}

export default App;
