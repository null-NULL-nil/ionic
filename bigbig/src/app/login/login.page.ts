import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, AbstractControl, Validators, Form, FormControl } from '@angular/forms';
@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit
{
    baseUrl = 'http://127.0.0.1:8080/';
    userName: AbstractControl;
    password: AbstractControl;
    myForm: FormGroup;
    constructor(private http: HttpClient, private router: Router, private fb: FormBuilder)
    {
        this.myForm = this.fb.group({
            'userName': ['root'],
            'password': ['password']
        });
        this.userName = this.myForm.controls['userName'];
        this.password = this.myForm.controls['password'];
    }
    ngOnInit()
    {
    }
    login(): void
    {
        console.log(this.myForm.value);
        this.http.post(this.baseUrl + 'authentication', this.myForm.value).subscribe(
            (val: any) =>
            {
                if (val.succ)
                    this.router.navigate(['./tabs']);
                else
                {
                    alert();
                }
            });
    }
}
