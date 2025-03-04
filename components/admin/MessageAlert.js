import { Alert, AlertDescription } from "@/components/ui/alert";

const MessageAlert = ({ type, message }) => {
  const alertClasses = type === 'success' 
    ? 'mt-4 bg-green-50' 
    : 'mt-4 bg-red-50';
  
  const textClasses = type === 'success' 
    ? 'text-green-600' 
    : 'text-red-600';

  return (
    <Alert className={alertClasses}>
      <AlertDescription className={textClasses}>
        {message}
      </AlertDescription>
    </Alert>
  );
};

export default MessageAlert;