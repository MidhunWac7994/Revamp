import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import client from "./components/lib/apolloClient";
import { GlobalDataProvider } from "./CustomHook/useGlobalData";

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <GlobalDataProvider>
    {/* <StrictMode> */}
      <App />
    {/* </StrictMode> */}
      </GlobalDataProvider>
  </ApolloProvider>
);
