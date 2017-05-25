import {ChatService, Message} from './chat.service';
import {Component, ElementRef} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { UserService } from 'app/user.service';

@Component({
    selector: 'typing',
    styles: [`
        .typingBubble {
            background-color: lightgreen;
            margin: 0px 0px 20px 5px;
            padding: 5px;
            display: inline-block;
        }
        .typingBubble:nth-of-type(2){
            background-color: lightpink;
        }
        .typingBubble:nth-of-type(3){
            background-color: lightsteelblue;
        }
        p {
            color: gray;
            font-style: italic;
            font-size: 0.75em;
        } 
    `],
    template: `
        <div *ngIf="show.length <= 3">
            <div *ngFor="let msg of show;" class="typingBubble" title="user{{msg.author}} is typing">...</div>
        </div>
        <div *ngIf="show.length > 3">
            <p>{{show.length}} users typing</p>
        </div>
    `,
})
export class TypingComponent {
    public show: string[] = [];
    private typings = {};

    constructor(private chatService: ChatService) {
        chatService.usersTyping
        .filter(typing => typing.author !== UserService.userId)
        .subscribe(typer => {
            if (typer.isTyping) {
                this.typings[typer.author] = typer;
            } else {
                delete this.typings[typer.author];
            }

            this.show = Object.keys(this.typings).map((key) => this.typings[key]);
        });
    }
}
