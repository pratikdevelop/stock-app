import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card'
import { CommonModule } from '@angular/common';
import axios from 'axios'

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  account = {
    name: '',
    phone: "",
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private router: Router) { }

  onSubmit() {
    // if (this.account.password !== this.account.confirmPassword) {
    //   alert('Passwords do not match');
    //   return;
    // }
    axios.post('http://localhost:8000/Login', this.account).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      this.router.navigate(['/login']);
    })



    // // Here you would send the account data to your backend API for registration
    // console.log('Account created successfully:', this.account);

    // // On successful creation, redirect to the login page
    // this.router.navigate(['/login']);
  }

}
