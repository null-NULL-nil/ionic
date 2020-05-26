import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-login-main',
    templateUrl: './login-main.page.html',
    styleUrls: ['./login-main.page.scss'],
})
export class LoginMainPage implements OnInit
{
    modalRef: BsModalRef;

    constructor(private modalService: BsModalService, private router: Router) { }

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
        this.router.navigate(['./regeist']);
    }

}
