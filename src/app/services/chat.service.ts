import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {WebSocketService} from './websocket.service';
import {Message, UserTyping} from '../models';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/share';

const CHAT_URL = 'chat';

@Injectable()
export class ChatService {
    public messages: Subject<Message>;
    public usersTyping: Subject<UserTyping>;
    private hub;

    constructor(wsService: WebSocketService) {
        this.hub = wsService.connect(this.getChatUrl()).share();

        this.messages = this.hub
            .map((response: MessageEvent) => JSON.parse(response.data))
            .filter((data: any) => {
             return data.message != null;
            })
            .map((data: any): Message => {
                return {
                    author: data.author,
                    message: data.message,
                };
            });

        this.usersTyping = this.hub
            .map((response: MessageEvent) => JSON.parse(response.data))
            .filter((data: any) => {
                return data.isTyping != null;
            })
            .map((data: any): UserTyping => {
                return {
                    author: data.author,
                    isTyping: data.isTyping,
                };
            });

    }

    private getChatUrl(){
        let protocol = '';
        if (window.location.protocol === 'https:') {
            protocol = 'wss:';
        } else {
            protocol = 'ws:';
        }

        return `${protocol}//${window.location.host}/${CHAT_URL}`;
    }
}
