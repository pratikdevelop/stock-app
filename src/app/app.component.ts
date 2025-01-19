import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { ReplaySubject, Subject, takeUntil, take } from 'rxjs';
import { MatOptionModule } from '@angular/material/core';
import axios from 'axios';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';

@Component({
  selector: 'app-root',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    RouterOutlet,
    RouterModule,
    MatAutocompleteModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    NgxMatSelectSearchModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isLoading: any;
  onFolderSelected($event: MatAutocompleteSelectedEvent) {
    throw new Error('Method not implemented.');
  }
  title = 'app-v1';
  token = localStorage.getItem('my-token') ?? null;
  searchQuery: string = ''; // Bind to the search input
  isMobileMenuOpen: boolean = false; // Control the visibility of the mobile menu
  websites: any[] = [];
  websiteFilterCtrl: FormControl = new FormControl();
  _onDestroy = new Subject();
  constructor() {}

  ngOnInit() {
    this.websiteFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });
  }

  ngOnDestroy() {
    this._onDestroy.complete();
  }

   filterBanks() {
    let searchTerm = this.websiteFilterCtrl.value;
    if (searchTerm) {
      searchTerm = searchTerm.toLowerCase();
      axios
        .get(`http://localhost:8000/searchutil/${searchTerm}`)
        .then((response) => {
          this.websites = response.data.result;
        });
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
