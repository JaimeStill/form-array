using FormArray.Core.Extensions;

namespace FormArray.Office
{
    public class OfficeConfig
    {
        public string directory;

        public string Directory
        {
            get => directory;
            set
            {
                directory = value;
                Directory.EnsureDirectoryExists();
            }
        }
    }
}