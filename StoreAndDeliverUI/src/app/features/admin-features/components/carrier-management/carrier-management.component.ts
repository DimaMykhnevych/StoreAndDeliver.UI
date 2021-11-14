import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Carrier } from 'src/app/core/models/carrier';
import { CarrierService } from 'src/app/features/cargo-requests/services/carrier.service';
import { AddEditCarrierDialogData } from 'src/app/layout/dialogs/models/add-edit-dialog-data';
import { DialogService } from 'src/app/layout/dialogs/services/dialog.service';

@Component({
  selector: 'app-carrier-management',
  templateUrl: './carrier-management.component.html',
  styleUrls: ['./carrier-management.component.scss'],
})
export class CarrierManagementComponent implements OnInit, AfterViewInit {
  public isCarriersLoading: boolean = false;
  public displayedColumns: string[] = [
    'userName',
    'email',
    'companyName',
    'truckVolume',
    'update',
    'delete',
  ];

  public carriers: Carrier[] = [];
  public dataSource: MatTableDataSource<Carrier> =
    new MatTableDataSource<Carrier>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private _carrierService: CarrierService,
    private _dialogService: DialogService
  ) {}

  public ngOnInit(): void {
    this.getCarriers();
  }

  ngAfterViewInit() {}

  public onAddCarrierClick(): void {
    const data: AddEditCarrierDialogData = {
      carrier: null as any,
      isAdding: true,
    };
    const dialogRef = this._dialogService.openAddEditCarrierDialog(data);
    dialogRef.afterClosed().subscribe((success: boolean) => {
      if (success === true) {
        this.getCarriers();
      }
    });
  }

  public onUpdateClick(element: Carrier): void {
    const data: AddEditCarrierDialogData = {
      carrier: element,
      isAdding: false,
    };
    const dialogRef = this._dialogService.openAddEditCarrierDialog(data);
    dialogRef.afterClosed().subscribe((success: boolean) => {
      if (success === true) {
        this.getCarriers();
      }
    });
  }

  public onDeleteCLick(carrier: Carrier): void {
    this._carrierService
      .deleteCarrier(carrier.id)
      .subscribe(() => this.getCarriers());
  }

  private getCarriers(): void {
    this.isCarriersLoading = true;
    this._carrierService.getCarriers().subscribe((resp) => {
      this.carriers = resp;
      this.dataSource = new MatTableDataSource<Carrier>(this.carriers);
      this.dataSource.paginator = this.paginator;
      this.isCarriersLoading = false;
    });
  }
}
