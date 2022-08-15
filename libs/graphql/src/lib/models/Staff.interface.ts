import { IPerson } from './Person.interface';
import { ITimeSlot } from './Reservation.interface';
export interface IStaff extends IPerson {
  shiftSlots: ITimeSlot[];
}

export interface IAllPersonResponse {
  allPeople: IPerson[];
}

export interface ICreateStaffResponse {
  createStaffUser: {
    token: string;
    person: IPerson;
  };
}
