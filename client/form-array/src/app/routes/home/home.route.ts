import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  ConfirmDialog,
  Folder,
  FolderService
} from 'core';

import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'home-route',
  templateUrl: 'home.route.html'
})
export class HomeRoute implements OnInit, OnDestroy {
  private sub: Subscription;
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

    this.sub = this.folderSvc.folders$.subscribe(folders => {
      if (folders?.length > 0 && this.folder?.id > 0)
        this.folder = folders.find(f => f.id === this.folder.id)
    })
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  selected = (f: Folder) => f?.id === this.folder?.id;

  selectFolder = (f: Folder) =>
    this.folder = this.selected(f)
      ? this.new()
      : f;

  refresh = (f: Folder = null) => {
    if (f && this.selected(f)) this.selectFolder(f);
    this.folderSvc.getFolders();
  }

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
        res && this.refresh(f);
      }
    })
}
