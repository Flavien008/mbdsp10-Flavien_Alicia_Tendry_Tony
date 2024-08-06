import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup, UntypedFormArray, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-createnewitem',
  templateUrl: './createnewitem.component.html',
  styleUrls: ['./createnewitem.component.scss']
})

// Createnewitem Component
export class CreatenewitemComponent implements OnInit {

  selectedcategory: any;
  itemData!: UntypedFormGroup;
  submitted = false;

  userForm: UntypedFormGroup;

  constructor(public formBuilder: UntypedFormBuilder) {
    this.selectedcategory = 'ETH'

    this.userForm = this.formBuilder.group({
      sizes: this.formBuilder.array([
        this.formBuilder.control(null)
      ])
    })
  }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    // Remove header user profile and create button
    document.querySelector('.user')?.classList.add('d-none')
    document.querySelector('.create')?.classList.add('d-none')
    document.querySelector('.craeteitem')?.classList.add('d-none')

    //Remove mail subscription footer
    document.querySelector('.bg-secondary')?.classList.add('d-none')
    document.querySelector('.footer .bg-dark')?.classList.remove('mt-n10', 'pt-10')

    // Validation
    this.itemData = this.formBuilder.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      collection: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      price: ['', [Validators.required]],
      paymenttype: ['', [Validators.required]],
      address: ['', [Validators.required]],
      size: ['', [Validators.required]],
      sizes: [''],
    });

  }

  /**
* Returns form
*/
  get form() {
    return this.itemData.controls;
  }

  onNavChange(ev: any) {
    const nav = document.getElementsByClassName('priceoption')
    if (nav) {
      const items = Array.from(nav);
      items.forEach(element => {
        var tag = element.querySelectorAll('div.btn-outline-accent')
        tag.forEach(el => {
          el.classList.remove('active')
          if (el.getElementsByTagName('span')[0].innerHTML == ev.nextId) {
            el.classList.add('active')
            el.getElementsByTagName('a')[0].classList.remove('active')
          }
        })
      });
    }
  }

  files: File[] = [];

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.itemData.setValue({
      'image': this.files[0].name
    })
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  changeprice(event: any) {
    this.selectedcategory = event.target.closest('span')?.innerHTML
  }

  createitem() {
    if (this.itemData.valid) {
    }
    this.submitted = true;
  }

  // Add Item
  addItem(): void {
    (this.userForm.get('sizes') as UntypedFormArray).push(
      this.formBuilder.control(null)
    );
  }

  // Delete Item
  removeItem(index: any) {
    (this.userForm.get('sizes') as UntypedFormArray).removeAt(index);
  }

  // Get Item Data 
  getItemFormControls(): AbstractControl[] {
    return (<UntypedFormArray>this.userForm.get('sizes')).controls
  }

}
