import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA = [
  {
    name: 'Mario Rossi',
    role: 'Medical Staff',
    department: 'General',
    phone: '+39 123456789',
  },
  {
    name: 'Mario Rossi',
    role: 'Medical Staff',
    department: 'General',
    phone: '+39 123456789',
  },
  {
    name: 'Mario Rossi',
    role: 'Medical Staff',
    department: 'General',
    phone: '+39 123456789',
  },
];
@Component({
  selector: 'salus-features-staff-manager-entry',
  templateUrl: `entry.component.html`,
})
export class RemoteEntryComponent {
  displayedColumns: string[] = [
    'name',
    'role',
    'department',
    'phone',
    'actions',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
}
