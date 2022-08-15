import { IMedic } from './Medic.interface';
import { IPatient } from './Patient.interface';
import { IDate } from './Shared.interface';

export interface IReservation {
  id: string;
  description: string;
  bookedAt: IDate;
  priority: Priority;
  patient: IPatient;
  reservationSlot: IReservationSlot;
}

export interface ITimeSlot {
  id: string;
  startDateTime: IDate;
  durationInHours: number;
}

export interface IReservationSlot extends ITimeSlot {
  booked: boolean;
  reservation: IReservation;
  medic: IMedic;
}

export enum Priority {
  WHITE = 'WHITE',
  GREEN = 'GREEN',
  YELLOW = 'YELLOW',
  RED = 'RED',
}
