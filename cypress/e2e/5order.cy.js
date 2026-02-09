import LoginPage from "../pages/1LoginPage";
import ProductSearchPage from "../pages/2ProductSearchPage";
import ProductDetail from "../pages/3ProductDetailPage";
import Cart from "../pages/4CartPage";
import Order from "../pages/5OrderPage";

// Uygulama kaynaklı JS hatalarını (google_trackConversion gibi) görmezden gelmek için:
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('User Story - 05 - Ödeme ve Sipariş Onayı', () => {

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
    Cart.clickPopupGoCart(); //en son burda popup ekranından sepete ekle yaptık, bundan sonrası satın alma süreçleri olacak
  });

afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
  });

  /* ================= TC38 ================= */
  it('TC38 - Sepetten Adres Sayfasına Geçiş', () => {
    Order.goToOrderFromCart();
    cy.url().should('include', '/order/');
  });

  /* ================= TC39 ================= */
  it('TC39 - Adres Adımından Ödeme Adımına Geçiş', () => {
    Order.goToOrderFromCart();
    Order.goToPaymentStep();
    cy.url().should('include', '/order/payment');
  });

  /* ================= TC40 ================= */
  it('TC40 - Kargo Seçenekleri ve Varsayılan Seçim Kontrolü', () => {
    Order.goToOrderFromCart();
    Order.goToPaymentStep();
    cy.url().should('include', '/order/payment');

    cy.get(Order.pttCheck).should('be.visible');
    cy.get(Order.hepsijetCheck).should('be.visible');
    cy.get(Order.pttDefaultCheck).should('be.visible');
  });

  /* ================= TC41 ================= */
  it('TC41 - Ödeme Yöntemlerinin Görüntülenmesi', () => {
    Order.goToOrderFromCart();
    Order.goToPaymentStep();
    cy.url().should('include', '/order/payment');

    cy.get(Order.iyzicoCheck).should('be.visible');
    cy.get(Order.creditcardCheck).should('be.visible');
  });

  /* ================= TC42 ================= */
  it('TC42 - Kredi Kartı Form Alanlarının Kontrolü', () => {
    Order.goToOrderFromCart();
    Order.goToPaymentStep();
    cy.url().should('include', '/order/payment');

    Order.selectCreditCardPayment();

    cy.get(Order.nameSurnameCheck).should('be.visible');
    cy.get(Order.cardNumberCheck).should('be.visible');
    cy.get(Order.expirydateCheck).should('be.visible');
    cy.get(Order.CVVcheck).should('be.visible');
  });

  /* ================= TC43 ================= */
  it('TC43 - Ödeme Butonu Aktivasyonu (Pozitif)', () => {
      Order.goToOrderFromCart();
      Order.goToPaymentStep();
      cy.url().should('include', '/order/payment');
  
      Order.selectCreditCardPayment();
      Order.fillValidCardInfo();
      Order.payButton();
  });

  /* ================= TC44 ================= */
  it('TC44 - Eksik Bilgi ile Ödeme Denemesi (Negatif)', () => {
    Order.goToOrderFromCart();
    Order.goToPaymentStep();
    cy.url().should('include', '/order/payment');

    Order.selectCreditCardPayment();

    cy.get(Order.nameSurnameCheck).type('Test User');
    cy.get(Order.cardNumberCheck).type('5528790000000008');
    cy.get(Order.expirydateCheck).type('1228');
    //CVV'ye dokunmuyoruz
    cy.get(Order.bluePayBtn).click();
    Order.verifyCvcErrorMessage();
  });
  
  /* ================= TC45 ================= */
  it('TC45 - Sipariş Özeti ve Toplam Tutar Doğrulaması', () => {
    Order.goToOrderFromCart();
    Order.goToPaymentStep();
    cy.url().should('include', '/order/payment');

    //Ödeme sayfasındaki fiyatları al
    Order.getOrderSummaryPrices().then(orderPrices => {
    
    //Mini sepete geç ve ordaki fiyatları al
    Cart.openMiniCart();
    Order.getMiniCartPrices().then(miniCartPrices => {

    //KARŞILAŞTIRMA
      expect(orderPrices.subtotal).to.eq(miniCartPrices.subtotal);
      expect(orderPrices.cargo).to.eq(miniCartPrices.cargo);
      expect(orderPrices.total).to.eq(miniCartPrices.total);

      });
    });
   });
  
  });



