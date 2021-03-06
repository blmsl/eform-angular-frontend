import loginPage from "../../Page objects/Login.page";
import myEformsPage from "../../Page objects/MyEforms.page";

const expect = require('chai').expect;

describe('Main page', function () {
  before(function () {
    loginPage.open('/');
    loginPage.login();
  });
  it('should be able to sort by ID', function () {
    myEformsPage.idSortBtn.click();
    browser.pause(5000);
    let idListBefore = $$('#eform-id').map(item => {
      return item.getText();
    });
    myEformsPage.idSortBtn.click();
    browser.pause(5000);
    let idListAfter = $$('#eform-id').map(item => {
      return item.getText();
    });
    expect(idListBefore).deep.equal(idListAfter.reverse());
  });
  it('should be able to sort by "Created at"', function () {
    myEformsPage.createdAtSortBtn.click();
    browser.pause(5000);
    let createdAtListBefore = $$('#eform-created-at').map(item => {
      return new Date(item.getText());
    });
    myEformsPage.createdAtSortBtn.click();
    browser.pause(5000);
    let createdAtListAfter = $$('#eform-created-at').map(item => {
      return new Date(item.getText());
    });
    expect(createdAtListBefore).deep.equal(createdAtListAfter.reverse());
  });
  it('should be able to sort by "Name eForm"', function () {
    myEformsPage.eformNameSortBtn.click();
    browser.pause(5000);
    let nameEformListBefore = $$('#eform-label').map(item => {
      return item.getText();
    });
    myEformsPage.eformNameSortBtn.click();
    browser.pause(5000);
    let nameEformListAfter = $$('#eform-label').map(item => {
      return item.getText();
    });
    expect(nameEformListBefore).deep.equal(nameEformListAfter.reverse());
  });

});
