import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// https://kentcdodds.com/blog/use-react-error-boundary-to-handle-errors-in-react
import {ErrorBoundary} from 'react-error-boundary'

function ErrorFallback({error}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{color: 'red'}}>{error.message}</pre>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={()=>{
            console.log("Error!")
          }}
        >
        <App />
      </ErrorBoundary>
  </React.StrictMode>
);
