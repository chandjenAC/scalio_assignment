import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./components/fallback/Fallback";
import ParentContainer from "./containers/parentContainer/ParentContainer";

const App = () => {
  const errorHandler = (error, errorInfo) => {
    console.log("Logging error", error, errorInfo);
  };

  return (
    <ErrorBoundary
      FallbackComponent={Fallback}
      onError={errorHandler}
      onReset={() => {
        window.location.href = "/scalio_assignment";
      }}
    >
      <ParentContainer />
    </ErrorBoundary>
  );
};

export default App;
