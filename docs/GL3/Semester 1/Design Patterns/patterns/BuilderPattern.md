---
slug: /gl3/semester-1/design-patterns/patterns/builderpattern
---

# Builder Pattern

"construct a complex object from simple objects using step-by-step approach"

It is mostly used when object can't be created in single step like in the de-serialization of a complex object.

## Advantage of Builder Design Pattern

The main advantages of Builder Pattern are as follows:

- It provides clear separation between the construction and representation of an object.
- It provides better control over construction process.
- It supports to change the internal representation of objects.

### Diagram

![Builder%20Pattern%20dcb7fb76a344438fbec8417b632c691c/Untitled.png](Builder%20Pattern%20dcb7fb76a344438fbec8417b632c691c/Untitled.png)

### Example of a usecase

We have considered a business case of fast-food restaurant where a typical **meal** could be a **burger** and a **cold drink**. Burger could be either a **Veg Burger** or **Chicken Burger** and will be **packed by a wrapper**. Cold drink could be either a **coke or peps**i and will be **packed in a bottle**.

So when we need to order a meal all we have to do is :

- creating a Meal builder which will ceate a Meal object through its methods : these methods know wich sub classe should be created for each Meal and will add them to Meal Object
- for example for a VegMeal a meal builder create a Meal object then will use the addItem(Item ) method to aad a vegBurger and a coka to the array list
- call the cost metod of the meal object we just created wichich gonna call the price() of each item

![Builder%20Pattern%20dcb7fb76a344438fbec8417b632c691c/Untitled%201.png](Builder%20Pattern%20dcb7fb76a344438fbec8417b632c691c/Untitled%201.png)

## Implementation

### 1- Item interface and its subclasses

```java
public interface Item {
  public String name();

  public Packing packing();

  public float price();
}

```

```java
public abstract class ColdDrink implements Item {

  @Override
  public Packing packing() {
    return new Bottle();
  }

  @Override
  public abstract float price();
}

```

```java
public class Coke extends ColdDrink {

  @Override
  public float price() {
    return 30.0f;
  }

  @Override
  public String name() {
    return "Coke";
  }
}

```

```java
public class Pepsi extends ColdDrink {

  @Override
  public float price() {
    return 35.0f;
  }

  @Override
  public String name() {
    return "Pepsi";
  }
}

```

```java
public abstract class Burger implements Item {

  @Override
  public Packing packing() {
    return new Wrapper();
  }

  @Override
  public abstract float price();
}

```

```java
public class ChickenBurger extends Burger {

  @Override
  public float price() {
    return 50.5f;
  }

  @Override
  public String name() {
    return "Chicken Burger";
  }
}

```

```java
public class VegBurger extends Burger {

  @Override
  public float price() {
    return 25.0f;
  }

  @Override
  public String name() {
    return "Veg Burger";
  }
}

```

### 2- Packing interface and its subclasses

```java
public interface Packing {
  public String pack();
}

```

```java
public class Wrapper implements Packing {

  @Override
  public String pack() {
    return "Wrapper";
  }
}

```

```java
public class Bottle implements Packing {

  @Override
  public String pack() {
    return "Bottle";
  }
}

```

### 3- MealBuilder and Meal

```java
import java.util.ArrayList;
import java.util.List;

public class Meal {

  private List<Item> items = new ArrayList<Item>();

  public void addItem(Item item) {
    items.add(item);
  }

  public float getCost() {
    float cost = 0.0f;

    for (Item item : items) {
      cost += item.price();
    }
    return cost;
  }

  public void showItems() {
    for (Item item : items) {
      System.out.print("Item : " + item.name());
      System.out.print(", Packing : " + item.packing().pack());
      System.out.println(", Price : " + item.price());
    }
  }
}

```

```java
public class MealBuilder {

  public Meal prepareVegMeal() {
    Meal meal = new Meal();
    meal.addItem(new VegBurger());
    meal.addItem(new Coke());
    return meal;
  }

  public Meal prepareNonVegMeal() {
    Meal meal = new Meal();
    meal.addItem(new ChickenBurger());
    meal.addItem(new Pepsi());
    return meal;
  }
}

```

### Test Main

```java
public class BuilderPatternDemo {

  public static void main(String[] args) {
    MealBuilder mealBuilder = new MealBuilder();

    Meal vegMeal = mealBuilder.prepareVegMeal();
    System.out.println("Veg Meal");
    vegMeal.showItems();
    System.out.println("Total Cost: " + vegMeal.getCost());

    Meal nonVegMeal = mealBuilder.prepareNonVegMeal();
    System.out.println("\n\nNon-Veg Meal");
    nonVegMeal.showItems();
    System.out.println("Total Cost: " + nonVegMeal.getCost());
  }
}

```

```bash
Veg Meal
Item : Veg Burger, Packing : Wrapper, Price : 25.0
Item : Coke, Packing : Bottle, Price : 30.0
Total Cost: 55.0

Non-Veg Meal
Item : Chicken Burger, Packing : Wrapper, Price : 50.5
Item : Pepsi, Packing : Bottle, Price : 35.0
Total Cost: 85.5
```
