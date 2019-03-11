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
  ILatLng,
  PolylineOptions,
  Polyline,
 
  
  
} from '@ionic-native/google-maps';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
//import { GeocoderProvider } from '../../providers/geocoder/geocoder';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
//import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: any;
  longitud: any;
  latitud: any;
  direccion: any; 
  dir:direc;
  previousPosition: Geoposition;
   

  directionsService: any = null;
  directionsDisplay: any = null;
  bounds: any = null;
  myLatLng: any;
  waypoints: any[];
  markerlatlong: any;
  http: any;
//   options: NativeGeocoderOptions = {
//     useLocale: true,
//     maxResults: 5
    
// };
  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, public nativegeocoder: NativeGeocoder, public geolocation: Geolocation) {
       this.dir={
         lat:0,
         lon:0,
         address:""
       };
  }
  ionViewDidLoad(){
    this.loadMap();
    //this.posiciones(); 

   // this.direccion =  this.reverse();

   
  }

  posiciones(latitudI: any, longitudI: any, latitudF: any, longitudF: any)
  {
    // this.directionsService = new google.maps.DirectionsService();
    // this.directionsDisplay = new google.maps.DirectionsRenderer();
    // this.bounds = new google.maps.LatLngBounds();
    // this.waypoints = [
    //   {
    //     location: { lat: latitudI, lng: longitudI },
    //     stopover: true,
    //   },
    //   {
    //     location: { lat: latitudF, lng: longitudF },
    //     stopover: true,
    //   },
      
    // ];
    

  }
  
  private calculateRoute(){
    
    //this.bounds.extend(this.myLatLng);
    // this.waypoints.forEach(waypoint => {
    //   var point = new google.maps.LatLng(waypoint.location.lat, waypoint.location.lng);
    //   this.bounds.extend(point);
    // });

   // this.map.fitBounds(this.bounds);

    this.directionsService.route({
      origin: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
      destination: new google.maps.LatLng( 29.0883913, -110.9894091),
      //waypoints: this.waypoints,
     // optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
      avoidTolls: true
    }, (response, status)=> {
      if(status === google.maps.DirectionsStatus.OK) {
        console.log(response);
        this.directionsDisplay.setDirections(response);
      }else{
        alert('Could not display directions due to: ' + status);
      }
    });  

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
     this.directionsDisplay.setMap(this.map);
    //this.directionsDisplay.setPanel(panelEle);
    let mapEle: HTMLElement = document.getElementById('map_canvas');
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });
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
      this.myLatLng = response.latLng; 
      this.map.moveCamera({
        target: response.latLng
        //this.latitud = target.latLng.lat;
        
      } );
    //   let options: NativeGeocoderOptions = {
    //     useLocale: true,
    //     maxResults: 5
    this.generarDireccion(this.latitud, this.longitud);
   // this.posiciones(this.latitud, this.longitud, 29.0883913, -110.9894091);
    //this.calculateRoute();
    // };
    //this.reverse();
    this.map.addMarker({  
      title: "Mi Ubicación",
      icon: 'red',
      animation: 'DROP',
      draggable:true,
      position: response.latLng
      
    }).then(marker => {
      marker.on(GoogleMapsEvent.MARKER_DRAG_END)
      .subscribe(() => {
        this.markerlatlong = marker.getPosition();

                      // localStorage.setItem("latt1",this.markerlatlong.lat);
                      // localStorage.setItem("long1",this.markerlatlong.lng);
                      //  this.generarDireccion(this.markerlatlong.lat,this.markerlatlong.lng)
                      // this.http.get('API URL').map(res => res.json()).subscribe(data => {
                      //   console.log(data);
                      // });
                       
                    });
    });
  
    this.map.addMarker({  
      title: "Siam",
      icon: 'blue',
      animation: 'DROP',
      position: {lat: 29.0883913, lng: -110.9894091 },//esponse.latLng
    });

    this.calculateRoute();
    this.DibujarRuta(this.latitud, this.longitud)
     
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
       //results[0].sublocality || "",
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

}
// drawRoute(pos:Geoposition):void{
//   if(this.previousPosition==null){
//     this.previousPosition = pos;
//   }
//   this.map.addPolyline(
//     {
//       points: [new LatLng(this.previousPosition.coords.latitude, this.previousPosition.coords.longitude), new LatLng(pos.coords.latitude, pos.coords.longitude)],
//       visible: true,
//       color:'#FF0000',
//       width:4
//     }).then(
//     (res)=>{
//       this.previousPosition = pos;
//     }
//   ).catch(
//     (err)=>{
//       console.log("err: "+JSON.stringify(err));
//     }
//   );
// }

DibujarRuta(latitudR: any, longitudR: any)
{
  let inicio: ILatLng ={  lat: latitudR, lng:longitudR  };
  let final: ILatLng = {lat: 29.0883913, lng: -110.9894091};
  let Rutas: ILatLng[] = [inicio,final];
  let options:PolylineOptions = 
  {
    points: Rutas,
    color: 'black',
    width: 5,
    geodesic: true,
    clickable: true
  };
  this.map.addPolyline(options).then((polyline: Polyline) => {
    
  });
}
}
