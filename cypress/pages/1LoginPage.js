class LoginPage {

url="https://www.kitapsepeti.com/"; 
cerezKabulEtBtn=".cc-nb-okagree";
avatarIkon='header i.custom-user';
eposta="#header-email";
sifre="#header-password";
sifremiUnuttum='a[href="/uye-sifre-hatirlat"]';
beniHatirlaCheckbox='label[for="header-remember"]';
girisYapBtn="#login-btn-322";
kayitOlBtn="#register-btn-322";
hataMesaji=".popover-item.fade-in.inline";
hata2mesaji="span.popover-item";

  //Site ziyareti
  visitPage() {
    cy.visit(this.url);
  }
 
  // Çerez butonu varsa tıkla, yoksa testi bozmadan devam et
  acceptCookies() {
    cy.get('body').then(($body) => {
        if ($body.find(this.cerezKabulEtBtn).length > 0) {
            cy.get(this.cerezKabulEtBtn).click();
        }
    })}

  //Announcement popupina kapatma
  closeAnnouncePopupIfExists() {
  cy.get('body').then(($body) => {
    if ($body.find('.t-modal-close').length > 0) {
      cy.get('.t-modal-close')
        .should('be.visible')
        .click({ force: true });
     }
    });
  }

  waitForAnnouncePopupToDisappear() {
  cy.get('body').then(($body) => {
    if ($body.find('.t-modal-content').length > 0) {
      cy.get('.t-modal-content', { timeout: 10000 })
        .should('not.exist');
     }
   });
  }
  
  //Avatar ikonuna tıklama
  clickAvatar() {
  cy.get(this.avatarIkon)
    .should('be.visible')
    .click({ force: true });
  }
  
  //Email ile giriş butonuna tıklama
  clickEmailLogin() {
    cy.contains('a', 'E-posta ile Giriş').click({ force: true });
  }

  get emailSpace() {
    return cy.get(this.eposta);
  }

  get passwordSpace() {
    return cy.get(this.sifre);
  }

  get clickLogin() {
    return cy.get(this.girisYapBtn);
  }

  checkRememberMe() {
    cy.get(this.beniHatirlaCheckbox).should('be.visible');
  }

  checkKayitOl() {
    cy.get(this.kayitOlBtn).should('be.visible');
  }

  get checkPasswordForget() {
    return cy.get(this.sifremiUnuttum);
  }

  verifyErrorMessage(expectedText) {
  cy.contains('.popover-item', expectedText, { timeout: 10000 })
    .should('exist')
}
  //16 giriş denemesinden sonra kitlenip hata mesajı vermesi
  verifyRateLimitError(partialMessage) {
  cy.contains(partialMessage, { timeout: 25000, matchCase: false })
    .should('be.visible');
}

}

export default new LoginPage();
