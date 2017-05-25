import {Component} from '@angular/core';


@Component({
    selector: 'app-root',
    template: `
        <div class="wrapper">
            <chat></chat>
            <typing></typing>
            <create-message></create-message>
        </div>
    `
})

export class AppComponent {}
