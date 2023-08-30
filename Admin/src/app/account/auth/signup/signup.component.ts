import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { first } from 'rxjs/operators';
import { UserProfileService } from '../../../core/services/user.service';
import { Company, SimpleUser, Subscription } from 'src/app/core/models/auth.models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  submitted:any = false;
  error:any = '';
  successmsg:any = false;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
    private userService: UserProfileService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['TESTE', Validators.required],
      email: ['snsys@snsys.com', [Validators.required, Validators.email]],
      password: ['TESTE123', Validators.required],
      subscriptionName: ['TESTE', Validators.required],
      plan: ['1', Validators.required],
      period: ['1', Validators.required],
      businessName: ['TESTE', Validators.required],
      companyEmail: ['snsys@snsys.com', Validators.required],
      socialName: ['TESTE', Validators.required],
      cnpj: ['00.000.000/0000-00', Validators.required],
      cell: ['(11) 1234-1234', Validators.required],
      phone: ['(11) 1234-1234', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    } else {

      this.authenticationService.register(this.buildRegister()).subscribe({
        next: (response) => {
          this.successmsg = true;
          if (this.successmsg) {
            this.router.navigate(['/account/login']);
          }
        },
        error: err => {
          this.error = err.error.content[0]

        }
      })
    }
  }

  buildRegister(): any {
    const company = this.buildCompany();
    const subscription = this.buildSubscription();
    const user = this.buildSimpleUser();

    return {company, subscription, user};
  }

  buildCompany(): Company {
    let company: Company = {
      businessName: '',
      email: '',
      socialName: '',
      documentCnpj: '',
      cellNumber: '',
      phone: ''
    };

    company.businessName = this.f.businessName.value;
    company.email = this.f.companyEmail.value;
    company.socialName = this.f.socialName.value;
    company.documentCnpj = this.f.cnpj.value;
    company.cellNumber = this.f.cell.value;
    company.phone = this.f.phone.value;

    return company;
  }

  buildSimpleUser(): SimpleUser {
    let user: SimpleUser = {
      email: '',
      name: '',
      password: ''
    };

    user.name = this.f.username.value;
    user.password = this.f.password.value;
    user.email = this.f.email.value;

    return user;
  }

  buildSubscription(): Subscription {
    let subscription: Subscription = {
      name: '',
      subscriptionPlanId: 0,
      subscriptionPlanPeriodId: 0
    };

    subscription.name = this.f.subscriptionName.value;
    subscription.subscriptionPlanId = this.f.plan.value;
    subscription.subscriptionPlanPeriodId = this.f.period.value;

    return subscription;
  }
}
