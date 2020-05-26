import { Injectable } from '@angular/core';
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class LatlongService {

  constructor() { }

  private latlong: Position;

  public getAddressLatLong(address: string): Position {
    this.latlong = new Position();
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        this.latlong.latitude = results[0].geometry.location.lat();
        this.latlong.longitude = results[0].geometry.location.lng();
      } else {
        console.log('Error - ', results, ' & Status - ', status);
      }
    })
    return this.latlong;
  }

  public getCurrentLatLong(): Position {
    this.latlong = new Position();
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.latlong.latitude = position.coords.latitude;
          this.latlong.longitude = position.coords.longitude;
        },
        error => {
          console.log('Error Code - ' + error.code + ' & Message - ', error.message);
        }
      );
    } else {
      console.log('Please Try After Sometime');
    }
    return this.latlong;
  }

  public sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

export class Position {

  public latitude: number;
  public longitude: number;

  constructor() { }

}