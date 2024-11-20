export interface IUser {
  id: string;
  email: string;
  phoneNumber?: string;
  isAdmin?: boolean;
}

export interface ISignUpData {
  email: string;
  phoneNumber: string;
  password: string;
}
