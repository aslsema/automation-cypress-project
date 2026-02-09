import LoginPage from "../pages/1LoginPage";
import ProductSearchPage from "../pages/2ProductSearchPage";
import ProductDetail from '../pages/3ProductDetailPage';
import Cart from "../pages/4CartPage";

// Uygulama kaynaklı JS hatalarını (google_trackConversion gibi) görmezden gelmek için:
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('User Story - 03 - Ürün Detay Sayfası Görüntüleme ve Sepete Ekleme', () => {

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
    //Bir ürün arama
    ProductSearchPage.searchProduct('Nisan Gelince');

  });

  /* ================= TC18 ================= */
  it('TC18 - Ürün Detay Sayfasına Navigasyon', () => {
    ProductDetail.navigateToProductDetail();
  });

  /* ================= TC19 ================= */
  it('TC19 - Temel Ürün Bilgilerinin Doğrulanması', () => {
    ProductDetail.navigateToProductDetail();
    ProductDetail.verifyBasicProductInfo();
  });

  /* ================= TC20 ================= */
  it('TC20 - "Ürün Hakkında Bilgiler" Teknik Detay Kontrolü', () => {
    ProductDetail.navigateToProductDetail();
    ProductDetail.verifyTechnicalDetails();
  });

  /* ================= TC21 ================= */
  it('TC21 - Sayfada, fiyat bilgisinin altında "Sepete Ekle" butonunun kontrolü', () => {
    ProductDetail.navigateToProductDetail();
    ProductDetail.verifyAddToCartButtonVisible();
  });

  /* ================= TC22 ================= */
  it('TC22 - Ürünü Sepete Ekleme İşlemi (Pozitif)', () => {
    ProductDetail.navigateToProductDetail();
    ProductDetail.addProductToCart();
  });

  /* ================= TC23 ================= */
  it('TC23 - Sepet Onay Kartı ve Yönlendirme Butonları', () => {
    ProductDetail.navigateToProductDetail();
    ProductDetail.addProductToCart();
    ProductDetail.verifyPopupButtons();
  });

  /* ================= TC24 ================= */
  it('TC24 - Sepet İkonu ve Sayaç Güncellemesi', () => {
    ProductDetail.navigateToProductDetail();
    ProductDetail.clickcart();
    ProductDetail.verifyCartCountIncreased();
  });

  /* ================= TC25 ================= */
  it('TC25 - Stoğu Aşan Miktarı Sepete Ekletmemeli (Negatif)', () => {

    ProductDetail.navigateToProductDetail();

    ProductDetail.getCartCount().then((initialCount) => {

    
    ProductDetail.clickAddToCartMultiple(17);

    // Hata mesajı gösterilmeli
    ProductDetail.verifyOutOfStockMessage();

    // Sepet sayısı stoktan fazla olmamalı
    ProductDetail.getCartCount()
      .should('eq', initialCount + 16);
    });
  });

});