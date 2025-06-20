---
slug: /gl4/semester-1/development-frameworks/angular-cheat-sheet-2
---

# Angular Cheat Sheet 2

Author [@Saief1999](https://github.com/Saief1999)

## Introduction

- Angular est modulaire

- Chaque application va définir Angular Modules or NgModules

- Chaque module Angular est une classe avec une annotation `@NgModule`

- Chaque application a au moins un module, c’est le module principale **AppModule**.

  - le module principal est le module qui permet de lancer l’application de la bootstraper

  - Annoté par `@NgModule`, prend en parametre un objet contenant:
    - **imports**: tableau contenant les modules utilisés
    - **declarations**: tableau de composant, directives et pipes de l'application
    - **providers**: S'il y'en a
    - **bootstrap**: indique le composant exécuté au lancement de l'application

- **Les Méta data** : Appelé aussi « decorator », ce sont des informations permettant de décrire les classes.

- `*.spec.ts` : Fichier de test unitaire d'un module

### Ajout de styles/scripts

1. Dans `src/index.html`
2. Dans `src/style.css` : `@import "~bootstrap/dist/css/bootstrap.css";`
3. En ajoutant le chemin des dépendances dans les tableaux **styles** et **scripts** dans le fichier `angular.json`

## Composants

- Un composant est une classe qui permet de gérer une vue. Il se charge uniquement de cette vue la.
- Plus simplement, un composant est un fragment HTML géré par une classe JS (component en angular et controller en angularJS)
- Un composant est :
  - Composable
  - Réutilisable
  - Hiérarchique

### Création

#### Manuellement

- Ajouté avec `@Component()`, prend en parametre:
  - `selector`: permet de spécifier le tag (nom de la balise) associé ce composant
  - `templateUrl`: spécifie l’url du template associé au composant
  - `styleUrls`: tableau des feuilles de styles associé à ce composant
  - `providers`: S'il y'a des services

```typescript
import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-second",
  templateUrl: "second.component.html",
  styleUrls: ["./second.component.scss"],
  providers: [], // s'il ya un service
})
export class SecondComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
```

- Puis on doit l'ajouer dans `AppModule (app.module.ts)` dans `declarations`

```typescript
@NgModule({
  declarations: [
    AppComponent,
    SecondComponent, // on ajoute ça
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

- Ensuite on le met (par exemple) dans `app.component.html`

#### CLI

- `ng generate component my-new-component`
  - `--inlineStyle=true|false` ou `-s` : inclus les styles css dans le composant
  - `--inlineTemplate=true|false` ou `-t` : inclus le template dans le compsant
  - `--prefix=prefix` ou `-p` : le prefixe de tag, par défaut **app**

### Binding

#### Property Binding

- One Way
- Permet de récupérer dans le DOM des propriétés du composant.
  - la propriété liée au composant est interprétée avant d'être ajoutée au Template
- `[property]="val"` ou `bind-property="val"`

#### Event Binding

- One way
- Permet d'interagir du DOM vers le composant
- L’interaction se fait à travers les événements.
- `(event)` ou `on-event`

```typescript
import { Component } from "@angular/core";
@Component({
  selector: "inter-interpolation",
  template: "interpolation.html",
  styles: [],
})
export class InterpolationComponent {
  nom: string = "Aymen Sellaouti";
  age: number = 35;
  adresse: string = "Chez moi ou autre part :)";
  getName() {
    return this.nom;
  }
  modifier(newName) {
    this.nom = newName;
  }
}
```

```html
<hr />
Nom : {{nom}}<br />
Age : {{age}}<br />
Adresse : {{adresse}}<br />
//Property Binding
<input #name [value]="getName()" />
//Event Binding
<button (click)="modifier(name.value)">Modifier le nom</button>
<hr />
```

**Referening :**

- Pour accéder au contenu d’un élément du Dom utiliser ``#ref` dans la balise et accéder ensuite à cette propriété via ce ref.

**Accés à une propriété de style :**

- our accéder à une propriété de style d’un élément on peut binder la propriété `[style.nomPropriété]` exemple `[style.backgroundColor]`

#### Two way binding

- Two-way binding
- Permet d’interagir du Dom vers le composant et du composant vers le DOM.
- se fait avec `([ngModel])=property`
  - :warning: Afin d'utiliser ngModel, on doit importer **FormsModule** dans `app.module.ts`

#### Change Detection

1. Create View
2. Create bindings
3. Process bindings
4. Update DOM
5. Run Check (by defaut **dirty checking**: it will perform checks for each browser events, timers, XHRs and promises )

- Every component has a change detector that reads the binding on the template and makes sure that the data model and view are in sync with each other.
- Angular assumes that the data in the component or the whole application state changes due to the following reasons:
  - An event, such as click or submit, gets fired
  - An XHR is call to work with an API
  - An asynchronous JavaScript function, such as setTimeOut() or setInterval(), gets executed

#### Lifecycle hooks

- Chaque composant possède un cycle de vie géré par Angular, en effet:
  1. Angular lance l’application
  2. Ils crée les classes pour chaque composant, il lance donc le Constructeur de mon-app component
  3. Il gére toutes les dépendances injectées au niveau du constructeur et les définit comme des paramètres
  4. Il crée le noeud du Dom qui va héberger le composant
  5. Il commence ensuite la création des composants fils et appelle leurs constructeur. Ici la propriété binded n'est pas prise en considération par Angular
  6. A ce moment, Angular lance le processus de détection des changements. C'est ici qu'il :
     1. Mets à jour le binding de mon-App et lancera ngOnInit.
     2. Gére le binding de compo-fils, puis l'appel de son ngOnInit

#### Different lifecycle hooks

- Constructor
- **`ngOnChanges`**:
  - Elle est appelé si un composant posséde des input (``@Input`) et à chaque fois qu’elles changent.
  - La méthode reçoit en paramètre un objet représentant les valeurs actuelles et les valeurs précédentes disponibles pour ce composant.
- **`ngOnInit`**:
  - Cette méthode initialise le composant après qu’Angular ait initialisé les propriétés du composant
- **`ngDoCheck`**: appelé aprés chaque change detection
- `ngAfterContentInit`
- `ngAfterContentChecked`
- **`ngAfterViewInit`**:
  - appelé juste aprés la mise en place de la vue d'un composant et des vues de ses composants fils s'il en a.
- `ngAfterViewChecked` :
- **`ngOnDestroy`**: Cette méthode est appelée avant qu’Angular ne détruise et ne retire du DOM le composant.

#### Interaction père fils

##### Pere -> Fils

- Le père voit le fils, pour pouvoir voir ces propriété:
  - Dans fils : `@Input() color="black"`
  - `<app-fils [color]="'white'"></app-fils>`

##### Fils -> Pere

- le père va intercepter l’event et récupérer ce que je lui ai envoyé à travers la variable `$event` et va l’utiliser comme il veut

  - Dans fils :

    - `@Output() valueChange=new EventEmitter()`

      ```typescript
      incrementer(){
          this.valeur++;
          this.valueChange.emit(this.valeur);
      }
      ```

  - Dans père :

    - `<app-fils (valueChange)="handleChange($event)"></app-fils>`

      ```typescript
        handleChange(newValue:any) {
          console.log(newValue);
        }
      ```

## Directives

- Une **directive** est une **classe** permettant d'attacher un comportement aux éléments du **DOM**. Elle est décorée avec l'annotation `@Directive`
- apparait dans un élément comme un tag généralement
- crée avec :
  - `ng g d nomDirective`
- 3 Types:
  - **Les composants** : des directives avec des templates
  - **Les directives d'attribut**:
    - permettent de changer **l'apparence** ou le **comportement** d'un élément
    - Exemples:
      - **ngStyle**
      - **ngClass**
      - Custom Directive
  - **Les directives structurels**:
    - Changent **l'apparence** du **Dom** en **ajoutant** et **supprimant** des éléments

### Directives d'attribut

#### ngStyle (Similar to `:style` in Vue)

- utilise le property binding

```html
<p
  [ngStyle]="{'color':myColor,'font-
family':myfont,'background-color' :
myBackground}"
></p>
```

#### ngClass ( Similar to `:class` in Vue )

- Permet de modifier l'attribut **class** (cohabite avec lui)
- Prend en paramètre
  - String `ngClass="mt-2"`
  - Array (nécessite les `[]`) :
    - `[ngClass]="{ 'mt-2': isUp } "`
  - Objet (nécessite les `[]`) :
    - `[ngClass]="['mt-2']"`

#### Custom Directive

- Si on veut associer un événement à notre directive : `@HostListener`
- Si on veut binder une propriété : `@HostBinding`

```typescript
@Directive({
  selector: "[appHighlight]",
})
export class HighlightDirective {
  @HostBinding("style.backgroundColor") bg: string = red;
  @HostListener("mouseenter") mouseenter() {
    this.bg = "yellow";
  }
  @HostListener("mouseleave") mouseenter() {
    this.bg = "red";
  }
}
```

```html
<div appHighlight>Bonjour je teste une directive</div>
```

##### Ajouter un Input

```typescript
@Input() appHighlight = ''; // in our appHighlight directive
@Input() defaultThing = ''; // another input for out appHighlight directive, we catch it from the container tag
```

```html
<p [appHighlight]="color" defaultThing="3"></p>
```

**:warning: : Ne faites pas l'initialisation avec la valeur d'un autre prop dans le constructor, car à ce niveau le property binding n'a pas été achevé encore (on va avoir la valeur par défaut) . utilisez `ngOnInit` dans ce cas**

### Directives structurels

#### `*ngIf`

```html
<p *ngIf="true">Je suis visible :D</p>
<p *ngIf="false">Je suis caché :(</p>
```

#### `*ngFor`

```html
<ul>
  <li
    *ngFor="let episode of episodes; let i = index;
    let isOdd = odd; let isFirst=first"
    [ngClass]="{ odd: isOdd , bgfonce: isFirst}"
  >
    Episode {{i+1}}{{episode.title}}
  </li>
</ul>
```

- `index` : position de l'element courant
- `first` : vrai si premier element
- `last` : vrai si dernier element
- `even`
- `odd`

#### `[ngSwitch]`

## Pipes (comme `vue`)

- Un pipe est une fonctionnalité qui permet de formater et de transformer vos données avant de les afficher dans vos Templates.
- **utilisation** : `{{ variable | nomDuPipe }}`
- Exemple :
  - `{{ name | uppercase }}`
  - `{{ maData | date }}`
  - `{{ maData | date | uppercase }}`

### Parametrer les pipes

- avec `":"` :
  - `{{ maDate | date:"MM/dd/yy" }}`
- plusieurs paramètres :
  - `{{ nom | slice:1:4 }}`

### Pipe personnalisé

- Décoré avec `@Pipe` , implémente `PipeTransform`
- Doit implementer `transform`
  - prend en paramètres :
    - valeur cible
    - args
  - retourne :
    - valeur transformé
- Doit être déclaré au niveau de module de la même manière qu'une directive ou un composant
- crée avec `ng g p nomPipe`

```typescript
import { Pipe, PipeTransform } from "@angular/core";
@Pipe({ name: "team" })
export class TeamPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    switch (value) {
      case "barca":
        return " blaugrana";
      case "roma":
        return " giallorossa";
      case "milan":
        return " rossoneri";
    }
  }
}
```

## Angular Service et injection de dépendances

- Un service est une classe qui permet d'executer un traitement, c'est un médiateur entre la vue et la logique
- Permet d'encapsuler des fonctionnalités redondantes permettant ainsi d'éviter la redondance de code.
- Un service est associé à un composant en utilisant l'injection de dépendance
- généré avec :
  - `ng g s nomDuService`

```typescript
import { Injectable } from "@angular/core";
@Injectable()
export class FirstService {
  constructor() {}
}
```

### Injection de dépendance

- Déleguer la tâche d'instanciation des classes à une entité tierce , le `Injector`

- étapes :

  - Déclarer le service dans le provider du **module** ou du **composant**
  - Passer le service comme **paramètre du constructeur** de l'entité (composant généralement) qui en a besoin

#### Dans le module

- Le service sera visible dans tous les composants de ce module

```typescript
import { Injectable } from
'@angular/core';
@Injectable({
    providedIn: 'root'
}
export class CvService {
constructor() { }
}
```

```typescript
NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpModule],
  providers: [CvService],
  bootstrap: [AppComponent],
});
export class AppModule {}
```

#### Dans le composant

```typescript
import { Component, OnInit } from "@angular/core";
import { Cv } from "./cv";
import { CvService } from "../cv.service";
@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
  providers: [CvService], // on peut aussi l’importer ici
})
export class CvComponent {
  selectedCv: Cv;
  constructor(private monPremierService: CvService) {} // voici l'injection
}
```

**Notes** :

- `providedIn` :
  - dire le scope de chargement de module (remplace l'utilisation de providers pour le composant/module)
  - On nécessite toujours de l'injecter au constructeur du composant
  - **Avantages** :
    - **Lazy loading** : Ne charger le code des services qu'à la première injection
    - **Tree-shaking** des services non utilisés : si le service n'est jamais utilisé, son code sera entièrement retiré du build final
- `@Injectable`:
  - Décorateur permettant de rendre une classe injectable (**on peut y injecter des dépendances** )
  - **Si vous n'allez injecter aucun service dans votre service, cette annotation n'est plus nécessaire**
- **DI Hiérarchique**:
  - Le système d’injection de dépendance d’Angular est hiérarchique.
  - L'algorithme est le suivant:
    - Injection d'un service dans un composant
    - Vérification de l'injecteur
      - Vérifie s'il le trouve dans le père, si oui l'injecte
      - Sinon vérifie son père récursivement
  - **Si un service est déclaré au niveau du Module et qu’il est déclaré dans le provider d’un composant c’est la déclaration la plus spécifique qui l’emporte**
  - Pour injecter un service dans un autre
    - Il faut qu'il soit visible pour lui
    - Il faut avoir l'annotation `@Injectable()` pour l'y injecter le service.

## Le routage

### Création d'un système de Routing

1. Indiquer au routeur comment composer les urls en ajoutant dans le head la balise suivante : `<base href="/">`
2. Créer un fichier `‘app.routing.ts’` Importer le service de routing d’Angular
   1. `import { RouterModule, Routes } from '@angular/router'`;
      - `RouterModule` : Permettre de configurer les routes dans votre projet
      - `Routes` : va permettre de créer les routes
3. Créer la constante qui est un tableau d’objet de type `Routes` représentant chacun la route à décrire
4. Intégrer les routes à notre application dans le app module à travers le RouterModule et sa méthode forRoot

> The `forRoot` static method is a part of a pattern that ensures that you are using singleton classes.

```typescript
const routes: Routes = [
  { path: "cv", component: CvComponent },
  { path: "pere", component: PereComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

In `AppModule`

```typescript
//...
imports: [
    //...
    AppRoutingModule
],
```

In `index.html`

```html
<head>
  <!--... -->
  <base href="/" />
</head>
```

**Préparer l'emplacement d'affichage des vues correspondantes aux routes**:

- **Router-outlet** est une directive qui permet de spécifier l'endroit ou la vue va être chargée
- Syntax : Dans `app.component.html` : `<router-outlet></router-outlet>`

```html
<as-header></as-header>
<div class="container">
  <router-outlet></router-outlet>
</div>
```

#### Syntaxe d'une route

```typescript
{path: '',component:CvComponent},
{path:'onlyHeader',component:HeaderComponent}
```

- **path** : l'URI, **ne doit pas commencer par `/`**
- **component** : le composant à afficher

#### Déclencher une route `routeLink`

- :warning: : n'utilisez pas `href`! ça va déclencher le chargement de la page
- `routerLink` : liera la directive à la page que nous souhaitons déclencher **sans recharger la page**

```html
<a [routerLink]="['todo']" routerLinkActive="active"></a>
```

- `routerLinkActive="active"` :
  - va associer la classe `active` à l’uri cible ainisi qu’à tous ces ses ancetres.
  - utiliser `[routerLinkActiveOptions]="{exact: true}”` pour identifier juste l'uri cible

#### Déclencher une route à partir du composant

- Prend le même paramètre que le routerLink
- il faut importer **Router** et l'injecter

```typescript
//...
export class HomeComponent {
  constructor(private router: Router) {}
  onNaviger() {
    this.router.navigate(["/about/10"]);
  }
}
```

#### Params

- Afin de spécifier à notre router qu’un segment d’une route est un paramètre, il suffit d’y ajouter ‘:’ devant le nom de ce segment.
- Exemple : ``{path:"/cv/:id", component:CvComponent }`
- Pour récupérer le param
  - Importer **ActivatedRoute** et l'injecter au niveau de composant
  - `activatedRoute.params.subscribe(params=> {this.id=params['id']})`
- Pour le passer en paramètre (pour navigate ) : `this.router.navigate(['/cv',this.id])`

#### Query params

##### Navigate

```typescript
this.router.navigate(["/about", this.id], {
  queryParams: { qpVar: "je suis un qp" },
});
```

##### RouterLink

```html
<a
  [routerLink]="['/about/10']"
  [queryParams]="{qpVar:'je suis
un qp bindé avec le routerLink'}"
  >About</a
>
```

- Pour recupérer les query params
  - Importer **ActivatedRoute** et l'injecter au niveau de composant
  - `activatedRoute.queryParams.subscribe(queryParams=> {this.id=queryParams['id']})`

#### Notes on Subscribe

- La méthode **subscribe** permet de s'inscire à un observable
- Cette souscription reste valide même aprés la disparition de la variable -> ce qui sature la mémoire
- **Solution** : Se désinscrire à la mort du composant. Donc dans le `ngOnDestroy()`

#### Route Fils

```typescript
const CV_ROUTE: Routes = [
  {
    path: "cv",
    children: [
      { path: "", component: CvComponent },
      { path: "detail/:id", component: DetailCvComponent },
      { path: "addPersonne", component: FormPersonneComponent },
    ],
  },
];
```

- Pour pouvoir traiter les fils en tant que **Nested Routes**

```typescript
const CV_ROUTE: Routes = [
  {
    path: "cv",
    component: CvComponent, // we specify the component for our parent component
    children: [
      { path: "detail/:id", component: DetailCvComponent },
      { path: "addPersonne", component: FormPersonneComponent },
    ],
  },
];
```

#### Redirection

```typescript
const APP_Routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", redirectTo: "", pathMatch: "full" },
  { path: "about/:param", component: AboutComponent },
  { path: "about/:param", component: AboutComponent, children: FILS_ROUTE },
  { path: "**", component: ErrorPageComponent },
];
```

- Si la route n’a pas encore été matché, alors les routes commençant par ce path seront redirigées.
- `pathMatch`:
  - comment le matching des path est éxécuté
  - full : spécifie au routeur de ne faire la redirection que si le path exact est matché.
  - Afin de rediriger une route inexistante vers une page d’erreur, il suffit de garderla même syntaxe de redirection et de mettre dans la propriété `path ’**’`.

## Form

### Approche basée Template

```html
<form (ngSubmit)="onSubmit(formulaire)" #formulaire="ngForm"></form>
```

```typescript
export class TemplateDrivenComponent {
  onSubmit(formulaire: NgForm) {
    console.log(formulaire);
  }
}
```

- Afin de valider les propriétés des différents contrôles, Angular utilise des attributs et des directives

  - required
  - email

- La propriété **`valid`** de `ngForm` : permet de vérifier si le formulaire est valid ou non en se basant sur les validateurs qu’il contient.

- En détectant le formulaire, Angular décore les différents éléments du formulaire avec des classes qui informe sur leur état :

  - **`valid`**: informe sur le fait que l'une des propriétés du formulaire a été modifié ou non
  - **`untouched`** : informe si le formulaire est touché ou non
  - **`dirty`** : informe sur le fait que l’une des propriétés du formulaire a été modifié ou non
  - **`pristine`** : le formulaire n’a pas été modifié, c’est l’opposé du dirty

- On accéde à ces propriétés à travers la classe associé :

  - `<input ... class="form-control ng-untouched ng-pristine ng-valid" ...>`
  - ou avec `#notreChamp="ngModel"`

- **Grouping**

  - Afin de grouper l’ensemble des contrôles (propriétés/champs) d’un formulaire, on peut utiliser la technique du « grouping form controls ».

  - Il suffit d’ajouter la directive ngModelGroup dans la div qui englobe les propriétés à grouper.

  - ```html
    <div ngModelGroup="user" #userData="ngModelGroup"></div>
    ```

## Angular HTTP et Déploiement

### Programmation asynchrone

#### Promesses

```typescript
var promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 5000);
});
promise2.then(function (x) {
  console.log("resolved with value :", x);
});
```

### la programmation réactive

- Nouvelle manière d’appréhender les appels asynchrones
- Programmation avec des flux de données asynchrones
- Programmation reactive
  - Flux de données (observable)
  - écouteurs d'événement (observer)

#### L'Observable design pattern

- Le patron de conception observer permet à un objet (observable) de garder la trace d'autres objets (obervers) , intéressés par l'état de ce dernier.
- Il définit une relation entre objets de type un-à-plusieurs.
- Lorsque l’état de l'observable change, il notifie ces observateurs.

| Promesses | Observable |
| --- | --- |
| gére un seul évenement | gére un flux d'évenement |
| Non annulable | Annulable |
| Traitement immédiat | Lazy (n'est déclenché qu'a la première utilisation de résultat) |
| Deux méthodes uniquement (then/catch) | Une centaine d'opérateurs de transformation natifs |

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
observable.subscribe((val) => {
  console.log(val);
});
```

#### Async Pipe

- asyncPipe est un pipe qui permet d’afficher directement un observable.
- `{{ valeurSourceAsynchrone | async }}`
- L’asyncPipe s’inscrit automatiquement à l’observable et affiche le dernier résultat envoyé.
- Quand le composant est détruit l’asyncPipe se désinscrit automatiquement de l’observable.

#### Opérateurs de l'observable

- **Un opérateur pipeable** est une fonction qui prend un observable comme entrée et renvoie unautre observable. C'est une opération pure : le précédent Observable reste inchangé. Syntaxe : `monObservable.pipe(opertaeur1(), operateur2(), ...).`
- **Les opérateurs de création** sont l'autre type d'opérateur, qui peut être appelé comme fonctions autonomes pour créer un nouvel Observable. Par exemple : `of(1, 2, 3)` crée un observable qui va émettre 1, 2, et 3, l'un après l'autre, `range(1,200)` va émettre des valeurs numériques de 1 jusqu'a 200.
- Quelques opérateurs :
  - `map(x => 10*x)`
  - `tap(x => console.log(x))`
  - `filter(x => x>10)`
  - `throttleTime(25)`

#### Subjects

Un subject est un type particulier d’observable. En effet Un subject est en même temps un observable et un observer, il possède donc les méthodes next, error et complete du `l'observable`, il a aussi subscribe de `l'observer`.

Pour broadcaster une nouvelle valeur, il suffit d'appeler la méthode next, et elle sera diffusé aux Observateurs enregistrés pour écouter le Subject

```typescript
import { Subject } from "rxjs";

const subject = new Subject<number>();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

subject.next(1);
subject.next(2);
```

---

### RXjs : a closer look

#### Observable

In ReactiveX an observer subscribes to an Observable. Then that observer reacts to whatever item or sequence of items the Observable emits. This pattern facilitates concurrent operations because it does not need to block while waiting for the Observable to emit objects, but instead it creates a sentry in the form of an observer that stands ready to react appropriately at whatever future time the Observable does so.

In an ordinary method call — that is, _not_ the sort of asynchronous, parallel calls typical in ReactiveX — the flow is something like this:

1. Call a method.
2. Store the return value from that method in a variable.
3. Use that variable and its new value to do something useful.

Or, something like this:

```typescript
// make the call, assign its return value to `returnVal`
returnVal = someMethod(itsParameters);
// do something useful with returnVal
```

In the asynchronous model the flow goes more like this:

1. Define a method that does something useful with the return value from the asynchronous call; this method is part of the _observer_.
2. Define the asynchronous call itself as an _Observable_.
3. Attach the observer to that Observable by _subscribing_ it (this also initiates the actions of the Observable).
4. Go on with your business; whenever the call returns, the observer’s method will begin to operate on its return value or values — the _items_ emitted by the Observable.

---

### Http Module

```typescript
import {HttpClientModule} from "@angular/common/http";
//...
imports: [
//...
HttpClientModule,
],
```

Afin d’utiliser le module HTTP, il faut l’injecter dans le composant ou le service dans lequel vous voulez l’utiliser.

```typescript
constructor(private http:HttpClient) { }
```

#### Interagir avec une API Get Request

- Afin d’exécuter une requête get le module http nous offre une méthode get.
- Cette méthode retourne un Observable.
- Cet observable a 3 callback function comme paramètres.
  - Une en cas de réponse
  - Une en cas d’erreur
  - La troisième en cas de fin du flux de réponse.

```typescript
this.http.get(API_URL).subscribe(
  (response: Response) => {
    //ToDo with DATA
  },
  (err: Error) => {
    //ToDo with error
  },
  () => {
    console.log("Data transmission complete");
  }
);
```

The `get()` method takes two arguments; the endpoint URL from which to fetch, and an _options_ object that is used to configure the request.

```typescript
options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body' | 'events' | 'response',
    params?: HttpParams|{[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  }
```

- `HttpHeaders`:
  - Elle propose une panoplie de méthode helpers permettant de la manipuler.
  - C'est immutable
    - `set(clé,valeur)` permet d’ajouter des headers. Elle écrase les anciennes valeurs.
    - `append(clé,valeur)` concatène de nouveaux headers.
  - Toutes les méthodes de modification retourne un `HttpHeaders` permettant un chainage d’appel.
- `HttpParams`
  - Cette classe est une classe immutable (read Only).
  - Elle propose une panoplie de méthode helpers permettant de la manipuler.
    - `set(clé,valeur)` permet d’ajouter des params. Elle écrase les anciennes valeurs.
    - `append(clé,valeur)` concatène de nouveaux params.
  - Toutes les méthodes de modification retourne un `HttpParams` permettant un chainage d’appel.

#### Interagir avec une API POST Request

- Diffère de la méthode get avec un attribut supplémentaire : body

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

#### Ajouter le token dans la requête

- Si la ressource demandé est contrôlé avec un token, vous devez y insérer le token afin d’être authentifié au niveau du serveur.
- Vous devez l'ajouter au `HttpParams` ensuite l’ajouter comme paramètre à votre requête.

```typescript
const params = new HttpParams().set(
  "access_token",
  localStorage.getItem("token")
);
return this.http.post(this.apiUrl, personne, { params });
```

- Une seconde méthode consiste à ajouter dans le header de la requête avec comme name ‘Authorization’ et comme valeur ‘bearer’ à laquelle on concatène le Token.

```typescript
const headers = new HttpHeaders();
headers.append("Authorization", "Bearer ${token}");
return this.http.post(this.apiUrl, personne, { headers });
```

### Guards

- Utilisé pour sécuriser les routes
- Un guard informe sur la validité ou non de la continuation du process de navigation en retournant un booléen, une promesse d’un booléen ou un observable d’un booléen.
- Type de guards
  - CanActivate permettre ou non l’accès à une route.
  - CanActivateChild permettre ou non l’accès aux routes filles.
  - CanDeactivate permettre ou non la sortie de la route.
- Afin d’utiliser le guard canActivate (de même pour les autres),
  - vous devez créer un classe qui implémente l’interface CanActivate et donc qui doit implémenter la méthode canActivate de sorte qu’elle retourne un booléen permettant ainsi l’accès ou non à la route cible.
  - Vous devez ensuite ajouter cette classe dans le provider.
  - Finalement pour l’appliquer à une route, ajouter la dans la propriété canActivate. Cette propriété prend un tableau de guard. Elle ne laissera l’accès à la route qu esi la totalité des guard retourne true.

```typescript
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
@Injectable({
providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor() {
    }
    // route contient la route appelé
    // state contiendra la futur état du routeur de l’application qui devra passer la validation du guard
    // https://vsavkin.com/routeur-angular-comprendre-l%C3%A9tat-du-routeur-5e15e729a6df
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> |
    Promise<boolean> | boolean {
        if (// your condition) {
        return true;
        }
        return false;
}

```

```typescript
providers: [
TodoService,
CvService,
LoginService,
AuthGuard,
],
```

```typescript
{
path: 'lampe',
component: ColorComponent,
canActivate: [AuthGuard]
},
```

### Les intercepteurs

- A chaque fois que nous avons une requête à laquelle nous devons ajouter le token, nous devons refaire toujours le même travail.
- Un intercepteur Angular (fournit par le client HTTP) va nous permettre d’intercepter une requête à l’entrée et à la sortie de l’application.
- Un intercepteur est une classe qui implémente l’interface HttpInterceptor.
- En implémentant cette interface, chaque intercepteur va devoir implémenter la méthode intercept.

```typescript
export class AuthentificationInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("intercepted", req);
    return next.handle(req);
  }
}
```

- Un intercepteur est injecté au niveau du provider. Si vous voulez intercepter toutes les requêtes, vous devez le provider au niveau du module principal.
- L’inscription au niveau du provider se fait de la façon suivante :

```typescript
export const AuthentificationInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthentificationInterceptor,
  multi: true,
};
```

```typescript
providers: [
AuthentificationInterceptorProvider
],
```

#### Les intercepteurs : changer la requête

- Par défaut la requête est immutable, on ne peut pas la changer.
- Solution : la cloner, changer les headers du clone et le renvoyer.

**Cloner une requete** :

```typescript
const newReq = req.clone({
  headers: new HttpHeaders(), // faites ce que vous voulez ici ajouter desheaders, des params ...
});
// Chainer la nouvelle requete avec next.handle
return next.handle(newReq);
```

**Intercepter les erreurs** :

Afin d’intercepter les erreurs, il faut récupérer la réponse et vérifier s’il y a une erreur. Dans ce cas, il faut faire le traitement souhaité

```typescript
intercept(req: HttpRequest<any>, next: HttpHandler):
Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
        tap(
            (incoming: any) => {
                console.log('here its ok');
            },
            (error: HttpErrorResponse) => {
                return throwError(error);
            }
        )
    );
}
```

Ou

```typescript
intercept(req: HttpRequest<any>, next: HttpHandler):
Observable<HttpEvent<any>> {
    return next.handle(req)
        .pipe(
            catchError(err => {
                console.log(err);
                return new
                Observable<HttpEvent<any>>((observer) => {
                   observer.error(err);
                });
            }
        )
    );
}
```

### Guards (Routing)

- C’est une classe avec une décoration NgModule
- Un module est un conteneur qui englobe un ensemble de fonctionnalités liées
- Une application simple est généralement composé d’un seul module. Par contre dès que votre application grandit penser à la séparer en Modules.
- Chaque module vie séparée des autres modules. **Par défaut** il **n’expose rien**, tous ce qui est à l’intérieur du module **reste uniquement dans le module tant qu’on ne l’exporte pas**.
- Lorsqu’on importe un module, **on importe réellement tous ce qu’il exporte**.

```typescript
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
@NgModule({
  imports: [BrowserModule], // modules utilisés
  exports: [], // classes de vues à exporter
  declarations: [AppComponent], // vues appartenant à ce module : composants, directives et pipes
  providers: [], // déclaration des services
  bootstrap: [AppComponent], // utilisé juste pour le module racine, indique le composant à exécuter au lancement de l'application
})
export class AppModule {}
```

#### Declarations

- Dans la partie declarations, faite en sorte que chaque composant, directive ou pipe soit associé à un et un seul module. Ne déclarer pas un même composant dans deux modules différents.
- Tous les composants, directives et les pipes déclarés sont privés par défaut. Ils ne sont accessible que pour les composants, directives et les pipes déclarés dans le même module.
- Pour utiliser un de ces éléments à l'extérieur du module, il faudra penser à les exporter.

### Routing

- Fait de la même manière que AppModule. Cependant, au lieu d’utiliser RouterModule.forRoot vous devez utiliser la méthode forChild du RouterModule.

```typescript
import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { NF404Component } from "../nf404/nf404.component";
import { TodoComponent } from "./todo.component";
const routes: Route[] = [
  { path: "todo", component: TodoComponent },
  { path: "**", component: NF404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)], // le changement
  exports: [RouterModule],
})
export class TodoRouting {} // on l'importe aprés dans notre module
```

#### Shared Module (example)

```typescript
@NgModule({
    declarations: [
        FirstComponent,
        SecondComponent,
        GenericDirective,
    ],
    imports: [
        CommonModule
    ]
    exports: [
        FirstComponent,
        SecondComponent,
        GenericDirective,
    ]
})
export class SharedModule {
}
```

#### Lazy loading

Par défaut, tout les modules que vous déclarer au niveau du AppModule sont chargé au lancement de l’application. Ce qui peut impacter la performance.

L’idée du lazyLoading et de charge au départ le module principale et puis de ne charger un module que si on appelle l’une de ses routes.

```typescript
{
    path: "cv",
    loadChildren: () => import('./cv/cv.module').then(
    m => m.CvModule),

},
// Autres routes...
```

#### Preloading Lazy Loading

- C'est une solution pour charger le premier module rapidement pour que le premier affichage soit rapide, et après en background on charge les autres modules.
- On Change la strategy de chargement en **PreloadAllModules** en gardant le lazy loading et donc en décomposant les bundles par module et en les chargeant en backgound après le chargement du AppModule

```typescript
mport { PreloadAllModules } from "@angular/router";
@NgModule({
imports: [RouterModule.forRoot(routes, {
preloadingStrategy: PreloadAllModules
})],
exports: [RouterModule],
})
```

## Angular State Management : NgRx Store

### Redux

- REDUX est un pattern né de FLUX, une architecture créée par Facebook.
- FLUX Se base sur un workflow de données unidirectionnelles grâce à un dispatcher, qui recueille des actions distribuées par le serveur ou par l’utilisateur.
- REDUX est une version moins complexe de Flux. Il se distingue par:
  - Une source de vérité unique : le store ;
  - Des états immuables
  - Pas de dispatcher vue qu’on a un seul store

### NgRx

![A la découverte de ngrx avec Angular 9–Etape 1 - Formations informatiques,  nouvelles technologies et NTIC | Dev to be curious](https://devtobecurious.fr/wp-content/uploads/2020/05/state-management-lifecycle.png)

NgRx est un framework (implémentation de redux) pour créer des applications réactives dans Angular. NgRx fournit des bibliothèques pour:

- Gérer l'état global et local de votre application.
- Isoler des effets de bord permettant d’avoir une architecture de composants plus propre.
- Gérer la collection de vos entités.
- S’Intégrer avec le routeur angular.
- Outils de développement qui améliorent l'expérience des développeurs lors de la création de nombreux types d'applications différents.

### Installation (p308)

### Store

- Afin de récupérer votre store, vous devez l’injecter.
- Une fois fait le store est représenté par un observable qui n’offre aucune méthode permettant de manipuler le state.
- Etant un objet générique, vous pouvez lui spécifier l’objet représentant votre état (le state)

```typescript
// in index.ts
export interface AppState {}
// to use
constructor(private store: Store<AppState>) {}
```

### Actions (actions in Vue)

- Les actions sont l'un des principaux composants de NgRx.
- Les actions expriment des événements uniques qui se produisent dans votre application.
- Que ce soit des événements interne de votre utilisateur, ou des événements externes via le réseau ou toute autre événement, les actions sont la pour les décrire.
- les actions NgRx doivent implémenter **l'interface Action**
- La propriété **type** représente le type qui est l’identifiant de l’action.

```typescript
interface Action {
  type: string;
}
```

- Vous disposez aussi d’une propriété payload qui contiendra les informations à fournir en cas de besoin avec votre action (login nécessite un username et un password)
- La propriété type suit une convention de nommage : `[Source] Event`
  - Example `[Login Page] User Login`
- Ceci permet de définir le contexte et de spécifier quelle catégorie d'action il s'agit et d'où une action a été distribuée.
- Vous ajoutez des propriétés à une action pour fournir un contexte ou des métadonnées supplémentaires pour une action.

```typescript
{
    type: '[Login Page] User Login',
    username: string;
    password: string;
}
```

- Une action est donc simplement un objet Js implémentant l’interface Action et permettant de décrire un événement dans votre application.
- NgRx nous fournit une méthode createAction qui vous permet de créer une action et une fonction props qui permet de spécifier le type du payload donnant plus de robustesse à votre code.
- Les actions peuvent être crées enutilisant les props ou les fonctions fléchées.

```typescript
mport { createAction, props } from "@ngrx/store";
import { User } from './model/user.model';
const enum ActionActionsEnum {
'LOGIN' = '[Login Page] User Login'
}
export const loginAction = createAction(
ActionActionsEnum.LOGIN,
props<{user: User}>()
)
```

```typescript
export const loginAction = createAction(
  ActionActionsEnum.LOGIN,
  props<{ user: User }>()
);
//ou
export const loginAction = createAction(
  ActionActionsEnum.LOGIN,
  (user: User | null) => ({ user })
);
```

- Afin de déclencher une action, vousdevez utiliser la méthode dispatch devotre store.
- Cette méthode prend en paramètre une action.
- En dispatchant cette action, on informe le store qu’un événement s’est déclenché et qu’il faut notifier les **reducers** et les **effects**.

#### Actions : Bonne pratiques

### Reducers (les mutations en Vue)

- Un Reducer est une fonction JS pure.
- Elle est appelé suite à un **évènement** (une Action) et reçoit en paramètre l’état actuel de l’application (le state) ainsi que le l’action dispatché par le store (qui contient le payload s’il existe).
- En fonction du type de l’action et de son payload, le reducer retourne le nouvel état (state) de l’application (du store).
- Les reducers doivent garder l’immutabilité du state, ceci nous permet d’avoir un historique des différentes versions de l’état de l’application.

#### Création des Reducers

- Afin de créer un reducer et à partir de la version 8 de NgRx, vous pouvez utiliser le helper **`createReducer`**.
- createReducer prend en paramètre l’état initial du state, et la fonction à déclencher pour une action donnée.
- Dans les anciennes versions de RxJs, le travail se faisant avec un switch qui selon le type de l’action exécutait le traitement nécessaire.
- A partir de la version 8 vous pouvez utiliser le helper **`on`** qui prend en premier paramètre l’action à gérer et en second paramètre la fonction à exécuter. Cette fonction reçoit le state actuel et l’action et retourne le nouveau state

```typescript
const scoreboarReducer = createReducer(
  initialState,
  on(ScoreboardPageActions.homeScore, (state) => ({
    ...state,
    home: state.home + 1,
  })),
  on(ScoreboardPageActions.awayScore, (state) => ({
    ...state,
    away: state.away + 1,
  })),
  on(ScoreboardPageActions.resetScore, (state) => ({ home: 0, away: 0 })),
  on(ScoreboardPageActions.setScores, (state, { game }) => ({
    home: game.home,
    away: game.away,
  }))
);
// Nécessaire pour les version Angular qui n’utilise pas Ivy
export function reducer(state: State | undefined, action: Action) {
  return scoreboardReducer(state, action);
}
```

- Pensez pour chaque reducer à définir une interface décrivant la portion du state qu’il gère
- Définissez le state initiale de cette portion.
- Exportez maintenant votre reducer et définissez le au niveau du store module.

```typescript
export interface AuthState {
  user: User;
}
export const initialAuthState: AuthState = {
  user: undefined,
};
export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginAction, (state, action) => {
    return { user: action.user };
  })
);
```

##### Reducers : Root State

- L'état de votre application est défini comme un seul grand objet.
- L'enregistrement des reducers pour gérer des parties de votre état vous permet de définir uniquement les clés avec des valeurs associées dans l'objet.
- Pour enregistrer le Store **global Store** de votre application, utilisez la méthode **forRoot** du **StoreModule**
- La méthode **forRoot** prend un objet qui prend :
  - Comme clé : l'identifiant du reducer
  - Comme valeur : le reducer
- En enregistrant le state avec **forRoot**, vous rendez le state disponible dès le lancement de l'application

```typescript
StoreModule.forRoot({ home: fromHomeReducer.reducer });
```

##### Reducer : Feature State

- Les Feature State se comportent de la même manière que les états racine, mais vous permettent de les définir avec des zones de fonctionnalités spécifiques dans votre application.
- Votre état est un objet volumineux et les états de fonctionnalité enregistrent des clés et des valeurs supplémentaires dans cet objet.

```typescript
StoreModule.forFeature("auth", authReducer);
```

- En regardant un exemple d'objet d'état, vous voyez comment un état de fonctionnalité permet à votre état d'être construit de manière incrémentale. Commençons par un objet d'état vide

#### Reducer : Bonnes pratiques (p 324)

### Selection des éléments du store

#### Naive Way

- Le service Store que vous utiliser pour dispatcher des actions vous permet aussi d’accéder au state global de votre application.
- Le store étant un Observable, vous pouvez vous y inscrire et récupérer le state de l’application.

```typescript
this.store.subscrive((state) => {
  console.log("state", state);
  console.log("authState", state["auth"]);
});
```

- Afin de sélectionner la partie que vous voulez, utilisez l’opérateur

```typescript
this.isLoggedIn$ = this.store.pipe(map((state) => !!state["auth"].user));
```

- Le problème ici est que cette opération va se répéter à chaque fois alors que le résultat risque d’être le même. Une fonction pure qui a le même input retournera toujours le même Output

- La Solution est donc d’utiliser l’opérateur de RxJs **`distinctUntilChanged`**.

```typescript
this.isLoggedIn$ = this.store.pipe(
  map((state) => state["auth"]),
  distinctUntilChanged()
);
```

- Afin de nous aider dans cette démarche, NgRx nous offre l’opérateur select qui réalise un map selon une fonction pur et ne déclenche le flux de l’observable qui si le résultat change en utilisant distinctUntilChanged.

```typescript
this.isLoggedIn$ = this.store.select((state) => !!state["auth"].user);
```

#### Selectors

- Le problème avec le select c’est qu’il effectue à chaque fois l’opération de map. Dans certains cas, elle peut être très couteuse, sa répétition pose donc un problème de performance.
- Le Store fournit la fonction **createSelector** afin d’optimiser cette sélection.
- Lors de l'utilisation de createSelector, NgRx garde la trace des derniers arguments avec lesquels votre fonction de sélection a été appelée.
- Étant donné que les sélecteurs sont des fonctions pures, le dernier résultat peut être renvoyé lorsque les arguments correspondent sans réinvoquer votre fonction de sélection. (avtanges en termes de performance, c'est la **mémorisation**)
- **Un sélecteur est donc tout simplement une fonction de mapping avec de la mémoire.**

##### Implementation

```typescript
import { createSelector } from "@ngrx/store"

