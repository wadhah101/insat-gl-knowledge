# Software Architecture

## Non Functional Requirements

### Maintenabilité

La qualité de se tordre facilement sans se briser

Quand on a un probleme c’est facile à le maintenir (pas de probleme en cascade)

### Auditabilité

Capacité de trouver les causes des erreurs

S'assurer de journaliser le plus d'info possibles, d'une façon lisible et automatiquement extractable

Ne doit pas interférer avec la performance de l'application!

### Scalabilité

Faculté à gérer une large variété de tailles pour le système

### **Documentation**

Essayer de maintenir une documentation à jour du système

Garder la trace des changements

### Utilisabilité

A quel point est-ce que les utilisateurs sont efficaces en utilisant le système?

A quel point est-il facile d'apprendre à utiliser le système?

### Flexibilite

La facilité avec laquelle le système peut changer

 → LE SYSTEME EST FACILE A CHANGER

### Portabilité

La facilité avec laquelle un logiciel peut être installé sur plusieurs plateformes

La capacité du logiciel à maintenir sa performance dans le temps

Un logiciel non fiable tombe en panne fréquemment

### Securité

Plusieurs propriétés de sécurité: authentification, confidentialité, intégrité, non répudiation, etc.

### Performance

Les contraintes temporelles du logiciel

Respecter les contraintes de temps et les attentes des utilisateurs

 **la fiabilité vs disponibilité**
En termes simples, la **disponibilité** est une mesure du pourcentage de temps pendant lequel l'équipement est dans un état opérationnel, tandis que **la fiabilité** est une mesure de la durée pendant laquelle l'article remplit sa fonction prévue.

---

## Types of architectures

### MainFrame

![Untitled](Software%20Architecture%20946334d2c384444da293ded724bb91f0/Untitled.png)

- clients are stupid : they don’t execute any logic
- the mainframe is in charge of all the logic
- like connecting to linux via terminal : you are just asking for service without giving any logic
- the mainframe machine is performante and could execute complex operations

#### MainFrame - Pros

High security, role and privilege managing

#### MainFrame- Cons

disponibilite (coz all the cherge is on it)  SPOF

### Client / Server

![Untitled](Software%20Architecture%20946334d2c384444da293ded724bb91f0/Untitled%201.png)

- Here the client could execute some logic

#### Client / Server - Pros

performance
control but not too much

#### Client / Server - Cons

SPOF

### Layered architecture

![Untitled](Software%20Architecture%20946334d2c384444da293ded724bb91f0/Untitled%202.png)

Components with similar functionalities are organized into horizontal layers. As a result, each layer performs a specific role within the application.

- The layered architecture style does not have a restriction on the number of layers that the application can have, as the purpose is to have layers that promote the concept of **separation of concerns**. The layered architecture style abstracts the view ofthe system as a whole while providing enough detail to understand the roles and responsibilities of individual layers and the relationship between them.

- Every layer should be only connected with the next layer

Example OSI Model

#### Layered architecture - Pros

simple , separation of concerns

#### Layered architecture - Cons

performance , layered are highly coupled

### MV* Architecture

