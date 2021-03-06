import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {SiteNameModel} from 'src/app/common/models/advanced';
import {SiteNameDto} from 'src/app/common/models/dto';
import {SitesService} from 'src/app/common/services/advanced';

@Component({
  selector: 'app-site-edit',
  templateUrl: './site-edit.component.html'
})
export class SiteEditComponent implements OnInit {
  @Input() siteNameDto: SiteNameDto = new SiteNameDto();
  @ViewChild('frame') frame;
  siteModel: SiteNameModel = new SiteNameModel();
  spinnerStatus = false;

  constructor(private sitesService: SitesService, private toastrService: ToastrService) { }

  ngOnInit() {
  }

  show() {
    this.frame.show();
  }

  updateSingle() {
    this.spinnerStatus = true;
    this.siteModel.id = this.siteNameDto.siteUId;
    this.siteModel.siteName = this.siteNameDto.siteName;
    this.sitesService.updateSingleSite(this.siteModel).subscribe(operation => {
      if (operation && operation.success) {
        this.frame.hide();
        this.toastrService.success('Site successfully updated');
      }
      this.spinnerStatus = false;
    });
  }

}
