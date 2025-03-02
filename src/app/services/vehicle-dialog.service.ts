import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleDialogService {
  private dialogState = new BehaviorSubject<boolean>(false);
  dialogState$ = this.dialogState.asObservable(); // ✅ Observable for modal state

  openDialog() {
    this.dialogState.next(true);
  }

  closeDialog() {
    this.dialogState.next(false);
  }
}
