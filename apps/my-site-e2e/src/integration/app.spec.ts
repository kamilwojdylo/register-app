import { getUsername, getUsernameError, getRegisterButton, getPassword, getPasswordError, getFeedbackMessage, getPasswordRepeat, getPasswordRepeatError } from '../support/app.po';

describe('my-site', () => {
  beforeEach(() => cy.visit('/'));
  describe('verifies and informs that', () => {
    it('The username field accepts alpha-numeric values only', () => {
      getUsername().type('wrong-username!');
      getRegisterButton().click();
      getUsernameError().contains('Only letters and numbers are allowed for username');
      getFeedbackMessage().should('not.be.visible');
    });

    it('The username length is no less than 5 characters', () => {
      getUsername().type('user');
      getRegisterButton().click();
      getUsernameError().contains('Username should be at least 5 characters long');
      getFeedbackMessage().should('not.be.visible');
    });

    it('The username is already registered', () => {
      const alreadyRegisteredUser = 'alreadyRegisteredUser'
      getUsername().type(alreadyRegisteredUser);
      getRegisterButton().click();
      getUsernameError().contains(`"${alreadyRegisteredUser}" user is already registered`);
      getFeedbackMessage().should('not.be.visible');
    });

    it('The password has a minimum length of 8 characters ', () => {
      getPassword().type('shortp');
      getRegisterButton().click();
      getPasswordError().contains('Password should be at least 8 characters long');
      getFeedbackMessage().should('not.be.visible');
    });
    it('The password contains at least 1 number', () => {
      getPassword().type('password-without-a-number');
      getRegisterButton().click();
      getPasswordError().contains('Password should contain at least one number');
      getFeedbackMessage().should('not.be.visible');
    });

    it('The password contains at least 1 uppercase', () => {
      getPassword().type('password-without-uppercase1');
      getRegisterButton().click();
      getPasswordError().contains('Password should contain at least one uppercase character');
      getFeedbackMessage().should('not.be.visible');
    });

    it('The password contains at least 1 lowercase', () => {
      getPassword().type('PASSWORD-WITHOUT-LOWERCASE1');
      getRegisterButton().click();
      getPasswordError().contains('Password should contain at least one lowercase character');
      getFeedbackMessage().should('not.be.visible');
    });

    it('The password and repeated password are the same', () => {
      getPassword().type('ProperPassword1');
      getPasswordRepeat().type('ProperPassword11');
      getRegisterButton().click();
      getPasswordRepeatError().contains('Both passwords should be the same');
      getFeedbackMessage().should('not.be.visible');
    });

    it('The user has been registered', () => {
      getUsername().type('ProperUsername1');
      getPassword().type('ProperPassword1');
      getPasswordRepeat().type('ProperPassword1');
      getRegisterButton().click();
      getUsernameError().should('be.empty');
      getPasswordError().should('not.exist');
      getPasswordRepeatError().should('not.exist');
      getFeedbackMessage().contains('Your account has been registered');
      getUsername().should('be.empty');
      getPassword().should('be.empty');
      getPasswordRepeat().should('be.empty');
    });
  });
});
