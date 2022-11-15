---
slug: /gl4/semester-1/development-frameworks/angular-cheat-sheet
---

# Angular-Cheat-Sheet

Author [@rihemebh](https://github.com/rihemebh)

## Angular

Angular is a Js Framework that supports multiple laguages like ES5, Typescript , dart ...

- SPA (Single Page application):
  The single page application is a web application or website that interacts with the user by dynamically rewriting the current page, rather than loading entire new pages from the server.

- Modular , fast , component based

## Modules

a Module is a class that is decorated by `@NgModule`
`appModule` is the main module that is in charge of the application bootstrapping

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
@NgModule({
imports: [ BrowserModule ], /* List of modules to be used */
declarations: [ AppComponent ], /*list of components + directives + pipes  */
bootstrap: [ AppComponent ] / *the component to be executed when the application is launched*/
})
export class AppModule { }
```

## Components

A component is a class decorated by `@Component`

```typescript
@Component({
  selector: 'app-component-overview', /* A selector instructs Angular to instantiate this component wherever it finds the corresponding tag in template HTML */
  templateUrl: './component-overview.component.html', /*associates a template with the component*/
  styleUrls: ['./component-overview.component.css'] ,
   providers:  [ HeroService ] /* An array of providers for services that the component requires*/
})
```

## Templates

A template is the view (HTML file) associated to a specific component

### Data binding

Data binding is the mecanism that allows a component and its template to communicates with each others

#### Property Binding (DOM <- Component)

A one-way binding that allows the DOM to recover data from the component.
The property is interpreted by the framework before it is added to the template.
We can call a property using :

1. on-property
2. [property]

#### Event Binding (DOM -> Component)

A one-way binding that allows intercations from the DOM to the components using events Handlers.
we can call a method using:

1. on-eventName
2. (eventName)

```html
<li>{{hero.name}}</li>
<app-hero-detail [hero]="selectedHero"></app-hero-detail>
<li (click)="selectHero(hero)"></li>
```

- The {{hero.name}} interpolation displays the component's hero.name property value within the element.

- The [hero] property binding passes the value of selectedHero from the parent HeroListComponent to the hero property of the child HeroDetailComponent.

- The (click) event binding calls the component's selectHero method when the user clicks a hero's name.

#### Tow-way Binding (DOM <-> Component)

Angular supports two-way data binding that allows interctions from DOM to component and component to DOM using directives **ngModel**.

![databinding](assets/databinding.png)

## Life cycle

A component instance has a lifecycle that starts when Angular instantiates the component class and renders the component view along with its child views.
The lifecycle continues with change detection, as Angular checks to see when data-bound properties change, and updates both the view and the component instance as needed.

| Method        | description                                | When it is called                                 | Use Cases                                                                                                                                    |
| ------------- | ------------------------------------------ | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| ngOnChanges() |                                            | When an input/output binding value changes        | whenever there is a change in the @Input data property, we can do some more changes in this method by comparing previous and current values. |
| ngOnInit()    | Initilize the component after construction | occurs only one time: After the first ngOnChanges | - fetch data                                                                                                                                 |

- Initialize some third party lib|
  |ngDoCheck()|Responsible for Change Detetction|Called immediately after ngOnChanges() on every change detection run, and immediately after ngOnInit() on the first run||
  |ngOnDestroy()|Used for clean up| Just before the component is destroyed|The best place to clean up event handlers or any subscriptions|

### Change detection

Change Detection means updating the DOM when the data has changed usually used with Data binding

#### How it works ?

- The developer is making changes to the model (like a component’s bindings);
- Angular’s change detection kicks in to propagate the changes;
- Change detection goes through every components in the component tree (from top to bottom) to check if the model it depends on changed;
- If Yes, it will update the component;
- Angular updates the component’s view (DOM).

  | Create a View -> Create Bindings -> Process Bindings -> Update DOM -> run check |
  | ------------------------------------------------------------------------------- |

  \*\* View is a data structure created with every bind

## Interaction between parent and child component

- By default every component could see only its properties

  To make Intercation possible betwwen parents and children we should use :

- @Input(): Sending data from **Parent -> child** using property Binding
- @Output() : Sending data from **Child -> Parent** using Event Binding

  (Imported from "@angular/core")

### @Input

Decorate a property with @Input means this property could be seen and modified by the parent.

**How to use it ?**
When the parent called the child compo
The child component :

```typescript
@Input() name = "defaultname"

```

The parent template :

```html
<app-child [name]="child" />
```

### @Output

How it works ?

- In the child component :

  - create an eventEmitter and decorate it with @Output()
  - create a method that will use this event emitter

  ```typescript
  @Output() sendDatatoParent = new EventEmitter()
  sendData(){
     this.sendDatatoPrent.emit(“I am the child ”);
  }

  ```

- In the child template:

  - call the method

  ```html
  <button (click)=“sendData“ ></buttton>
  ```

- In the parent template :

  - use the child's event Emitter as an event:

  ```html
  <app-child (sendDatatoDad)="“processDataInparent”"></app-child>
  ```

=> the parent will be able to process the data came from child which is the message "I am the child" and execute some work in the _processDataInparent_ method

## Directives

Angular directives are classes with the `@Directive` metadata. It allows you to modify the DOM and makes Templates dynamic

- Create a new directive :

  ```cmd
   ng g d <directive-name>
  ```

Angular has 3 types of Directives :

### 1. Built-in Attribute Directives

- **ngStyle** : adds and removes a set of HTML styles.

```html
<p [ngStyle]="{'color' : myColor }"></p>
```

- **ngClass** : adds and removes a set of CSS classes

```typescript
    private isColoree:boolean=true;
```

```html
    <!--colorer is also a CSS class-->
    <div [ngClass]="{ colorer : isColoree }" class="encadrer" ></p>
```

- **ngModel** : ndds two-way data binding to an HTML form element.

We need to Import `FormsModule` and add it to the NgModule's imports list.

```html
<label for="example-ngModel">[(ngModel)]:</label>
<input [(ngModel)]="name" id="example-ngModel" />
```

=> tow-way binding of th property name

### 2. Custom Attribute Directives

```typescript
@Directive({
  selector: "[appHighlight]",
})
export class HighlightDirective {
  constructor() {
    el.nativeElement.style.backgroundColor = "yellow";
  }
}
```

- Call the directive in your template

  ```html
  <p appHighlight>Highlight me!</p>
  ```

- **HostBinding** : associate a property to a directive

```typescript
  @HostBinding('style.backgroundColor')
    bg:string="red";
```

- **HostListener**: associate an event to a directive

```typescript
  @HostBinding('style.backgroundColor')
  bg:string="red";
```

### 3. Structural Directives

- \*ngIf
- \*ngFor
- [ngSwitch]

## Pipes

Pipes are used in Angular to Format data. It is a class that implements the PipeTransform interface and its `transform()` method

You can use predefined Pipes by Angular or create your own one.

- Create a new Pipe :

```bash
ng g p <pipe-name>
```

- Call the pipe in the template

```html
{{variableName | PipeName}}
<!--Using multiple Pipes -->
{{variableName | Pipe1 | Pipe2 |....}}
```

## Services

Classes decorated by `@Injectable()` allowing to encapsulate business processes

```typescript
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class HeroService {
  constructor() {}
}
```

By default, the Angular CLI command `ng generate service` registers a provider with the root injector for your service by including provider metadata, that is `providedIn: 'root'` in the `@Injectable()` decorator.

## Routes

Before we start we need to:

1. Create a routing file : `app.routing.ts`
2. Import the RouteModule
3. Define our routes

In the template use :

```html
<router-outlet></router-outlet>
```

### Navigate between routes

- `RouterLink` directive :

    ```html
    <a
      [routerLink]="[‘home’]"
      routerLinkActive="active"
      [routerLinkActiveOptions]="{exact: true}"
    >
      home
    </a>
    <!--We use : [routerLinkActiveOptions]="{exact: true}"

            to tell angular that we want only this link to be
            active and not its parent (dropdown button case) -->
    ```

- Router Service : Trigger a route from a component

  - Redirection

    ```typescript
    export class HomeComponent {
      constructor(private router: Router) {}
      onNaviger() {
        this.router.navigate(["/about/10"], {
          queryParams: { qpVar: "je suis un qp" },
        });
      }
    }
    ```

  - Get Params :

    ````typescript
        This.router.activatedRoute.params.subscribe(params=>{this.monParam=params['param']});
         // subscribe to an observable so you have do insubscribe from it in the ngOnDestroy()
     ```
    ````

  [Learn more about oservable](#observable)

### Prefix

Example : all routes related to user management should start with "/user"

```typescript
  path: ‘user’,
  Children :[
  {path: “delete/:id”, compoennet: “component1”},
  {path: “add”, compoennet: “component2”}
        ]
```

**Use case** : When you need to change the layout from screen to another
you can make a prefix for each layout and each prefix has its compoenent and its children routes

PS: Children should be sorted from most specific to least specific

## Forms

Angular uses 2 form approaches:

- Template-driven approach
- Reactive approach

### Template-driven Approach

- Import `FormsModule`
- Use the `<form> </form>` tag to let angular detect that we are using forms
- Add `ngModel` and name property to tags that you want them to be managed by angular form

```html
<input type="text" id="username" class="formcontrol" ngModel name="username" />
```

- Associate the form object to a component variable using `ngForm` and references using `#`

```html
<form (ngSubmit)="onSubmit(formulaire)" #formulaire="ngForm"></form>
```

```typescript
export class TmeplateDrivenComponent {
  onSubmit(formulaire: NgForm) {
    console.log(formulaire);
  }
}
```

### Validation

Angular uses attributes (type="email", ... ) and directives(required , ... ) as validators to the form

- Form states :
  - Dirty : inform if a property has been modified or not
  - Valid : inform that the form is valid of not based on validators
  - Untouched : inform that the form has been touched or not
  - Pristine : the opposite of dirty

#### Associate data to property

- #formName : "ngForm"
- #PropertyName = " ngModel "

```html
<input ngModel name="password" #pwdInput="ngModel">
 <div *ngIf="pwdInput.invalid && pwdInput.dirty" >
password not valid
</div>
</input>
```

#### Default values

Use property binding

#### Grouping Form : `ngModelGroup`

```html
<!--div that englobes all the properties that we want to group -->
<div ngModelGroup="user" #userData="ngModelGroup"></div>
```

## Observable

Observables provide support for passing messages between parts of your application
**Usecases** : event handling, asynchronous programming, and handling multiple values.

An Observable instance begins publishing values only when someone subscribes to it. You subscribe by calling the `subscribe()` method of the instance, passing an observer
object to receive the notifications.

```typescript
const observable = new Observable((observer) => {
  let i = 5;
  setInterval(() => {
    if (!i) {
      observer.complete();
    }
    observer.next(i--);
  }, 1000);
});

// subscribe to an observable and define the next() function
observable.subscribe((val) => {
  console.log(val);
});
```

### Operators : pipe, filter, map

We could pipe, filter or map the content of the stream then subscribe to it
example: observ.pipe(x=> x%2 == 0).subscribe(next())

### Subject

It is a particular type of an observable, it coudld work as an observable or observer based on the context

## HTTP Requests

Import:

`import {HttpClientModule} from "@angular/common/http";`

Inject the service:
`constructor(private http:HttpClient) { }`

### GET

get is a HTTP function that returns an Observable

```typescript
this.http.get(API_URL).subscribe(
 (response:Response)=>{ //ToDo with DATA },
 (err:Error)=>{ //ToDo with error },
 () => { console.log('Data transmission complete'); } );
```

### POST

```typescript
this.http.post(API_URL, dataToSend).subscribe(
  (response: Response) => {
    //ToDo with response
  },
  (err: Error) => {
    //ToDo with error
  },
  () => {
    console.log("complete");
  }
);
```
