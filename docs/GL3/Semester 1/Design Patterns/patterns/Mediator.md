# Mediator

A Mediator Pattern says that "to define an object that encapsulates how a set of objects interact".

<aside>
📎 Le médiateur centralise la communication entre les composants du système. Les composants ne voient quel’objet médiateur et ne communiquent pas directement.

</aside>

 

![Mediator%20ea7b25c7963947cdb2e63ab4c93e3137/Untitled.png](Mediator%20ea7b25c7963947cdb2e63ab4c93e3137/Untitled.png)

### Example

we'll use the Mediator pattern in the context of a chatroom application. First we'll define an interface for our mediator.

![Mediator%20ea7b25c7963947cdb2e63ab4c93e3137/Untitled%201.png](Mediator%20ea7b25c7963947cdb2e63ab4c93e3137/Untitled%201.png)

While we described the Colleague as an interface above, it's more useful to use an abstract class in this case:

![Mediator%20ea7b25c7963947cdb2e63ab4c93e3137/Untitled%202.png](Mediator%20ea7b25c7963947cdb2e63ab4c93e3137/Untitled%202.png)

Now let's create our concrete mediator implementation

![Mediator%20ea7b25c7963947cdb2e63ab4c93e3137/Untitled%203.png](Mediator%20ea7b25c7963947cdb2e63ab4c93e3137/Untitled%203.png)

Finally we'll create one concrete colleage.

![Mediator%20ea7b25c7963947cdb2e63ab4c93e3137/Untitled%204.png](Mediator%20ea7b25c7963947cdb2e63ab4c93e3137/Untitled%204.png)

If we assume that we could have many different colleagues that react differently when a message is received, this pattern fits in well. For example, we could have a mobileColleague that needs to display the message differently to the desktop colleague.

![Mediator%20ea7b25c7963947cdb2e63ab4c93e3137/Untitled%205.png](Mediator%20ea7b25c7963947cdb2e63ab4c93e3137/Untitled%205.png)

Here's a client that drives the entire application:

![Mediator%20ea7b25c7963947cdb2e63ab4c93e3137/Untitled%206.png](Mediator%20ea7b25c7963947cdb2e63ab4c93e3137/Untitled%206.png)