export const getGreeting = () => cy.get('h1');
export const getUsername = () => cy.get('#username');
export const getUsernameError = () => cy.get('#username-error');
export const getPassword = () => cy.get('#password');
export const getPasswordError = () => cy.get('#password-error');
export const getPasswordRepeat = () => cy.get('#passwordRepeat');
export const getPasswordRepeatError = () => cy.get('#passwordRepeat-error');

export const getRegisterButton = () => cy.get('#register-btn');

export const getFeedbackMessage = () => cy.get('#feedback-msg');