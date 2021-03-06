import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {CaseModel} from 'src/app/common/models/cases';
import {CasesService} from 'src/app/common/services/cases';

@Component({
  selector: 'app-remove-case-modal',
  templateUrl: './remove-case-modal.component.html',
  styleUrls: ['./remove-case-modal.component.scss']
})
export class RemoveCaseModalComponent implements OnInit {
  @ViewChild('frame') frame;
  @Output() onCaseDeleted: EventEmitter<void> = new EventEmitter<void>();
  selectedCaseModel: CaseModel = new CaseModel();
  spinnerStatus = false;

  constructor(private casesService: CasesService) { }

  ngOnInit() {
  }

  show(caseModel: CaseModel) {
    this.selectedCaseModel = caseModel;
    this.frame.show();
  }

  submitCaseDelete() {
    this.spinnerStatus = true;
    this.casesService.deleteCase(this.selectedCaseModel.id).subscribe((data => {
      if (data && data.success) {
        this.onCaseDeleted.emit();
        this.frame.hide();
      }
      this.spinnerStatus = false;
    }));
  }
}
