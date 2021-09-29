import {
  Injectable,
  Optional
} from '@angular/core';

import {
  Folder,
  StorageState
} from '../models';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SnackerService } from './snacker.service';
import { ServerConfig } from '../config';

const root = 'jps-form-array';
const module = 'folder';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private folders = new BehaviorSubject<Folder[]>(null);

  folders$ = this.folders.asObservable();

  constructor(
    private http: HttpClient,
    private snacker: SnackerService,
    @Optional() private config: ServerConfig
  ) { }

  generateState = (folder: Folder) => new StorageState<Folder>(root, module, folder?.id ? folder.id.toString() : 'new');

  getFolders = () => this.http.get<Folder[]>(`${this.config.api}folder/getFolders`)
    .subscribe({
      next: data => this.folders.next(data),
      error: err => this.snacker.sendErrorMessage(err.error)
    });

  validateFolderName = (folder: Folder): Promise<boolean> => new Promise((resolve) => {
    this.http.post<boolean>(`${this.config.api}folder/validateFolderName`, folder)
      .subscribe({
        next: res => resolve(res),
        error: err => {
          this.snacker.sendErrorMessage(err.error);
          resolve(false);
        }
      })
  });

  saveFolder = (folder: Folder): Promise<boolean> => new Promise((resolve) => {
    this.http.post(`${this.config.api}folder/saveFolder`, folder)
      .subscribe({
        next: () => resolve(true),
        error: err => {
          this.snacker.sendErrorMessage(err.error);
          resolve(false);
        }
      })
  });

  removeFolder = (folder: Folder): Promise<boolean> => new Promise((resolve) => {
    this.http.post(`${this.config.api}folder/removeFolder`, folder)
      .subscribe({
        next: () => resolve(true),
        error: err => {
          this.snacker.sendErrorMessage(err.error);
          resolve(false);
        }
      })
  })
}
