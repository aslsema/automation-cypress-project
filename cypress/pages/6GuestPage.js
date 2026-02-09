class Guest {

buyButtonGuest='#cart-popup-continue-shopping';
guestContinueButtonText='Üye Olmadan Devam Et';

//Adres alanının teyidi
namesurnameCheckinAddress='#fullname';
emailCheckinAddress='input[name="email"]';
phoneCheckinAddress='#mobile_phone';
cityCheckinAddress='#city_code';
townshipCheckinAddress='#town_code'
districtCheckinAddress='#district_code';
fulladdressCheck='#address';

  /* ================= ACTIONS ================= */

  continueWithoutLogin() {
    cy.contains('button', this.guestContinueButtonText)
      .should('be.visible')
      .click();
  }

  //Adres Bilgilerini Doldurma
  fillGuestAddressForm(data) {
    if (data.email) {
      cy.get(this.emailCheckinAddress).type(data.email);
    }
 
    if (data.name) {
      cy.get(this.namesurnameCheckinAddress).type(data.name);
    }
 
    if (data.city) {
      cy.get(this.cityCheckinAddress).should('be.visible').select(data.city);
    }

    if (data.town) {
      cy.get(this.townshipCheckinAddress).select(data.town);
    
      cy.get(this.districtCheckinAddress, { timeout: 10000 }).should('not.be.disabled');
    }

    if (data.district) {
      cy.get(this.districtCheckinAddress).select(data.district);
    }

    if (data.address) {
      cy.get(this.fulladdressCheck).type(data.address);
    }
 
    if (data.phone) {
      cy.get(this.phoneCheckinAddress).type(data.phone);
    }
  }

  //Adresi Kaydetme
  saveAddress() {
    cy.contains('button', 'Adresi Kaydet').click();
  }

  /* ================= ASSERTIONS ================= */

  verifyGuestLoginPage() {
    cy.url().should('include', '/siparis-uye-giris');
  }

  verifyAddressPage() {
    cy.url().should('include', '/order/address');
  }

  verifyRequiredFieldError() {
    cy.contains('Lütfen bu alanı doldurunuz').should('be.visible');
  }

}

export default new Guest();
