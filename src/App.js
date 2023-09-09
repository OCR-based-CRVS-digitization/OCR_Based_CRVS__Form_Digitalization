import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import RootLayout from "./pages/RootLayout";
import Workspace from "./components/Workspace/Workspace";
import WorkSpaceDetails from "./pages/WorkSpaceDetails";
import FileUploadPage from "./pages/FileUploadPage";
import ValidateList from "./components/Validate/ValidateList";
import CombinedOne from "./components/Forms/CRVSForm.js/CombinedOne";
import EditWorkspace from "./components/Workspace/EditWorkspace";
import CombinedTwo from "./components/Forms/CRVSForm.js/CombinedTwo";
import DraftList from "./components/Drafts/DraftList";
import DraftOne from "./components/Forms/CRVSForm.js/DraftOne";
import DraftTwo from "./components/Forms/CRVSForm.js/DraftTwo";



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
      { path: "/home/workspace/:workspace_id", element: <WorkSpaceDetails/>},
      { path: "/home/workspace/:workspace_id/single", element: <FileUploadPage/>},
      { path: "/home/workspace/:workspace_id/validate", element: <ValidateList/>},
      { path: "/home/workspace/:workspace_id/editWorkspace", element: <EditWorkspace/>},
      { path: "/home/workspace/:workspace_id/validate/:form_id/1", element: <CombinedOne/>},
      { path: "/home/workspace/:workspace_id/validate/:form_id/2", element: <CombinedTwo/>},
      { path: "/home/workspace/:workspace_id/draft", element: <DraftList/>},
      { path: "/home/workspace/:workspace_id/draft/:form_id/1", element: <DraftOne/>},
      { path: "/home/workspace/:workspace_id/draft/:form_id/2", element: <DraftTwo/>},
      { path: "*", element: <h1>Not Found</h1>}
    ],
  },
]
);

function App() {
  return <RouterProvider router={BrowserRouter} />;
}

export default App;
