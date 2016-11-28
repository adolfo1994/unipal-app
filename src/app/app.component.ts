import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen, Push } from 'ionic-native';

import { Page1 } from '../pages/page1/page1';
import { SchedulePage } from '../pages/schedule/schedule';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public alertCtrl: AlertController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Pendientes', component: Page1 },
      { title: 'Horario', component: SchedulePage }
    ];



  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      this.setupPushNotification();
    });
  }

  setupPushNotification() {
    let push = Push.init({
      android: {
        senderID: "1043191181892"
      },
      ios: {
        alert: "true",
        badge: false,
        sound: "true"
      },
      windows: {}
    });

    if (!push.on) {
      return;
    }

    push.on('registration', (data) => {
      console.log("device token ->", data.registrationId);
    });
    push.on('notification', (data) => {
      console.log('message', data.message);
      let self = this;
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'UniPal',
          message: data.message,
          buttons: [{
            text: 'Ignorar',
            role: 'cancel'
          }, {
            text: 'Añadir',
            handler: () => {
              //TODO: Your logic here
              self.nav.push(Page1, {message: data.message});
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        self.nav.push(Page1, {message: data.message});
        console.log("Push notification clicked");
      }
    });
    push.on('error', (e) => {
      console.log(e.message);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
