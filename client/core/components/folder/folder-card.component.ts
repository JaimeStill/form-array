import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Folder } from '../../models';

@Component({
  selector: 'folder-card',
  templateUrl: 'folder-card.component.html'
})
export class FolderCardComponent {
  @Input() folder: Folder;
  @Input() selected: boolean = false;
  @Input() size: number = 320;

  @Output() select = new EventEmitter<Folder>();
  @Output() remove = new EventEmitter<Folder>();
}
