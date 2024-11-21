import { Component, Inject } from '@angular/core';
import type { Book } from '../../types/book.type'
import { DIALOG_DATA } from '../../../../../shared/dialog/dialog.token'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule} from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { DialogRef } from '../../../../../shared/dialog/dialog.ref'
import { CommonModule } from '@angular/common'
import { imageConverter } from '../../../../../shared/tools/image.converter'

@Component({
  selector: 'app-book-card-list',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './edit-create-book.component.html',
  styleUrl: './edit-create-book.component.scss'
})
export class EditCreateBookComponent {
public form = this._fb.group({
  title: [this.book?.title || '', Validators.required],
  author: [this.book?.author || '', Validators.required],
  description: [this.book?.description || '', Validators.required],
  year: [
    this.book?.year || '',
    [Validators.required, Validators.pattern('^[0-9]+$')],
  ],
  img: this.book?.img || '',
  id:this.book?.id || ''
});

public readonly errorMessageNumber = 'Value should be a number'
public readonly errorMessageRequired = 'Value required'
public readonly headers = ['title','author','year','description']
public readonly labels = {
  cancel:'Cancel',
  submit:'Submit',
  uploadImage:'Upload image'
}

constructor(@Inject(DIALOG_DATA)public book: Book, private readonly _fb: FormBuilder, private readonly _dialogRef:DialogRef){}

public submit():void {
  if(!this.form.valid) return 

  this._dialogRef.close(this.form.value)
}

public close():void {
  this._dialogRef.close()
}

public onFileSelected(event: Event): void {
 imageConverter(event, (imageUrl) => this.form.value.img = imageUrl)
}

public title():string {
  return this.book?.author ? 'Edit' : 'Create'
}

}
