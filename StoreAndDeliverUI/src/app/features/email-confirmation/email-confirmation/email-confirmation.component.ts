import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailConfirmationService } from '../services/email-confirmation.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss'],
})
export class EmailConfirmationComponent implements OnInit {
  public showSuccess: boolean = false;
  public showError: boolean = false;
  public errorMessage: string = '';

  constructor(
    private _emailService: EmailConfirmationService,
    private _route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.confirmEmail();
  }

  private confirmEmail(): void {
    const token = this._route.snapshot.queryParams['token'];
    const email = this._route.snapshot.queryParams['email'];

    this._emailService.confirmEmail({ token: token, email: email }).subscribe(
      (resp) => {
        this.showSuccess = true;
      },
      (error) => {
        this.showError = true;
        this.errorMessage = error;
      }
    );
  }
}
