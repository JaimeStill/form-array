namespace FormArray.Data.Entities
{
    public class Note
    {
        public int Id { get; set; }
        public int FolderId { get; set; }
        public string Title { get; set; }
        public string Value { get; set; }

        public Folder Folder { get; set; }
    }
}