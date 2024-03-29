import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShiftDialogComponent } from './add-shift-dialog.component';

describe('AddShiftDialogComponent', () => {
  let component: AddShiftDialogComponent;
  let fixture: ComponentFixture<AddShiftDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddShiftDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddShiftDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
