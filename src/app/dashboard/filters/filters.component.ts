import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnChanges {
  @Input() setDateRange = {};
  @Input() setOrgList = {};
  @Output() filterChange = new EventEmitter();

  public form;

  public orgList = [
    'General Services Administration',
    'Department of Defense'
  ];
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      startDate: [],
      endDate: [],
      orgname: []
    });
  }

  ngOnInit(): void {
    this.initFormControls();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.setDateRange) {
      this.form.get('startDate').setValue(changes.setDateRange.currentValue['startDate']);
      this.form.get('endDate').setValue(changes.setDateRange.currentValue['endDate']);
    }
    if (changes.setOrgList) {
      this.onSetOrgList(changes.setOrgList.currentValue);
    }
  }

  private initFormControls(): void {
    this.form.valueChanges.subscribe(
      newValue => {
        if ((newValue.startDate && newValue.endDate && this.form.valid) || newValue.org) {
          if (newValue.startDate) {
            newValue['startDate'] = moment(newValue.startDate).format('YYYY-MM-DD').toString();
          }
          if (newValue.endDate) {
            newValue['endDate'] = moment(newValue.endDate).format('YYYY-MM-DD').toString();
          }
          this.filterChange.emit(newValue);
        }
      }
    );
  }

  private onSetOrgList(orgList: any): void {
    this.orgList = orgList.map(org => org.key);
  }

}
