import { Input } from "@/components/ui/input";

const AdminCredentials = ({ formData, setFormData }) => {
 return (
  <div className="bg-gray-50 p-4 rounded-lg mb-6">
    <h3 className="font-semibold mb-4">Admin Authentication</h3>
    <div className="space-y-4">
      <div>
        <Input
          required
          type="text"
          placeholder="Admin Username"
          value={formData.adminUsername}
          onChange={(e) =>
            setFormData({
              ...formData,
              adminUsername: e.target.value,
            })
          }
        />
      </div>
      <div>
        <Input
          required
          type="password"
          placeholder="Admin Password"
          value={formData.adminPassword}
          onChange={(e) =>
            setFormData({
              ...formData,
              adminPassword: e.target.value,
            })
          }
        />
      </div>
    </div>
  </div>
);
};

export default AdminCredentials;