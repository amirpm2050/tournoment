import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class PlayerEntityComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-player-entity div table .btn-danger'));
  title = element.all(by.css('jhi-player-entity div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class PlayerEntityUpdatePage {
  pageTitle = element(by.id('jhi-player-entity-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  mobileInput = element(by.id('field_mobile'));
  teamSelect = element(by.id('field_team'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async setMobileInput(mobile) {
    await this.mobileInput.sendKeys(mobile);
  }

  async getMobileInput() {
    return await this.mobileInput.getAttribute('value');
  }

  async teamSelectLastOption(timeout?: number) {
    await this.teamSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async teamSelectOption(option) {
    await this.teamSelect.sendKeys(option);
  }

  getTeamSelect(): ElementFinder {
    return this.teamSelect;
  }

  async getTeamSelectedOption() {
    return await this.teamSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class PlayerEntityDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-playerEntity-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-playerEntity'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
