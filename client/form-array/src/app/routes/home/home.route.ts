import {
  Component,
  OnInit
} from '@angular/core';

import {
  ConfirmDialog,
  Folder,
  FolderService
} from 'core';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'home-route',
  templateUrl: 'home.route.html'
})
export class HomeRoute implements OnInit {
  folder: Folder;

  constructor(
    private dialog: MatDialog,
    public folderSvc: FolderService
  ) { }

  private new = () => {
    return {
      id: null,
      name: null
    } as Folder;
  }

  ngOnInit() {
    this.refresh();
    this.folder = this.new();
  }

  selected = (f: Folder) => f?.id === this.folder?.id;

  selectFolder = (f: Folder) =>
    this.folder = this.selected(f)
      ? this.new()
      : f;

  refresh = () => this.folderSvc.getFolders();

  removeFolder = (f: Folder) => f && this.dialog.open(ConfirmDialog, {
    data: {
      title: 'Remove Folder',
      content: `Are you sure you want to remove folder ${f.name}?`
    },
    disableClose: true,
    autoFocus: false
  })
  .afterClosed()
  .subscribe(async result => {
    if (result) {
      const res = await this.folderSvc.removeFolder(f);
      if (res) {
        if (this.selected(f)) this.selectFolder(f);
        this.refresh();
      }
    }
  })
}
