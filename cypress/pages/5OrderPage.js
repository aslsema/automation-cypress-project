class Order {

buyBtnNow='#cart-buy-btn';
paymentButton='button.order-next-btn';

//Kargo
pttCheck='label[for="cargo-item-input-0"]';
hepsijetCheck='label[for="cargo-item-input-1"]';
pttDefaultCheck='label[for="cargo-item-input-0"] .input-radio i.ti-check';

//Payment methods
iyzicoCheck='#iyz-tab-payWithIyzico';
creditcardCheck='#iyz-tab-credit-card';

//Credit card form
nameSurnameCheck='#ccname';
cardNumberCheck='#ccnumber';
expirydateCheck='#ccexp';
CVVcheck='#cccvc';
bluePayBtn='#iyz-payment-button';

cvcErrorMessage = 'Güvenlik kodu (CVC) giriniz';

//Mini sepet fiyat bilgileri
priceSummaryMiniCart='div.col-6.p-0.text-right';

//Ödeme sayfası tutar bilgileri
orderSubtotalValue='div:contains("Sepet Toplamı") + div';
orderCargoValue='#priceCargo';
orderTotalValue='div:contains("Genel Toplam") + div';


  /* ================= ACTIONS ================= */

  goToOrderFromCart() {
    cy.get(this.buyBtnNow).should('be.visible').click();
  }

  goToPaymentStep() {
    cy.get(this.paymentButton)
    cy.contains('button', 'Ödeme Adımına Geç')
      .click();
  }

  selectCreditCardPayment() {
    cy.get(this.creditcardCheck).click();
  }

  fillValidCardInfo() {
    cy.get(this.nameSurnameCheck).type('Test User');
    cy.get(this.cardNumberCheck).type('5528790000000008');
    cy.get(this.expirydateCheck).type('1228');
    cy.get(this.CVVcheck).type('123');
  }

  payButton() {
   cy.get(this.bluePayBtn)
      .should('be.enabled')
      .and('contain.text', 'ÖDE');
  }

  verifyCvcErrorMessage() {
   cy.contains('Güvenlik kodu (CVC) giriniz')
    .should('be.visible');
  }

//Ödeme sayfasındaki sipariş özetini alma
  getOrderSummaryPrices() {
   const prices = {};

    //Sepet Toplamı
    cy.contains('Sepet Toplamı')
     .parent()
     .find('div')
     .last()
     .invoke('text')
     .then(text => {
       prices.subtotal = text.trim();
    });

    //Kargo Ücreti
    cy.get('#priceCargo')
     .invoke('text')
     .then(text => {
       prices.cargo = text.trim() + ' TL';
    });

    // Genel Toplam
     cy.contains('Genel Toplam')
     .parent()
     .find('div')
     .last()
     .invoke('text')
     .then(text => {
       prices.total = text.trim();
    });

  return cy.wrap(prices);
}

//Mini sepet ekranındaki fiyatları alma
  getMiniCartPrices() {
   const prices = {};

   cy.get(this.priceSummaryMiniCart).eq(0)
    .invoke('text')
    .then(text => prices.subtotal = text.trim());

   cy.get(this.priceSummaryMiniCart).eq(1)
    .invoke('text')
    .then(text => prices.cargo = text.trim());

   cy.get(this.priceSummaryMiniCart).eq(2)
    .invoke('text')
    .then(text => prices.total = text.trim());

  return cy.wrap(prices);
}

}
export default new Order();
