import { Component, OnInit } from '@angular/core';

// Data Get
import { collections } from './data';

@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.scss']
})

// MyCollection Component
export class MyCollectionComponent implements OnInit {

  mycollection: any;

  constructor() { }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    // Remove header account and wallet button
    document.querySelector('.account')?.classList.add('d-none')
    document.querySelector('.wallet')?.classList.add('d-none')
    document.querySelector('.connectwallet')?.classList.add('d-none')

    //Remove mail subscription footer
    document.querySelector('.footer .bg-dark')?.classList.remove('mt-n10', 'pt-10')
    document.querySelector('.footer.bg-secondary')?.classList.add('d-none')

    // Fetch Data
    this.mycollection = collections
  }

  // Remove Collection
  removecollection(id: any) {
    this.mycollection.splice(id, 1)
  }

}
