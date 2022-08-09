import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IPerson, StaffService } from '@salus/graphql';

@Component({
  selector: 'salus-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css'],
})
export class StaffListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'role',
    'birthdate',
    'phone',
    'actions',
  ];
  dataSource = new MatTableDataSource<IPerson>();

  constructor(private staffService: StaffService) {}

  ngOnInit(): void {
    this.getStaff();
  }

  getStaff() {
    this.staffService
      .getAllPeople({ page: 0, size: 10 })
      .subscribe((result) => {
        console.log(result);
        if (result.data) {
          this.dataSource = new MatTableDataSource(result.data.allPeople);
        }
      });
  }
}
