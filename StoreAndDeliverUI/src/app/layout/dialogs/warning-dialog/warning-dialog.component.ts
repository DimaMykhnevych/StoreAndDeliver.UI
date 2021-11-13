import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WarningDialogInfo } from '../models/warning-dialog';

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.scss'],
})
export class WarningDialogComponent implements OnInit {
  public content: string;
  public title: string;
  constructor(@Inject(MAT_DIALOG_DATA) data: WarningDialogInfo) {
    this.content = data.content;
    this.title = data.title;
  }
  public ngOnInit(): void {}
}
