/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TeamEntityComponentsPage, TeamEntityDeleteDialog, TeamEntityUpdatePage } from './team-entity.page-object';

const expect = chai.expect;

describe('TeamEntity e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let teamEntityUpdatePage: TeamEntityUpdatePage;
  let teamEntityComponentsPage: TeamEntityComponentsPage;
  /*let teamEntityDeleteDialog: TeamEntityDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TeamEntities', async () => {
    await navBarPage.goToEntity('team-entity');
    teamEntityComponentsPage = new TeamEntityComponentsPage();
    await browser.wait(ec.visibilityOf(teamEntityComponentsPage.title), 5000);
    expect(await teamEntityComponentsPage.getTitle()).to.eq('tournomentApp.teamEntity.home.title');
  });

  it('should load create TeamEntity page', async () => {
    await teamEntityComponentsPage.clickOnCreateButton();
    teamEntityUpdatePage = new TeamEntityUpdatePage();
    expect(await teamEntityUpdatePage.getPageTitle()).to.eq('tournomentApp.teamEntity.home.createOrEditLabel');
    await teamEntityUpdatePage.cancel();
  });

  /* it('should create and save TeamEntities', async () => {
        const nbButtonsBeforeCreate = await teamEntityComponentsPage.countDeleteButtons();

        await teamEntityComponentsPage.clickOnCreateButton();
        await promise.all([
            teamEntityUpdatePage.setNameInput('name'),
            teamEntityUpdatePage.groupSelectLastOption(),
        ]);
        expect(await teamEntityUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
        await teamEntityUpdatePage.save();
        expect(await teamEntityUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await teamEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last TeamEntity', async () => {
        const nbButtonsBeforeDelete = await teamEntityComponentsPage.countDeleteButtons();
        await teamEntityComponentsPage.clickOnLastDeleteButton();

        teamEntityDeleteDialog = new TeamEntityDeleteDialog();
        expect(await teamEntityDeleteDialog.getDialogTitle())
            .to.eq('tournomentApp.teamEntity.delete.question');
        await teamEntityDeleteDialog.clickOnConfirmButton();

        expect(await teamEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
