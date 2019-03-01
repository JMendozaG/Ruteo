import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import  {direc} from '../../app/models/responseObj';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng
} from '@ionic-native/google-maps';
//import { GeocoderProvider } from '../../providers/geocoder/geocoder';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
//import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;
  longitud: any;
  latitud: any;
  direccion: any; 
  dir:direc;
//   options: NativeGeocoderOptions = {
//     useLocale: true,
//     maxResults: 5
    
// };
  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, public nativegeocoder: NativeGeocoder) {
       this.dir={
         lat:0,
         lon:0,
         address:""
       };
  }
  ionViewDidLoad(){
    this.loadMap();
    //this.generarDireccion();
    this.reverse(this.latitud, this.longitud);
   // this.direccion =  this.reverse();

   
  }

  loadMap(){
    
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904, // default location
          lng: -89.3809802 // default location
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      // Now you can use all methods safely.
      this.getPosition();
     // this.reverse();
    })
    .catch(error =>{
      console.log(error);
    });

  }

  getPosition(): void{
   
  
    this.map.getMyLocation()
    .then(response => {
      this.dir= response.latLng;
      this.latitud= response.latLng.lat;
      this.longitud= response.latLng.lng;
      this.dir.lat= response.latLng.lat;
      this.map.moveCamera({
        target: response.latLng
        //this.latitud = target.latLng.lat;
        
      } );
    //   let options: NativeGeocoderOptions = {
    //     useLocale: true,
    //     maxResults: 5
        
    // };
    //this.reverse();
    this.map.addMarker({  
      title: "mi posicion",
      icon: 'red',
      animation: 'DROP',
      position: response.latLng
    });

    this.reverse(this.latitud,this.longitud);
    
      
     
    })
    .catch(error =>{
      console.log(error);
    });
  }

  reverse(latitud:any, longitud:any) : Promise<any>
  {
   
    return new Promise((resolve, reject) =>
    {
       this.nativegeocoder.reverseGeocode(latitud, longitud)
       .then((result : NativeGeocoderReverseResult[]) =>
       {
          this.direccion   = `The reverseGeocode address is ${result[0].thoroughfare} in ${result[0].countryCode}`;
          resolve(this.direccion);
       })
       .catch((error: any) =>
       {
          console.log(error);
          reject(error);
       });
    });
    
      // this.geo.(latitud, longitud)
      // .then((result: any) => {
      //   this.dir.address = result;
      //   // this.generarDireccion(result);
      //   // this.direccion=result[0];
      // })
      // .catch((error: any) => console.log(error));
     
  }

  generarDireccion() 
  {

    this.reverse(this.latitud, this.longitud)
         .then((data : NativeGeocoderReverseResult) =>
         {
            //this.geocoded      = true;
            this.direccion       = data;

         })
         .catch((error : any)=>
         {
            //this.geocoded      = true;
            this.direccion       = error.message;
         });

  //   let obj =[];
  //   let addres="";
  //   for(let key in addressObj){
  //     obj.push(addressObj[key]);
  //   }
  //   obj.reverse();
  //   for(let val in obj){
  //     if(obj[val].length)
  //     addres+=obj[val]+',';
  //   }
  //   return addres.slice(0,-2)
  // }

}}
