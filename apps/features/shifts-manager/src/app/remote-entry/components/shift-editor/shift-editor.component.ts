import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { AddShiftDialogComponent } from '../add-shift-dialog/add-shift-dialog.component';

@Component({
  selector: 'salus-shift-editor',
  templateUrl: './shift-editor.component.html',
  styleUrls: ['./shift-editor.component.css'],
})
export class ShiftEditorComponent implements OnInit {
  currentDateForm = new FormControl(new Date());

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  dateChanged(event: MatDatepickerInputEvent<Date>) {
    this.currentDateForm.setValue(event.value);
  }

  openAddShiftDialog() {
    const dialogRef = this.dialog.open(AddShiftDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
