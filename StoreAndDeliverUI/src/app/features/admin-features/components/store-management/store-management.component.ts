import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OptimalStoreLocation } from 'src/app/core/models/optimal-store-location';
import { Store } from 'src/app/core/models/store';
import { AddEditStoreDialogData } from 'src/app/layout/dialogs/models/add-edit-store-data';
import { DialogService } from 'src/app/layout/dialogs/services/dialog.service';
import { MapMarker } from '../../models/map-marker';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-store-management',
  templateUrl: './store-management.component.html',
  styleUrls: ['./store-management.component.scss'],
})
export class StoreManagementComponent implements OnInit {
  public displayedColumns: string[] = [
    'name',
    'maxCargoVolume',
    'address',
    'delete',
  ];
  public markers: MapMarker[] = [];
  public optimalStoresMarkers: MapMarker[] = [];
  public newStoresOptimalLocations: OptimalStoreLocation[] = [];
  public stores: Store[] = [];
  public isStoresLoading: boolean = false;
  public dataSource: MatTableDataSource<Store> =
    new MatTableDataSource<Store>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private _storeService: StoreService,
    private _dialogService: DialogService
  ) {}

  public ngOnInit(): void {
    this.getStores();
    this.getNewStoresOptimalLocations();
  }

  public onAddStoreCLick(): void {
    const data: AddEditStoreDialogData = {
      store: null as any,
      isAdding: true,
    };
    const dialogRef = this._dialogService.openAddEditStoreDialog(data);
    dialogRef.afterClosed().subscribe((success: boolean) => {
      if (success === true) {
        this.getStores();
        this.getNewStoresOptimalLocations();
      }
    });
  }

  public onDeleteCLick(store: Store): void {
    this._storeService.deleteStore(store.id).subscribe(() => {
      this.getStores();
      this.getNewStoresOptimalLocations();
    });
  }

  private getStores(): void {
    this.isStoresLoading = true;
    this._storeService.getStores().subscribe((resp) => {
      this.stores = resp;
      this.dataSource = new MatTableDataSource<Store>(this.stores);
      this.dataSource.paginator = this.paginator;
      this.isStoresLoading = false;
      this.initMapMarkers();
    });
  }

  private getNewStoresOptimalLocations(): void {
    this._storeService.getOptimalStoreLocation().subscribe((resp) => {
      this.newStoresOptimalLocations = resp;
      this.initOptimalStoresMarkers();
    });
  }

  private initOptimalStoresMarkers(): void {
    this.optimalStoresMarkers = [];
    const allLocations = this.newStoresOptimalLocations
      .map((s) => s.cities)
      .reduce((a, b) => a.concat(b), []);
    allLocations.forEach((s) =>
      this.optimalStoresMarkers.push({
        latitude: s?.latitude || 0,
        longtitude: s?.longtitude || 0,
        labelOptions: {
          color: 'black',
          fontFamily: '',
          fontSize: '10px',
          fontWeight: 'normal',
          text: '.',
        },
      })
    );
  }

  private initMapMarkers(): void {
    this.markers = [];
    this.stores.forEach((s) =>
      this.markers.push({
        latitude: s.address?.latitude || 0,
        longtitude: s.address?.longtitude || 0,
        labelOptions: {
          color: 'brown',
          fontFamily: '',
          fontSize: '16px',
          fontWeight: 'bold',
          text: s.name,
        },
      })
    );
  }
}
