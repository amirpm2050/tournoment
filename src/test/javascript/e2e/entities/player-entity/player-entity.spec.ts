/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PlayerEntityComponentsPage, PlayerEntityDeleteDialog, PlayerEntityUpdatePage } from './player-entity.page-object';

const expect = chai.expect;

describe('PlayerEntity e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let playerEntityUpdatePage: PlayerEntityUpdatePage;
  let playerEntityComponentsPage: PlayerEntityComponentsPage;
  let playerEntityDeleteDialog: PlayerEntityDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PlayerEntities', async () => {
    await navBarPage.goToEntity('player-entity');
    playerEntityComponentsPage = new PlayerEntityComponentsPage();
    await browser.wait(ec.visibilityOf(playerEntityComponentsPage.title), 5000);
    expect(await playerEntityComponentsPage.getTitle()).to.eq('tournomentApp.playerEntity.home.title');
  });

  it('should load create PlayerEntity page', async () => {
    await playerEntityComponentsPage.clickOnCreateButton();
    playerEntityUpdatePage = new PlayerEntityUpdatePage();
    expect(await playerEntityUpdatePage.getPageTitle()).to.eq('tournomentApp.playerEntity.home.createOrEditLabel');
    await playerEntityUpdatePage.cancel();
  });

  it('should create and save PlayerEntities', async () => {
    const nbButtonsBeforeCreate = await playerEntityComponentsPage.countDeleteButtons();

    await playerEntityComponentsPage.clickOnCreateButton();
    await promise.all([
      playerEntityUpdatePage.setNameInput('name'),
      playerEntityUpdatePage.setMobileInput('mobile'),
      playerEntityUpdatePage.teamSelectLastOption()
    ]);
    expect(await playerEntityUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await playerEntityUpdatePage.getMobileInput()).to.eq('mobile', 'Expected Mobile value to be equals to mobile');
    await playerEntityUpdatePage.save();
    expect(await playerEntityUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await playerEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last PlayerEntity', async () => {
    const nbButtonsBeforeDelete = await playerEntityComponentsPage.countDeleteButtons();
    await playerEntityComponentsPage.clickOnLastDeleteButton();

    playerEntityDeleteDialog = new PlayerEntityDeleteDialog();
    expect(await playerEntityDeleteDialog.getDialogTitle()).to.eq('tournomentApp.playerEntity.delete.question');
    await playerEntityDeleteDialog.clickOnConfirmButton();

    expect(await playerEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
