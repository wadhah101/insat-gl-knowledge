# Bridge

Decoupling an abstraction from the implementation

- It enables the separation of implementation from the interface.
- It improves the extensibility.
- It allows the hiding of implementation details from the client.

### **Usage of Bridge Pattern**

- When you don't want a permanent binding between the functional abstraction and its implementation.
- When both the functional abstraction and its implementation need to extended using sub-classes.
- It is mostly used in those places where changes are made in the implementation does not affect the clients

---

Let's take the example of Ui we have multiple kind of views like LongView , snippet view ... that will contain multuiple kind of media ressources like photos videos or text..

![Bridge%20a349989928464dac8b35bf78353bb09c/5.png](Bridge%20a349989928464dac8b35bf78353bb09c/5.png)

![Bridge%20a349989928464dac8b35bf78353bb09c/Untitled.png](Bridge%20a349989928464dac8b35bf78353bb09c/Untitled.png)
