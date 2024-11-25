import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TelegramApiService {
  API = `https://api.telegram.org`;
  token = ''; // TODO: insert token
  chatID = '' // TODO: insert chat ID;

  constructor( private http: HttpClient ) {}

  onSend(msg: any, id?: string): any {
    return this.http.post<any>(`${this.API}/bot${this.token}/sendMessage?chat_id=${this.chatID}&parse_mode=html&reply_to_message_id=${id ? id : '1'}&text=${msg}`, 'r');
  }
}


