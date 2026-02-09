import LoginPage from "../pages/1LoginPage";
import ProductSearchPage from "../pages/2ProductSearchPage";

// Uygulama kaynaklı JS hatalarını (google_trackConversion gibi) görmezden gelmek için:
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('User Story - 02 - Ürün Arama ve Listeleme', () => {

  beforeEach(() => {
    LoginPage.visitPage();
    LoginPage.acceptCookies();
    LoginPage.closeAnnouncePopupIfExists();
    LoginPage.waitForAnnouncePopupToDisappear();
    //Giriş yapma
    LoginPage.clickEmailLogin();
    LoginPage.emailSpace.type('ruqqed1@outlook.com');
    LoginPage.passwordSpace.type('Testing123.');
    LoginPage.clickLogin.click({force: true});
    
  });

  
    /* ================= TC10 ================= */
  it('TC10 - Başarılı Ürün Araması (Pozitif)', () => {
    // Login olduktan sonra sayfanın yönlenmesini beklemek kritik
    cy.url().should('include', 'kitapsepeti.com');
    
    // Arama metodunu çağırıyoruz
    ProductSearchPage.searchProduct('Disney Zootropolis');
    
    // Doğrulama adımları
    cy.url().should('include', 'Zootropolis');
    cy.get(ProductSearchPage.productNameCheck).should('be.visible');
  });


  /* ================= TC11 ================= */
  it('TC11 - Sonuç Bulunamayan Arama (Negatif)', () => {
    ProductSearchPage.searchProduct('asdfgwert');
    ProductSearchPage.verifyNoSearchResult();
  });


  /* ================= TC12 ================= */
  it('TC12 - Ürün Kartı Bilgi Doğrulaması', () => {
    ProductSearchPage.searchProduct('Disney');
    ProductSearchPage.verifyProductCardUI();
  });

  /* ================= TC13 ================= */
  it('TC13 - "Sepete Ekle" Butonu Hover Kontrolü', () => {
    ProductSearchPage.searchProduct('Disney');
    ProductSearchPage.hoverAddToCart();
  });

  /* ================= TC14 ================= */
  it('TC14 - Sıralama Menüsü Seçenek Kontrolü', () => {
    ProductSearchPage.searchProduct('Disney');
    ProductSearchPage.openSortingMenu();
    ProductSearchPage.verifySortingOptions();
  });
 
  /* ================= TC15 ================= */
  it('TC15 - Filtreleme Panelinin Kullanımı', () => {
    ProductSearchPage.searchProduct('Disney');
    ProductSearchPage.verifyFiltersVisible();
  });

    /* ================= TC16 ================= */
  it('TC16 - Ana Sayfa Kategori Navigasyonu', () => {
    ProductSearchPage.verifyCategoryHeader('Roman');
  });
  
  /* ================= TC17 ================= */
  it('TC17 - Sonsuz Kaydırma (Infinite Scroll) Kontrolü', () => {
    ProductSearchPage.searchProduct('Kitap');
    ProductSearchPage.scrollToBottom();
    cy.wait(2000); // yeni ürün yüklenmesi için
    cy.get(ProductSearchPage.productNameCheck).should('have.length.greaterThan', 10);
  });


});
