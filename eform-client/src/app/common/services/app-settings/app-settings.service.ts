import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {
  AdminSettingsModel,
  HeaderSettingsModel,
  LoginPageSettingsModel,
  OperationDataResult,
  OperationResult
} from 'src/app/common/models';
import {SettingsModel} from 'src/app/common/models/settings';

import {BaseService} from '../base.service';

const SettingsMethods = {
  UpdateConnectionString: '/api/settings/connection-string',
  ConnectionStringExist: '/api/settings/connection-string-exist',
  GetAdminSettings: '/api/settings/admin',
  ResetLoginPageSettings: '/api/settings/reset-login-page',
  ResetHeaderSettings: '/api/settings/reset-page-header',
  GetLoginPageSettings: '/api/settings/login-page',
  GetHeaderSettings: '/api/settings/page-header',
  GetAnonymousImage: 'api/images/login-page-images',
  GetAuthorizedImage: 'api/images/eform-images'
}; 

@Injectable()
export class AppSettingsService extends BaseService {
  private headers: Headers;

  constructor(private _http: HttpClient, router: Router, toastrService: ToastrService) {
    super(_http, router, toastrService);
  }

  updateConnectionString(model: SettingsModel): Observable<OperationResult> {
    return this.post<SettingsModel>(SettingsMethods.UpdateConnectionString, model);
  }
  connectionStringExist(): Observable<OperationResult> {
    return this.get(SettingsMethods.ConnectionStringExist);
  }
  getAdminSettings(): Observable<OperationDataResult<AdminSettingsModel>> {
    return this.get<AdminSettingsModel>(SettingsMethods.GetAdminSettings);
  }
  getLoginPageSettings(): Observable<OperationDataResult<LoginPageSettingsModel>> {
    return this.get<LoginPageSettingsModel>(SettingsMethods.GetLoginPageSettings);
  }
  getHeaderSettings(): Observable<OperationDataResult<HeaderSettingsModel>> {
    return this.get<HeaderSettingsModel>(SettingsMethods.GetHeaderSettings);
  }
  updateAdminSettings(model: AdminSettingsModel): Observable<OperationResult> {
    return this.post(SettingsMethods.GetAdminSettings, model);
  }
  resetLoginPageSettings(): Observable<OperationResult> {
    return this.get(SettingsMethods.ResetLoginPageSettings);
  }
  resetHeaderSettings(): Observable<OperationResult> {
    return this.get(SettingsMethods.ResetHeaderSettings);
  }
  getOneAdminSetting(attribute: string): Observable<OperationDataResult<AdminSettingsModel>> {
    return this.get<AdminSettingsModel>(SettingsMethods.GetAdminSettings, attribute);
  }
}
