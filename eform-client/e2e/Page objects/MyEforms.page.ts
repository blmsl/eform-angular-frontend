import {PageWithNavbarPage} from './PageWithNavbar.page';
import XMLForEform from "../Constants/XMLForEform";

class MyEformsPage extends PageWithNavbarPage {
  constructor() {
    super();
  }

  public get newEformBtn() {
    return browser.element('#newEFormBtn');
  }

  public getRowNum(): number {
    return 10;
  }

  public get idSortBtn() {
    return browser.element('#idSort');
  }

  public get createdAtSortBtn() {
    return browser.element('#createdAtSort');
  }

  public get eformNameSortBtn() {
    return browser.element('#nameEFormSort')
  }


  // Create eform modal
  public get createEformTagSelector() {
    return browser.element('#createEFormMultiSelector');
  }

  public get createEformNewTagInput() {
    return browser.element('#addTagInput');
  }

  public get xmlTextArea() {
    return browser.element('#eFormXml');
  }

  public get createEformBtn() {
    return browser.element('#createEformBtn');
  }

  public get cancelCreateEformBtn() {
    return browser.element('#cancelCreateEformBtn');
  }

  getFirstMyEformsRowObj(): MyEformsRowObject {
    return new MyEformsRowObject(1);
  }

  createNewEform(eFormLabel, newTagsList = [], tagAddedNum = 0) {
    this.newEformBtn.click();
    browser.pause(3000);
    // Create replaced xml and insert it in textarea
    let xml = XMLForEform.XML.replace('TEST_LABEL', eFormLabel);
    browser.execute(function (xmlText) {
      (<HTMLInputElement>document.getElementById("eFormXml")).value = xmlText;
    }, xml);
    this.xmlTextArea.addValue(' ');
    // Create new tags
    let addedTags: string[] = newTagsList;
    if (newTagsList.length > 0) {
      this.createEformNewTagInput.setValue(newTagsList.join(','));
    }
    // Add existing tags
    let selectedTags: string[] = [];
    if (tagAddedNum > 0) {
      for (let i = 0; i < tagAddedNum; i++) {
        this.createEformTagSelector.click();
        browser.pause(2000);
        let selectedTag = $('.ng-option:not(.ng-option-selected)');
        selectedTags.push(selectedTag.getText());
        selectedTag.click();
        browser.pause(2000);
      }
    }
    this.createEformBtn.click();
    browser.pause(10000);
    return {added: addedTags, selected: selectedTags}
  }
}

const myEformsPage = new MyEformsPage();
export default myEformsPage;

class MyEformsRowObject {
  constructor(rowNum) {
    this.id = +$$('#eform-id')[rowNum - 1];
    this.createdAt = new Date($$('#eform-created-at')[rowNum - 1].getText());
    this.eFormName = $$('#eform-label')[rowNum - 1].getText();
    this.tags = $$(`//*[@id="mainPageEFormsTableBody"]/tr[${rowNum}]//*[@id="eform-tag"]`);
    this.pairs = $$(`//*[@id="mainPageEFormsTableBody"]/tr[${rowNum}]//*[@id="eform-tag"]`);
    this.editTagsBtn = $$('#eform-edit-btn')[rowNum - 1];
    this.pairEformBtn = $$('#eform-pairing-btn')[rowNum - 1];
    this.editColumnsBtn = $$('#edit-columnts-btn')[rowNum - 1];
    this.deleteBtn = $$('#delete-eform-btn')[rowNum - 1];
    this.uploadZipArchiveBtn = $$('#upload-zip-btn')[rowNum - 1]
  }

  id: number;
  createdAt: Date;
  eFormName;
  tags;
  editTagsBtn;
  pairs;
  pairEformBtn;
  editColumnsBtn;
  deleteBtn;
  uploadZipArchiveBtn;
}
