import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {CaseFieldValue} from 'src/app/common/models/cases';
import {CommonDictionaryTextModel} from 'src/app/common/models/common';
import {EntitySelectService} from 'src/app/common/services/advanced';

@Component({
  selector: 'element-entityselect',
  templateUrl: './element-entityselect.component.html',
  styleUrls: ['./element-entityselect.component.scss']
})
export class ElementEntityselectComponent implements OnInit {
  items: Array<CommonDictionaryTextModel> = [];
  fieldValueObj: CaseFieldValue = new CaseFieldValue();
  @Input() entityGroupUid: string;

  @Input()
  get fieldValue() {
    return this.fieldValueObj;
  }

  set fieldValue(val) {
    this.fieldValueObj = val;
  }

  constructor(private entitySelectService: EntitySelectService) {
  }

  ngOnInit() {
    this.entitySelectService.getEntitySelectableGroupDictionary(this.entityGroupUid).subscribe((operation => {
      if (operation && operation.success) {
        this.items  = operation.model;
      }
    }));
  }

  onSelectedChanged(e: any) {
    this.fieldValue.value = e.id;
  }
}