export interface FeatureState {
    counter: number;
}

export interface AppState {
    feature: FeatureState;
}

export const selectFeature = (state: AppState) => state.feature;

export const selectFeatureCount = createSelector(
selectFeature, state: FeatureState) => state.counter);
```

La fonction **createSelector** prend en paramètre un **ensemble** de **sélecteurs** permettant de sélectionner ce dont vous avez besoin pour mapper votre state suivi de la **fonction de map** qui est toujours le dernier paramètre.

**La fonction de map récupère comme paramètres le résultat de l’ensemble des sélecteurs passé en paramètre avec elle.**

```typescript
import { createSelector } from "@ngrx/store";
export interface User {
  id: number;
  name: string;
}
export interface Book {
  id: number;
  userId: number;
  name: string;
}
export interface AppState {
  selectedUser: User;
  allBooks: Book[];
}
```

```typescript
export const selectUser = (state: AppState) => state.select;
edUser;
export const selectAllBooks = (state: AppState) => state.al;
lBooks;
export const selectVisibleBooks = createSelector(
  selectUser,
  selectAllBooks,
  (selectedUser: User, allBooks: Book[]) => {
    if (selectedUser && allBooks) {
      return allBooks.filter((book: Book) => book.userId === selectedUser.id);
    } else {
      return allBooks;
    }
  }
);
```

#### Feature Selectors (important)

Afin de centraliser et de typer la partie de votre state qui correspond à une fonctionnalité particulière (généralement votre module state), vous pouvez utiliser les **featureSelector**.

Pour ce faire, utilisez la méthode createFeatureSelector caster la au fetureStateType que vous souhaiter et passer lui comme paramètre la clé représentant la partie du state que vous voulez utiliser.

```typescript
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "./model/user.model";
import { AuthState } from "./reducers";

export const authFeatureSelector = createFeatureSelector<AuthState>("auth");

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (auth) => !!auth.user
);

export const isLoggedOutSelector = createSelector(
  isLoggedInSelector,
  (loggedIn) => !loggedIn
);
```
