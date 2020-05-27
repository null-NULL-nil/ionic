import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
    selector: 'app-regeist',
    templateUrl: './regeist.page.html',
    styleUrls: ['./regeist.page.scss'],
})
export class RegeistPage implements OnInit
{
    app:AppComponent;
    baseUrl = AppComponent.Url;
    constructor() { }

    ngOnInit()
    {
    }

}
