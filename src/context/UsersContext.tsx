import React, { createContext, ReactNode, useState } from "react";
import { User } from '../types/user';

type UsersContextType = {
  users: User[] | null;
  setUsers: React.Dispatch<React.SetStateAction<User[] | null>>;
  resetUsers: () => void;
};

export const UsersContext = createContext<UsersContextType>({
  users: null,
  setUsers: () => {},
  resetUsers: () => {},
});

export const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[] | null>(null);

  const resetUsers = () => setUsers(null);

  return (
    <UsersContext.Provider value={{ users, setUsers, resetUsers }}>
      {children}
    </UsersContext.Provider>
  );
};
