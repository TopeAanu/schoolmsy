import { Input } from "@/components/ui/input";

const AdminCredentials = ({ formData, setFormData }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <h3 className="font-semibold mb-4">Admin Authentication</h3>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Admin Username</label>
          <Input
            required
            type="text"
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
          <label className="block mb-2">Admin Password</label>
          <Input
            required
            type="password"
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