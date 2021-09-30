import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';

import {
  FormArray,
  FormGroup
} from '@angular/forms';

import {
  ApiValidator,
  FolderService
} from '../services';

import { Subscription } from 'rxjs';

@Component({
  selector: 'folder-form',
  templateUrl: 'folder.form.html',
  providers: [
    ApiValidator,
    FolderService
  ]
})
export class FolderForm implements OnDestroy {
  private sub: Subscription;
  form: FormGroup;

  get name() { return this.form?.get('name') }
  get notes() { return this.form?.get('notes') as FormArray }

  private registerValidator = async () => {
    this.sub?.unsubscribe();

    this.sub = await this.validator.registerValidator(
      this.folderSvc.validateFolderName,
      this.form,
      this.name
    );
  }

  @Input() set data (data: FormGroup) {
    this.form = data;
    this.registerValidator();

    this.notes
      .valueChanges
      .subscribe(() => this.form.controls.notes = this.notes);
  }

  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter<number>();

  constructor(
    private validator: ApiValidator,
    private folderSvc: FolderService
  ) { }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
