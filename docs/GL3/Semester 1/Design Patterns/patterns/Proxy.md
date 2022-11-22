---
slug: /gl3/semester-1/design-patterns/patterns/proxy
---

# Proxy

![Proxy%207db54ce03ab74640a1c34f81116a9f91/Untitled.png](Proxy%207db54ce03ab74640a1c34f81116a9f91/Untitled.png)

### Remote Proxy

 When we want to access something remotely (in a different server..)

![Proxy%207db54ce03ab74640a1c34f81116a9f91/Untitled%201.png](Proxy%207db54ce03ab74640a1c34f81116a9f91/Untitled%201.png)

we can have The example of RMI in java where the stub is a proxy

let's just remeber how rmi works to get the point

![Proxy%207db54ce03ab74640a1c34f81116a9f91/Untitled%202.png](Proxy%207db54ce03ab74640a1c34f81116a9f91/Untitled%202.png)

example :

![Proxy%207db54ce03ab74640a1c34f81116a9f91/Untitled%203.png](Proxy%207db54ce03ab74640a1c34f81116a9f91/Untitled%203.png)

### Virtual proxy

Control access to ressources that are expensive to create  so you put that proxy to control your intercations in order to create this object whenn you reaaaally need it

### Protection proxy

when you have an object that not all users are allowed to use it ⇒ control access based on access rights

---

## How it Works ?

we need something to control access by adding additional behaviors without changing the interface ⇒ create a proxy class which implements our interface

![Proxy%207db54ce03ab74640a1c34f81116a9f91/Untitled%204.png](Proxy%207db54ce03ab74640a1c34f81116a9f91/Untitled%204.png)
