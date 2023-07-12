import React from 'react';
import { act, create } from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UsersScreen from '../UsersScreen';
import { ApiClient } from '../../api/ApiClient';

jest.mock('../../api/ApiClient');

describe('UsersScreen', () => {
  beforeEach(() => {
    // Clear mock calls from previous test runs
    jest.clearAllMocks();
  });

  it('Component should render', async () => {
    await act(async () => {
      create(<UsersScreen />);
    });
  });

  it('Should fetch users from storage if available and not expired', async () => {
    const mockUsers = [{ name: 'John', age: 30 }, { name: 'Doe', age: 20 }];

    AsyncStorage.getItem.mockImplementation((key) => {
      switch (key) {
        case 'userData':
          return Promise.resolve(JSON.stringify(mockUsers));
        case 'userDataTime':
          return Promise.resolve((Date.now() - 30 * 60 * 1000).toString());
        default:
          return Promise.resolve(null);
      }
    });

    await act(async () => {
      create(<UsersScreen />);
    });

    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(2);
    expect(ApiClient.fetchUsers).not.toHaveBeenCalled();
  });

  it('Should fetch users from API if no data in storage or data expired', async () => {
    const mockUsers = [{ name: 'John', age: 30 }, { name: 'Doe', age: 20 }];

    AsyncStorage.getItem.mockImplementation((key) => {
      switch (key) {
        case 'userData':
          return Promise.resolve(null);
        case 'lastFetchTime':
          return Promise.resolve((Date.now() - 2 * 60 * 60 * 1000).toString());
        default:
          return Promise.resolve(null);
      }
    });

    ApiClient.fetchUsers.mockResolvedValue(mockUsers);

    await act(async () => {
      create(<UsersScreen />);
    });

    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(2);
    expect(ApiClient.fetchUsers).toHaveBeenCalled();
  });
});
