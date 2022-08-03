import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StaffService } from '@salus/graphql';
@Component({
  selector: 'salus-features-staff-manager-entry',
  templateUrl: `entry.component.html`,
})
export class RemoteEntryComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'role',
    'department',
    'phone',
    'actions',
  ];
  dataSource = new MatTableDataSource();

  constructor(private staffService: StaffService) {}

  ngOnInit() {
    this.staffService
      .getAllPeople({ page: 0, size: 10 })
      .subscribe((result) => {
        console.log(result);
        const data = result.data as any;
        this.dataSource = new MatTableDataSource(data.staff.allPeople);
      })
      .unsubscribe();
  }
}
