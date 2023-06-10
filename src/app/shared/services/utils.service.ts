import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UtilsService {

    constructor(private toastr: ToastrService,) { }


     // notifie une erreur
    notifyErrorMessage(message : string, title: string,) {
        this.toastr.error(message, title);
    }//end notifyErrorMessage

    // notifie une information
    notifyInfoMessage(message : string, title: string,) {
        this.toastr.info(message, title);
    }//end notifyInfoMessage

    // notifie un succes
    notifySuccessMessage(message : string, title: string,) {
        this.toastr.success(message, title);
    }//end notifySuccessMessage

      // demande  unen confirmation
      askConfirmation(message : string,) {
        return confirm(message);
    }//end askConfirmation


}