import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-view-component',
  templateUrl: 'view-component.html',
})
export class ViewComponentPage {

  resData: any = {};
  res_name:string = "";
  open_now: any = "";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.resData = navParams.get("item");
    console.log(this.resData);
    this.res_name = this.resData.name;
    this.open_now = this.resData.opening_hours.open_now;
  }

  ionViewDidLoad() {
  }

}
