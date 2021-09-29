import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Folder } from './folder';

export interface Note {
  id: number;
  folderId: number;
  title: string;
  value: string;

  folder: Folder;
}

export const GenerateNoteForm = (note: Note, fb: FormBuilder): FormGroup =>
  fb.group({
    id: [note?.id],
    folderId: [note?.folderId],
    title: [note?.title, Validators.required],
    value: [note?.value, Validators.required]
  })
