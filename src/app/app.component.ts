import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { ReplaySubject, Subject, takeUntil, take, catchError, debounceTime, of, switchMap, every } from 'rxjs';
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
  new: any;
  title = 'app-v1';
  token = localStorage.getItem('my-token') ?? null;
  searchQuery: string = ''; // Bind to the search input
  isMobileMenuOpen: boolean = false; // Control the visibility of the mobile menu
  websites: any[] = [];
  websiteFilterCtrl: FormControl = new FormControl();
  _onDestroy = new Subject();
  router = inject(Router)
  constructor() {}

  ngOnInit() {
    this.websiteFilterCtrl.valueChanges.pipe(
      debounceTime(500), // Wait for 500ms after user stops typing
      switchMap((searchTerm: string) => {
        if (searchTerm) {
          // Perform the API request when the search term changes
          return axios
            .get(`http://localhost:8000/searchutil/${searchTerm}`)
            .then(response => {
              if (response.data && response.data.result) {
                return response.data.result; // Return the websites array
              } else {
                console.warn('No results found or wrong data structure.');
                return []; // Return empty array if no results
              }
            })
            .catch(error => {
              console.error('Error fetching data from server', error);
              return []; // Return empty array on error
            });
        } else {
          return of([]); // Return empty array if no search term
        }
      }),
      catchError((error) => {
        console.error('Error during request:', error);
        return of([]); // Return empty array in case of error
      })
    ).subscribe((websites: any[]) => {
      // Update the websites variable with the response
      this.websites = websites;
    });
  }

  ngOnDestroy() {
    this._onDestroy.complete();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  getDate(): number {
    return new Date().getFullYear()
  }

  onFolderSelected($event: MatAutocompleteSelectedEvent) {
    console.log(
      `Selected folder: ${$event.option.value}`
    );

    this.router.navigateByUrl(`/stock/${$event.option.value}`)
    
  }
}
