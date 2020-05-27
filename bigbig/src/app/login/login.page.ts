import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, AbstractControl, Validators, Form, FormControl } from '@angular/forms';
import { AppComponent } from '../app.component';
@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit
{
    app: AppComponent;
    baseUrl = AppComponent.Url;
    username: AbstractControl;
    password: AbstractControl;
    myForm: FormGroup;
    constructor(private http: HttpClient, private router: Router, private fb: FormBuilder)
    {
        this.myForm = this.fb.group({
            'username': ['root'],
            'password': ['password']
        });
        this.username = this.myForm.controls['username'];
        this.password = this.myForm.controls['password'];
    }
    ngOnInit()
    {
    }
    login(): void
    {
        console.log(this.myForm.value);
        this.baseUrl = AppComponent.Url;
        this.http.post(this.baseUrl + 'authentication', this.myForm.value).subscribe(
            (val: any) =>
            {
                console.log(val);
                if (val.succ)
                {
                    this.router.navigate(['../tabs']);
                }
                else
                {
                    alert('用户名或密码错误');
                }
            });
    }
}
