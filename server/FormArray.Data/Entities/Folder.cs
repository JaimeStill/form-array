using System.Collections.Generic;

namespace FormArray.Data.Entities
{
    public class Folder
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public IEnumerable<Note> Notes { get; set; }
    }
}