using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;

using FormArray.Core.Extensions;

namespace FormArray.Core.Logging
{
    public class LogProvider
    {
        public string logDirectory;
        public string LogDirectory
        {
            get => logDirectory;
            set
            {
                logDirectory = value;
                LogDirectory.EnsureDirectoryExists();
            }
        }

        public string GetLogName() => $"log-{DateTime.Now.ToString("yyyy-MM-dd-hh-mm-ss")}.txt";

        public async Task CreateLog(HttpContext context, Exception exception, string subPath = "")
        {
            var builder = new StringBuilder();
            builder.AppendLine("ContextDetails");
            builder.AppendLine();
            builder.AppendLine(await context.GetContextDetails());
            builder.AppendLine("Exception Details");
            builder.AppendLine(exception.GetExceptionChain());

            var path = string.IsNullOrEmpty(subPath)
                ? LogDirectory
                : $@"{LogDirectory}\{subPath}";

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            await builder.WriteLog($@"{path}\{GetLogName()}");
        }
    }
}
