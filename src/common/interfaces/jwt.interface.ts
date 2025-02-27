export interface IJwtUser {
  iat: number;
  user: {
    id: number;
    username: string;
    email: string;
    nama: string;
    created_at: Date | string;
  };
}
