jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => {
    return new Promise((resolve) => {
      resolve(null);
    });
  }),
  getItem: jest.fn(() => {
    return new Promise((resolve) => {
      resolve(null);
    });
  }),
}));
