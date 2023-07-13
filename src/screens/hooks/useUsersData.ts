import { useEffect, useContext } from 'react';

import { useCachedData } from '../../hooks/useCachedData';
import { ApiClient } from '../../api/ApiClient';
import { UsersContext } from '../../context/UsersContext';
import { FETCH_KEYS} from "../../constants/fetchKeys";

export const useUserData = () => {
  const { users, setUsers } = useContext(UsersContext);
  // We use useCachedData hook to fetch user data from the API or AsyncStorage.
  // This hook manages the loading state, any errors that might occur,
  // and the fetched data itself
  const { data, refreshData, loadCachedData, isLoading, error } = useCachedData(
    ApiClient.fetchUsers,
    FETCH_KEYS.userData,
  );

  // If there's no user data in the context when the component mounts, load it
  useEffect(() => {
    if (!users) {
      loadUsers();
    }
  }, [users]);

  // When the data changes (either because it was fetched from the API or loaded from cache),
  // update the user data in the context
  useEffect(() => {
    setUsers(data);
  }, [data, setUsers]);

  // Re-fetch data from the api
  const refreshUsers = async () => {
    await refreshData();
  };

  // Load user data from AsyncStorage or the api
  const loadUsers = async () => {
    await loadCachedData();
  };

  return { users, isLoading, error, refreshUsers, loadUsers };
};
