import loginPage from '../../Page objects/Login.page';
import myEformsPage from "../../Page objects/MyEforms.page";
import {Guid} from "guid-typescript";

const expect = require('chai').expect;
describe('My eforms', function () {
  before(function () {
    loginPage.open('/');
    loginPage.login();
  });
  it('should create eform without any tags', function () {
    const newEformLabel = Guid.create().toString();
    const addedAndSelectedTags = myEformsPage.createNewEform(newEformLabel);
    const eform = myEformsPage.getFirstMyEformsRowObj();
    expect(eform.eFormName).equal(newEformLabel);
    expect(eform.tags.length).equal(0);
  });
  it('should create eform simultaneously with creating 1 tag', function () {
    const newEformLabel = Guid.create().toString();
    const createdTag = Guid.create().toString();
    const addedAndSelectedTags = myEformsPage.createNewEform(newEformLabel, [createdTag]);
    const eform = myEformsPage.getFirstMyEformsRowObj();
    expect(eform.eFormName).equal(newEformLabel);
    expect(eform.tags.length).equal(1);
    expect(eform.tags[0].getText()).equal(createdTag);
  });
  it('should create eform simultaneously with creating 2 tags', function () {
    const newEformLabel = Guid.create().toString();
    const createdTags = [Guid.create().toString(), Guid.create().toString()];
    const addedAndSelectedTags = myEformsPage.createNewEform(newEformLabel, createdTags);
    const eform = myEformsPage.getFirstMyEformsRowObj();
    const tagsTexts = eform.tags.map(el => {
      return el.getText();
    });
    expect(eform.eFormName).equal(newEformLabel);
    expect(eform.tags.length).equal(createdTags.length);
    expect(tagsTexts).to.include.members(createdTags);
  });
  it('should create eform with creating 1 tag and using 1 already prepared tag', function () {
    const newEformLabel = Guid.create().toString();
    const createdTags = [Guid.create().toString()];
    const tagAddedNum = 1;
    const addedAndSelectedTags = myEformsPage.createNewEform(newEformLabel, createdTags, tagAddedNum);
    const eform = myEformsPage.getFirstMyEformsRowObj();
    const tagsTexts = eform.tags.map(el => {
      return el.getText();
    });
    expect(eform.eFormName).equal(newEformLabel);
    expect(eform.tags.length).equal(createdTags.length + tagAddedNum);
    expect(tagsTexts).to.include.members(createdTags);
    expect(tagsTexts).to.include.members(addedAndSelectedTags.selected)
  });
  it('should create eform while adding 1 already prepared tag', function () {
    const newEformLabel = Guid.create().toString();
    const tagAddedNum = 1;
    const addedAndSelectedTags = myEformsPage.createNewEform(newEformLabel, undefined, tagAddedNum);
    const eform = myEformsPage.getFirstMyEformsRowObj();
    const tagsTexts = eform.tags.map(el => {
      return el.getText();
    });
    expect(eform.eFormName).equal(newEformLabel);
    expect(eform.tags.length).equal(tagAddedNum);
    expect(tagsTexts).to.include.members(addedAndSelectedTags.selected);
  });
  it('should create eform while adding more than 2 already prepared tags', function () {
    const newEformLabel = Guid.create().toString();
    const tagAddedNum = 2;
    const addedAndSelectedTags = myEformsPage.createNewEform(newEformLabel, undefined, tagAddedNum);
    const eform = myEformsPage.getFirstMyEformsRowObj();
    const tagsTexts = eform.tags.map(el => {
      return el.getText();
    });
    expect(eform.eFormName).equal(newEformLabel);
    expect(eform.tags.length).equal(tagAddedNum);
    expect(tagsTexts).to.include.members(addedAndSelectedTags.selected);
  });
  it('should not create eform if xml is empty', function () {
    myEformsPage.newEformBtn.click();
    browser.pause(5000);
    expect(myEformsPage.createEformBtn.isEnabled()).equal(false);
  });
});
