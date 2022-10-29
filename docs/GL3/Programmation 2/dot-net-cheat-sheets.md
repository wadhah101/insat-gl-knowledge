# .Net cheat sheets

## [.NET framework vs Core vs Standard](https://www.linkedin.com/posts/rihemebenhassan_net-framework-vs-core-vs-standard-activity-6804365749277274112-b6Ah)

    .Net Framework and  .Net Core are two different .Net Runtime implementation .

|***.Net Framework***|***.Net Core***|***.Net Standard***|
| --- | --- | --- |
|it is a framework for creating and managing **Windows** and **Web** applications such as ASP.Net and ASP.Net MVC| It is an open source and cross-platform framework for building the application that can run on any platform like Mac, Linux or Windows. allows you to create console apps and ASP.Net Core and .NET Core apps.|It is a specification that can be used in all .NET implementations  (.NET framework , core or xamarin)|

## Data Acess 
   ### . The Repository Pattern
   A repository is nothing but a class defined for an entity, with all the operations possible on that specific entity. 
   |One repository per entity (non-generic) | Generic repository|
   | --- | --- |
   |This type of implementation involves the use of one repository class for each entity|A generic repository is the one that can be used for all the entities|



   ### . Unit Of Work Pattern
   Unit of Work is the concept related to the effective implementation of the Repository Pattern.  it is referred to as a single transaction that involves multiple operations . 

     The benefit of utilizing the Unit of Work in your DAL is to ensure data integrity ; 
     if an issue arises partway through persisting a series of business objects as part of a transaction , 
     all changes should be rolled back to ensure that the data remains in a valid state.


###  [Ado.NET](https://github.com/rihemebh/.Net-cheat-sheets/tree/main/Ado.net)
      
###  [ASP.Net](https://github.com/rihemebh/.Net-cheat-sheets/tree/main/ASP.net)
