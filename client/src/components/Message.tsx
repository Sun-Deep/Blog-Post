interface PropsType {
  message?: string;
  error?: string;
}

function Message({ message, error }: PropsType) {
  return (
    <div>
      {message ? (
        <div className="alert success">
          <p>{message}</p>
        </div>
      ) : (
        <div className="alert error">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default Message;
