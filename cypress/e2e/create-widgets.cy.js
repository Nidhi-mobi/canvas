import { config } from '../config';

describe('Create a sticker', () => {
  before(() => {
    // login to the app
    cy.login();
  });

  beforeEach(() => {
    cy.createBoard().then((boardId) => {
      cy.visit(`/app/board/${boardId}`);
    });
  });

  afterEach(() => {
    // delete the miro board
    cy.deleteBoard().then((response) => {
      cy.log(response.status);
      cy.log(response.body);
    });
  });

  it('can create a sticker on a miro board', () => {
    cy.contains('Get faster access to your boards by using Miro apps.',{ timeout: 30000 }).should('be.visible');
    cy.get('.AT__toolbar--STICKERS')
        .click();
    // cy.get('.AT__toolbar--STICKERS')
    //     .trigger('mousedown', { which: 1, pageX: 600, pageY: 100 })
    //     .trigger('mousemove', { which: 1, pageX: 600, pageY: 600 })
    //     .trigger('mouseup')
    cy.get('#pixiCanvasContainer').within(()=> {
      cy.get('#active_users_layer').then($canvas => {
        // Get dimension of the canvas
        const canvasWidth = $canvas.width();
        const canvasHeight = $canvas.height();

        cy.log(`canvasWidth: ${canvasWidth}`);
        cy.log(`canvasHeight: ${canvasHeight}`);

        // Divide in half since cursor will be at center of canvas

        const canvasCenterX = canvasWidth / 2;
        const canvasCenterY = canvasHeight / 2;

        // Determine the click position by dissecting the space where the button is
        // This helps allow the test to work responsively

        const buttonX = canvasCenterX + ( ( canvasCenterX / 3 ) * 2 );
        const buttonY = canvasCenterY + ( ( canvasCenterY / 3 ) * 2 );

        cy.wrap($canvas)
            .scrollIntoView()
            .click(buttonX, buttonY);
      });
    })
  });

  it('can create a text on a miro board', () => {});
});
