import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
 import 'rxjs/add/operator/map';
import {AUTOCOMPLETE_DIRECTIVES} from 'ionic2-auto-complete';
import {FriendAutoCompleteService} from '../../providers/autocomplete';

import { ModalController, Platform, NavController, ViewController, NavParams } from 'ionic-angular';

let options = {headers: new Headers({'Accept': 'application/json'})};


@Component({
  templateUrl: 'addFriend.html',
  providers: [
    FriendAutoCompleteService
  ]
})
export class AddFriendModal{
  friend: string;
  showList: boolean;
  items: any;
  searchedItems: any;

  constructor(
    public platform: Platform, public params: NavParams,
    public viewCtrl: ViewController, private friendAutocomplete: FriendAutoCompleteService,
    public http: Http) {
    this.showList = false;
    this.initializeItems("").subscribe(
         (data) => this.extractData(data),
          err => {
              console.log(err);
          });
  }

  initializeItems(keyword: string) {
    //var url = "https://restcountries.eu/rest/v1/";
    var url = "http://unipal-api.public.ndev.tech/api/accounts/Users/";
    var response = this.http.get(url, options).map(res => res.json());
    return response;
  }

  extractData (data) {
    console.log(data);
    this.items = data;
    console.log(this);
    console.log(this.items);
  }

  getItems(ev) {
    let val = ev.target.value;
    if (val == ""){
      this.showList = false;
    }else{
      this.showList = true;
    }
    if (val && val.trim() != '') {
      // this.searchedItems = this.items.filter( (item) => {
      //   return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      // })
      this.searchedItems = this.items.filter( (item) => {
         return ((item.first_name.toLowerCase() + " " +item.last_name.toLowerCase()).indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  onCancel(ev) {
    // Show the results
    this.showList = false;

    // Reset the field
    ev.target.value = '';
  }
  submitForm(){
    console.log(this.friend);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

@Component({
  templateUrl: 'addToDo.html'
})
export class AddToDoModal {
    course : string;
    description : string;
    dueDate : Date;
    priority: Number;

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController) {

  }
  submitForm(){
    console.log(this.course);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  public teamMembers;
  todos: any;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public http: Http){
      this.teamMembers = ["Adolfo", "Jose", "Aldo", "Adolfo", "Jose", "Aldo"];
      this.getToDos().subscribe(
           (data) => this.extractToDos(data),
            err => {
                console.log(err);
            });
  }
  extractToDos (data) {
    this.todos = data;
  }

  getToDos() {
    let url = "http://unipal-api.public.ndev.tech/api/academic/Todo/";
    return this.http.get(url, options).map(res => res.json());
  }

  addFriend() {
    let modal = this.modalCtrl.create(AddFriendModal);
    modal.present();
  }
  addToDo() {
    let modal = this.modalCtrl.create(AddToDoModal);
    modal.present();
  }
}
