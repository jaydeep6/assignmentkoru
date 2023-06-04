import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;

  constructor(private _toster:ToastrService, private formBuilder: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')
    ]]
    });
  }

  /*** @description  Convenience getter for easy access to form controls  */

  get f() {
    return this.loginForm.controls;
  }

  /*** @description  Controls the input */

  onLogin(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      localStorage.setItem("user-Data", JSON.stringify(this.loginForm.value));
      this.router.navigate(["/pages/dashboard"]);
      this._toster.success('','Login Successfully', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
        positionClass: 'toast-bottom-right' 
      })
    }
  }
}
