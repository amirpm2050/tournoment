import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class TeamEntityComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-team-entity div table .btn-danger'));
  title = element.all(by.css('jhi-team-entity div h2#page-heading span')).first();

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

export class TeamEntityUpdatePage {
  pageTitle = element(by.id('jhi-team-entity-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  groupSelect = element(by.id('field_group'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async groupSelectLastOption(timeout?: number) {
    await this.groupSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async groupSelectOption(option) {
    await this.groupSelect.sendKeys(option);
  }

  getGroupSelect(): ElementFinder {
    return this.groupSelect;
  }

  async getGroupSelectedOption() {
    return await this.groupSelect.element(by.css('option:checked')).getText();
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

export class TeamEntityDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-teamEntity-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-teamEntity'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
