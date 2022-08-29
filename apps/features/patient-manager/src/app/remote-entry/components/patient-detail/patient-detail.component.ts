import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService, IPerson } from '@salus/graphql';

@Component({
  selector: 'salus-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css'],
})
export class PatientDetailComponent implements OnInit {
  currentPatient: IPerson | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCurrentPatient(params['id']);
    });
  }

  getCurrentPatient(id: string) {
    this.commonService.getPersonById(id).subscribe((response) => {
      if (response.data.person) {
        this.currentPatient = response.data.person;
      }
    });
  }
}
