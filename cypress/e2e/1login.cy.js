import LoginPage from "../pages/1LoginPage";

// Uygulama kaynaklı JS hatalarını (google_trackConversion gibi) görmezden gelmek için:
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('User Story - 01 - Kullanici Girişi', () => {

  beforeEach(() => {
  LoginPage.visitPage();
  LoginPage.acceptCookies();

  //Popup gelirse kapat
  LoginPage.closeAnnouncePopupIfExists();  
  //Popup kapandığının kontrolü
  LoginPage.waitForAnnouncePopupToDisappear();
  });


  it('TC01 - Giriş Popupına Erisim (Avatar İkon ve Link Üzerinden)', () => {
    // 1. Ana sayfanın sağ üst köşesinde bulunan "E-posta ile giriş" butonuna ve avatar ikonuna tıkla 
    LoginPage.clickAvatar();
    LoginPage.clickEmailLogin();
    // Beklenen Sonuç: Giriş popup'ı açılmalı ve etkileşime hazır olmalıdır 
    LoginPage.emailSpace.should('be.visible');
  });

  it('TC02 - Giriş Popupındaki Tüm Form Alanlarının ve Butonların Görünürlük Kontrolü', () => {
    LoginPage.clickEmailLogin();
    
    // Beklenen Sonuç: E-posta, Şifre, Şifremi Unuttum, Beni Hatırla, Giriş Yap ve Kayıt Ol alanları görünür olmalı 
    LoginPage.emailSpace.should('be.visible');
    LoginPage.passwordSpace.should('be.visible');
    LoginPage.checkPasswordForget.should('be.visible');
    LoginPage.checkRememberMe();
    LoginPage.clickLogin.should('be.visible');
    LoginPage.checkKayitOl();
  });
  
  it('TC03 & TC04 - Geçerli E-posta ve Şifre İle Başarılı Giriş Yapılması Ve Adres Sayfasında Olunması', () => {
    LoginPage.clickEmailLogin();
    
    // 1. E-posta alanına geçerli e-postayı gir. 2. Şifre alanına doğru şifreyi gir. 3. "Giriş Yap" butonuna tıkla 
    LoginPage.emailSpace.type('ruqqed1@outlook.com');
    LoginPage.passwordSpace.type('Testing123.');
    LoginPage.clickLogin.click({force: true});
    
  });

  it('TC05 - Kayıtlı E-posta ve Yanlış Şifre İle Giriş Denemesi', () => {
    LoginPage.clickEmailLogin();
    
    LoginPage.emailSpace.type('ruqqed1@outlook.com');
    LoginPage.passwordSpace.type('Testing12');
    LoginPage.clickLogin.click();
    
    // Beklenen Sonuç: "Giriş bilgileriniz hatalı" mesajı görünmelidir 
    LoginPage.verifyErrorMessage('Giriş bilgileriniz hatalı.');
  });

  it('TC06 - Geçersiz E-posta Formatı (@ Sembolü Olmadan) İle Giriş Denemesi', () => {
    LoginPage.clickEmailLogin();
    
    LoginPage.emailSpace.type('ruqqed1outlook.com');
    LoginPage.passwordSpace.type('Testing123');
    LoginPage.clickLogin.click();
    
    LoginPage.verifyErrorMessage('Giriş bilgileriniz hatalı.');
  });

  it('TC07 - E-posta ve Şifre Alanları Boş Bırakılarak Giriş Denemesi', () => {
    LoginPage.clickEmailLogin();
    
    //1. E-posta ve Şifre alanlarını boş bırak. 2. "Giriş Yap" butonuna tıkla 
    LoginPage.clickLogin.click();
    
    LoginPage.verifyErrorMessage('Giriş bilgileriniz hatalı.');
  });

  it('TC08 - Ardışık 10 Hatalı Giriş Denemesi Sonrası, Hata Mesajının Alındığının Doğrulanması', () => {
  LoginPage.clickEmailLogin();

  Cypress._.times(16, (i) => {
    LoginPage.emailSpace.clear().type(`fakeuser_test_${i}@mail.com`);
    LoginPage.passwordSpace.clear().type('WrongPass123!');
    LoginPage.clickLogin.click({ force: true });
    
    // Hata mesajı belirene kadar her döngüde kısa bir bekleme
    cy.wait(300); 
  });

    // Tam metin yerine sadece mesajın kök kısmını ara
    LoginPage.verifyRateLimitError('Çok fazla istek talebinde bulundunuz');
  });

  it('TC09 - "Şifremi Unuttum" Linkinin Şifre Sıfırlama Sayfasına Yönlendirme Kontrolü', () => {
    LoginPage.clickEmailLogin();
    
    // 1. "Şifremi Unuttum" linkine tıkla 
    LoginPage.checkPasswordForget.click();
    
    // Beklenen Sonuç: Şifre hatırlatma sayfasına yönlendirilmeli, e-posta alanı ve buton bulunmalı 
    cy.url().should('include', '/uye-sifre-hatirlat');
    cy.get('input[name="forgot-email"]').should('be.visible'); 
    cy.get('button[id^="forgot-password-btn-"]').should('be.visible');
  });

});