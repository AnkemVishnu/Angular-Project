import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
import { SessionStatic } from "./app-config/SessionStatic";
/// <reference path="../node_modules/crypto-js//index.d.ts" />
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SecureService {

  constructor() { }

  public userId = JSON.parse(sessionStorage.getItem(SessionStatic.user)).mobilenumber;

  public headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'auth_token': sessionStorage.getItem(SessionStatic.authotoken),
  });

  public encrypt(data): string {
    var key = CryptoJS.enc.Utf8.parse('Biz@123Bizm@bia1');
    var iv = CryptoJS.enc.Utf8.parse('bizmobiabizmobia');
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    // console.log('Encrypted :' + encrypted);
    // console.log('Key :' + encrypted.key);
    // console.log('Salt :' + encrypted.salt);
    // console.log('iv :' + encrypted.iv);
    return encrypted.toString();
  }

  public decrypt(data): string {
    var key = CryptoJS.enc.Utf8.parse('Biz@123Bizm@bia1');
    var iv = CryptoJS.enc.Utf8.parse('bizmobiabizmobia');
    var decrypted = CryptoJS.AES.decrypt(data, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    // console.log('Decrypted : ' + decrypted);
    // console.log('utf8 = ' + decrypted.toString(CryptoJS.enc.Utf8));
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}