//TODO: added more fields after clarification with the customer
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
