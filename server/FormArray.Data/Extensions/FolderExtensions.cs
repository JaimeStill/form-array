using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using FormArray.Core;
using FormArray.Core.ApiQuery;
using FormArray.Data.Entities;

namespace FormArray.Data.Extensions
{
    public static class FolderExtensions
    {
        static IQueryable<Folder> SetIncludes(this DbSet<Folder> folders) =>
            folders.Include(x => x.Notes);

        public static async Task<List<Folder>> GetFolders(this AppDbContext db) =>
            await db.Folders
                .SetIncludes()
                .OrderBy(x => x.Name)
                .ToListAsync();

        public static async Task<bool> ValidateName(this Folder folder, AppDbContext db)
        {
            var check = await db.Folders
                .FirstOrDefaultAsync(x =>
                    x.Id != folder.Id
                    && x.Name.ToLower() == folder.Name.ToLower()
                );

            return check is null;
        }

        public static async Task SaveFolder(this AppDbContext db, Folder folder)
        {
            var notes = folder.Notes;

            if (folder.Id > 0)
                await db.UpdateFolder(folder);
            else
                await db.AddFolder(folder);

            await db.SaveNotes(notes, folder.Id);
        }

        public static async Task AddFolder(this AppDbContext db, Folder folder)
        {
            if (await folder.Validate(db))
            {
                folder.ClearNavProps();
                await db.Folders.AddAsync(folder);
                await db.SaveChangesAsync();
            }
        }

        public static async Task UpdateFolder(this AppDbContext db, Folder folder)
        {
            if (await folder.Validate(db))
            {
                folder.ClearNavProps();
                db.Folders.Update(folder);
                await db.SaveChangesAsync();
            }
        }

        public static async Task RemoveFolder(this AppDbContext db, Folder folder)
        {
            folder.ClearNavProps();
            db.Notes.RemoveRange(db.Notes.Where(x => x.FolderId == folder.Id));
            db.Folders.Remove(folder);
            await db.SaveChangesAsync();
        }

        static async Task SaveNotes(this AppDbContext db, IEnumerable<Note> notes, int folderId)
        {
            foreach (var note in notes.Where(n => n.FolderId < 1))
                note.FolderId = folderId;

            var noteIds = await db.Notes
                .Where(x => x.FolderId == folderId)
                .Select(x => x.Id)
                .ToListAsync();

            var removeNotes = await db.Notes
                .Where(x =>
                    x.FolderId == folderId
                    && !notes.Select(x => x.Id).Contains(x.Id)
                )
                .ToListAsync();

            var updateNotes = notes
                .Where(x => noteIds.Contains(x.Id))
                .ToList();

            var newNotes = notes
                .Where(x => !noteIds.Contains(x.Id))
                .ToList();

            db.Notes.RemoveRange(removeNotes);
            db.Notes.UpdateRange(updateNotes);
            await db.Notes.AddRangeAsync(newNotes);

            await db.SaveChangesAsync();
        }

        static void ClearNavProps(this Folder folder)
        {
            folder.Notes = null;
        }

        static async Task<bool> Validate(this Folder folder, AppDbContext db)
        {
            if (string.IsNullOrEmpty(folder.Name))
                throw new AppException("Folder must have a Name", ExceptionType.Validation);

            var check = await folder.ValidateName(db);

            if (!check)
                throw new AppException("The provided folder name is already in use", ExceptionType.Validation);

            return true;
        }
    }
}