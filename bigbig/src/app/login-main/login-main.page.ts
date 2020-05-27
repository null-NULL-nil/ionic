import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
@Component({
    selector: 'app-login-main',
    templateUrl: './login-main.page.html',
    styleUrls: ['./login-main.page.scss'],
})
export class LoginMainPage implements OnInit
{
    modalRef: BsModalRef;
    app: AppComponent;
    baseUrl = AppComponent.Url;
    disable: boolean;
    myForm: FormGroup;
    address: AbstractControl;
    constructor(private modalService: BsModalService, private router: Router, private fb: FormBuilder)
    {
        this.myForm = this.fb.group({
            'address': ['127.0.0.1'],
        });
        this.address = this.myForm.controls['address'];
    }

    ngOnInit()
    {
    }
    openModal(template: TemplateRef<any>)
    {
        this.modalRef = this.modalService.show(template);
    }
    regeist()
    {
        this.modalRef.hide();
        this.router.navigate(['./regeist']);
    }
    default()
    {
        this.modalRef.hide();
        this.router.navigate(['']);
    }
    seturl()
    {
        var address=this.myForm.controls['address'].value;
        console.log(address);
        var url = 'http://' + address + ':8080/';
        AppComponent.Url = url;
        console.log(AppComponent.Url);
    }

}
