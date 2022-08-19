export interface IAddress {
  id: string;
  province: string;
  city: string;
  street: string;
  number: string;
  postCode: string;
  country: string;
}

export interface IDate {
  iso: string;
  formatString: (format: string) => string;
}

export interface DeleteUserResponse {
  deleteUser: boolean;
}
