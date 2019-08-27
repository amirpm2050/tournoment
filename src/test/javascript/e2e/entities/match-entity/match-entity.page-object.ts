import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class MatchEntityComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-match-entity div table .btn-danger'));
  title = element.all(by.css('jhi-match-entity div h2#page-heading span')).first();

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

export class MatchEntityUpdatePage {
  pageTitle = element(by.id('jhi-match-entity-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  matchTypeSelect = element(by.id('field_matchType'));
  placeInput = element(by.id('field_place'));
  pointInput = element(by.id('field_point'));
  scoreInput = element(by.id('field_score'));
  groupSelect = element(by.id('field_group'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setMatchTypeSelect(matchType) {
    await this.matchTypeSelect.sendKeys(matchType);
  }

  async getMatchTypeSelect() {
    return await this.matchTypeSelect.element(by.css('option:checked')).getText();
  }

  async matchTypeSelectLastOption(timeout?: number) {
    await this.matchTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setPlaceInput(place) {
    await this.placeInput.sendKeys(place);
  }

  async getPlaceInput() {
    return await this.placeInput.getAttribute('value');
  }

  async setPointInput(point) {
    await this.pointInput.sendKeys(point);
  }

  async getPointInput() {
    return await this.pointInput.getAttribute('value');
  }

  async setScoreInput(score) {
    await this.scoreInput.sendKeys(score);
  }

  async getScoreInput() {
    return await this.scoreInput.getAttribute('value');
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

export class MatchEntityDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-matchEntity-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-matchEntity'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
