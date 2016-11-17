import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  public teamMembers;
  constructor(public navCtrl: NavController) {
      this.teamMembers = ["Adolfo", "Jose", "Aldo", "Adolfo", "Jose", "Aldo"]
  }

}
