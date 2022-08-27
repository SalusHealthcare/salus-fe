import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import {
  IMedicalRecord,
  IPatient,
  PatientService,
  UserRole,
} from '@salus/graphql';
import { RoleService } from '@salus/helpers';
import GSTC from 'gantt-schedule-timeline-calendar';
import { EMPTY, filter, map, switchMap, tap } from 'rxjs';
import { AddRecordDialogComponent } from '../add-record-dialog/add-record-dialog.component';
const date = GSTC.api.date; // dayjs function

@Component({
  selector: 'salus-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.css'],
})
export class RecordsListComponent implements OnInit {
  UserRole = UserRole;
  patientData: IPatient | undefined;
  medicalRecords: IMedicalRecord[] = [];
  dataSource: MatTableDataSource<IMedicalRecord> =
    new MatTableDataSource<IMedicalRecord>([]);
  displayedColumns: string[] = [
    'id',
    'description',
    'insertedAt',
    'category',
    'documentType',
  ];
  constructor(
    private patientService: PatientService,
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.roleService.hasRole([UserRole.USER]).subscribe((isPatient) => {
      console.log({ isPatient });

      if (isPatient) {
        this.getPatientData();
      }
    });

    this.roleService
      .hasRole([UserRole.ADMIN, UserRole.MEDIC, UserRole.STAFF])
      .pipe(
        tap(console.log),
        switchMap((hasRole) => {
          if (hasRole) {
            console.log(this.activatedRoute);

            return this.activatedRoute.params;
          } else {
            return EMPTY;
          }
        }),
        tap(console.log),
        map((params) => params['id'])
      )
      .subscribe((id: string) => {
        console.log(id);
        if (id) {
          this.getPatientById(id);
        }
      });
  }

  getPatientData() {
    this.patientService
      .getCurrentPatient(
        date().startOf('month').format('YYYY-MM-DDTHH:mm:ss'),
        date().endOf('month').format('YYYY-MM-DDTHH:mm:ss')
      )
      .valueChanges.subscribe((response) => {
        if (response.data.currentPatient) {
          this.patientData = response.data.currentPatient;
          this.medicalRecords = this.patientData.medicalRecord;
          this.dataSource = new MatTableDataSource(this.medicalRecords);
        }
      });
  }

  getPatientById(id: string) {
    this.patientService
      .getPatient(
        id,
        date().startOf('month').format('YYYY-MM-DDTHH:mm:ss'),
        date().endOf('month').format('YYYY-MM-DDTHH:mm:ss')
      )
      .valueChanges.subscribe((response) => {
        console.log(response);
        if (response.data.patient) {
          this.patientData = response.data.patient;
          this.medicalRecords = this.patientData.medicalRecord;
          this.dataSource = new MatTableDataSource(this.medicalRecords);
        }
      });
  }

  addRecord() {
    if (this.patientData) {
      const dialogRef = this.dialog.open(AddRecordDialogComponent, {
        minWidth: '50%',
        data: {
          patientId: this.patientData.id,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result && this.patientData) {
          this.patientService
            .getPatient(
              this.patientData.id,
              date().startOf('month').format('YYYY-MM-DDTHH:mm:ss'),
              date().endOf('month').format('YYYY-MM-DDTHH:mm:ss')
            )
            .refetch();
        }
      });
    }
  }
}
