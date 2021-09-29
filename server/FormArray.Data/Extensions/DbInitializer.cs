using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using FormArray.Data.Entities;

namespace FormArray.Data.Extensions
{
    public static class DbInitializer
    {
        public static async Task Initialize(this AppDbContext db)
        {
            Console.WriteLine("Initializing database");
            await db.Database.MigrateAsync();
            Console.WriteLine("Database initialized");

            if (!await db.Folders.AnyAsync())
            {
                Console.WriteLine("Seeding folders and notes...");

                var folders = new List<Folder>
                {
                    new Folder
                    {
                        Name = "Folder A",
                        Notes = new List<Note>
                        {
                            new Note
                            {
                                Title = "Note 1",
                                Value = "A note about something important."
                            },
                            new Note
                            {
                                Title = "Note 2",
                                Value = "A note about something trivial."
                            }
                        }
                    }
                };

                await db.Folders.AddRangeAsync(folders);
                await db.SaveChangesAsync();
            }
        }
    }
}
