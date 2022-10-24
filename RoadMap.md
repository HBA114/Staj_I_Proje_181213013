* Hasan Basri Ayhaner
* hbasriayhaner114@gmail.com
* f181213013@ktun.edu.tr
# Roadmap

- [Creating Project](#creating-project)
- [Creating DbContext and Generic Repository](#creating-dbcontext-and-generic-repository)
- [Creating Dependency Injection, Adding Repositories and Connecting AppDbContext](#creating-dependency-injection-adding-repositories-as-service-and-connecting-appdbcontext)
- [Adding Database Connection](#adding-database-connection)

## Creating Project

Open Visual Studio 2022 and select Create a New Project. In project list select ASP.NET CORE REACT project and select .NET5.

API project is created but we want to use Layered Architecture in this app. So open WEBAPI project and right click to Solution(in Solution Explorer Window) and select Add New Project. Add ClassLib project for Infrastructure layer, Domain layer and Application layer.

Now we need to setup dependecies. In Solution Explorer Window, under WEBAPI project rgiht click to Dependencies and select Add Project Dependecy.

- WEBAPI has Dependency of Application and Infrastructure
- Application has Dependecy of Domain
- Infrastructure has Dependency of Application

These dependecies are allows us to apply Layered Architecture structure.

Project is Created Successfully. Now it's time to delete unnecessary files. Delete Class1.cs under Domain, Infrastructure and Application. Then delete weatherforecast.cs under WEBAPI and weatherforecastcontroller.cs under WEBAPI/Controllers.

## Creating DbContext and Generic Repository

- Under Infrastructure project create a folder named Data. Then create a class under Data folder named AppDbContext.cs. This AppDbContext class needs to inherit form DbContext.

- Under Application project create a folder named Interfaces. Then add an Interface to that folder named IRepository.cs. Then make this interface public, give a TEntity type and write generic functions.

- Under Infrastructure project create a folder named Repositories. Then add a class to that folder named GenericRepository.cs. In GenericRepository class implement IRepository. And write necessary functions for TEntity type from IRepository.

## Creating Dependency Injection, Adding Repositories as Service and Connecting AppDbContext

- Under Application project create a class named DependencyInjection.cs.
Make this class public static. Add IServiceCollection instance with AddApplication static method and return services instance.

- Under Infrastructure project create a class named DependencyInjection.cs.
Make this class public static. Add IServiceCollection instance with AddInfrastructure static method and return services instance.

- For connect a database open appsettings.json under WEBAPI project and add ConnectionStrings list as json. As first element of ConnectionStrings list create a connection string as "Default": "YOUR_CONNECTION_STRING". If you change name("Default") you have to give that name in following command.

- Then open Program.cs and add following
```
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
builder.services.AddApplication().AddInfrastructure();
```
- In the AddInfrastructure method (Infrastructrue projects DependecyInjection.cs) add this line:

```
services.AddTransistent(typeof(IRepository<>), typeof(GenericRepository<>));
```

## Adding Database Connection

- Under Domain project create a folder named Entities and create entity classes here.

- Then go to AppDbContext (Infrastructure/Data/AppDbContex.cs) and add that entity as property. For Example:

```
public DbSet<UserEntity> Users;
```

- If you run migrations this project creates a database(name is based on your connection string) and creates a table named Users. Users Tabe has Columns for UserEntity properties.