import { User } from '../types/user';

export class ApiClient {
  private static readonly users: User[] = [
    {
      name: "Matthew",
      age: 20,
    },
    {
      name: "Luke",
      age: 25,
    },
    {
      name: "Samuel",
      age: 22,
    },
  ];

  public static async fetchUsers(): Promise<User[]> {
    console.log('-----fetchUsers--->');
    return Promise.resolve(ApiClient.users);
  }
}
