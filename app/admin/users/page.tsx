"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
  User,
} from "../../redux/slices/userSlice";
import { Table, Column } from "../../component/Table";
import { SearchBar } from "../../component/SearchBar";
import AddUserModal from "../../component/AddUserModal";
import EditUserModal from "../../component/EditUserModal";

const UsersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredUsers(users);
    } else {
      const q = query.toLowerCase();
      setFilteredUsers(
        users.filter(
          (user: User) =>
            user.name.toLowerCase().includes(q) ||
            user.email.toLowerCase().includes(q)
        )
      );
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleAddUser = async (values: any) => {
    const resultAction = await dispatch(addUser(values));
    if (addUser.rejected.match(resultAction)) {
      const errorMessage =
        (resultAction.payload as string) || resultAction.error.message;
      throw new Error(errorMessage);
    }
    await dispatch(fetchUsers());
  };

  const columns: Column<User>[] = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    {
      header: "Skill",
      accessor: (user: User) => user.skill?.join(", ") || "",
    },
    {
      header: "Certification",
      accessor: (user: User) => user.certification?.join(", ") || "",
    },
    {
      header: "BookingJob",
      accessor: (user: User) => user.bookingJob?.join(", ") || "",
    },
    {
      header: "Actions",
      accessor: (user: User) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(user)}
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
    <div className="py-24 container">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="mb-4 flex justify-between items-center">
        <SearchBar onSearch={handleSearch} placeholder="Search by name" />
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <Table
        data={filteredUsers}
        columns={columns}
        className="shadow rounded"
      />

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
            const resultAction = await dispatch(
              updateUser({ id: editingUser.id, data: values })
            );
            if (updateUser.rejected.match(resultAction)) {
              throw new Error(
                (resultAction.payload as string) || resultAction.error.message
              );
            }
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
};

export default UsersPage;
