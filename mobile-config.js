// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'fr.eoko.app',
  name: 'Eoko',
  description: 'Get eoko power in one button click',
  author: 'Romain DARY',
  email: 'romain.dary@eoko.fr',
  website: 'http://eoko.fr'
});

// Set up resources such as icons and launch screens.
App.icons({
  'iphone': 'public/assets/app/icons/Icon-60.png',
  'iphone_2x': 'public/assets/app/icons/Icon-60@2x.png',
  'android_ldpi': 'public/assets/app/icons/Icon-60.png',
  'android_mdpi': 'public/assets/app/icons/Icon-60.png',
  'android_hdpi': 'public/assets/app/icons/Icon-60@2x.png',
  'android_xhdpi': 'public/assets/app/icons/Icon-60@2x.png'
});

App.launchScreens({
  'iphone': 'public/assets/app/splash/Default~iphone.png',
  'iphone_2x': 'public/assets/app/splash/Default@2x~iphone.png',
  android_ldpi_portrait: 'public/assets/app/splash/Default-android.9.png',
  android_mdpi_portrait: 'public/assets/app/splash/Default-android.9.png',
  android_hdpi_portrait: 'public/assets/app/splash/Default-android.9.png',
  android_xhdpi_portrait: 'public/assets/app/splash/Default-android.9.png'
});

// Set PhoneGap/Cordova preferences
App.setPreference('StatusBarOverlaysWebView', true);
//App.setPreference('BackgroundColor', '0xff0000ff');
//App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'portrait');
//App.setPreference('Orientation', 'all', 'ios');
