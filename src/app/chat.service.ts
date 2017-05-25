import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {WebSocketService} from './websocket.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/share';

const CHAT_URL = 'ws://localhost:3000/chat';

export interface Message {
    author: string;
    message: string;
}

export interface UserTyping {
    author: string;
    isTyping: boolean;
}

@Injectable()
export class ChatService {
    public messages: Subject<Message>;
    public usersTyping: Subject<UserTyping>;
    private hub;

    constructor(wsService: WebSocketService) {
        this.hub = wsService.connect(CHAT_URL).share();

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
}
