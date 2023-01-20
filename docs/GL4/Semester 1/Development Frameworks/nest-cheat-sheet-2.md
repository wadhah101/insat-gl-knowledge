---
slug: /gl4/semester-1/development-frameworks/nest-cheat-sheet-2
---

# Nest Cheat Sheet 2

Author [@Saief1999](https://github.com/Saief1999)

## Introduction

To install nest we do

```bash
npm i -g @nestjs/cli
```

To create new project we do:

```bash
nest new NomProjet
```

To start App we do

```bash
npm run start:dev
```

Or

```bash
nest start –watch
```

## Modules

- a module is a basic class, annotated with `@Module()`, which makes it possible to encapsulate the providers in our application
- In a Nest application, we need to, at least, have one module, the `AppModule`
- Modules are based on the **Decorator Design Pattern**
- each Module has this architecture:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [TestModule], // list of imported modules ( each of these modules contains the list of providers this module needs )
  exports: [], // List if exported providers, can be used by other modules
  controllers: [AppController], // the list of controllers defined in the module
  providers: [AppService], // the list of providers contained in the module, will be instanciated via dependency injection
})

export class AppModule {}
```

- Generally speaking, providers are only accessible from the modules they're contained in.

- In a module, we can only use the list of its providers, or those exported via our imported modules.

- If we want to import a module inside another module, we add it to its list of **imports**

- To make a module accessible in every other module automatically without having to add it to the list of imports each time, we add `@Global()` on top of it and then we import it only in the AppModule

## Controllers

- A controller is class annoted with @Controller()
- Le rôle d’un Controller est réceptionner les requêtes HTTP entrantes, de préparer une réponse et de la retourner.
- Le Controller a pour rôle d’intercepter les requetés des clients puis de dispatcher les différentes taches liées à cette requêtes aux différentes composantes de l’application.
- Le mécanisme de routage contrôle quel contrôleur reçoit quelle requête.

## Dtos

- DTO est un objet qui permet de définir comment les données sont envoyées via les réseau (et reçus).
- Elle permettent ainsi de définir le modèle de transfert de données entre deux système en l’encapsulant dans le DTO.

## Providers

- Services / Repositories & Factories are in fact providers
- L'idée principale d'un provider est qu'il peut injecter des dépendances.
- But : faire des relations et dépendances entre différents objets tout en délégant l'instanciation au système (injection de dépendances)
- Pour faire simple, un provider est simplement une classe annotée avec un décorateur `@Injectable()`.

### Services

- A service is a class annotated with `@Injectable`
- La couche qui doit gérer l’aspect métier est la couche Service. C’est un provider qui se charge de l’aspect métier.
- Un service est une classe qui permet d’exécuter un traitement
- Permet d’encapsuler des fonctionnalités redondantes permettant ainsi d’éviter la redondance de code.

### Injection de dépendance

- L’injection de dépendance est un patron de conception.
- Délegue la tache de l'instanciation des classe composé à une entité tierce

#### Workflow of DI Container

1. Au bootstraping de l’application, il enregistre toutes les classes avec le conteneur (DI Container)
2. Pour chaque classe, le container va identifier les dépendances de chaque classe.
3. Le container va générer toutes les dépendances pour nous créer l’instance souhaitée.
4. L’instance crée va être sauvegardé et réutilisé en cas de besoin.

#### Usage

- Afin d’injecter un service, il suffit de le passer comme paramètre du constructeur de la classe qui en a besoin

> Le service doit être providé par le module parent ou exporté par l’un des modules importés.

## Request lifecycle

1. middlewares
2. guards
3. interceptors
4. pipes
5. Return to interceptors when request is generated

## Pipes

- classe qui a 2 fonctionnalités:
  - **transformation**: transformez les données d'entrée sous la forme
    souhaitée (par exemple, de chaîne en entier).
  - **validation**: évaluez les données d'entrée et, si elles sont valides, passez-les simplement telles quelles; sinon, lever une exception lorsque les données sont incorrectes.
- les pipes **fonctionnent sur les arguments** gérés par l’action du contrôleur.
- Nest appelle le pipe juste avant l'invocation d'une méthode.
- Le pipe reçoit les arguments destinés à la méthode et les exploite.
- Toute opération de transformation ou de validation a lieu à ce moment. Ensuite l’action est appelée avec tous les arguments passés ou non par le pipe.
- Si on passe des paramétres au pipe , on doit les **instancier**
- Quelques Pipes de transformations peuvent être passé directement en parametre du Query(), Param() ou Body()

```typescript
   @Get("/test")
    test(@Query('id', new DefaultValuePipe(-1), new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))id: number) {
        return {id,"type": typeof id} ;
    }
