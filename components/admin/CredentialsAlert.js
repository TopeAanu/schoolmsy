import { Alert, AlertDescription } from "@/components/ui/alert";

const CredentialsAlert = ({ credentials }) => {
  return (
    <Alert className="mt-4 bg-green-50">
      <AlertDescription>
        <div className="font-bold">Student Account Created!</div>
        <div>Username: {credentials.username}</div>
        <div>Temporary Password: {credentials.password}</div>
        <div className="text-sm text-gray-600 mt-2">
          Please provide these credentials to the student securely.
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default CredentialsAlert;