@echo off

echo Updating dbseeder dependencies...
cd .\dbseeder
call dotnet add package Microsoft.EntityFrameworkCore.Relational
call dotnet add package Microsoft.EntityFrameworkCore.SqlServer

echo Updating FormArray.Core dependencies...
cd ..\FormArray.Core
call dotnet add package Microsoft.EntityFrameworkCore
call dotnet add package Newtonsoft.Json

echo Updating FormArray.Auth dependencies...
cd ..\FormArray.Auth
call dotnet add package Microsoft.EntityFrameworkCore

echo Updating FormArray.Data dependencies...
cd ..\FormArray.Data
call dotnet add package Microsoft.EntityFrameworkCore.SqlServer
call dotnet add package Microsoft.EntityFrameworkCore.Tools
call dotnet add package Newtonsoft.Json

echo Updating FormArray.Identity dependencies...
cd ..\FormArray.Identity
call dotnet add package Microsoft.Extensions.Configuration.Abstractions
call dotnet add package Microsoft.Extensions.Configuration.Binder
call dotnet add package System.DirectoryServices
call dotnet add package System.DirectoryServices.AccountManagement

echo Updating FormArray.Identity.Mock dependencies...
cd ..\FormArray.Identity.Mock

echo Updating FormArray.Office dependencies...
cd ..\FormArray.Office
call dotnet add package DocumentFormat.OpenXml

echo Updating FormArray.Sql dependencies...
cd ..\FormArray.Sql
call dotnet add package Microsoft.Data.SqlClient
call dotnet add package Newtonsoft.Json

echo Updating FormArray.Web dependencies...
cd ..\FormArray.Web
call dotnet add package Microsoft.AspNetCore.Mvc.NewtonsoftJson
call dotnet add package Microsoft.EntityFrameworkCore.Design

echo Caching NuGet dependencies...
cd ..\
call dotnet restore --packages nuget-packages

cd ..
echo Dependencies successfully updated!
