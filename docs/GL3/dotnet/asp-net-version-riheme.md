---
slug: /gl3/dotnet/asp-net-version-riheme
---

# ASP.NET

Author [@rihemebh](https://github.com/rihemebh)

ASP stands for : **A**ctive **S**erver **P**ages

ASP.NET is a popular web-development framework for building web apps on the .NET platform.

## ASP.NET Core

ASP.NET Core is the open-source version of ASP.NET

## ASP.NET Core MVC

![mvc](https://github.com/rihemebh/.Net-cheat-sheets/blob/main/ASP.net/mvc.PNG)

### 1. Controllers

#### 1.1. Actions

Actions are the Methods within a controller

Every method could return an object that implements the **IActionResult** :

|ViewResult|ContentResult|RedirectToActionResult|RedirectToRouteResult|StatusCodeResult|
|---|---|---|---|---|
|Rendering the HTMLfile

returns view|Returns a message and not all the HTML page|Redirect to specified action instead of rendering the HTML

returns RedirectToAction(ActionName:["name"] , ControllerName : ["name"]) |Redirect to action from the specified URL defined in RouteConfig file

returns RedirectToRoute(new{controller = ["controllename"], action = ["About"] })|returns http status code like 200 / 404 / 500|

We could Pass parameters to actions by :

|The Request property|The FormCollection object|The Request Body|Routing -RouteData Property|
|---|---|---|---|

#### 1.2. Passing data to the view

##### Adding Information: (In the controller)
  
###### ViewBag

```csharp
ViewBag.Message = “some text”;
ViewBag.ServerTime = DateTime.Now;
```  

###### ViewData

```csharp
ViewData["Message"] = "some text";
ViewData["ServerTime"] = DateTime.Now;
```  

##### Retrieving Information: (In the view)

###### Retrieving Information ViewBag

```cshtml
<p>
Message is: @ViewBag.Message

Server time is: @ViewBag.ServerTime.ToString()
</p>
```
  
###### Retrieving Information ViewData

```cshtml
<p>
    Message is: @ViewData["Message"] //ViewBag.Message
    Server time is: @((DateTime)ViewData["ServerTime"])
</p>
```

*Ps : @ in the html file means server-side code* [see more](https://github.com/rihemebh/.Net-cheat-sheets/blob/main/ASP.net/README.md#21-razor)
  
#### 1.3. Routing

Routing is responsible for matching incoming HTTP requests and dispatching those requests to the app's executable endpoints.

##### Route Stucture

``/{controller}/{action}/{param}``

##### Declaration

In startups.cs file :

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }

    app.UseRouting();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllerRoute(
        name: "default",
        pattern: "{action: <actionname>}/{controller:<controllername>}/{id?}");
    });
}
```

We can use annotaions instead of the declaration

Example:

```csharp
   [Route("api/[action]")]
   public class ProductsController : Controller
      {
         [HttpGet("{id}")]
         public IActionResult GetProduct(int id)
      {
        ...
    
      
    }
    
    [Route("api")]
   public class CtegoryController : Controller
      {
         [Route("route")]
         [ActionName("get")]
         [HttpGet("{id}")]
         public IActionResult GetCategories(int id)
      {
        // ...
    }
```

### Passing Data from the request to the controller

#### Model binding

ASP.NET Core MVC model binding converts client request data (form values, route data, query string parameters, HTTP headers)
into objects that the controller can handle

### 2. View Component

#### 2.1. Razor

- Comments

```cshtml
@* comment text *@
```

- Code

Example 1 : Displaying dynamic data

```cshtml
@* if viewBag.price = 9 *@
@ViewBag.Price * 2  @* Result: 9 * 2 *@
@(ViewBag.Price * 2) @* Result: 18 *@

```

Example 2 : if we want to write a bloc of code inside the HTML

```cshtml
@{
@* code C## *@
}
```

#### 2.2. HTML Helpers

Razor Generate html code from helpers

##### @HTML.ActionLink()

```cshtml
@HTML.ActionLink("Click here to view photo 1", "Display" , "Photo" , new { id = 1}) 
 
@* equivalent to *@

<a href="/photo/display/1">Click here to view photo 1<a/>
```

##### @URL.Action()

```cshtml
<img src="@Url.Action('GetImage', new {id = 1})" />
 
@* equivalent to *@

<img src="/photo/getimage/1" />
```

### 3. Models

```csharp
public class Student
{   
    
    public int StudentId { get; set; }
    public string Name { get; set;  }
    public int Age { get; set;  }
    public string Description { get; set;  }
    public string Phone { get; set;  }
    public string Email { get; set;  }
    public bool State { get; set;  }
}
 
```

**In the Controller :**

```csharp
return View("<htmlFileName>", Student);
```

**In the View :**

```cshtml
@Model.Name
```

### Forms

#### Diplaying a form

```cshtml
@using (Html.BeginForm()){

@*  generate a form from the model class  *@
    @Html.EditorForModel()
}
```

|Generate a Label| Generate Input field| Generate Checkbox Field | Generate Radiobox Field| Generate DropedpwnList  |Form Validation |
|---|---|----|---|---|---|
|``@Html.LabelFor(model=> model.Name)``|``@Html.EditorFor(model=> model.Name)``|``@Html.checkboxFor(model=> model.state)``|``@Html.RadioButtonFor(model=> model.state)``|``@Html.DropdownListFor(model=>model.attr, new SelectItelList[]{@*putting data*@}, "Message")``|``@Html.ValidationSummary()``

 ``@Html.ValidationMessageFor(model => model.Name)``|

#### Specify the action to be executed after submit

```csharp
Html.BeginForm("<actionName>","<ControllerName>") 
```

#### Annotions

=> Customize the form fields

```csharp
public class Student
{   
    public int StudentId { get; set; }
    [Required]
    [Display(Name="My Name")] // to costumize the label in the form 
    public string Name { get; set;  }
    
    [Range(0,100)] // specify min nd max
    public int Age { get; set;  }
    
    [DataType(DataType.multilineText)] // to generate a textarea in the form 
    public string Description { get; set;  }
    
    [StringLength(8)] 
    public string phone { get; set;  }
    
    [RegularExpression("^.+@.+(\.).+$")] 
    public string email { get; set;  }
    
    public bool State { get; set;  }
} 
```
