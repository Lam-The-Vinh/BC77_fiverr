"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import Pagination from "../../component/Pagination";
import { fetchUsers, addUser, updateUser, deleteUser, User } from "../../redux/slices/userSlice";
import { Table, Column } from "../../component/Table";
import { SearchBar } from "../../component/SearchBar";
import AddUserModal from "../../component/AddUserModal";
import EditUserModal from "../../component/EditUserModal";

const UsersPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.user);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [isSearching, setIsSearching] = useState(false);
  const [lastSearchQuery, setLastSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!isSearching) {
      setFilteredUsers(users);
    }
  }, [users, isSearching]);

  useEffect(() => {
    if (isSearching && lastSearchQuery) {
      handleSearch(lastSearchQuery);
    }
  }, [users]);

  const handleSearch = (query: string) => {
    setLastSearchQuery(query);
    setCurrentPage(1);
    if (!query) {
      setFilteredUsers(users);
      setIsSearching(false);
    } else {
      const lowerQuery = query.toLowerCase();
      setFilteredUsers(
        users.filter(
          (user: User) =>
            user.name.toLowerCase().includes(lowerQuery) ||
            user.email.toLowerCase().includes(lowerQuery)
        )
      );
      setIsSearching(true);
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
      const errorMessage = (resultAction.payload as string) || resultAction.error.message;
      throw new Error(errorMessage);
    }
    if (isSearching && lastSearchQuery) {
      handleSearch(lastSearchQuery);
    }
  };

  const dataSource = filteredUsers;
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentData = dataSource.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataSource.length / pageSize);

  const columns: Column<User>[] = [
    { header: "ID", body: "id" },
    { header: "Name", body: "name" },
    { header: "Email", body: "email" },
    { header: "Role", body: "role" },
    { header: "Skill", body: (user: User) => user.skill?.join(", ") || "" },
    { header: "Certification", body: (user: User) => user.certification?.join(", ") || "" },
    { header: "BookingJob", body: (user: User) => user.bookingJob?.join(", ") || "" },
    {
      header: "Actions",
      body: (user: User) => (
        <div className="flex space-x-2">
          <button onClick={() => handleEdit(user)} className="text-blue-600 hover:underline">
            Edit
          </button>
          <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:underline">
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
          className="bg-green-600 text-white px-4 py-2 rounded"
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
        <AddUserModal onClose={() => setShowAddModal(false)} onSubmit={handleAddUser} />
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
            if (isSearching && lastSearchQuery) {
              handleSearch(lastSearchQuery);
            }
          }}
        />
      )}
    </div>
  );
};

export default UsersPage;
