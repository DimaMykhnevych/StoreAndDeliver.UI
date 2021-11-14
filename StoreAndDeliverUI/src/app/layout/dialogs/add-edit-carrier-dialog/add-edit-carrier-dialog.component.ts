import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Carrier } from 'src/app/core/models/carrier';
import { AddCarrier } from 'src/app/features/admin-features/models/add-carrier';
import { UpdateCarrier } from 'src/app/features/admin-features/models/update-carrier';
import { CarrierService } from 'src/app/features/cargo-requests/services/carrier.service';
import { AddEditCarrierDialogData } from '../models/add-edit-dialog-data';

@Component({
  selector: 'app-add-edit-carrier-dialog',
  templateUrl: './add-edit-carrier-dialog.component.html',
  styleUrls: ['./add-edit-carrier-dialog.component.scss'],
})
export class AddEditCarrierDialogComponent implements OnInit {
  public data: AddEditCarrierDialogData;
  public form: FormGroup = this._builder.group({});
  public isUserNameAlreadyTaken: boolean = false;
  public isPasswordsMismatched: boolean = false;
  public isPasswordWeak: boolean = false;
  public isAddingUser: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) data: AddEditCarrierDialogData,
    public _dialogRef: MatDialogRef<AddEditCarrierDialogComponent>,
    private _builder: FormBuilder,
    private _carrierService: CarrierService,
    private _translate: TranslateService,
    private _toastr: ToastrService
  ) {
    this.data = data;
  }

  public ngOnInit(): void {
    this.initializeForm(this.data.carrier);
  }

  public onActionClick(): void {
    if (this.data.isAdding) {
      this.addCarrier(this.form.value);
    } else {
      this.updateCarrier(this.form.value);
    }
  }

  private updateCarrier(carrier: UpdateCarrier) {
    this.isAddingUser = true;
    this.isUserNameAlreadyTaken = false;
    carrier.id = this.data.carrier.id;
    this._carrierService
      .updateCarrier(carrier)
      .pipe(
        catchError((error) => {
          return this.onCatchError(error);
        })
      )
      .subscribe((resp) => {
        if (resp == true) {
          this.onCarrierUpdated();
        }
      });
  }

  private addCarrier(carrier: AddCarrier): void {
    this.isAddingUser = true;
    this.isPasswordsMismatched = false;
    this.isUserNameAlreadyTaken = false;
    this.isPasswordWeak = false;
    this._carrierService
      .addCarrier(carrier)
      .pipe(
        catchError((error) => {
          return this.onCatchError(error);
        })
      )
      .subscribe((carrier: Carrier) => {
        if (carrier.id) {
          this.onCarrierAdded();
        }
      });
  }

  private onCarrierAdded(): void {
    this.isAddingUser = false;
    this._translate.get('toastrs.carrierAdded').subscribe((resp: string) => {
      this.showSuccess(resp);
    });

    this._dialogRef.close(true);
  }

  private onCarrierUpdated(): void {
    this.isAddingUser = false;
    this._translate.get('toastrs.carrierUpdated').subscribe((resp: string) => {
      this.showSuccess(resp);
    });

    this._dialogRef.close(true);
  }

  private showSuccess(text: string): void {
    this._toastr.success(`${text}`);
  }

  private onCatchError(error: any): Observable<any> {
    if (error.status === 400 && error.error['username']) {
      this.isUserNameAlreadyTaken = true;
    } else if (error.status === 400 && error.error['password']) {
      this.isPasswordsMismatched = true;
    } else {
      this.isPasswordWeak = true;
    }
    this.isAddingUser = false;
    return of({});
  }

  private initializeForm(carrier: Carrier): void {
    this.form = this._builder.group({
      userName: new FormControl(carrier?.appUser?.userName ?? '', [
        Validators.required,
      ]),
      email: new FormControl(carrier?.appUser?.email ?? '', [
        Validators.required,
        Validators.email,
      ]),
      companyName: new FormControl(carrier?.companyName ?? '', [
        Validators.required,
      ]),
      maxCargoVolume: new FormControl(carrier?.maxCargoVolume ?? '', [
        Validators.required,
      ]),
    });
    if (this.data.isAdding) {
      this.form.addControl(
        'password',
        new FormControl('', [Validators.required])
      );
    }
  }

  get userName() {
    return this.form.get('userName');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get companyName() {
    return this.form.get('companyName');
  }
  get maxCargoVolume() {
    return this.form.get('maxCargoVolume');
  }
}
