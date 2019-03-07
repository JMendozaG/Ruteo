import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  { destino} from '../../app/models/responseObj';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng,
  Geocoder,
  
  
} from '@ionic-native/google-maps';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
/**
 * Generated class for the ConductorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conductor',
  templateUrl: 'conductor.html',
})
export class ConductorPage {
  map: GoogleMap;
  longitud: any;
  latitud: any;
  direccion: any; 
  des:destino;
  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, public nativegeocoder: NativeGeocoder) {
    this.des={
      lat:0,
      lon:0,
      address:""
    };
  }

  ionViewDidLoad() {
    this.loadMap2();
  }
  loadMap2(){
    
    let mapOptions: GoogleMapOptions = {

      camera: {
        target: {
          lat: 29.082578, // default location
          lng: -110.955826 // default location
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas2', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      // Now you can use all methods safely.
      this.getPosition2();
     // this.reverse();
    })
    .catch(error =>{
      console.log(error );
    });

  }
  
  getPosition2(): void{
   
  
    this.map.getMyLocation()
    .then(response => {
      this.des.latlong= response.latLng;
      this.latitud= response.latLng.lat;
      this.longitud= response.latLng.lng;
      //this.dir.lat= response.latLng.lat;
      this.direccion= this.des.latlong;
      this.map.moveCamera({
        target: response.latLng
        //this.latitud = target.latLng.lat;
        
      } );
    //   let options: NativeGeocoderOptions = {
    //     useLocale: true,
    //     maxResults: 5
    this.generarDireccion2(this.latitud, this.longitud);

    // };
    //this.reverse();
    this.map.addMarker({  
      title: "Mi Ubicación",
      icon: 'red',
      animation: 'DROP',
      position: response.latLng
    });

    
     
    })
    .catch(error =>{
      console.log("error en getPosition");
      console.log(JSON.stringify(error))
      this.des.address = error
    });
  }
  generarDireccion2(latitud:any,longitud:any) 
  {

    Geocoder.geocode({
      "position": {
        lat: this.latitud,
        lng: this.longitud
      }
    }).then((results: any[]) => {
      if (results.length == 0) {
        // Not found
        return null;
      }
      let address: any = [
        results[0].subThoroughfare || "",
        results[0].thoroughfare || "",
        results[0].locality || "",
        results[0].adminArea || "",
       // results[0]. || "",
        results[0].country || ""].join(", ");
this.des.address = address;
    });

}
}
