import {AdminSetupModel} from './admin-setup.model';
import {ConnectionStringMainModel} from './connection-string-main';
import {ConnectionStringSDKModel} from './connection-string-sdk';
import {GeneralAppSetupSettingsModel} from './general-app-setup-settings.model';

export class SettingsModel {
  connectionStringMain: ConnectionStringMainModel = new ConnectionStringMainModel;
  connectionStringSDK: ConnectionStringSDKModel = new ConnectionStringSDKModel;
  adminSetupModel: AdminSetupModel = new AdminSetupModel();
  generalAppSetupSettingsModel: GeneralAppSetupSettingsModel = new GeneralAppSetupSettingsModel();
}
