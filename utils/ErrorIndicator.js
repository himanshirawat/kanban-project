export const ErrorIndicator = ({ error }) => {
    if (!error) return null;
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded">
        <strong>Error:</strong> {error}
      </div>
    );
  };