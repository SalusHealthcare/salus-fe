import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IReservation, PatientService } from '@salus/graphql';
import GSTC from 'gantt-schedule-timeline-calendar';
const date = GSTC.api.date; // dayjs function

@Component({
  selector: 'salus-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.css'],
})
export class ReservationsListComponent implements OnInit {
  displayedColumns = [
    'description',
    'priority',
    'startDateTime',
    'medic',
    'speciality',
    'actions',
  ];

  dataSource = new MatTableDataSource<IReservation>();

  startDate = date().format('YYYY-MM-DDTHH:mm:ss');
  endDate = date().add(1, 'month').format('YYYY-MM-DDTHH:mm:ss');

  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {
    // this.getAvailableReservations();
    this.getPatientSlot();
  }

  getPatientSlot() {
    this.patientService
      .getCurrentPatient(this.startDate, this.endDate)
      .valueChanges.subscribe((result) => {
        console.log(result);
        if (result.data.currentPatient) {
          this.dataSource = new MatTableDataSource(
            result.data.currentPatient.reservations
          );
        }
      });
  }

  goToNewReservation() {
    this.router.navigate(['app', 'reservations', 'new']);
  }
}
