import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {

  days: Array<string> = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  iconName = ['ios-add-circle-outline', 'ios-remove-circle-outline'];
  data: Array<{day: number, showDetails: boolean,
    actions: Array<{start: string, end: string, name: string, location: string}>}> = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    let todayWeekDay = (new Date()).getDay();
    for(let i = 1; i < 7; i++ ){
      this.data.push({
        day: i,
        actions: [
          {
            start: '8:00',
            end: '12:00',
            name: 'Computación Bioinspirada',
            location: '401'
          }
        ],
        showDetails: i == todayWeekDay
      });
    }
  }

  toggleDetails(data) {
    data.showDetails = !data.showDetails;
  }

  addScheduleItem() {
    let modal = this.modalCtrl.create(AddScheduleItem);
    modal.onDidDismiss(this.updateDay.bind(this));
    modal.present();
  }

  updateDay(data) {
    let day = parseInt(data.day);
    if (!data || !day)
      return;
    delete data.day;
    this.data[day - 1].actions.push(data);
  }
}

@Component({
  selector: 'modal-add-schedule-item',
  templateUrl: 'addScheduleItem.html'
})
export class AddScheduleItem {
  event = {
    start: null,
    end: null,
    name: null,
    location: null,
    day: 0
  };
  buttonDisabled = true;

  constructor(public viewCtrl: ViewController) {
    this.event.day = (new Date()).getDay();
  }

  submitForm() {
    this.viewCtrl.dismiss(this.event);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  validateEvent() {
     this.buttonDisabled = !this.event.day || !this.event.name || !this.event.start || !this.event.end ? true : null;
  }
}
