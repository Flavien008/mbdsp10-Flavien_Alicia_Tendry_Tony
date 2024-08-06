import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

// Footer Component
export class FooterComponent implements OnInit {

  formData!: UntypedFormGroup;
  submitted = false;

  constructor(public formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {

    this.formData = this.formBuilder.group({
      email: ['', [Validators.required]],
    });
  }

  /**
* Returns form
*/
  get form() {
    return this.formData.controls;
  }

  subscribe() {
    this.submitted = true
  }

}
