import "./fallback.scss";

const Fallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="container">
      <h1 data-testid="header">Something went wrong!</h1>
      <pre data-testid="error-msg">{error?.message}</pre>
      <button
        data-testid="reset-btn"
        className="primaryButton"
        onClick={resetErrorBoundary}
      >
        Go back Home
      </button>
    </div>
  );
};

export default Fallback;
