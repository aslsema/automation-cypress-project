class ProductDetail {

productSelect='#product-title-555614362'; 
//Ürünün basic bilgilerinin kontrolü
bookNameCheckk='#product-title';
authorNameCheck='#model-title > span';
publisherCheckk='#brand-title';
priceCheck='.product-current-price';
//Ürün hakkında teknik bilgiler kontrolü
bookType='span.book-info-title:contains("Türü") + span.book-info-desc';
ISBNcheck='span.book-info-title:contains("ISBN") + span.book-info-desc';
pageNumberCheck='span.book-info-title:contains("Sayfa Sayısı") + span.book-info-desc';
paperTypeCheck='span.book-info-title:contains("Kağıt Tipi") + span.book-info-desc';
publicationYearCheck='span.book-info-title:contains("Basım Yılı") + span.book-info-desc';

addCartButton='#addToCartBtn';
addCartPopupMessageCheck='#popup-cart';
goCartPopupCheck='#cart-popup-go-cart';
buyPopupCheck='#cart-popup-continue-shopping';

cartIkonNumberCheck='span.cart-soft-count';

notifytext='.notify-text';

  navigateToProductDetail() {
  //loading bitene kadar bekle
    cy.get('body', { timeout: 10000 })
      .should('not.have.class', 'is-loading');

    cy.get(this.productSelect, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.url().should('include', 'nisan-gelince');
  } 
  
  //Ürünün basic bilgilerinin kontrolü
  verifyBasicProductInfo() {
    cy.get(this.bookNameCheckk).should('contain.text', 'Nisan Gelince');
    cy.get(this.authorNameCheck).should('contain.text', 'Genki Kawamura');
    cy.get(this.publisherCheckk).should('contain.text', 'Doğan Kitap');
    cy.get(this.priceCheck).should('exist' );
  } 

  //Ürün hakkında teknik bilgiler kontrolü
  verifyTechnicalDetails() {
    cy.get(this.bookType).should('not.be.empty');
    cy.get(this.ISBNcheck).should('not.be.empty');
    cy.get(this.pageNumberCheck).should('not.be.empty');
    cy.get(this.paperTypeCheck).should('not.be.empty');
    cy.get(this.publicationYearCheck).should('not.be.empty');
  }

  verifyAddToCartButtonVisible() {
    cy.get(this.addCartButton)
      .should('be.visible')
      .and('not.be.disabled');
  }

  clickcart() {
    cy.get(this.addCartButton).click();
  }
  
  //Sepete ekle butonu
  addProductToCart() {
    cy.get(this.addCartButton).click();
    cy.get(this.addCartPopupMessageCheck)
      .should('contain.text', 'Ürün Başarıyla Sepete Eklendi');
  }

  verifyPopupButtons() {
    cy.get(this.goCartPopupCheck).should('be.visible');
    cy.get(this.buyPopupCheck).should('be.visible');
  }
  
  //Sepete eklendikten sonra sepet miktarının arttığının kontrolü
  verifyCartCountIncreased() {
    cy.get(this.cartIkonNumberCheck)
      .invoke('text')
      .then((count) => {
        const initialCount = Number(count);

    cy.get(this.addCartButton).click();

    cy.get(this.cartIkonNumberCheck)
      .should('have.text', String(initialCount + 1));
      });
  }
  
  //Sepete aynı ürünü birden fazla kere ekleme denemesi (Negatif test)
  clickAddToCartMultiple(times = 3) {
    Cypress._.times(times, () => {
    cy.get(this.addCartButton).click({ force: true });
    });
  }
  
  //Stoktan fazla eklendikten hata mesajının alınması
  verifyOutOfStockMessage() {
    cy.get(this.notifytext, { timeout: 10000 })
      .should('be.visible')
      .and(
       'contain.text',
       'Nisan Gelince isimli ürün için talebiniz kadar stok bulunmamaktadır'
    );
  }

  getCartCount() {
    return cy.get(this.cartIkonNumberCheck)
      .invoke('text')
      .then(text => Number(text.trim()));
  }

}

export default new ProductDetail();
