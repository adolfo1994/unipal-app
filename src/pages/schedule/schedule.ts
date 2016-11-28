import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Schedule page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {

  days: Array<string> = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  iconName = ['ios-add-circle-outline', 'ios-remove-circle-outline'];
  data: Array<{day: number, showDetails: boolean,
    actions: Array<{start: string, end: string, name: string, location: string}>}> = [];

  constructor(public navCtrl: NavController) {
    let todayWeekDay = (new Date()).getDay();
    for(let i = 0; i < 6; i++ ){
      this.data.push({
        day: i,
        actions: [
          {
            start: '8:00',
            end: '12:00',
            name: 'Computación Bioinspirada',
            location: '401'
          },
          {
            start: '13:00',
            end: '15:00',
            name: 'Interacción Humano Computador',
            location: 'Lab-G'
          },
        ],
        showDetails: i + 1 == todayWeekDay
      });
    }
  }

  static toggleDetails(data) {
    data.showDetails = !data.showDetails;
  }

}
