import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TheaterLayoutContext } from "../../contexts/theaterLayoutContext/TheaterLayoutProvider";

const AdminSettings = () => {
  const { theaterLayouts, refetchTheaters } = useContext(TheaterLayoutContext);

  const API_URL = import.meta.env.VITE_API_URL;

  const [name, setName] = useState("");
  const [rows, setRows] = useState("");
  const [seatsPerRow, setSeatsPerRow] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const resetForm = () => {
    setName("");
    setRows("");
    setSeatsPerRow("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return toast.warning("Screen name is required");
    if (!rows.trim()) return toast.warning("Rows are required");
    if (!seatsPerRow || Number(seatsPerRow) <= 0)
      return toast.warning("Seats per row must be greater than 0");

    try {
      setSubmitting(true);

      const formattedRows = rows
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean);

      let res;

      if (editingId) {
        // 🔥 UPDATE API
        res = await axios.put(`${API_URL}/api/update-theater/${editingId}`, {
          name: name.trim(),
          rows: formattedRows,
          seatsPerRow: Number(seatsPerRow),
        });
      } else {
        // 🔥 CREATE API
        res = await axios.post(`${API_URL}/api/create-theater`, {
          name: name.trim(),
          rows: formattedRows,
          seatsPerRow: Number(seatsPerRow),
        });
      }

      if (res.data.success) {
        toast.success(
          editingId
            ? "Screen updated successfully"
            : "Screen added successfully",
        );

        resetForm();
        refetchTheaters();
      } else {
        toast.error(res.data.message || "Operation failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (screen) => {
    setEditingId(screen.id);
    setName(screen.name);
    setRows(screen.rows.join(", "));
    setSeatsPerRow(screen.seatsPerRow);
    toast.info("Editing screen");
  };

  return (
    <div className="p-10 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Admin Screen Settings</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-xl border border-gray-700 mb-10"
      >
        <h2 className="text-xl mb-4 font-semibold">
          {editingId ? "Edit Screen" : "Add New Screen"}
        </h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm">Screen Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-gray-800 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm">Rows (comma separated)</label>
          <input
            type="text"
            value={rows}
            onChange={(e) => setRows(e.target.value)}
            className="w-full p-3 bg-gray-800 rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm">Seats Per Row</label>
          <input
            type="number"
            value={seatsPerRow}
            onChange={(e) => setSeatsPerRow(e.target.value)}
            className="w-full p-3 bg-gray-800 rounded"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="bg-red-600 px-6 py-3 rounded hover:bg-red-700 disabled:bg-gray-700 transition"
          >
            {submitting
              ? editingId
                ? "Updating..."
                : "Adding..."
              : editingId
                ? "Update Screen"
                : "Add Screen"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-700 px-6 py-3 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* EXISTING SCREENS */}
      <div>
        <h2 className="text-xl mb-4 font-semibold">Existing Screens</h2>

        <div className="grid gap-4">
          {theaterLayouts.map((screen) => (
            <div
              key={screen._id}
              className="bg-gray-900 p-4 rounded border border-gray-700 flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>ID:</strong> {screen.id}
                </p>
                <p>
                  <strong>Name:</strong> {screen.name}
                </p>
                <p>
                  <strong>Rows:</strong> {screen.rows.join(", ")}
                </p>
                <p>
                  <strong>Seats:</strong> {screen.seatsPerRow}
                </p>
              </div>

              <button
                onClick={() => handleEdit(screen)}
                className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-sm"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
