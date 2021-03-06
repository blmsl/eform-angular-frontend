import {Component, Input, OnInit} from '@angular/core';
import {format} from "date-fns";
import {DateTimeAdapter} from 'ng-pick-datetime';
import {CaseFieldValue} from 'src/app/common/models/cases';
import {LocaleService} from 'src/app/common/services/auth';

@Component({
  selector: 'element-date',
  templateUrl: './element-date.component.html',
  styleUrls: ['./element-date.component.scss']
})
export class ElementDateComponent {
  fieldValueObj: CaseFieldValue = new CaseFieldValue();

  constructor(dateTimeAdapter: DateTimeAdapter<any>,
              private localeService: LocaleService) {
    dateTimeAdapter.setLocale(this.localeService.getCurrentUserLocale()); // change locale to Japanese
  }

  @Input()
  get fieldValue() {
    return this.fieldValueObj;
  }

  set fieldValue(val) {
    this.fieldValueObj = val;
  }

  onDateSelected(e: any) {
    this.fieldValueObj.value = format(e.value, 'YYYY-MM-DD');
  }
}
