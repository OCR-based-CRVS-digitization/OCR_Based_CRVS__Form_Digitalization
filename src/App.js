import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import RootLayout from "./pages/RootLayout";
import Workspace from "./components/Workspace/Workspace";
import WorkSpaceDetails from "./pages/WorkSpaceDetails";
import FileUploadPage from "./pages/FileUploadPage";
import ValidateList from "./components/Validate/ValidateList";



const BrowserRouter = createBrowserRouter([
  { 
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/home", element: <Home /> },
      // { path: "/home/fileupload", element: <FileUploader />},
      // { path: "/home/profile", element: <Profile />},
      { path: "/home/workspace", element: <Workspace/>},
      { path: "/home/workspace/:id", element: <WorkSpaceDetails/>},
      { path: "/home/workspace/:id/single", element: <FileUploadPage/>},
      { path: "/home/workspace/:id/validate", element: <ValidateList/>},
    ],
  },
]
);

function App() {
  return <RouterProvider router={BrowserRouter} />;
}

export default App;
