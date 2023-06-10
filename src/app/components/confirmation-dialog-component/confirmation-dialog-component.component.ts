import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog-component.component.html',
  styleUrls: ['./confirmation-dialog-component.component.css']
})
export class ConfirmationDialogComponent {
  @Input() message: string | undefined;
  @Output() confirmed = new EventEmitter<boolean>();

  @ViewChild('confirmationDialog') confirmationDialog: any;

  constructor(private modalService: NgbModal) { }

  confirm() {
    this.confirmed.emit(true);
    this.modalService.dismissAll();
  }

  cancel() {
    this.confirmed.emit(false);
    this.modalService.dismissAll();
  }

  open() {
    this.modalService.open(this.confirmationDialog);
  }
}
