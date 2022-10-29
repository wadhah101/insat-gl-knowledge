# Promela Cheat Sheet

## conditions

if no instruction is executable "if" blocks
else if only one is it's options will gets excuted
else if multiple insctructions are valid, one will be randomly chosen

```promela
proctype A(){
    if
        ::instr1 -> options1
        ::instrN -> optionsN
    fi;
}

```

## While loop

the instruction to execute is chosen randomly

```promela
do
    :: count = count - 1
    :: (count == 0) -> break;
od;

```

## Functions

```promela
    proctype A() {
        work();
    }

```

## Main

```promela
<!-- note:  every functions runs in parllel with no particular order -->
init {
    run A(2); run B(2,3);
}

<!-- or use active before function definition -->
active proctype A() {
    work();
}
```

## Atomic instruction

### java

```java
class Main {
    synchronized void work () {}
}
```

### promela

```promela
proctype A(){
    atomic
    {
        work();
    }
}
```

## Channels ( ~ Arrays )

### definition

```promela
chan gname = [20] of {short}
chan gnameObject = [10] of {short, byte}
```

### send

```promela
proctype A(chan q) {
    q!28 ;
}
```

### receive

```promela
proctype A(chan q) {
    int x ;
    q?x ;
}
```

## Finite state machines modeling

we have 4 place s1 , s2 , s3 , s4

```promela
proctype A(){
    s1: if
        :: x ? a -> goto s2
        :: x ? b -> goto s3
        :: else -> skip
    s2 : ..

    s3 :
        goto s4 ;
}

```
