---
slug: /gl3/semester-1/design-patterns/patterns/template
---

# Template

## Let's understand

💡  tea and coffee are made in very **SIMILAR** way: they follow the same preparation algorithm: boil water pourIncup brew coffee grind add sugar and milk

![Template%2094028059c85b4f9381833677eb0e5bae/Untitled.png](Template%2094028059c85b4f9381833677eb0e5bae/Untitled.png)

We still have different methods But they are actually similar : adding sugar and milkk or adding Lemon are both "adding"

![Template%2094028059c85b4f9381833677eb0e5bae/Untitled%201.png](Template%2094028059c85b4f9381833677eb0e5bae/Untitled%201.png)

### Let's meet the Template Method

![Template%2094028059c85b4f9381833677eb0e5bae/Untitled%202.png](Template%2094028059c85b4f9381833677eb0e5bae/Untitled%202.png)

![Template%2094028059c85b4f9381833677eb0e5bae/Untitled%203.png](Template%2094028059c85b4f9381833677eb0e5bae/Untitled%203.png)

we can notice that the boilWater() and pourInCup() are not abstract because they have the same implementation in all subclasses

If we have a method that could be exsiting in some classes and other not, all you have to do is declaring it as a concrete method with an empty body, this means that subclasses can override it but it is not an obligation : these methods called **hook**

### Diagram

![Template%2094028059c85b4f9381833677eb0e5bae/Untitled%204.png](Template%2094028059c85b4f9381833677eb0e5bae/Untitled%204.png)

![Template%2094028059c85b4f9381833677eb0e5bae/Untitled%205.png](Template%2094028059c85b4f9381833677eb0e5bae/Untitled%205.png)
