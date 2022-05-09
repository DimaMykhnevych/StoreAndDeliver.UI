import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
      }
    });
  }

  public onDeleteCLick(store: Store): void {
    this._storeService.deleteStore(store.id).subscribe(() => this.getStores());
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

  private initMapMarkers(): void {
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
