import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnChanges {
  @Input() setDateRange = {};
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
      org: []
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
  }

  private initFormControls(): void {
    this.form.valueChanges.subscribe(
      newValue => {
        if ((newValue.startDate && newValue.endDate) || newValue.org) {
          this.filterChange.emit(newValue);
        }
      }
    );
  }

}
