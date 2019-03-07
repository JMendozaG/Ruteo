import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{HomePage} from '../home/home';
import {ConductorPage}from'../conductor/conductor';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    user:any;
    password:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  redirecthome()
  {
    console.log(this.user);
    if(this.user==1 && this.password==1){
      this.navCtrl.setRoot(HomePage);
    }
    if(this.user==2 && this.password==2){
      this.navCtrl.setRoot(ConductorPage);
    }
  }
}
