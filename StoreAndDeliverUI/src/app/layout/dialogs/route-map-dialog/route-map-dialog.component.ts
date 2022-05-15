import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from 'src/app/core/models/address';
import { OptimizedRequestsGroup } from 'src/app/features/cargo-requests/models/optimized-requests';
import { MapsAPILoader } from '@agm/core';
import { Waypoint } from 'src/app/core/models/waypoint';
import { MapPoint } from 'src/app/core/models/map-point';

@Component({
  selector: 'app-route-map-dialog',
  templateUrl: './route-map-dialog.component.html',
  styleUrls: ['./route-map-dialog.component.scss'],
})
export class RouteMapDialogComponent implements OnInit {
  public lat: number = 0;
  public lng: number = 0;

  public origin: MapPoint = { lat: 0, lng: 0 };
  public destination: MapPoint = { lat: 0, lng: 0 };

  public wayPoints: any[] = [];

  private requestGroup: OptimizedRequestsGroup;
  private addresses: Address[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) data: OptimizedRequestsGroup,
    private _mapsAPILoader: MapsAPILoader
  ) {
    this.requestGroup = data;
  }

  public ngOnInit(): void {
    this.getAllRequestsAddresses();
    this.getCurrentLocation();
  }

  private getDirection(): void {
    this.origin = { lat: this.lat, lng: this.lng };
    this.destination = {
      lat: this.wayPoints[this.wayPoints.length - 1].location.lat,
      lng: this.wayPoints[this.wayPoints.length - 1].location.lng,
    };
  }

  private getCurrentLocation(): void {
    this._mapsAPILoader.load().then(() => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.getWaypoints();
          this.getDirection();
        });
      }
    });
  }

  private getWaypoints(): void {
    this.wayPoints = this.addresses
      .map((a) => {
        const wayPoint: Waypoint = {
          location: {
            lat: a.latitude || 0,
            lng: a.longtitude || 0,
          },
          stopover: false,
        };
        return wayPoint;
      })
      .filter(
        (w) => w.location.lat !== this.lat && w.location.lng !== this.lng
      );
  }

  private getAllRequestsAddresses(): void {
    const keys: string[] = [];
    const addresses: Address[] = [];
    for (let key in this.requestGroup) {
      keys.push(key);
    }

    // iterating thorugh cargo request groups
    for (let i = 0; i < keys.length; i++) {
      const currentRequestId = keys[i];
      const cargoRequests = this.requestGroup[currentRequestId];
      // iterating through cargo requests
      for (let j = 0; j < cargoRequests.length; j++) {
        const currentCargoRequest = cargoRequests[j];
        const fromAddress = currentCargoRequest.request.fromAddress || {};
        if (!this.isAddressAlreadyIncluded(fromAddress, addresses)) {
          addresses.push(fromAddress);
        }

        const toAddress = currentCargoRequest.request.toAddress;
        if (toAddress && !this.isAddressAlreadyIncluded(toAddress, addresses)) {
          addresses.push(toAddress);
        }
      }
    }
    this.addresses = addresses;
  }

  private isAddressAlreadyIncluded(
    searched: Address,
    adresses: Address[]
  ): boolean {
    return adresses.filter((a) => a.id === searched.id).length != 0;
  }
}
