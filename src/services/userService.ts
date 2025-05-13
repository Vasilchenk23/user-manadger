import { User } from '../types';

const STORAGE_KEY = 'users';

export const getUsers = (): User[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveUsers = (users: User[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const addUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
};

export const updateUser = (updatedUser: User): void => {
  const users = getUsers().map((user) =>
    user.id === updatedUser.id ? updatedUser : user
  );
  saveUsers(users);
};

export const deleteUser = (id: number): void => {
  const users = getUsers().filter((user) => user.id !== id);
  saveUsers(users);
};