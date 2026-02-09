class ProductSearchPage {

searchBar="#live-search";
araButonu="#live-search-btn";

//Aranan ürünün bilgilerinin kontrolü
productImgCheck="img[alt='Disney Zootropolis Sihirli Dünya - Doğan Çocuk']";
productNameCheck="a.product-title";
publisherCheck="a.brand-title"; 
priceCheck='span.product-price';

sepetekle="span.add-to-cart-btn"; 

//Sıralama menüsü doğrulaması
sortingMenu="#sort";
varsayilanSiralama="#sort option[value='0']";
yenidenEskiye='#sort option[value="3"]';
eskidenYeniye='#sort option[value="4"]';
fiyatArtan='#sort option[value="5"]';
fiyatAzalan='#sort option[value="6"]';

//3 ana fitrenin doğrulanması
categoryFilterCheck='#accordion-categories-361';
markaFilterCheck='#accordion-brand-361';
modelFilterCheck='#accordion-model-361';

//Roman kategorisinin kontrolü
romanCategoryCheck='#menu-18322'; 

  //Arama çubuğunda ürün arama
  searchProduct(text) {
    // 1. Sayfanın tamamen yüklenmesi ve sakinleşmesi için kısa bir bekleme
    cy.wait(2000); 

    // 2. Elementi her seferinde sıfırdan bulmak için 'get' komutunu zincirlemiyoruz
    cy.get(this.searchBar, { timeout: 10000 })
       .should('be.visible')
       .should('not.be.disabled')
       .click({ force: true }); // Önce tıklayarak odaklanıyoruz (focus)

    // 3. Yazma işlemini yapıyoruz. 
    // 'delay' sayesinde harf harf yazarak sitenin re-render yapmasına fırsat tanıyoruz.
    cy.get(this.searchBar)
      .clear({ force: true })
      .type(text, { delay: 150 }); 

    // 4. Arama butonu
    cy.get(this.araButonu).should('be.visible').click();
  }


  verifyNoSearchResult() {
    cy.get(this.productNameCheck).should('not.exist');
  }
  
  //Ürün bilgileri kontrolü
  verifyProductCardUI() {
    cy.get(this.productImgCheck).should('be.visible');
    cy.get(this.productNameCheck).should('contain.text', "Disney Zootropolis Sihirli Dünya");
    cy.get(this.publisherCheck).should('contain.text', 'Doğan Çocuk');
    cy.get(this.priceCheck).should('be.visible').and('contain.text', '144');
  }

  hoverAddToCart() {
    cy.get(this.sepetekle)
      .first()
      .should('contain.text', 'Sepete Ekle');
  }

  openSortingMenu() {
    cy.get(this.sortingMenu).should('be.visible');
  }

  verifySortingOptions() {
    cy.get(this.varsayilanSiralama).should('exist');
    cy.get(this.yenidenEskiye).should('exist');
    cy.get(this.eskidenYeniye).should('exist');
    cy.get(this.fiyatArtan).should('exist');
    cy.get(this.fiyatAzalan).should('exist');
  }

  verifyFiltersVisible() {
    cy.get(this.categoryFilterCheck).should('be.visible');
    cy.get(this.markaFilterCheck).should('be.visible');
    cy.get(this.modelFilterCheck).should('be.visible');
  }

  verifyCategoryHeader(expectedCategory) {
    cy.get(this.romanCategoryCheck).click();

    cy.get('h1.category-name')
      .should('be.visible')
      .and('contain.text', expectedCategory);
  }

  scrollToBottom() {
    cy.scrollTo('bottom');
  }

}

export default new ProductSearchPage();