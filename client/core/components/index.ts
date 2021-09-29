import { CoreComponents } from './core';
import { FolderComponents } from './folder';

export const Components = [
  ...CoreComponents,
  ...FolderComponents
];

export * from './core';
export * from './folder';
