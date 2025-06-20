---
slug: /gl4/semester-1/real-time-systems/rt-java
---

# RT Java

Author [@Saief1999](https://github.com/Saief1999)

## Java: Threads

- `sleep` : Sleeps for a number of µseconds
- `interrupt`: Interrupts the threads
- If we did not use join in main:
  - in **Posix**: Kill child threads when the main finishes
  - in **Java** : Runs the code, but waits the child threads to terminate in order to terminate itself
- `yield` : get back to ready state
- `wait`/`notify` :
  - Simply put, calling wait() forces the current thread to wait until some other thread invokes `notify()` or `notifyAll()` on the same object.
  - wait needs to be used within a synchronized block, otherwise it doesn't make any sense
  - When we do wait(), we give away the shared resource we go to an inactive state until another thread calls
    - `notify()` { wakes up 1 in random and puts it in ready state }
    - `notifyAll()` { wakes all waiting threads and puts them in ready state }
      - From ready state we need to ask again for resource
- `resume`/`suspend` : Resumes and suspends a thread [ DEPRECATED ]

- **Garbage Collector** : Thread qui a la plus faible priorité

---

Priority:

Priority Example might not work properly, because we use multiple cores, so many threads can enter at the same time even if they don't have the same priority

> Thread priorité égales -> Round Robin

## Real Time Java

- `RealtimeThread` :

  - Access To Heap
  - Prio < GC

- `NoHeapRealtime` :
  - No Access to Heap
  - Prio > GC
  - Works in Immortal Memory or scoped Memory

### Schedulable

Schedulable: interface qui étend `java.lang.runnable`

Scheduler(ordonnanceur) -> Implemente une politique d'ordonnancement basé sur la notion **d'execution éligible**

Scheduler -> checks feasibility of the system ( system of Schedulable threads )

1. `scheduler.addToFeasibility(schedulable)` {Méthode de contrôle d'admission}
   - Ajoute une tâche dans l'analyse de faisabilité de l'ordonnanceur
2. `scheduler.isFeasible()`
   - Vérifie si le système est ordonnançable

To change parameters of a schedulable in runtime (first performs analysis with this new parameters and then replaces them in the schedulable) : `scheduler.setIfFeasible(Schedulable, ReleaseParams, MemoryParams)`

`schedulable.waitforNextPeriod()` : pour les tâches périodiques

---

Note : Notions utilisé dans un scheduler (dépasse ça, c'est redondant)

Schedulable : (ses params font parti des `ReleaseParams` d'un schedulable)

- cost (Ci, parfois Wcet)
- deadline (Di)
- period (Pi)
- Overrun Handler : called when we bypass the **WCET**(worst case execution time), the maximum amount of time a task takes to execute ( we determine it )
- Miss Handler : Called when we bypass the deadline (we specify it)

> Deadline <= Period ALWAYS, if not specified Deadline = Period

---

To choose a scheduler for our schedulable

Method 1 (Set scheduler + some params of our schedulable)

```java
schedulable.setScheduler(Scheduler, SchedulingParameters, ReleaseParameters, MemoryParameters, ProcessingGroupParameters)
```

Method 2 (set scheduler only)

By Default -> PriorityScheduler

to Init a **scheduler** :

```java
PriorityScheduler sched = (PriorityScheduler) javax.realtime.Scheduler.getDefaultScheduler()
```

and then

```java
schedulable.setScheduler(sched)
```

---

To Init a **schedulable** without specifying a scheduler for it (using its constructor):

```java
RealtimeThread(SchedulingParameters, ReleaseParameters, MemoryParameters, MemoryArea, ProcessingGroupParameters, Runnable)
```

---

### Scheduling Parameters (schedulable)

```java
PriorityParameters(int priority) // extends SchedulingParameters
ImportanceParameters(int priority, int importance ) // extends SchedulingParameters, utilisé lorsque toute les tâches ne sont pas ordonnançable dans les temps

```

---

### Timers

- **Timers**: a form of AsyncEvent relative to a clock

  - **OneShotTimer**:

    - interruption générée une seule fois

      ```java
      OneShotTimer(HighResolutionTime time, AsyncEventHandler handler) // system clock
      OneShotTimer(HighResolutionTime time, Clock clock, AsyncEventHandler handler) // choose the clock
      ```

  - **PeriodicTimer**:

    - interruption générée périodiquement

      ```java
      PeriodicTimer(HighResolutionTime start, RelativeTime interval, AsyncEventHandler handler) // system clock
      PeriodicTimer(HighResolutionTime start, RelativeTime interval, Clock clock, AsyncEventHandler handler) // choose the clock
      ```

- **Time**: (**Extends** `HighResolutionTime`, we can add the clock in params to all of them)

  - **`AbsoluteTime(Date)`**: depuis 1970
  - **`RelativeTime(long millis, int nanos)`**: relative to a date
  - **`RationalTime(int frequency, long millis, int nanos)`**: taux d'occurrences par intervalle de temps
    - 9/250 -> armé 9 fois dans les 250ms

---

### Release Parameters (schedulable)

- **PeriodicParameters**
- **AperiodicParameters**: Aléa
- **SprodicParameters**: intervalle minimale de temps entre deux appels

```java
PeridoicParameters(
    HighResolutionTime start, //lancé au démarrage si nul
    RelativeTime periode,
    RelativeTime duree_execution,
    RelativeTime echeance, // si nul utiliser la période
    AsyncEventHandler overrunHandler,
    AsyncEventHandler missHandler
)
```

```java
AperiodicParameters(
    RelativeTime duree_execution,
    RelativeTime echeance,
    AsyncEventHandler overrunHandler,
    AsyncEventHandler missHandler
)
```

```java
SporadicParameters(
    RelativeTime intervalle_inter_arrivee
    RelativeTime duree_execution,
    RelativeTime echeance,
    AsyncEventHandler overrunHandler,
    AsyncEventHandler missHandler
)
```

### ProcessingGroupParameters(schedulable)

- Trés similaire aux `PeriodicParameters` qui étendent `ReleaseParameters`

```java
ProcessingGroupParameters(
    HighResolutionTime date_reveil,
    RelativeTime periode
    RelativeTime duree_execution
    RelativeTime echeance,
    AsyncEvenHandler overrunHandler,
    AsyncEventHandler missHandler
)
```

### MemoryParameters (schedulable)

```java
MemoryParameters(
    long maxMemoryArea, // en octet , or we use MemoryParameters.NO_MAX
    long maxImmortal, // NO_MAX ou en octets
    long allocationRate // NO_MAX ou en octets/sec
)
```

### MemoryArea

```java
LTMemory(long initial, long maximum) // MemoryArea->ScopedMemory->LTMemory
VTMemory(long initial, long maximum) // MemoryArea->ScopedMemory->VTMemory
//...
```

Example:

```java
MemoryArea memoryArea = new LTMemory(4096, 4096);
```

---

### Garbage Collection

- GC Traditionnel
  - peut être executé n'importe ou
  - Peut durer un certain temps
  - ne peut pas être préempté
  - préempte n'importe quelle thread
- Solution : GC RT

### Memory Management

- Classic Java:
  - Stack
  - Heap (Where objects are allocated)
- Pour RTSJ:

  - ScopedMemory ( durée de vie de Thread qui l'occupe)
    - LTMemory
    - VTMemory
  - ImmortalMemory ( durée de vie de l'Application, récupéré lorsque la JVM se termine )
  - HeapMemory: Heap of JVM

- Physical Memory :

  - Direct mapping to a physical `@`

  - can be of type Immortal/Scoped

**Differences**:

- **Scoped memory :**
  - **pas gérée par le ramasse-miettes**
  - Les objets peuvents être alloués dans une `scopedMemory` au lieu du tas
  - dés la fin de Thread occupant le scope, les objects sont libérés
  - Les scoped memory peuvent être imbriquées
- **LTMemory**: LinearTime Memory
  - C'est une scoped Memory
  - temps d'allocation d'un objet -> linéaire à la taille de cet objet (prévision du temps d'allocation possible )
  - **Ne peut pas être géré par le ramasse-miettes**
- **VTMemory**: VariableTime Memory
  - C'est une scoped Memory
  - Le temps d'allocation dans une VTmemory est variable (prévision du temps d'allocation impossible)
  - **peut être visité par le ramasse-miettes**, contrairement à `LTMemory`

### Utilisation de zones mémoire

- zone mémoire: peut être liée à une thread temps téel
  - Passé en parametre (`MemoryArea`)
  - Toute allocation est faite dans cette zone
- `void enter(Runnable logic)`
  - exécute logic en utilisant cette zone pour l'allocation

---

### Example

To check for feasibility

```java
mythread.setScheduler(sched);
if (!mythread.getScheduler().isFeasible())
    mythread.start()
try {
    mythread.join();
}
catch (InterruptedException e) {}
```

---

**Evenements asynchrones**:

- Event : `AsyncEvent` (interruption, signal, ect...)
- Handler: `AsyncEventHandler`
  - It is **schedulable**
  - Can be assoicated to many events
  - Lorsque le `AsyncEvent` est généré, le `AsyncEventHandler` est éxécuté

> Pour réduire le temps de latence : utilisation de `BoundAsyncEventHandler` (handler attaché à un thread)

- Pour borner le temps d'éxecution d'une méthode/contrôler la fin d'une `RealtimeThread`
  - `throw AsynchronouslyInterruptedException`
  - `try ... catch`

**Exemple Gestion d'évenement**:

- Example pour un `missHandler` d'un `Schedulable`

```java
import javax.realtime.*;

public class Handler extends BoundAsyncEventHandler {

  @Override
  public void handleAsyncEvent() {
    System.out.println("Dépassement D'écheance");
    //...
  }
}

```

**Exemple Complet**:

```java
public class Test {

    public static void main(String[] args) {
        PriorityScheduler sched =
            javax.realtime.Scheduler.getDefaultScheduler();


        /** SchedulingParameters */
        SchedulingParameters schedulingParameters = new ImportanceParameters(sched.getMaxPriority(), 3);

        /** ReleaseParameters */
        RelativeTime start = new RelativeTime(0,0);
        RelativeTime period = new RelativeTime(100,0);
        RelativeTime cost = new RelativeTime(30,0);
        RelativeTime deadline = new RelativeTime(60,0);
        AsyncEventHandler overrunHandler = null ;
        AsyncEventHandler missHandler = new Handler();

        ReleaseParameters releaseParameters = new PeriodicParameters(
            start,
            period,
            cost,
            deadline,
            overrunHandler,
            missHandler
        );

        /** MemoryParameters */

        long maxMemory = MemoryParameters.NO_MAX;
        long maxImmortal = MemoryParameters.NO_MAX;
        long allocationRate = MemoryParameters.NO_MAX;
        MemoryParameters memoryParameters = new MemoryParameters (
            maxMemory,
            maxImmortal,
            allocationRate
        );

        /** MemoryArea */
        MemoryArea memoryArea = new LTMemory(1024, 1024);

        /** ProccesingGroup */
        ProcessingGroupParameters processingGroupParameters = null ;


        /** The Runnable */

        Runnable runnable = new Runnable {
            @Override
            public void run() throws Exception {
                RealtimeThread thisThread = (RealtimeThread) Thread.currentThread();
                do {
                    System.out.println(t.getName() + " en execution ");
                }
                while(thisThread.waitForNextPeriod());
            }
        };

        /** Definition of the Schedulable */
        RealtimeThread rt = new RealtimeThread(
            schedulingParameters,
            releaseParameters,
            memoryParameters,
            memoryArea,
            processingGroupParameters,
            runnable
        );

        /** Setting the scheduler & running the thread */
        rt.setScheduler(sched);

        if (!rt.getScheduler().isFeasible()) {
            rt.start();
        }

        rt.join();

    }

    public class Handler extends BoundAsyncEventHandler {

        public void handleAsyncEvent()  {
            System.out.println("missed the deadline!");
        }
    }
}
```
