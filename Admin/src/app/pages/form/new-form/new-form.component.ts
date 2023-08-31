import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.scss']
})
export class NewFormComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  validationform: UntypedFormGroup;

  submit: boolean;

  constructor(public formBuilder: UntypedFormBuilder) {

  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Forms'}, { label: 'New Business', active: true }];

    this.validationform = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+'), Validators.minLength(2)]],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      state: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      zip: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    });
  }

  get form() {
    return this.validationform.controls;
  }

  validSubmit() {
    this.submit = true;
  }

}
