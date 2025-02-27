interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

//for database user
export interface IUser {
  id?: number;
  username: string;
  name: string;
  password?: string;
  email: string;
  phone: string;
  address: IAddress;
  website: string;
  company: ICompany;
  created_at?: Date;
  created_by?: string;
  updated_at?: Date;
  updated_by?: string;
  deleted_at?: Date;
}
