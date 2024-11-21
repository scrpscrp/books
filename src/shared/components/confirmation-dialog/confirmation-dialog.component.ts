import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { DIALOG_DATA } from '../../dialog/dialog.token'
import { DialogRef } from '../../dialog/dialog.ref'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDividerModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  constructor(@Inject(DIALOG_DATA) public readonly text: string, private readonly _dialog: DialogRef){}

  public close():void {
    this._dialog.close()
  }

  public confirm():void {
    this._dialog.close(true)
  }

  public readonly labels = {
    yes:'Yes',
    no:'No'
  }

}
