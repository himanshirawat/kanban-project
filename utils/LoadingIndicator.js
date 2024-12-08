export const LoadingIndicator = ({ isLoading, message = "Loading..." }) => {
    if (!isLoading) return null;
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <span className="ml-4">{message}</span>
      </div>
    );
  };