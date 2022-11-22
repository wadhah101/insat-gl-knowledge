# Visitor

In Visitor pattern, we use a visitor class which changes the executing algorithm of an element class. By this way, execution algorithm of element can vary as and when visitor varies

It is used when we have to perform an operation on a group of similar kind of Objects. With the help of visitor pattern, we can move the operational logic from the objects to another class.

The visitor pattern consists of two parts:

- a method called **Visit()** which is implemented by the visitor and is called for every element in the data structure
- visitable classes providing **Accept()** methods that accept a visitor

![Visitor%20b25e4702e0c44404ae1d3f56e2b47059/Untitled.png](Visitor%20b25e4702e0c44404ae1d3f56e2b47059/Untitled.png)
