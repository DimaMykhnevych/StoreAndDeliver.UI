import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Logs } from '../models/logs';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  public logs: Logs = null as any;
  public form: FormGroup = this._builder.group({});
  public isLogsLoading: boolean = false;
  public logsExists: boolean = false;
  public backupLoading: boolean = false;
  constructor(
    private _adminService: AdminService,
    private _builder: FormBuilder,
    private _translateService: TranslateService,
    private _toastr: ToastrService,
    private datePipe: DatePipe
  ) {}

  public ngOnInit(): void {
    this.initializeForm();
  }

  public onGetLogsClick(): void {
    this.getLogs();
  }

  public onClearLogsClick(): void {
    if (this.logs) {
      this.logs.content = '';
    }
  }

  public onCreateBackupClick(): void {
    this.createDbBackup();
  }

  private initializeForm(): void {
    this.form = this._builder.group({
      date: new FormControl(new Date()),
    });
  }

  private getLogs(): void {
    this.isLogsLoading = true;
    this._adminService.getLogs(this.date?.value).subscribe((resp) => {
      this.isLogsLoading = false;
      this.logs = resp;
      if (this.logs.content.length === 0) {
        this.logs.content = this._translateService.instant(
          'adminFeatures.logsNotExists'
        );
      }
    });
  }

  private createDbBackup(): void {
    this.backupLoading = true;
    this._adminService.backupDatabase().subscribe((resp) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(resp);
      a.href = objectUrl;
      let date = new Date();
      let dateString = this.datePipe.transform(date, 'yyyy-MM-dd');
      let dbName = 'StoreAndDeliver';
      a.download = `${dbName}-${dateString}.sql`;
      a.click();
      URL.revokeObjectURL(objectUrl);
      this.backupLoading = false;
      this.showSuccess(this._translateService.instant('toastrs.backupCreated'));
    });
  }

  private showSuccess(text: string): void {
    this._toastr.success(`${text}`);
  }

  get date() {
    return this.form.get('date');
  }
}
