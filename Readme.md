* Hasan Basri Ayhaner
* hbasriayhaner114@gmail.com
# Product Catalog Web App

![Build Status](https://shields.io/badge/.Net-5-green)
![Build Status](https://shields.io/badge/npm-8.5.5-green)
![Build Status](https://shields.io/badge/node-16.15.0-green)

![Build Status](https://shields.io/badge/BCrypt.Net%20Next-v4.0.3-blue)
![Build Status](https://shields.io/badge/Microsoft.EntityFrameworkCore-v5.0.0-blue)
![Build Status](https://shields.io/badge/Microsoft.EntityFrameworkCore.Design-v5.0.0-blue)
![Build Status](https://shields.io/badge/Microsoft.EntityFrameworkCore.SqlServer-v5.0.0-blue)
![Build Status](https://shields.io/badge/System.Data.SqlClient-v4.8.3-blue)

- [Installing / Getting Started](#installing--getting-started)
- [Database](#database)
- [App](#app)
- [Logs](#logs)

## Installing / Getting started

*A quick introduction for run this project follow instructions.*

First you should clone this repository to your PC and navigate to project folder with these commands.
For run these commands you need to install git from official website of git.
https://git-scm.com

```shell
git clone git@github.com:HBA114/Staj_I_Proje_181213013.git
cd Staj_I_Proje_181213013
```
You can run this project in your computer with this dotnet command.
For run this command you need to install:

- dotnet sdk from official website of Microsoft .Net and don't forget that this projects run with .Net 5.0
https://dotnet.microsoft.com/en-us/download/dotnet
- NodeJs from official website of nodejs and don't forget that this project run with NodeJs 16.15.0 with npm 8.5.5
https://nodejs.org

```shell
dotnet run -p ProductCatalog.API
```
If you want to use Visual Studio 2022 for running this project, be sure that the startup project is ProductCatalog.API. The backend server is running now.

For run frontend app open a command promt or shell in project folder. Then go to product_catalog_react directory and run frontend with these commands.

```shell
cd product_catalog_react
npm start
```
### Database

If you want to test database functionality run command given below. Open package manager console or a terminal(cmd, bash, ...) run this command for create the initial migration.
```shell
dotnet ef migrations add CreateTables -p ProductCatalog.Infrastructure -s ProductCatalog.Api
```
This command creates a migration for API layer from Infrastructure Layer.
If migration command gives an error like 'build failed', build project manually and fix errors and then try that update command again.

If that command gives an error like "dotnet-ef does not exist" then run command given below. If you are using Visual Studio open Manage Nuget Packages window for API and Infrastrucure and install Microsoft.EntityFrameworkCore , Microsoft.EntityFrameworkCore.SqlServer and Microsoft.EntityFrameworkCore.Tools. Than you will be able to run migrations.

```shell
dotnet tool install --global dotnet-ef
```
If your migrate successfully added, you need to update database for apply changes with command given below.
```shell
dotnet ef database update -p ProductCatalog.Infrastructure -s ProductCatalog.Api
```
If database update command gives an error like 'build failed', build project manually and fix errors and then try same update command again.

Now you are ready to run app with database functionality.

### App
- For frontend go to product_catalog_react directory and read ReadMe.md file for instructions.

App starts with products page. In products page you can see all products. Categories will be added soon. You can click product and see details, if you register and login you will be awailable to add(create) product, buy product or make an offer to a product.
- When you registered, you will receive a welcome mail from us.
- In register and login your password must have length of at least 8, at least 1 number, at least 1 Capital letter, at least 1 lower case letter and at least 1 symbol. (For your security)
- When you logged in your session will be 1 hour. In every 1 hour you need to login again for using some features(Buy Product, Create Product and Making an Offer to a Product).
- If you enter incorrect password 3 times in total, you wil receive an email and your account will be blocked. In that case contact with us via email.

### Logs
- You can find logs in C:\primeforLogs folder. You can change log file directory in nlog.config file in ProductCatalog.API project.