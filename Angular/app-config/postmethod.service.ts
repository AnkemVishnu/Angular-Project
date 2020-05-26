import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SecureService } from '../secure.service';
import { SessionStatic } from './SessionStatic';
import { ResponseModel } from '../app-pojo/ResponseModel';
import { AppUrls } from '../app-config/AppUrls';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class PostmethodService {

  private input: String;
  private output: ResponseModel;
  public userId = JSON.parse(sessionStorage.getItem(SessionStatic.user)).mobileNumber;
  public options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'auth_token': sessionStorage.getItem(SessionStatic.authotoken)
    }),
    // responseType: 'text' as 'json'
  }

  constructor(private http: HttpClient, private ss: SecureService) { }

  public vgwAdminPost(RequestModel: any, url: string) {
    RequestModel.userId = this.userId;
    this.input = this.ss.encrypt(JSON.stringify(RequestModel));
    return this.http.post(AppUrls.WebServicesUrl + url, JSON.stringify(this.input), this.options).map((response: Response) => {
      var s = JSON.parse(this.ss.decrypt(response));
      this.output = s;
      return this.output;
    })
  }

  public vgwAppPost(RequestModel: any, url: string) {
    RequestModel.userId = this.userId;
    return this.http.post(AppUrls.WebServicesUrl + url, RequestModel, this.options).map((response: Response) => {
      return response;
    })
  }

}