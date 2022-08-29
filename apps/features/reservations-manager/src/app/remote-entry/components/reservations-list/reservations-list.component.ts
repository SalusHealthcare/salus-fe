import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  IReservation,
  PatientService,
  StaffService,
  UserRole,
} from '@salus/graphql';
import { RoleService } from '@salus/helpers';
import GSTC from 'gantt-schedule-timeline-calendar';
const date = GSTC.api.date; // dayjs function

@Component({
  selector: 'salus-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.css'],
})
export class ReservationsListComponent implements OnInit {
  UserRole = UserRole;
  displayedColumns = [
    'description',
    'priority',
    'startDateTime',
    'medic',
    'speciality',
    'actions',
  ];

  displayedColumnsMedic = [
    'description',
    'priority',
    'startDateTime',
    'patient',
    'actions',
  ];

  dataSource = new MatTableDataSource<IReservation>();

  startDate = date().format('YYYY-MM-DDTHH:mm:ss');
  endDate = date().add(1, 'month').format('YYYY-MM-DDTHH:mm:ss');

  constructor(
    private patientService: PatientService,
    private staffService: StaffService,
    private router: Router,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.roleService.hasRole([UserRole.USER]).subscribe((isUser) => {
      if (isUser) {
        this.getPatientSlot();
      }
    });

    this.roleService.hasRole([UserRole.MEDIC]).subscribe((isMedic) => {
      if (isMedic) {
        this.displayedColumns = this.displayedColumnsMedic;
        this.getMedicSlot();
      }
    });
  }

  getPatientSlot() {
    this.patientService
      .getCurrentPatient(this.startDate, this.endDate)
      .subscribe((result) => {
        console.log(result);
        if (result.data.currentPatient) {
          this.dataSource = new MatTableDataSource(
            result.data.currentPatient.reservations
          );
        }
      });
  }

  getMedicSlot() {
    this.staffService
      .getCurrentMedic(this.startDate, this.endDate, true)
      .subscribe((result) => {
        if (result.data.currentMedic) {
          this.dataSource = new MatTableDataSource(
            result.data.currentMedic.reservationSlots.map(
              (slot) => slot.reservation
            )
          );
        }
      });
  }

  goToNewReservation() {
    this.router.navigate(['app', 'reservations', 'new']);
  }

  goToVideocall(row: IReservation) {
    this.router.navigate(['app', 'videoroom'], {
      queryParams: {
        roomId: `${row.id}`,
      },
    });
  }
}
