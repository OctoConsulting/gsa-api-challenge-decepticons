import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Output() filterChange = new EventEmitter();

  public form;

  public orgList = [
    'General Services Administration',
    'Department of Defense'
  ];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initFormControls();
  }

  private initFormControls(): void {
    this.form = this.fb.group({
      startDate: [],
      endDate: [],
      org: []
    });

    this.form.valueChanges.subscribe(
      newValue => {
        if ((newValue.startDate && newValue.endDate) || newValue.org) {
          this.filterChange.emit(newValue);
        }
      }
    );
  }

}
