import { Injectable } from '@angular/core';
import { SnotifyPosition, SnotifyService, } from 'ng-snotify';
@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private snotifyService: SnotifyService) { }

  successMessage(message: any) {
    this.snotifyService.success(message, "", {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      position: SnotifyPosition.rightTop
    });
  }

  infoMessage(message: any) {
    this.snotifyService.info(message,"", {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      position: SnotifyPosition.rightTop
    });
  }
  
  errorMessage(message: any) {
    this.snotifyService.error(message,"", {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      position: SnotifyPosition.rightTop
    });
  }

  warningMessage(message: any) {
    this.snotifyService.warning(message,"", {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      position: SnotifyPosition.rightTop
    });
  }
}

