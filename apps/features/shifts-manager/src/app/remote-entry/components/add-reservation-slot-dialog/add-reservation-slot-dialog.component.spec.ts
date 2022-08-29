import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReservationSlotDialogComponent } from './add-reservation-slot-dialog.component';

describe('AddReservationSlotDialogComponent', () => {
  let component: AddReservationSlotDialogComponent;
  let fixture: ComponentFixture<AddReservationSlotDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddReservationSlotDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddReservationSlotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
