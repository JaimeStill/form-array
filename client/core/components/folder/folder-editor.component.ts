import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import {
  FormArray,
  FormBuilder,
  FormGroup
} from '@angular/forms';

import {
  Folder,
  GenerateFolderForm,
  GenerateNoteForm,
  Note,
  StorageState
} from '../../models';

import { FolderService } from '../../services';

@Component({
  selector: 'folder-editor',
  templateUrl: 'folder-editor.component.html'
})
export class FolderEditorComponent {
  private folder: Folder;

  state: StorageState<Folder>;
  form: FormGroup;

  @Input() set data (data: Folder) {
    this.folder = data;
    this.load();
  }

  @Input() label = 'Folder';
  @Input() size = 360;
  @Output() update = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    public folderSvc: FolderService
  ) { }

  private initNotes = (folder: Folder) => {
    if ((this.form.controls.notes as FormArray).length > 0)
      (this.form.controls.notes as FormArray).clear();

    if (folder.notes?.length > 0)
      for (const note of folder.notes)
      (this.form.controls.notes as FormArray).push(GenerateNoteForm(note, this.fb));
  }

  private load = () => {
    this.state = this.folderSvc.generateState(this.folder);

    const value = this.state.hasState
      ? this.state.getState()
      : this.folder;

    this.form = GenerateFolderForm(value, this.fb);

    this.initNotes(value);

    this.form
      .valueChanges
      .subscribe((folder: Folder) => this.state.updateState(folder));
  }

  clearCache = () => {
    this.form.reset(this.folder);
    this.initNotes(this.folder);
    this.state.clearState();
  }

  addNote = () => (this.form.controls.notes as FormArray).push(GenerateNoteForm({folderId: this.form?.value?.id} as Note, this.fb));

  removeNote = (i: number) => (this.form.controls.notes as FormArray).removeAt(i);

  save = async () => {
    if (this.form?.valid) {
      console.log(this.form);

      const res = await this.folderSvc.saveFolder(this.form.value);

      if (res) {
        this.clearCache();
        this.update.emit();
      }
    }
  }
}
