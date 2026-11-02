export interface ApiUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;

  company: {
    department: string;
    title: string;
  };
}

export interface UsersApiResponse {
  users: ApiUser[];
  total: number;
  skip: number;
  limit: number;
}