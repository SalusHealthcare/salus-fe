import { gql } from 'apollo-angular';
import { IMedic } from './Medic.interface';
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

export type IWorker = IStaff | IMedic;
export interface IGetShiftsResponse {
  allPeople: IWorker[];
}

export const ShiftForWeeksOnWorker = (
  worker: 'Medic' | 'Staff',
  startDate: string,
  endDate: string
) => `
fragment ShiftSlotOfWeekFor${worker} on ${worker} {
  shiftSlots(startDate: "${startDate}", endDate: "${endDate}") {
    id,
    startDateTime{iso},
    durationInHours
  }
}
`;
