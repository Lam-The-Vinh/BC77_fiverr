import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  addUser,
  deleteUser,
  updateUser,
} from "../redux/slices/userSlice";
import { AppDispatch, RootState } from "../redux/store";

export const useUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [lastSearchQuery, setLastSearchQuery] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.user
  );

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

  const handleAddUser = async (values: any) => {
    const resultAction = await dispatch(addUser(values));
    if (addUser.rejected.match(resultAction)) {
      const errorMessage =
        (resultAction.payload as string) || resultAction.error.message;
      throw new Error(errorMessage);
    }
    if (isSearching && lastSearchQuery) {
      handleSearch(lastSearchQuery);
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = async (user: User, values: any) => {
    const resultAction = await dispatch(
      updateUser({ id: user.id, data: values })
    );
    if (updateUser.rejected.match(resultAction)) {
      throw new Error(
        (resultAction.payload as string) || resultAction.error.message
      );
    }
  };

  const dataSource = filteredUsers;
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentData = dataSource.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataSource.length / pageSize);

  return {
    currentPage,
    setCurrentPage,
    pageSize,
    filteredUsers,
    handleSearch,
    handleAddUser,
    handleDelete,
    handleEdit,
    loading,
    error,
    currentData,
    totalPages,
  };
};
