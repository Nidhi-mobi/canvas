import { config } from '../config';

let boardId;

Cypress.Commands.add('login', () => {
  cy.visit('/login');
  cy.get('[data-testid="mr-form-login-email-1"]').type(config.EMAIL);
  cy.get('[data-testid="mr-form-login-password-1"]').type(config.PASSWORD);
  cy.get('[data-testid="mr-form-login-btn-signin-1"]').click();
});

Cypress.Commands.add('createBoard', () => {
  return cy
    .request({
      method: 'POST',
      url: `${config.API_BASEURL}/boards`,
      auth: {
        bearer: config.ACCESS_TOKEN,
      },
      body: {
        name: 'Untitled',
        policy: {
          permissionsPolicy: {
            collaborationToolsStartAccess: 'all_editors',
            copyAccess: 'anyone',
            sharingAccess: 'team_members_with_editing_rights',
          },
          sharingPolicy: {
            access: 'private',
            inviteToAccountAndBoardLinkAccess: 'no_access',
            organizationAccess: 'private',
            teamAccess: 'private',
          },
        },
      },
    })
    .then((response) => {
      const { id } = response.body;
      cy.log(`ID: ${id}`);
      cy.wrap(id).as('boardId');
    });
});

Cypress.Commands.add('deleteBoard', () => {
  cy.get('@boardId').then((boardId) => {
    cy.log(`boardId: ${boardId}`);
    cy.request({
      method: 'DELETE',
      url: `${config.API_BASEURL}/boards/${boardId}`,
      auth: {
        bearer: config.ACCESS_TOKEN,
      },
    });
  });
});