. MV* is motivated by the **[separation of concerns (SoC)](https://en.wikipedia.org/wiki/Separation_of_concerns)**
design principle as it splits up the application into three main components and defines how the components interact. This reduces the coupling between components and allows each component to be independently developed, tested, modified, reused and scaled.

MVP, MVC, MVVM

**M**odel **V**iew **C**ontroller (MVC)

![Untitled](Software%20Architecture%20946334d2c384444da293ded724bb91f0/Untitled%203.png)

**M**odel **V**iew **P**resenter (MVP)

The **Presenter** is the middle-man between the View and the Model, so the View does not need to know information about the Model.

![Untitled](Software%20Architecture%20946334d2c384444da293ded724bb91f0/Untitled%204.png)

**M**odel **V**iew **V**iew-**M**odel (MVVM)

Similar to MVP, the View is lightweight while the View Model handles the presentation logic. But more than that, the **View Model** also encapsulates the **state** of the view and interacts with the View via **data binding**

![Untitled](Software%20Architecture%20946334d2c384444da293ded724bb91f0/Untitled%205.png)

source : [https://yuejunphua.medium.com/mv-architecture-explained-3051660c7590](https://yuejunphua.medium.com/mv-architecture-explained-3051660c7590)

### N-tiers Architecture

- Each tier is physically separated (not necessary but could be a good option)
- A tier can call to another tier directly, or use asynchronous messaging (message queue).
- Although each layer might be hosted in its own tier, that's not required. Several layers might be hosted on the same tier.
- Physically separating the tiers improves scalability and resiliency, but also adds latency from the additional network communication.

### Microservices

![Untitled](Software%20Architecture%20946334d2c384444da293ded724bb91f0/Untitled%206.png)

stupid communication

smart endpoints

#### Microservices - Pros

- reutilisabilité
- modularité disponibilité
- maintabilite
- extensibilité
- versionning
- scalabilité

#### Microservices - Cons

- complexité
- sync entre ms ( on peut ajouter un service de synch )

### Broker

![Untitled](Software%20Architecture%20946334d2c384444da293ded724bb91f0/Untitled%207.png)

It is generally used in enterprises  where every department has its own Broker + one centrelized

#### Broker - Pros

- Could be used as MOM (only transfer data)

    ++ asynchronous communication
    ++ gestion des pannes

- Or as middleware which is more intelligent

    ++ security (works as firewall): access control
    ++ data transformation
    ++ decoupling
    ++ service aggregation
    ++ Interoperability (the ability to work and adapt with other system and machines)

#### Broker - Cons

Performance, SPOF

### Master-worker

![Untitled](Software%20Architecture%20946334d2c384444da293ded724bb91f0/Untitled%208.png)

Master-Worker architecture is a generic parallel design that is used in order to break down big computational problems into smaller independent tasks that can be solved in parallel. The way it works is by having the master as the core machine in control to assign tasks to the workers which they complete them independently and return back the results

#### Master-worker - Pros

- Parallelisme
- security (master)
- availability
- adabtability

#### Master-worker - Cons

- SPOF
- Security (multiple machines- distributed system)

### Pipe and Filter

![Untitled](Software%20Architecture%20946334d2c384444da293ded724bb91f0/Untitled%209.png)

#### Pipe and Filter - Pros

- Separation of concerns
- Reuse
- Adaptability with the processing type

#### Pipe and Filter - Cons

- Machine are highly coupled for the same job
- Complexity : connection of multiple technologies

## Data centric architecture

### Repository

Data Passive

![Untitled](Software%20Architecture%20946334d2c384444da293ded724bb91f0/Untitled%2010.png)

Services independants : le seul moyen de communication c’est la base données

#### Repository - Pros

- Modifiabilité
- Maintabilité
- granularity service : reuse

#### Repository - Cons

- plusieurs services accedant ala BDs
- SPOF
- Performance : congestion (If there is congestion in a place, **the place is extremely crowded and blocked with traffic** )

### Blackboard

Data Active

![Untitled](Software%20Architecture%20946334d2c384444da293ded724bb91f0/Untitled%2011.png)

=> Blackboard Architecture is an architecture style or pattern used in solving Artificial Intelligence, Mining, Machine learning problems

Picture a number of students are all writing on a blackboard at the same time, trying to solve a problem. You think they will?

What if we add a teacher who first asks each student what he wants to write on the blackboard and decides which student has the best idea. And when the student is finished, the process is repeated.

This is the idea behind the blackboard architecture. The students are called Knowledge Sources. The teacher is called the Scheduler and the Blackboard is the common data structure of the Knowledge Sources. The blackboard represents all states of some problem space.

**Knowledge sources** are self-selecting modules of domain knowledge. Each knowledge
source can be viewed as an independent program specialized in processing a certain
type of information or knowledge of a narrower domain. Each knowledge source should
have the ability to assess itself on whether it should contribute to the problem solving
process at any instance. The knowledge sources in a blackboard system are separated
and independent. Each has its own set of working procedures or rules and each has its
own private data structure. It contains information necessary for a correct run of the
knowledge source. The action part of a knowledge source performs the actual problem
solving and produces changes to the BB. It can allow for different kinds of knowledge
representation and different inference mechanisms.
representation and different inference mechanisms.

**Blackboard**: It is the part of the system that is used for storage of knowledge accessible to all the
KSs. It is a global data structure used to organize the problem-solving data and to
handle communications between the KSs

#### Blackboard - Pros

- Security
- Performance
- reuse
- modifiability

#### Blackboard - Cons

- Complexity ( traitement de données au niveau de la bd )
- complexity bd design
- diminuer le champs d’action des controlleurs

### Onion

![Untitled](Software%20Architecture%20946334d2c384444da293ded724bb91f0/Untitled%2012.png)

The Onion Architecture tells us that, in enterprise applications, we will have more than those two layers, and it adds some layers in the business logic which we might recognise from Domain Driven Design.

Key tenets of Onion Architecture:

- The application is built around an independent object model
- Inner layers define interfaces, Outer layers implement interfaces
- Direction of coupling is toward the center
- All application core code can be compiled and run separate from infrastructure. Also, any outer layer can directly call any inner layer, which does not break the coupling direction and avoids creating proxy methods and even proxy classes that contain no business logic, just for the sake of complying with some layering scheme. This also comes in line with the preferences expressed by Martin Fowler.the layers above can use any layer beneath them, not just the layer immediately beneath.

#### Onion - Pros

- testability
- flexibility, portability, reutilisability
- conformité avec DDD
- dependance vers le centre

#### Onion - Cons

- complexity
- trops d’interface
- Abstraction between the domain entities and business layer

### Clean

![Untitled](Software%20Architecture%20946334d2c384444da293ded724bb91f0/Untitled%2013.png)

independante des framework , bd , ui

La *clean architecture*
 permet de construire des applications bien structurées, chaque partie ayant un périmètre et un rôle bien défini. Le code est découplé de détails comme les *frameworks*, les bases de données. Il n'est pas obligatoire d'implémenter toutes les couches de la figure. Il faut néanmoins une couche pour les fonctionnalités métiers (*use cases*) et une couche pour les adaptateurs d'interface (*adapters interface*). Des outils comme le *framework* utilisé ou la base de données, sont des détails. Ils sont situés dans une couche supérieure. Les couches supérieures peuvent avoir des dépendances dans les couches inférieures, mais les couches inférieures ne doivent pas avoir des dépendances, des références dans les couches supérieures.

C’ est un mode d'organisation, d'architecture, qui met l'accent la séparation des responsabilités, et le découplage des fonctionnalités métiers d'outils comme les frameworks, et les bases de données.

## **La règle maîtresse**

La règle qui gouverne la *clean architecture* est la règle de dépendance. La règle de dépendance stipule qu'une couche inférieure ne doit rien savoir d'une couche supérieure. Les classes, fonctions, variables d'une couche supérieure ne doivent pas être mentionnées dans une couche inférieure. Il ne peut avoir de dépendance que d'une couche supérieure vers une couche inférieure. C'est le sens de la flèche sur la figure.

L'objectif visé ici est simple. S'assurer que les changements apportés aux couches supérieures n'aient aucun impact sur les couches inférieures. On peut donc changer de framework, de base de données, sans avoir à toucher aux fonctionnalités métiers.

## **Les couches**

La *clean architecture* ne compte pas que quatre couches comme c'est le cas sur la figure. La figure est juste schématique. Selon votre cas d'utilisation vous pouvez avoir plus de quatre couches ou moins.

### **Entities (Entités)**

Une entité est modèle métier de l'application ou du système à construire. Une entité peut être un objet, une structure de données avec des fonctions.

Ex: Un objet, ou une structure utilisateur

### **Use cases (Cas d'utilisation)**

Un cas d'utilisation est une fonctionnalité métier. C'est dans cette couche qu'on implémente les fonctionnalités métiers de l'application.

### **Interface Adapters (Adaptateurs d'interface)**

Cette couche fait la liaison entre les couches supérieures et les couches inférieures. Les adaptateurs convertissent les données dans les formats adaptés aux cas d'utilisation et aux entités. Inversement, les adaptateurs convertissent également les données reçues des cas d'utilisations dans les formats adaptés aux frameworks et autres dépendances externes.  Les opérations de base de données, comme les requêtes SQL par exemple sont implémentées dans cette couche.

### **Framework and Drivers (Frameworks et Pilotes)**

Dans les *clean architecture*, les outils comme les *frameworks*, bases de données sont considérés comme des détails. Tout ce qui est lié aux *frameworks* et dépendances externes est également défini dans cette couche.

#### Clean - Pros

testability

maintability

#### Clean - Cons

complexity
