---
slug: /gl3/semester-1/design-patterns/patterns/flyweight
---

# Flyweight

Flyweight pattern tries to reuse already existing similar kind objects by storing them and creates new object when no matching object is found.

We will demonstrate this pattern by drawing 20 circles of different locations but we will create only 5 objects. Only 5 colors are available so color property is used to check already existing Circle objects.

## Implementation

We are going to create a Shape interface and concrete class Circle implementing the Shape interface. A factory class ShapeFactory is defined as a next step.

ShapeFactory has a **HashMap of Circle having key as color of the Circle object**. Whenever a request comes to create a circle of particular color to ShapeFactory, it checks the circle object in its HashMap, if object of Circle found, that object is returned otherwise a new object is created, stored in hashmap for future use, and returned to client.

FlyWeightPatternDemo, our demo class, will use ShapeFactory to get a Shape object. It will pass information (red / green / blue/ black / white) to ShapeFactory to get the circle of desired color it needs.

### Diagram

![Flyweight%20422770d90b8b44ab958d6743315a051f/Untitled.png](Flyweight%20422770d90b8b44ab958d6743315a051f/Untitled.png)

### Example

![Flyweight%20422770d90b8b44ab958d6743315a051f/Untitled%201.png](Flyweight%20422770d90b8b44ab958d6743315a051f/Untitled%201.png)
