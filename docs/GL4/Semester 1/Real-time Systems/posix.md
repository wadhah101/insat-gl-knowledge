---
slug: /gl4/semester-1/real-time-systems/posix
---

# Posix

Author [@Saief1999](https://github.com/Saief1999)

## C'est quoi une tâche?

- **processus lourd** : lorsqu'il est créé, implique la réservation des ressources telles qu'un espace mémoire, une table de fichiers ouverts et une pile interne qui lui sont toutes dédiées
- **processus léger**(thread): partage le même espace mémoire et la même table des fichiers ouverts que son processus père. Mais dispose de **sa propre pile**

## Création des tâches

```java
int pthread_create(pthread_t* thread, pthread_attr_t* attr, void* (*start_routine)(void*), void* arg);
```

### Parametres des tâches

- **thread**: pointeur sur l'identificateur de la tâche qui vient d'être créée
- **attr**: indiquent les différents propriétés de la tâche:
  - type d'ordonnancement
  - priorité
  - joignable ? détachable ?
- **start_routine**: fonction qui va être executée en premier
  - it is the signature of a **function pointer** that **takes** and **returns** `void *`.
- **arg**: variables passées en paramètre de _start_routine_ ( NULL for none )

### Return Type

- 0 si tout va bien à la création

## Joinning

Lorsqu'un processus lourd crée une tâche sous Posix, s'il ne lui est pas explicitement indiqué d'attendre la fin d'exécution de cette tâche, alors à sa terminaison elle forcera l'arrêt de la tâche créée. Pour éviter cela, Posix propose la fonction pthread_join.

`int pthread_join(pthread_t thread, void** thread_return)`

### Parametres

- **thread**: indentificateur de la tâche fils
- **thread_return**: valeur de retour de tâche fils
  - `NULL` si fils ne retourne rien ou on veut pas stocker la valeur

## Detaching

- Uitlisé pour forcer la non-attente d'une tâche , même si on utilise `pthread_join`

## Steps

1. `pthread_attr_t attr` Déclaration de variables des propriétés.
2. `pthread_attr_init(&attr)` : Initialisation de attr aux valeurs par défaut (obligatoire).
3. `pthread_att_setdatachstate(&att, PTHREAD_CREATE_DETACHED)` : Affectation de la propriété détachable à attr.
4. `pthread_create(&tache1, &attr, fonc, 1)` : Créer notre tache avec la propriété
5. `pthread_attr_destory($attr)` : Détruire attr pour libérer la mémoire allouée

## Scheduling : Priorité et ordonnancement

Pour affecter la priorité à une tache :

1. `struct sched_param param`
2. `int pthread_attr_setinheritsched(pthread_attr_t *attr, int inheritsched)`: l'os prend en considération les priorités + type d'ordonnancelent, _inheritsched_:
   1. **PTHREAD_EXPLICIT_SCHED**: utilise les paramétres d'ordonnancement depuis sont **attr**
   2. **PTHREAD_INHERIT_SCHED** : utilise les paramétres d'ordonnancement de son père.
3. `int pthread_attr_setschedparam(pthread_attr_t *attr, const struct sched_param *param)`: affecter la **Priorité**
4. `int pthread_attr_setschedpolicy(pthread_attr_t *attr, int policy)` : affecter le type d'ordonnancement **Policy**
   1. **SCHED_FIFO** : ordonnancement préemptif à priorités fixes. Les tâches de même priorité sont ordonnancées en FIFO
   2. **SCHED_RR** : Round-Robin à priorité préemptif. Une tâche utilise un quantum de temps puis est déplacée en queue de la file d'attente du niveau de sa priorité.
   3. **SCHED_OTHER** : il s'agit d'un ordonnancement à temps partagé entre tâches. Il pointe généralement sur SCHED_FIFO.
5. `int pthread_setschedparam(pthread_t thread, int policy, const struct sched_param *param)` : Affecter policy + priorité **lors de l'execution**

## Data Sharing & critical sections

### Exclusion mutuelle

- Sémaphore d'exclusion mutuelle => semaphore(1) ( lock )

1. Déclaration de la ressource partagé
2. `pthread_mutex_t verrou` : Declaration de verrou
3. `pthread_mutex_init(pthread_mutex_t* verrou, const pthread_mutexattr_t* m_attr)` : initialisation du verrou (obligatoire)
4. `pthread_mutex_lock(pthread_mutex_t *verrou)` prendre la verrou
5. `pthread_mutex_unlock(pthread_mutex_t *verrou)` libérer le verrou

### Exclusion mutuelle et variable condition

Une tâche accédant à la donnée peut être endormie si la condition n'est pas vérifiée. Elle ne sera réveillée que lorsqu'une autre tâche accédera à cette donnée et rendra la condition vraie.

> **Lorsqu'une tâche est endormie , elle libére le verrou avant** Ceci est équivalent à l'utilisation de `wait` et `notify` dans Java. C'est le même principe. `notifyAll` (JAVA) **équivalent à** `pthread_cond_broadcast` (POSIX)

#### Etapes

1. `pthread_cond_t cond = PTHREAD_COND_INITIALIZER;` : crée variable condition
2. `int pthread_cond_wait(pthread_cond_t *cond, pthread_mutex_t *verrou)` : endormit une tâche (possédant le verrou sur la donnée partagée) si la condition cond est fausse
3. `int pthread_cond_signal(pthread_cond_t *cond)` rend la condition cond vraie. Cela envoie un signal de réveil aux tâches qui ont été endormies sur cette condition. Si plusieurs tâches attendent sur une condition, **cela ne réveille que l'une d'entre elles**.
4. `int pthread_cond_broadcast(pthread_cond_t *cond)` : Réveille toute les tâches

### Inversion de priorité

- **Probleme d'inversion de priorité :** Le fait d'attendre un thread moins prioritaire ( qui détient le mutex qu'on nécessite), donc réellement c'est comme on est moins prioritaire de n'importe quel autre thread qui ne nécessite pas ce mutex.
  - Ce qu'on fait c'est que on donne la priorité maximale des threads au verrou, pour que n'importe autre thread ne préempte P1

#### Solution Steps (explained in depth in sheet)

1. `pthread_mutexattr_t m_attr;`: La déclaration de la propriété à affecter au mutex d'exclusion mutuelle (le verrou)
2. `int pthread_mutexattr_init(pthread_mutexattr_t *m_attr)`: Init (Oblig)
3. `int pthread_mutexattr_setpshared(pthread_mutexattr_t *m_attr, int pshared)` : fonction permettant à un mutex d'être partagé par les tâches appartenant à n'importe quel processus.
   1. **PTHREAD_PROCESS_SHARED**.
   2. **PTHREAD_PROCESS_PRIVATE**: le partage est interne au processus/tâche créateur du mutex, alorspshared doit prendre la valeur
4. `int pthread_mutexattr_setprioceiling(pthread_mutexattr_t *m_attr, int prioceiling)` La fonction permettant de mettre dans la propriété m_attr qui sera affectée au mutex, sa priorité plafond prioceiling

5. `int pthread_mutexattr_setprotocol(pthread_mutexattr_t *m_attr, int protocol)`: affecte le protocole d'héritage
   1. **PTHREAD_PRIO_PROTECT** : toute tâche s'emparant du mutex doit hériter de sa priorité
   2. **PTHREAD_PRIO_NONE**
   3. **PTHREAD_PRIO_INHERIT**
6. ...

> Finish this part

## Périodicité

1. `struct timespec time` : La déclaration de la structure de données de gestion du temps
2. `int clock_gettime(clockid_t clk_id, struct timespec *time)` : Avoir temps système, clockid_t:
   1. **CLOCK_REALTIME**
   2. **CLOCK_MONOTONIC**
   3. **CLOCK_PROCESS_CPUTIME_ID**
   4. **CLOCK_THREAD_CPUTIME_ID**
3. `int pthread_cond_timedwait(pthread_cond_t *cond, pthread_mutex_t *verrou, struct timespec *time)` : utilise un décompteur (timeout) sur le temps time pour réveiller la tâche endormie sur l'attente de la variable condition `cond` qui ne sera jamais signalée

## Synchronisation : Sémaphores

1. `include <semaphore.h>` et `sem_t s`
2. `int sem_wait(sem_t* s)` : attendre evt
3. `int sem_post(sem_t* s)`: signaler evt
4. `int sem_init(sem_t* s, int pshared, unsigned int valeur)` :
   1. Initialement, ce sémaphore est fait pour gérer la synchronisation entre processus lourd. Mais, on peut le restreindre à gérer uniquement la synchronisation entre les tâches du processus courant (dans notre cas, le processus issu de la fonction main(void)), en fixant la variable pshared à 0. Ce sémaphore est partagé entre plusieurs processus si la variable pshared est différente de 0.
   2. **valeur** : compteur associé au sémaphore evt
5. `int sem_destroy(sem_t* s)` : détruire evt, Une fois cette fonction appelée, aucune tâche ne doit plus être bloquée sur ce dernier
