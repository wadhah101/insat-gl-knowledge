# command

We have a client/invoker and a receiver 
With command pattern we want to encapsulate the **request.**

⇒ so our command object is a group of actions 

### Inderstanding the process

![command%2013b7509dad9c43e8aea420df9a48ef90/Untitled.png](command%2013b7509dad9c43e8aea420df9a48ef90/Untitled.png)

### Diagram

![command%2013b7509dad9c43e8aea420df9a48ef90/Screenshot_2020-12-14_16.05.30.png](command%2013b7509dad9c43e8aea420df9a48ef90/Screenshot_2020-12-14_16.05.30.png)

![command%2013b7509dad9c43e8aea420df9a48ef90/Untitled%201.png](command%2013b7509dad9c43e8aea420df9a48ef90/Untitled%201.png)

### Example of implementation

### Command Interface

![command%2013b7509dad9c43e8aea420df9a48ef90/Untitled%202.png](command%2013b7509dad9c43e8aea420df9a48ef90/Untitled%202.png)

---

### Concrete Command

light= receiver

on() = action

![command%2013b7509dad9c43e8aea420df9a48ef90/Untitled%203.png](command%2013b7509dad9c43e8aea420df9a48ef90/Untitled%203.png)

---

### The invoker

![command%2013b7509dad9c43e8aea420df9a48ef90/Untitled%204.png](command%2013b7509dad9c43e8aea420df9a48ef90/Untitled%204.png)

---

### Test

![command%2013b7509dad9c43e8aea420df9a48ef90/Untitled%205.png](command%2013b7509dad9c43e8aea420df9a48ef90/Untitled%205.png)

<aside>
💡 Check page 220 : implementation with execute() and Undo()

</aside>