"use client";

import React, { useState } from "react";
import { Table, Column } from "../../component/Table";
import { SearchBar } from "../../component/SearchBar";
import AddUserModal from "../../component/AddUserModal";
import EditUserModal from "../../component/EditUserModal";
import { useUsers } from "../../hooks/useUsers";
import Pagination from "../../component/Pagination";

const UsersPage: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    filteredUsers,
    handleSearch,
    handleAddUser,
    handleDelete,
    handleEdit,
    loading,
    error,
    currentData,
    totalPages,
  } = useUsers();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const columns: Column<any>[] = [
    { header: "ID", body: "id" },
    { header: "Name", body: "name" },
    { header: "Email", body: "email" },
    { header: "Role", body: "role" },
    { header: "Skill", body: (user) => user.skill?.join(", ") || "" },
    {
      header: "Certification",
      body: (user) => user.certification?.join(", ") || "",
    },
    { header: "BookingJob", body: (user) => user.bookingJob?.join(", ") || "" },
    {
      header: "Actions",
      body: (user) => (
        <div className="flex space-x-2">
          <button
            onClick={() => setEditingUser(user)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(user.id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="my-48 container">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="mb-4 flex justify-between items-center">
        <SearchBar onSearch={handleSearch} placeholder="Search by name" />
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <Table data={currentData} columns={columns} className="shadow rounded" />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddUser}
        />
      )}

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSubmit={async (values) => {
            await handleEdit(editingUser, values);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
};

export default UsersPage;
