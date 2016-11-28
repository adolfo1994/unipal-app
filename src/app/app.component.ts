import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen, Push } from 'ionic-native';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Page1 } from '../pages/page1/page1';
import { SchedulePage } from '../pages/schedule/schedule';

let options = new RequestOptions({headers: new Headers({'Accept': 'application/json', 'Content-Type': 'application/json'})});

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public alertCtrl: AlertController, public http: Http) {
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

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  catchError(error: any) {
    console.log(error);
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
      let config = {
        'name': 'unipal-' + this.s4(),
        'registration_id': data.registrationId
      };
      this.http.post('http://unipal-api.public.ndev.tech/api/device/gcm/', config, options);
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
              // self.nav.push(Page1, {message: data.message});
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
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
