import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  loginDetails: any
  constructor( private fb: FormBuilder, private authService: AuthService, private cookieservice: CookieService, private router:Router ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
   }

    ngOnInit(): void {
    }

    onSubmit() {
      this.loginDetails = this.loginForm.value
      this.authService.loginUser(this.loginDetails).subscribe((response: any) => {
        if(response.status) {
          console.log(response.payload)
          this.cookieservice.set( 'token', response.payload.token ,0.25); 
          this.router.navigate(['/home'])
        } else {
          console.log(response.message)
        }
      })
      }
}
  
