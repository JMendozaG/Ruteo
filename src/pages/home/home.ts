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
  LatLng,
  Geocoder,
  
  
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
    
   // this.direccion =  this.reverse();

   
  }

  loadMap(){
    
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

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      // Now you can use all methods safely.
      this.getPosition();
     // this.reverse();
    })
    .catch(error =>{
      console.log(error );
    });

  }

  getPosition(): void{
   
  
    this.map.getMyLocation()
    .then(response => {
      this.dir.latlong= response.latLng;
      this.latitud= response.latLng.lat;
      this.longitud= response.latLng.lng;
      //this.dir.lat= response.latLng.lat;
      this.direccion= this.dir.latlong;
      this.map.moveCamera({
        target: response.latLng
        //this.latitud = target.latLng.lat;
        
      } );
    //   let options: NativeGeocoderOptions = {
    //     useLocale: true,
    //     maxResults: 5
    this.generarDireccion(this.latitud, this.longitud);

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
      this.dir.address = error
    });
  }

  // reverse(latitud:any, longitud:any) : Promise<any>
  // {
   
  //   return new Promise((resolve, reject) =>
  //   {
  //      this.nativegeocoder.reverseGeocode(latitud, longitud)
  //      .then((result : NativeGeocoderReverseResult[]) =>
  //      {
  //         this.direccion   = `The reverseGeocode address is ${result[0].thoroughfare} in ${result[0].countryCode}`;
  //         resolve(this.direccion);
  //      })
  //      .catch((error: any) =>
  //      {
  //         console.log(error.stringify());
  //         reject(error);
  //      });
  //   });
    
      // this.geo.(latitud, longitud)
      // .then((result: any) => {
      //   this.dir.address = result;
      //   // this.generarDireccion(result);
      //   // this.direccion=result[0];
      // })
      // .catch((error: any) => console.log(error));
     
  // }

  generarDireccion(latitud:any,longitud:any) 
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
this.dir.address = address;
    });

    /* this.nativegeocoder.reverseGeocode(latitud, longitud)
     .then((result : NativeGeocoderReverseResult[]) =>
     {
        this.dir.address  = "The reverseGeocode address is"+result[0].thoroughfare+result[0].countryCode;
     })
     .catch((error: any) =>
     {
        error="entre al erorr"
        console.log("error generar direccion")
      this.dir.address=error;
    
     });    */   
     // geocoder.geocode({
    //       'location': this.map.getMyLocation(direcciones)
    //     },(results: NativeGeocoderReverseResult[] ,status:any)=>{
    //       if(status=='OK'){
    //        if(results[0]){
    //          this.dir.address= results[0].locality;
    //        }
    //       }
    //     })
        
    // this.reverse(this.latitud, this.longitud)
    //      .then((data : NativeGeocoderReverseResult) =>
    //      {
    //         //this.geocoded      = true;
    //         this.direccion       = data;

    //      })
    //      .catch((error : any)=>
    //      {
    //         //this.geocoded      = true;
    //         this.direccion       = error.message;
    //      });

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
