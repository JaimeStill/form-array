# Angular Reactive Forms - FormGroup with FormArray

The intent behind this repository is to standardize the approach of using a `FormArray` within a `FormGroup` to synchronize the state of a One to Many relationship between two EF Core entities.

[![form-array](https://user-images.githubusercontent.com/14102723/135504816-d1b594b6-d015-4636-9918-71b5f057e6b2.gif)](https://user-images.githubusercontent.com/14102723/135504816-d1b594b6-d015-4636-9918-71b5f057e6b2.gif)

## Relevant Files:

### Server

* [Entities](./server/FormArray.Data/Entities)
  * [Folder](./server/FormArray.Data/Entities/Folder.cs)
  * [Note](./server/FormArray.Data/Entities/Note.cs)
* [Extensions](./server/FormArray.Data/Extensions)
  * [FolderExtensions](./server/FormArray.Data/Extensions/FolderExtensions.cs)
  * [DbInitializer](./server/FormArray.Data/Extensions/DbInitializer.cs)
* [Controllers](./server/FormArray.Web/Controllers)
  * [FolderController](./server/FormArray.Web/Controllers/FolderController.cs)

### Client

* [Models](./client/core/models)
  * [Folder](./client/core/models/folder.ts)
  * [Note](./client/core/models/note.ts)
* [Services](./client/core/services)
  * [FolderService](./client/core/services/folder.service.ts)
* [Forms](./client/core/forms)
  * [FolderForm](./client/core/forms/folder.form.ts)
* [Components](./client/core/components)
  * [FolderEditor](./client/core/components/folder/folder-editor.component.ts)
  * [FolderCard](./client/core/components/folder/folder-card.component.ts)
* [Route](./client/form-array/src/app/routes/home)
  * [Home](./client/form-array/src/app/routes/home/home.route.ts)
