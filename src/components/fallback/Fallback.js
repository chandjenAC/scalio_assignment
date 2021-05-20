import "./fallback.scss";

const Fallback = ({ error, resetErrorBoundary }) => {
  console.log("thjis isteh error>>>>>", error);
  return (
    <div className="container">
      <h1>Something went wrong!</h1>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default Fallback;
