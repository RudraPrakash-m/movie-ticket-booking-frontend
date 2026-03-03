import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { userCon } from "../../contexts/userContext/UserContext";
import LoadingPage from "../../pages/loadingPage/LoadingPage";

const AdminSeeUsers = () => {
  const { user } = useContext(userCon);

  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [actionLoading, setActionLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/api/admin/users`, {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (err) {
      setError("Failed to fetch users");
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async (id) => {
    try {
      const res = await axios.get(`${API}/api/admin/users/${id}`, {
        withCredentials: true,
      });
      setSelectedUser(res.data);
      setSelectedId(id);
      setConfirmDelete(false);
    } catch (err) {
      toast.error("Failed to fetch user details");
    }
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;

    try {
      setActionLoading(true);

      await axios.put(
        `${API}/api/admin/users/${selectedId}`,
        {
          name: selectedUser.name,
          email: selectedUser.email,
          isVerified: selectedUser.isVerified,
        },
        { withCredentials: true },
      );

      toast.success("User updated successfully");
      fetchUsers();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRoleChange = async (newRole) => {
    if (selectedId === user?._id) {
      toast.error("You cannot change your own role.");
      return;
    }

    try {
      setActionLoading(true);

      await axios.patch(
        `${API}/api/admin/users/${selectedId}/role`,
        { role: newRole },
        { withCredentials: true },
      );

      toast.success("Role updated successfully");
      fetchUsers();
      fetchUserDetails(selectedId);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Role update failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (selectedId === user?._id) {
      toast.error("You cannot delete your own account.");
      return;
    }

    try {
      setActionLoading(true);

      await axios.delete(`${API}/api/admin/users/${selectedId}`, {
        withCredentials: true,
      });

      toast.success("User deleted successfully");
      setSelectedUser(null);
      setSelectedId(null);
      setConfirmDelete(false);
      fetchUsers();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <LoadingPage />;

  if (error) return <div className="text-red-500 p-6">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-200 p-6">
      <div className="max-w-7xl mx-auto flex gap-8 flex-col md:flex-row">
        {/* USER LIST */}
        <div className="flex-1 bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl p-6">
          <h2 className="text-xl font-semibold mb-6 border-b border-gray-800 pb-3">
            All Users
          </h2>

          <div className="space-y-3 max-h-[550px] overflow-y-auto pr-2">
            {users.map((userItem) => (
              <div
                key={userItem._id}
                onClick={() => fetchUserDetails(userItem._id)}
                className={`p-4 rounded-xl cursor-pointer border transition-all duration-200 ${
                  selectedId === userItem._id
                    ? "bg-indigo-600/20 border-indigo-500"
                    : "border-gray-800 hover:bg-gray-800/50"
                }`}
              >
                <div className="font-medium">{userItem.name}</div>
                <div className="text-sm text-gray-400">{userItem.email}</div>

                <span
                  className={`inline-block mt-2 text-xs px-3 py-1 rounded-full ${
                    userItem.role === "admin"
                      ? "bg-red-600/20 text-red-400"
                      : "bg-blue-600/20 text-blue-400"
                  }`}
                >
                  {userItem.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* USER DETAILS */}
        <div className="w-full md:w-96 bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl p-6">
          <h2 className="text-xl font-semibold mb-6 border-b border-gray-800 pb-3">
            User Details
          </h2>

          {selectedUser ? (
            <div className="space-y-5">
              <input
                type="text"
                value={selectedUser.name}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    name: e.target.value,
                  })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-1 focus:ring-indigo-500 outline-none"
              />

              <input
                type="email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    email: e.target.value,
                  })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-1 focus:ring-indigo-500 outline-none"
              />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedUser.isVerified}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      isVerified: e.target.checked,
                    })
                  }
                />
                <label className="text-sm text-gray-400">Verified</label>
              </div>

              {/* ROLE */}
              <div>
                <p className="text-sm text-gray-400 mb-2">Role</p>
                <div className="flex gap-3">
                  <button
                    disabled={selectedId === user?._id || actionLoading}
                    onClick={() => handleRoleChange("user")}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg disabled:opacity-50"
                  >
                    Make User
                  </button>

                  <button
                    disabled={selectedId === user?._id || actionLoading}
                    onClick={() => handleRoleChange("admin")}
                    className="flex-1 bg-red-600 hover:bg-red-700 transition py-2 rounded-lg disabled:opacity-50"
                  >
                    Make Admin
                  </button>
                </div>

                {selectedId === user?._id && (
                  <p className="text-xs text-gray-500 mt-2">
                    You cannot change your own role
                  </p>
                )}
              </div>

              <button
                disabled={actionLoading}
                onClick={handleUpdate}
                className="w-full bg-indigo-600 hover:bg-indigo-700 transition py-2 rounded-lg disabled:opacity-50"
              >
                {actionLoading ? "Saving..." : "Save Changes"}
              </button>

              {!confirmDelete ? (
                <button
                  disabled={selectedId === user?._id || actionLoading}
                  onClick={() => setConfirmDelete(true)}
                  className="w-full bg-gray-700 hover:bg-gray-600 transition py-2 rounded-lg disabled:opacity-50"
                >
                  Delete User
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    disabled={actionLoading}
                    onClick={handleDelete}
                    className="flex-1 bg-red-600 hover:bg-red-700 transition py-2 rounded-lg disabled:opacity-50"
                  >
                    Confirm Delete
                  </button>

                  <button
                    disabled={actionLoading}
                    onClick={() => setConfirmDelete(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-500 transition py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500">Select a user to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSeeUsers;
