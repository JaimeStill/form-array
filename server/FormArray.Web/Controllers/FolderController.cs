using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using FormArray.Data;
using FormArray.Data.Entities;
using FormArray.Data.Extensions;

namespace FormArray.Web.Controllers
{
    [Route("api/[controller]")]
    public class FolderController : Controller
    {
        private AppDbContext db;

        public FolderController(AppDbContext db)
        {
            this.db = db;
        }

        [HttpGet("[action]")]
        public async Task<List<Folder>> GetFolders() => await db.GetFolders();

        [HttpPost("[action]")]
        public async Task<bool> ValidateFolderName([FromBody]Folder folder) => await folder.ValidateName(db);

        [HttpPost("[action]")]
        public async Task SaveFolder([FromBody]Folder folder) => await db.SaveFolder(folder);

        [HttpPost("[action]")]
        public async Task RemoveFolder([FromBody]Folder folder) => await db.RemoveFolder(folder);
    }
}