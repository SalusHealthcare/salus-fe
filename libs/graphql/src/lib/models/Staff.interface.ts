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
export interface IGetSelfShiftsResponse {
  currentUser: {
    person: IWorker;
  };
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

export const ReservationSlotForWeeksOnMedic = (
  startDate: string,
  endDate: string
) => `
fragment ReservationSlotOfWeekForMedic on Medic {
  reservationSlots(startDate: "${startDate}", endDate: "${endDate}") {
    id,
    startDateTime{iso}
    durationInHours,
    medic{id,firstName,lastName}
    booked
  }
}
`;

export interface IAllStaffsForSelectResponse {
  allPeople: Pick<IPerson, 'id' | 'firstName' | 'lastName'>[];
}

export interface IAddShiftsResponse {
  addShifts: Pick<IPerson, 'id' | '__typename'>[];
}

export interface IAddReservationSlotResponse {
  addReservationSlots: Pick<IMedic, 'id' | '__typename'>[];
}

export interface ICurrentMedicResponse {
  currentMedic: IMedic;
}
