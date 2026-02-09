class Cart {

mycartButton='i.custom-cart';
goCartButton='#go-cart-btn';

//Mini sepetteki fiyat bilgilerinin kontrolü
priceSummaryMiniCart='div.col-6.p-0.text-right';

//Eklenen kitabın bilgilerinin kontrolü
productNameControl='a.cart-item-title'; // Nisan Gelince kitabını assertion yapıyoruz.
priceControl='div.price-sell'; //Assertion: .should('contain.text', '203,00')
quantityControl='input[type="number"][id^="qty"]';
totalPriceCntrl='.price-sell';

//Main sepetteki fiyat bilgilerinin kontrolü
priceSummaryMainCart='div.col-6.pl-0.text-right';

//Ürün adedi artırma ve azaltma
increaseButton='span[id^="qty-plus"]';
minusButton='span[id^="qty-minus"]';

deleteButton='a.cart-item-delete';
clearCartButton='a[id^="clear-cart-btn"]';
cartEmptyMessageCheck='p.fw-light.text-center';  
continueShoppingButton='#cart-back-btn';

buyButton='#go-order-btn';

goCartPopup='#cart-popup-go-cart';
homepageAddCartButton='#product-addcart-button-32392506';


  openMiniCart() {
    cy.get(this.mycartButton).click(); 
  }

  goToCart() {
    cy.get(this.goCartButton).click();
  }

  clickIncrease() {
    cy.get(this.increaseButton).click();
  }

  clickDecrease() {
    cy.get(this.minusButton).click();
  }

  deleteProduct() {
    cy.get(this.deleteButton).first().click()
    cy.contains('button.t-popconfirm-cancel-btn', 'Sil').click();
  }

  clearCart() {
    cy.get(this.clearCartButton).click();
  }

  continueShopping() {
    cy.get(this.continueShoppingButton).click();
  }

  clickBuy() {
    cy.get(this.buyButton).click();
  }

  clickPopupGoCart() {
    cy.get(this.goCartPopup).click();
  }

  addProductFromHomepage() {
  cy.get(this.homepageAddCartButton)
    .first()
    .click({ force: true });

  cy.get(this.goCartPopup)
    .should('be.visible')
    .click();
}


   clearCartIfNotEmpty() {

   cy.get('body').then(($body) => {
    if ($body.find(this.clearCartButton).length > 0) {
      cy.get(this.clearCartButton).click({ force: true });
      cy.contains('Sepetinizde Ürün Bulunmamaktadır')
        .should('be.visible');
     }
   });
  }

  /* ================= ASSERTIONS ================= */
   
  verifyCartPage() {
    cy.url().should('include', '/sepet');
  }
  
  //Mini sepet sayfasındaki toplam fiyatı kontrol etme
  verifyTotalPriceMiniCart() {
   cy.get(this.priceSummaryMiniCart).eq(0)
    .should('contain.text', '203,00 TL');

   cy.get(this.priceSummaryMiniCart).eq(1)
    .should('contain.text', '69,90 TL');

   cy.get(this.priceSummaryMiniCart).eq(2)
    .should('contain.text', '272,90 TL');
  }

  //Genel sepet sayfasındayken, ürün adı, fiyatı, adedi ve toplam fiyatı kontrol etme
  verifyProductName(productName) {
    cy.get(this.productNameControl)
      .should('contain.text', productName);
  }

  verifyProductPrice(price) {
    cy.get(this.priceControl)
      .should('contain.text', price);
  }

  verifyQuantity(value) {
    cy.get(this.quantityControl)
      .should('have.value', value);
  }

  verifyTotalPrc(prc) {
    cy.get(this.totalPriceCntrl)
     .should('contain.text', 'TL');
  }
  
  //Genel sepet ekranındayken genel toplamı kontrol etme
  verifyTotalPriceGeneralCart() {
   cy.get(this.priceSummaryMainCart).eq(0)
    .should('contain.text', '203,00 TL');

   cy.get(this.priceSummaryMainCart).eq(1)
    .should('contain.text', '69,90 TL');

   cy.get(this.priceSummaryMainCart).eq(2)
    .should('contain.text', '272,90 TL');
  }

  //Sepette ürün bulunmamakta mesajı
  verifyCartEmptyMessage() {
    cy.get(this.cartEmptyMessageCheck)
      .should('contain.text', 'Sepetinizde Ürün Bulunmamaktadır');
  }

  //Order url'inde olduğunun doğrulanması
  verifyOrderPage() {
    cy.url().should('include', '/order/');
  }

}

export default new Cart();
