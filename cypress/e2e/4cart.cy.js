import LoginPage from "../pages/1LoginPage";
import ProductSearchPage from "../pages/2ProductSearchPage";
import ProductDetail from "../pages/3ProductDetailPage";
import Cart from "../pages/4CartPage";

// Uygulama kaynaklı JS hatalarını (google_trackConversion gibi) görmezden gelmek için:
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('User Story - 04 - Sepet Yönetimi ve Kontrolü', () => {

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

    //Sepet temizleme
    Cart.openMiniCart();
    Cart.goToCart();
    Cart.clearCartIfNotEmpty();

    //Bir ürünü sepete eklemiş olarak hazır bulundurma
    ProductSearchPage.searchProduct('Nisan Gelince');
    ProductDetail.navigateToProductDetail();
    ProductDetail.addProductToCart();
    cy.get('#t-modal-close-1 > .ti-close', { timeout: 10000 })
    .should('be.visible')
    .click();
   });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
  });
  
/* ================= TC26 ================= */
    it('TC26 - Sepete Ulaşma', () => {
    Cart.openMiniCart();
    Cart.goToCart();
    Cart.verifyCartPage();
  });

 /* ================= TC27 ================= */
    it('TC27 - Fiyat Tutarlılığının Doğrulanması', () => {
    Cart.openMiniCart();
    Cart.verifyTotalPriceMiniCart();
  });

  /* ================= TC28 ================= */
    it('TC28 - Sepet Sayfası Ürün Bilgileri Doğrulaması', () => {
    Cart.openMiniCart();
    Cart.goToCart();
    
    Cart.verifyProductName('Nisan Gelince');
    Cart.verifyProductPrice('203,00');
    Cart.verifyQuantity(1);
    Cart.verifyTotalPrc('203,00');
  });
  
  /* ================= TC29 ================= */
    it('TC29 - Sepet Toplamı ve Kargo Hesaplama Kontrolü', () => {
    Cart.openMiniCart();
    Cart.goToCart();
      Cart.verifyQuantity('1');
    Cart.verifyTotalPriceGeneralCart();
  });

  /* ================= TC30 ================= */
      it('TC30 - Ürün Adedi Artırma (Dinamik Güncelleme)', () => {
      Cart.openMiniCart();
      Cart.goToCart();
  
      Cart.clickIncrease();
      Cart.verifyQuantity('2');
    });
  
   /* ================= TC31 ================= */
      it('TC31 - Ürün Silme ve Onay Mekanizması', () => {
      Cart.openMiniCart();  
      Cart.goToCart();
  
      Cart.deleteProduct();
    });
  
    /* ================= TC32 ================= */
      it('TC32 - "Sepeti Temizle" Fonksiyonu', () => {
      Cart.openMiniCart();  
      Cart.goToCart();
      Cart.clearCart();
    });
  
    /* ================= TC33 ================= */
      it('TC33 - Boş Sepet Durumu ve Yönlendirme', () => {
      Cart.openMiniCart();  
      Cart.goToCart();
  
      Cart.clearCart();  
      Cart.verifyCartEmptyMessage();
      Cart.continueShopping();
    });
  
    /* ================= TC34 ================= */
      it('TC34 - "Satın Al" Butonu ile Ödemeye Geçiş', () => {
      Cart.openMiniCart();   
      Cart.clickBuy();
      Cart.verifyOrderPage();
    });

   /* ================= TC35 ================= */
     it('TC35 - Ekleme Sonrası Popup Üzerinden Sepete Geçiş (Navigasyon)', () => {
     ProductDetail.clickcart();
     Cart.clickPopupGoCart();
     cy.url().should('include', '/sepet');
   });
   
   /* ================= TC37 ================= */
     it('TC37 - Adet Azaltma ve Alt Limit Kontrolü (Negatif)', () => {
     Cart.openMiniCart();
     Cart.goToCart();
     Cart.clickDecrease(); 
     cy.get(Cart.quantityControl).should('have.value', '1');
   });


 });



  /* ================= TC36 ================= */
    //TC36 için ilk describe'daki beforeeach testlerimizin içindeki sepete eklenen kitap buraya uygun olmadığında ayrı bir blok içinde hazırlandı.
   describe('Homepage Add To Cart Test', () => {

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
    //Önce sepet temizlenmeli
     Cart.openMiniCart();
     Cart.goToCart();
     Cart.clearCartIfNotEmpty();
     cy.get('p > img').click(); //anasayfaya gitme
   });

    afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then(win => {
      win.sessionStorage.clear();
       });
     });  



    it('TC36 - Anasayfada Herhangi Bir Üründen Sepete Geçiş', () => {
     Cart.addProductFromHomepage();
     Cart.verifyCartPage();
    });
  
   });



