import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  user: any
  constructor( private fb: FormBuilder, private authService: AuthService, private router: Router ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
   }

  ngOnInit(): void {
  }

  onSubmit():void {
    console.log(this.registerForm.value)
    this.user = this.registerForm.value;
    this.authService.registerUser(this.user).subscribe((response: any) => {
      if(response.status) {
        this.router.navigate(['/login'])
      } else {
        console.log(response.message)
      }
    })
  }
}
