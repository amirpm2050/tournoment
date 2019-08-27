/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MatchEntityComponentsPage, MatchEntityDeleteDialog, MatchEntityUpdatePage } from './match-entity.page-object';

const expect = chai.expect;

describe('MatchEntity e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let matchEntityUpdatePage: MatchEntityUpdatePage;
  let matchEntityComponentsPage: MatchEntityComponentsPage;
  let matchEntityDeleteDialog: MatchEntityDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MatchEntities', async () => {
    await navBarPage.goToEntity('match-entity');
    matchEntityComponentsPage = new MatchEntityComponentsPage();
    await browser.wait(ec.visibilityOf(matchEntityComponentsPage.title), 5000);
    expect(await matchEntityComponentsPage.getTitle()).to.eq('tournomentApp.matchEntity.home.title');
  });

  it('should load create MatchEntity page', async () => {
    await matchEntityComponentsPage.clickOnCreateButton();
    matchEntityUpdatePage = new MatchEntityUpdatePage();
    expect(await matchEntityUpdatePage.getPageTitle()).to.eq('tournomentApp.matchEntity.home.createOrEditLabel');
    await matchEntityUpdatePage.cancel();
  });

  it('should create and save MatchEntities', async () => {
    const nbButtonsBeforeCreate = await matchEntityComponentsPage.countDeleteButtons();

    await matchEntityComponentsPage.clickOnCreateButton();
    await promise.all([
      matchEntityUpdatePage.matchTypeSelectLastOption(),
      matchEntityUpdatePage.setPlaceInput('place'),
      matchEntityUpdatePage.setPointInput('5'),
      matchEntityUpdatePage.setScoreInput('5'),
      matchEntityUpdatePage.groupSelectLastOption()
    ]);
    expect(await matchEntityUpdatePage.getPlaceInput()).to.eq('place', 'Expected Place value to be equals to place');
    expect(await matchEntityUpdatePage.getPointInput()).to.eq('5', 'Expected point value to be equals to 5');
    expect(await matchEntityUpdatePage.getScoreInput()).to.eq('5', 'Expected score value to be equals to 5');
    await matchEntityUpdatePage.save();
    expect(await matchEntityUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await matchEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last MatchEntity', async () => {
    const nbButtonsBeforeDelete = await matchEntityComponentsPage.countDeleteButtons();
    await matchEntityComponentsPage.clickOnLastDeleteButton();

    matchEntityDeleteDialog = new MatchEntityDeleteDialog();
    expect(await matchEntityDeleteDialog.getDialogTitle()).to.eq('tournomentApp.matchEntity.delete.question');
    await matchEntityDeleteDialog.clickOnConfirmButton();

    expect(await matchEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
