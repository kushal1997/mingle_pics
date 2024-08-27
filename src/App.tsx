import * as React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { UserAuthProvider } from "./context/userAuthContext";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  console.log("App copmonet loaded ==============");
  // console.log("Firebase API Key:", import.meta.env.VITE_API_KEY);
  // console.log("Environment Variables:", import.meta.env);
  return (
    <>
      <UserAuthProvider>
        <RouterProvider router={router} />
      </UserAuthProvider>
    </>
  );
};

export default App;
