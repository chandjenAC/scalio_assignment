import "./fallback.scss";

const Fallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="container">
      <h1>Something went wrong!</h1>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary} className="primaryButton">Go back Home</button>
    </div>
  );
};

export default Fallback;
