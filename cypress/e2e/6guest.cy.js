import LoginPage from "../pages/1LoginPage";
import Cart from "../pages/4CartPage";
import Order from "../pages/5OrderPage";
import Guest from '../pages/6GuestPage';

// Uygulama kaynaklı JS hatalarını (google_trackConversion gibi) görmezden gelmek için:
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('User Story - 06 - Misafir Olarak Satın Alma Akışı', () => {

  beforeEach(() => {
    LoginPage.visitPage();
    LoginPage.acceptCookies();
    LoginPage.closeAnnouncePopupIfExists();
    LoginPage.waitForAnnouncePopupToDisappear();
   
    //Sepet temizleme
    Cart.openMiniCart();
    Cart.goToCart();
    Cart.clearCartIfNotEmpty();
    cy.get('p > img').click(); //anasayfaya gitme
  });


    /* ================= TC46 ================= */
    it('TC46 - Sepet Popup Üzerinden Giriş/Misafir Sayfasına Yönlendirme', () => {
      Cart.addProductFromHomepage();
      Order.goToOrderFromCart();
      Guest.verifyGuestLoginPage();
    });

    /* ================= TC47 ================= */
    it('TC47 - "Üye Olmadan Devam Et" Seçeneğinin Kontrolü', () => {
      Cart.addProductFromHomepage();
      Order.goToOrderFromCart();
      Guest.verifyGuestLoginPage();

      Guest.continueWithoutLogin();
    });

    /* ================= TC48 ================= */
    it('TC48 - Misafir Adres Formuna Erişim', () => {
      Cart.addProductFromHomepage();
      Order.goToOrderFromCart();
      Guest.verifyGuestLoginPage();

      Guest.continueWithoutLogin();
      Guest.verifyAddressPage();
    });

    /* ================= TC49 ================= */
    it('TC49 - Adres Formu Alanlarının Doğrulanması', () => {
      Cart.addProductFromHomepage();
      Order.goToOrderFromCart();
      Guest.verifyGuestLoginPage();

      Guest.continueWithoutLogin();
      Guest.verifyAddressPage();

      cy.get(Guest.namesurnameCheckinAddress).should('be.visible');
      cy.get(Guest.emailCheckinAddress).should('be.visible');
      cy.get(Guest.phoneCheckinAddress).should('be.visible');
      cy.get(Guest.cityCheckinAddress).should('be.visible');
      cy.get(Guest.townshipCheckinAddress).should('be.visible');
      cy.get(Guest.districtCheckinAddress).should('be.visible');
      cy.get(Guest.fulladdressCheck).should('be.visible');
    });

    /* ================= TC50 ================= */
    it('TC50 - Zorunlu Alan Validasyonu (Negatif)', () => {
      Cart.addProductFromHomepage();
      Order.goToOrderFromCart();
      Guest.verifyGuestLoginPage();

      Guest.continueWithoutLogin();
      Guest.verifyAddressPage();

      //Sadece email ve phone alanları giriliyor
      Guest.fillGuestAddressForm({
        email: 'test@mailinator.com',
        phone: '5554443322'
      });

      Guest.saveAddress();
      Guest.verifyRequiredFieldError();
    });

    /* ================= TC51 ================= */
    it('TC51 - Misafir Adres Kaydı ve Ödemeye Geçiş', () => {
      Cart.addProductFromHomepage();
      Order.goToOrderFromCart();
      Guest.verifyGuestLoginPage();

      Guest.continueWithoutLogin();
      Guest.verifyAddressPage();

      Guest.fillGuestAddressForm({
        name: 'Test User',
        email: 'test.user@mailinator.com',
        phone: '5554443322',
        city: 'İstanbul',
        town: 'Adalar',
        district: 'BURGAZADA MAH',
        address: 'Test Mahallesi, Test Sokak, No:10, Tester Sitesi, A Blok, Daire: 2'
      });

      Guest.saveAddress();
      cy.url().should('include', '/order/payment');
    });


});


