import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UnitDto} from 'src/app/common/models/dto';
import {UnitsService} from 'src/app/common/services/advanced';

@Component({
  selector: 'app-units-otp-code',
  templateUrl: './units-otp-code.component.html',
  styleUrls: ['./units-otp-code.component.scss']
})
export class UnitsOtpCodeComponent implements OnInit {
  @Input() selectedUnitModel: UnitDto = new UnitDto();
  @Output() onUnitOtpRewoked: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('frame') frame;
  spinnerStatus = false;

  constructor(private unitsService: UnitsService) { }

  ngOnInit() {
  }

  show() {
    this.frame.show();
  }

  requestOtp() {
    this.spinnerStatus = true;
    this.unitsService.requestOtp(this.selectedUnitModel.unitUId).subscribe(operation => {
      if (operation && operation.success) {
        this.onUnitOtpRewoked.emit();
        this.frame.hide();
      }
      this.spinnerStatus = false;
    });
  }

}
