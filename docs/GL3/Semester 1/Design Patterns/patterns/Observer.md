---
slug: /gl3/semester-1/design-patterns/patterns/observer
---

# Observer

<aside>
📎 Observer pattern is used when there is one-to-many relationship between objects such as if one object's state is modified, its depenedent objects are to be notified automatically.

</aside>

The same principal as the" Publish-Subscribe"

### Diagram

![Observer%208e53c169b4934f43b6f93b311a8a2429/Untitled.png](Observer%208e53c169b4934f43b6f93b311a8a2429/Untitled.png)

### Example : Weather station (we should be notifed everytime the weather change)

Our job is to create an app that uses the WeatherData object (which takes dtaa from a sensor) to update three displays elements

- Current conditions (temperature/humidity/pressure)
- Weather statistics
- forecast

these three are our observer concrete classes

so the weather data class should notify all the observers each time it has a new state

notify method in weatherData calls the update method in observers classes

---

the concrete observer is add as w subscriber to the subject  = register to a subject

![Observer%208e53c169b4934f43b6f93b311a8a2429/Untitled%201.png](Observer%208e53c169b4934f43b6f93b311a8a2429/Untitled%201.png)

### Implementation

![Observer%208e53c169b4934f43b6f93b311a8a2429/Untitled%202.png](Observer%208e53c169b4934f43b6f93b311a8a2429/Untitled%202.png)

![Observer%208e53c169b4934f43b6f93b311a8a2429/Untitled%203.png](Observer%208e53c169b4934f43b6f93b311a8a2429/Untitled%203.png)

![Observer%208e53c169b4934f43b6f93b311a8a2429/Untitled%204.png](Observer%208e53c169b4934f43b6f93b311a8a2429/Untitled%204.png)