```

### Scopes for pipes

#### Method

```typescript
@UsePipes(PipeClass1, PipeClass2,...) // on top of method
```

#### Class

```typescript
@UsePipes(PipeClass1, PipeClass2,...) // on top of class
```

#### Global

```typescript
app.useGlobalPipes(PipeClass1,...); // in main.ts
```

### Validation Pipes

1. Utilisation de class-transformer afin de transformer les données envoyées en une instance du DTO
2. Utilisation de class-validator afin de valider l’instance
3. S’il y a une erreur, déclencher l’erreur et répondre immédiatement. Sinon passer le body après les traitements et la validation.

- Pour valider globalement: `app.useGlobalPipes(new ValidationPipe());`
- Pour valider juste certains routes seulement:

```typescript
@Get('/:id')
@UsePipes(ValidationPipe)
getTaskById(
@Param('id',ParseIntPipe) id: number,user: User): Promise<Task> {
return this.tasksService.getTaskById(id, user);
}
```

#### Transformations des objets

- Les décorateurs de ValidationPipe peuvent automatiquement transformer vos payload d’un objet gnérique object vers une instance de votre DTO.
- Afin d’activer cette transformation automatique, passer à votre ValidationPipe un objet d’option contenant la propriété transform à true.
  - `app.useGlobalPipes(new ValidationPipe({ transform: true }));`
  - De cette façon, tous les classes et les DTO qui sont annotésavec des validateurs seront validés automatiquement.

##### Transform : true

- Active la transformation automatique des objets js (géneralement de la requete) en dto qu'on a fourni tout en changeant tout les champs
- Ceci permettra d’activer la transformation des types primitives. Plus
  besoin d’utiliser un ParseIntPipe pour convertir la chaine en entier.

##### Class Validator options

- `whitelist`: accepte juse les propriétés défini par la dtos ( les autres ignorés )
  - Ceci n’est valide que si vous @nnoter vos propriétés. Une propriété non @nnotée sera ignorée.

- `forbidNonWhitelisted`: Si elle détecte une propriété non défini dans la dto, déclenche un erreur

- `disableErrorMessages`:si elle est à true, les erreur ne sont pas envoyés au client

### Mapped-types (IMPORTANT)

- `PartialType(otherDto)`
- `PickType(OtherDto, ["field1","field2"])`
- `OmitType(othetDto, ["field1", "field2"])`
- `IntersectionType(otherDto1, otherDto2)`

### Custom Pipes

```typescript
import { ArgumentMetadata, PipeTransform} from '@nestjs/common';
export class FusionUpperPipe implements PipeTransform{
transform(value: any, metadata: ArgumentMetadata): any {
console.log(metadata);
return value;
} }
```

Then we do `App.useGlobalPipes` Or

```typescript
@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
```

## Middlewares

- Un Middleware est tout simplement une fonction appelé avant que la requête ne soit traitée par le contrôleur.
- Un middleware a accès aux objets Request et Response et la fonction next.
- Tâches
  - exécuter n'importe quel code.
  - apporter des modifications à la requête ou à la réponse.
  - mettre fin au cycle requête-réponse.
  - appeler la prochaine fonction middleware de la pile.
- si la fonction middleware actuelle ne met pas fin au cycle requête-réponse, elle doit appeler méthode next() pour passer le contrôle à la fonction middleware suivante. Sinon, la demande sera laissée en suspens.
- Peut être implémenté par une:
  - classe
  - fonction

### Classe

```typescript
import { NestMiddleware} from '@nestjs/common';
@Injectable()
export class FirstMiddleware implements NestMiddleware{
use(req: any, res: any, next: () => void): any {
} }
```

then we need to make sure that AppModule implements NestModule, and we do this :

```typescript
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(
      {path: "todos", method:RequestMethod.GET}
    );
  }
}
```

### Function

```typescript
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes( //logger is a function not a class this time
      {path: "todos", method:RequestMethod.GET}
    );
  }
}
```

## Filters

- Dans NestJs les filtres sont utilisés afin de gérer les exceptions.
- NestJs vient avec une couche de gestion des exceptions toute prête.
- Si une exception n’est pas gérée par votre application, cette couche l’intercepte et retourne l’erreur appropriée.
  - Ceci est géré par une Exception Filter globale qui gère toutes les exceptions de types HttpException ou de ces sous classes.
  - Ceci une exception n'est pas reconnu, on va avoir un "internal server error" + statusCode 500

### Declencher une exception

- Il faut mieux utiliser la class HttpException

```typescript
if (course._id) {
throw new HttpException('Vous ne pouvez pas mentionner d id', HttpStatus.BAD_REQUEST); // error 400
}
```

### Filters personnalisés

 ```typescript
import { ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';
import { Request, Response } from 'express';
@Catch(HttpException)
export class CustomFilter implements ExceptionFilter{
        catch(exception: HttpException, host: ArgumentsHost): any {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse<Response>();
            const request = ctx.getRequest<Request>();
            const exceptionResponse = exception.getResponse();
            response
            .status(status)
            .json({
            message: 'custom response',
            statusCode: exception.getStatus(),
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    return response;
    }
}
```

Pour l'injecter, 2 méthodes:

#### Par les providers

```typescript
import {APP_FILTER} from '@nestjs/core';
import {AllExceptionsFilter}from'./filters/exception.filter';
import {MiddlewareConsumer,Module}from'@nestjs/common';
import {AppController}from'./app.controller';
import {AppService}from'./app.service';
@Module({
//...
providers:[
{ provide:APP_FILTER,
useClass:AllExceptionsFilter,
}],
}) exportclassAppModule{}
```

#### Par la méthode useGlobalFilters

```typescript
mport{NestFactory}from'@nestjs/core';
import{AppModule}from'./app.module';
import{AllExceptionsFilter}from'./filters/exception.filter';
async functionbootstrap() {
constapp=awaitNestFactory.create(AppModule);
app.useGlobalFilters(newAllExceptionsFilter())
awaitapp.listen(3000);
} bootstrap();
```

#### Avec @UseFilters au niveau de controlleur/méthode

```typescript
@UseFilters()
@Get()
getUser() {
//...
}
```

L’odre des filtres doit être du filtre le plus générique vers le plus spécifique.

### Interceptors

- Un interceptor est une classe annoté avec le décorateur @Injectable et qui implémente l’interface Nest Interceptor.
- Il a pour rôle de :
  - lier une logique supplémentaire avant / après l'exécution de la méthode
  - transformer le résultat renvoyé par une fonction
  - transformer l'exception levée à partir d'une fonction
  - étendre le comportement de la fonction de base
  - remplacer complètement une fonction en fonction de conditions spécifiques (par exemple, à des fins de mise en cache)
- Un interceptor doit implémenter la méthode intercept. Sa méthode next.**handle** (qui remet la requete dans son chemin) retourne un observable pour pouvoir intercepter la reponse

```typescript
import{
Injectable, NestInterceptor,ExecutionContext,CallHandler
}from'@nestjs/common';
import{Observable}from'rxjs';
import{tap}from'rxjs/operators';
@Injectable()
export class MyFirstInterceptor implements NestInterceptor{
intercept(context:ExecutionContext,next:CallHandler):Observable<any>
{ console.log('Before...');
return next.handle().pipe(tap(()=>console.log(`After...`)));
} }
```

Afin de définir le domaine d’exécution de l’intercepteur, vous pouvez le spécifier pour:

1. une route, : `@UseInterceptors`
2. un controller: `@UseInterceptors`
3. globalement: `app.useGlobalInterceptors`

#### Example

```typescript
export class RequestDurationInterceptor implements NestInterceptor{
intercept(context: ExecutionContext,next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
console.log('Before handling Request ...');
const request = context.switchToHttp().getRequest();
const start = Date.now();
return next.handle().pipe(
tap(()=> {
const end = Date.now();
console.log(`After ${start-end}ms`);
} ));
} }
```

## Config .env

### dotenv

### Config Module

```typescript
ConfigModule.forRoot({
isGlobal: true,
}),
```

## ORM

- ORM : Object relation Mapper
- Couche d'abstraction
- Gérer la persistance des données
- Mapper les tables de la base de donées relationnelle avec des objets

```typescript
imports: [
ProduitModule,
TypeOrmModule.forRoot(
{ type: 'mysql',
host: process.env.DB_HOST,
port: 3306,
username: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
entities: [],
synchronize: true,
} ) ]
```

> On peut aussi créer un fichier dans la racine appelé `ormconfig.json` au lieu de passer l'objet de configuration

### Entity

Afin de spécifier à TypeORM qu’une classe est une entité, vous devez l’annoter avec @Entity. Ce décorateur prend en paramètrele nom qu’aura la table associée à votre entité. S’il n’est pas mentionné, il sera identique au nom de l’entité.

Afin de spécifier à TypeORM qu’une propriété d’une entité est une colonne de la table, vous devez l’annoter avec @Column.

Chaque entité doit être enregistré dans vos options de connexions sous la clé entities.**Sinon elle ne sera pas prise en considération.**

Chaque entité doit être enregistré dans vos options de connexions sous la clé entities.Sinon elle ne sera pas prise en considération.

Exemple :

```typescript
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import { Roles } from '../../Enums/roles.enum';
import { PostEntity} from '../../post/entity/post.entity';
@Entity('user')
export class UserEntity{
@PrimaryGeneratedColumn() // on met @PrimaryColumn() si on veut la mettre manuellemnt
id: number;
@Column({length:50, unique: true})
//options : type, name, length, nullable, unique, update, select
username: string;
@Column()
password: string;
@Column({unique: true})
email: string;
@Column({type: 'enum', enum: Roles, default: Roles.user})
role: Roles;
}
```

```typescript
TypeOrmModule.forRoot(
{ type: 'mysql',
host: process.env.DB_HOST,
port: 3306,
username: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
entities: [UserEntity],
synchronize: true,
} ),
```

- TypeORM supporte la plupart des typesde colonnes utilisés par les
  différents SGBD. Les colonnes sontdatabase-type spécifiquece qui permet d’avoir
  beaucoup de flexibilités.

#### Colonnes spéciales

- @CreateDateColumn
- @UpdateDateColumn
- @DeleteDateColumn (soft delete)
- @VersionColumn

### Configration Des entités

```typescript
TypeOrmModule.forRoot(
{ //...

entities: ["dist/**/*.entity{.ts,.js}"],
} ),
```

Ou

```typescript
TypeOrmModule.forRoot(
{ //..
//entities: ["dist/**/*.entity{.ts,.js}"],
autoLoadEntities: true,
}
```

Cette deuxieme methode se fait en chargeant automatiquement, toutes les entités enregistré avec la méthode forFeature

### Patron de conception repository

- Chaque Entité aura donc son propre Repository.
- Ce Repository ou dépôt héritera d’un ensemble de fonctionnalités. Vous pouvez aussi définir vos propres fonctionnalités.

#### Utilisation

```typescript
@Module({
imports: [
TypeOrmModule.forFeature(
[PostEntity]
) ], providers: [PostService],
controllers: [PostController]
}) export class PostModule{
```

```typescript
export class PostService{
constructor(
@InjectRepository(PostEntity)
private readonlypostRepository: Repository<PostEntity>,
) { }
```

#### Methodes

- Save : La méthode save prend en paramètre une entité ou un tableau d’entités. Si l’entité existe, elle la met à jour, sinon elle l’ajoute.
  - Dans le cas d’ajout d’un tableau d’entités, l’ajout se fait à travers unetransaction, cad qu’en cas d’échec d’un des save la totalité est annulée via un Rollback.
  - supporte la mise à jour partielle
  - retourne la liste des entités modifiées / mises à jour

- Preload : Pour créer une entitytype à partir d'un objet qu'on posséde (DTO par exemple)
  - Si l'entité existe déjà dans la base de données, elle la charge (et tout ce qui y est lié), remplace toutes les valeurs par les nouvelles valeurs de l'objet donné et renvoie la nouvelle entité.

```typescript
const newEntity = await repository.preload({id, name, firstname});
```

## Versioning

- URI Versioning : with `@Version()`
- Header Versioning
- Media Type Versioning ( accept header )

### URI Versioning

```typescript
app.enableVersioning({
type:VersioningType.URI,
prefix:'v1'
});
```

#### Methode 2

```typescript
@Controller({
path:'todo',
version: '1',
}) exportclassTodoDbController{
@Get('')
getTodos() {
```

#### Methode 3

```typescript
@Controller('todo')
exportclassTodoController{
@Get('')
@Version('1')
getTodos() {
return'v1';
} @Get('')
@Version('2')
getV2Todos() {
return'v2';
} }
```
