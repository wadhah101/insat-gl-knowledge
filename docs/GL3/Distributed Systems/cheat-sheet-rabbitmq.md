### Publish / Subscribe

- This pattern is known as "publish/subscribe".deliver a message to multiple consumers.

- Essentially, published log messages are going to be broadcast to all the receivers.

**Exchanges**

- what we covered in the previous tutorials:
  - A *producer* is a user application that sends messages.
  - A *queue* is a buffer that stores messages.
  - A *consumer* is a user application that receives messages.

  

- the producer can only send messages to an *exchange*. 

- An exchange is a very simple thing. On one side it receives messages from producers and the other side it pushes them to queues. 

- The exchange must know exactly what to do with a message it receives. Should it be appended to a particular queue? Should it be appended to many queues? Or should it get discarded. The rules for that are defined by the *exchange type*.

- There are a few exchange types available: 
  - **direct**
  - **topic**
  - **headers**
  - **fanout** (we'll focus on this)

- Creating an exchange : 

  ```
  channel.exchangeDeclare("logs", "fanout");
  ```



#### Listing Exchanges

- To list the exchanges on the server you can run the ever useful `rabbitmqctl`:

  

  ```bash
  sudo rabbitmqctl list_exchanges
  ```

  In this list there will be some `amq.*` exchanges and the default (unnamed) exchange. These are created by default, but it is unlikely you'll need to use them at the moment.

#### Nameless exchange

In previous parts of the tutorial we knew nothing about exchanges, but still were able to send messages to queues. That was possible because we were using a default exchange, which we identify by the empty string ("").

Recall how we published a message before:



```java
channel.basicPublish("", "hello", null, message.getBytes());
```



The first parameter is the name of the exchange. The empty string denotes the default or *nameless* exchange: messages are routed to the queue with the name specified by `routingKey`, if it exists.

Now, we can publish to our named exchange instead:

```java
channel.basicPublish( "logs", "", null, message.getBytes());
```



#### Temporary queues

- We want to hear about all log messages, not just a subset of them. We're also interested only in currently flowing messages not in the old ones. To solve that we need two things.
- Firstly, whenever we connect to Rabbit we need a fresh, empty queue. To do this we could create a queue with a random name, or, even better - let the server choose a random queue name for us.
- Secondly, once we disconnect the consumer the queue should be automatically deleted.
- In the Java client, when we supply no parameters to `queueDeclare()` we create a non-durable, exclusive, autodelete queue with a generated name:

```java
String queueName = channel.queueDeclare().getQueue();
```

#### Bindings

We've already created a fanout exchange and a queue. Now we need to tell the exchange to send messages to our queue. That relationship between exchange and a queue is called a *binding*.

```java
channel.queueBind(queueName, "logs", "");
```

From now on the `logs` exchange will append messages to our queue.





#### Final Notes

- We created one publisher , many subscribers 
  - we have many temporary queues , each subscribers is related to one queue. all queues are related to the exchange with : `channel.queueBind(queueName, "logs", "");`
  - The **declaration** of the exchange is  in the publisher class , in addition to relating **it to the publisher** 
    - first : `channel.exchangeDeclare("logs", "fanout");`
    - and then : `channel.basicPublish( "logs", "", null, message.getBytes());`
- before this , we created 1 producer and 2 consumers ( with work queues)
  - all consumers are related to the same queue (same named queue) , where the producer produces his messages , and the consumers consume message from this queue (each message consumed is destroyed afterwards)
  - using the exchange with the fanout mode helps us send the messages to all the **subscribers** at the same time.

### Routing

- In this tutorial we're going to add a feature to it - we're going to make it possible to subscribe only to a subset of the messages. For example, we will be able to direct only critical error messages to the log file (to save disk space), while still being able to print all of the log messages on the console.





#### Bindings 

- A binding is a relationship between an exchange and a queue. This can be simply read as: the queue is interested in messages from this exchange.

- Bindings can take an extra `routingKey` parameter. To avoid the confusion with a basic_publish parameter we're going to call it a binding key. This is how we could create a binding with a key:

  ```java
  channel.queueBind(queueName, EXCHANGE_NAME, "black");
  ```

- The meaning of a binding key depends on the exchange type. The fanout exchanges, which we used previously, simply ignored its value

#### Direct exchange

- Our logging system from the previous tutorial broadcasts all messages to all consumers. 
- We want to extend that to allow **filtering messages** based on their severity. For example we may want a program which writes log messages to the disk to only receive critical errors, and not waste disk space on warning or info log messages.
- fanout exchange : only capable of mindless broadcasting.
- direct exchange : a message goes to the queues whose **binding key exactly matches the routing key** of the message.

![direct-exchange](C:\Users\saief\OneDrive\Documents\CheatSheets\Rabbitmq\direct-exchange.png)

- In this setup, we can see the direct exchange X with two queues bound to it. The first queue is bound with binding key orange, and the second has two bindings, one with binding key black and the other one with green.

- In such a setup a message published to the exchange with a routing key orange will be routed to queue Q1. Messages with a routing key of black or green will go to Q2. All other messages will be discarded.

#### Multiple bindings

![direct-exchange-multiple](C:\Users\saief\OneDrive\Documents\CheatSheets\Rabbitmq\direct-exchange-multiple.png)

- It is perfectly legal to bind multiple queues with the same binding key. In our example we could add a binding between X and Q1 with binding key black. In that case, the direct exchange will behave like fanout and will broadcast the message to all the matching queues. 
- A message with routing key black will be delivered to both Q1 and Q2.

#### Emitting logs

- Declaring the exchange : 

  ```java
  channel.exchangeDeclare(EXCHANGE_NAME, "direct");
  ```

- sending the message

  ```java
  channel.basicPublish(EXCHANGE_NAME, severity, null, message.getBytes());
  ```

### Subscribing : 

- Receiving messages will work just like in the previous tutorial, with one exception - we're going to create a new binding for each severity we're interested in.

```java
String queueName = channel.queueDeclare().getQueue();

for(String severity : argv){
  channel.queueBind(queueName, EXCHANGE_NAME, severity);
}
```



---

Final Notes :



- One Queue two consumers (workers) : they get the messages in a round robin way , to prevent this we change the prefetch config , however each consumer consumes exactly one message from the queue.
- To make many consumers get the same message , we use one queue per consumer and we relate them to an exchange , we make that exchange fanout/direct/topic  ....

