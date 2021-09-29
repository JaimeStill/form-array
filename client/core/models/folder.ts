import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Note } from './note';

export interface Folder {
  id: number;
  name: string;

  notes: Note[];
}

export const GenerateFolderForm = (folder: Folder, fb: FormBuilder): FormGroup =>
  fb.group({
    id: [folder?.id],
    name: [folder?.name, Validators.required],
    notes: fb.array([])
  })
