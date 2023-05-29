export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IUserAddress;
  phone: string;
  website: string;
  company: IUserCompany;
}

interface IUserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IUserGeo;
}

interface IUserGeo {
  lat: string;
  lng: string;
}

interface IUserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}
