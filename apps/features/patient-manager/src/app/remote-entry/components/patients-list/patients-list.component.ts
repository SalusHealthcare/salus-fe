import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IPatient, PatientService } from '@salus/graphql';

@Component({
  selector: 'salus-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css'],
})
export class PatientsListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'taxCode',
    'birthdate',
    'phone',
    'actions',
  ];

  dataSource = new MatTableDataSource<IPatient>();

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients() {
    this.patientService
      .getPatients({ page: 0, size: 10 })
      .subscribe((result) => {
        console.log(result);
        if (result.data) {
          this.dataSource = new MatTableDataSource(result.data.patients);
        }
      });
  }
}
