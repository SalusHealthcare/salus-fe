import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { UserRole } from '@salus/graphql';
import { Subject } from 'rxjs';
import { AddReservationSlotDialogComponent } from '../add-reservation-slot-dialog/add-reservation-slot-dialog.component';
import { AddShiftDialogComponent } from '../add-shift-dialog/add-shift-dialog.component';

@Component({
  selector: 'salus-shift-editor',
  templateUrl: './shift-editor.component.html',
  styleUrls: ['./shift-editor.component.css'],
})
export class ShiftEditorComponent implements OnInit {
  UserRole = UserRole;
  currentDateForm = new FormControl(new Date());
  update = new Subject<boolean>();
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  dateChanged(event: MatDatepickerInputEvent<Date>) {
    this.currentDateForm.setValue(event.value);
  }

  openAddShiftDialog() {
    const dialogRef = this.dialog.open(AddShiftDialogComponent);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log(`Dialog result: ${result}`);
      this.update.next(result);
    });
  }

  openAddReservationSlotDialog() {
    const dialogRef = this.dialog.open(AddReservationSlotDialogComponent);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log(`Dialog result: ${result}`);
      this.update.next(result);
    });
  }
}
