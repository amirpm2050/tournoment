/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GroupEntityComponentsPage, GroupEntityDeleteDialog, GroupEntityUpdatePage } from './group-entity.page-object';

const expect = chai.expect;

describe('GroupEntity e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let groupEntityUpdatePage: GroupEntityUpdatePage;
  let groupEntityComponentsPage: GroupEntityComponentsPage;
  /*let groupEntityDeleteDialog: GroupEntityDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load GroupEntities', async () => {
    await navBarPage.goToEntity('group-entity');
    groupEntityComponentsPage = new GroupEntityComponentsPage();
    await browser.wait(ec.visibilityOf(groupEntityComponentsPage.title), 5000);
    expect(await groupEntityComponentsPage.getTitle()).to.eq('tournomentApp.groupEntity.home.title');
  });

  it('should load create GroupEntity page', async () => {
    await groupEntityComponentsPage.clickOnCreateButton();
    groupEntityUpdatePage = new GroupEntityUpdatePage();
    expect(await groupEntityUpdatePage.getPageTitle()).to.eq('tournomentApp.groupEntity.home.createOrEditLabel');
    await groupEntityUpdatePage.cancel();
  });

  /* it('should create and save GroupEntities', async () => {
        const nbButtonsBeforeCreate = await groupEntityComponentsPage.countDeleteButtons();

        await groupEntityComponentsPage.clickOnCreateButton();
        await promise.all([
            groupEntityUpdatePage.setNameInput('name'),
        ]);
        expect(await groupEntityUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
        await groupEntityUpdatePage.save();
        expect(await groupEntityUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await groupEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last GroupEntity', async () => {
        const nbButtonsBeforeDelete = await groupEntityComponentsPage.countDeleteButtons();
        await groupEntityComponentsPage.clickOnLastDeleteButton();

        groupEntityDeleteDialog = new GroupEntityDeleteDialog();
        expect(await groupEntityDeleteDialog.getDialogTitle())
            .to.eq('tournomentApp.groupEntity.delete.question');
        await groupEntityDeleteDialog.clickOnConfirmButton();

        expect(await groupEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
