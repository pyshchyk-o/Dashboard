import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @fetchData - a function that returns a promise of data to be fetched
 * @key - a unique key to represent and cache the data in AsyncStorage
 * @expiryTime - (optional) a period of time (in milliseconds) after which the cached data is considered expired. Defaults to 1 hour.
 */

export const useCachedData = <T,>(
  fetchData: () => Promise<T>,
  key: string,
  expiryTime = 3600000) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const loadCachedData = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const storedData = await AsyncStorage.getItem(key);
      const lastFetchTime = await AsyncStorage.getItem(key + 'Time');
      const currentTime = new Date().getTime();

      if (storedData && lastFetchTime && currentTime - Number(lastFetchTime) < expiryTime) {
        setData(JSON.parse(storedData));
      } else {
        await refreshData();
      }
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const freshData = await fetchData();
      await AsyncStorage.setItem(key, JSON.stringify(freshData));
      await AsyncStorage.setItem(key + 'Time', new Date().getTime().toString());
      setData(freshData);
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, refreshData, loadCachedData, isLoading, error };
};
