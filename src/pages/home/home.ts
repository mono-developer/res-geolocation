import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { UserService } from "../../provider/user-service";

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  options: GeolocationOptions;
  currentPos: Geoposition;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  resData: any[] = [];
  resTotalData: any[] = [];
  switchValue: string = "map";
  searchQuery: string = '';

  constructor( public navCtrl: NavController, private geolocation: Geolocation, public userService: UserService
  ) {
  }

  ionViewDidEnter() {

    this.getResData();
  }



  getResData() {
    this.userService.getData()
      .subscribe(
        (response) => {
          if (response.success == false) {
          } else {
            console.log(response);
            this.resData = response.data;
            this.resTotalData = response.data;

            this.loadMap();
          }
        },
        (err) => {
          console.log('internet Fails');
        });
  }

  getItems(ev: any) {

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.resData = this.resTotalData.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.resData = this.resTotalData;
    }
  }

  changedSwtch() {
    if(this.switchValue == 'map'){
      this.loadMap();
    }
  }

  viewPage(item) {
    this.navCtrl.push('ViewComponentPage', { item: item });
  }

  delete(id) {
    this.userService.deleteData(id)
      .subscribe(
        (response) => {
          if (response.success == false) {
          } else {
            this.getResData();
          }
        },
        (err) => {
          console.log('internet Fails');
        });
  }

  loadMap() {

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.addMarker();

    }, (err) => {
      console.log(err);
    });

  }

  addMarker() {
    for (let i = 0; i < this.resData.length; i++){

      let latLng = new google.maps.LatLng(this.resData[i].geometry.location.lat, this.resData[i].geometry.location.lng);
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng,
        icon: "assets/icon/mark_icon.png"
      });

      let content = this.resData[i].name;
      let infoWindow = new google.maps.InfoWindow({
        content: content
      });

      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });
    }
  }

}
