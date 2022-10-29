## Introduction  

- Two standards of Prolog are used currently : 
  - Edinburgh (old)
  - ISO (new)

## Chapter 1 : Tutorial Introduction

### 1.1 Prolog

- The Prolog programmer asks more about which formal relationships and objects occur in the problem, and which relationships are “true” about the desired solution.
-  Prolog can be viewed as a **descriptive** language as well as a **prescriptive** one.

### 1.2 Objects and Relationships

- Prolog is a computer programming language that is used for solving problems that involve objects and the relationships between objects.
- Prolog should not be compared with object-oriented languages such as C++ and Java ( it uses thee world object in a completely different way)
- Prolog is a practical and efficient implementation of many aspects of “intelligent” program execution, such as **non-determinism**, **parallelism**, **and pattern-directed procedure call**.
- Prolog provides a uniform data structure, called the **term**, from which all data, as well as Prolog programs, are constructed.
- A Prolog program consists of a set of **clauses**, where each clause is either a **fact** about the given information or a **rule** about how the solution may relate to or be inferred from the given facts. 
- Example of a rule : `Two people are sisters if they are both female and have the same parents`

### 1.3 Programming

- Computer programming in Prolog consists of: 
  - specifying some facts about objects and their relationships
  - defining some rules about objects and their relationships
  - asking questions about objects and their relationships
- we can consider Prolog as a storehouse of facts and rules, and it uses the facts and rules to answer questions.
- Programming in Prolog consists of supplying all these facts and rules. 



### 1.4 Facts

- Suppose we want to tell Prolog the fact that “John likes Mary”. This fact consists of two objects, called “Mary” and “John”, and a relationship, called “likes”
- Syntax :```likes(john, mary).```

- **Important Points** :
  - The names of all relationships and objects must begin with a lower-case letter. For example, `likes`, `john`, `mary`.
  - The **relationship** is written first, and the objects are written separated by commas, and the objects are enclosed by a pair of round brackets. 
  - The **dot** character “.” must come at the end of a fact. The dot is what some people also call a “period” or a “full stop”.
- the fact `likes(john, mary)` is not the same thing as `likes(mary, john)`

- A name can have several interpretations:
  - `valuable(gold)` could mean that this particular lump of gold, which we have named gold, is valuable.
  - `valuable(gold)` could would mean that the chemical element Gold is valuable.

- names of objects within a fact -> **arguments**
- name of the relationship -> **predicate** 

- A collection of facts is called a **database**. We shall use the word **database** whenever we have collected together some facts (and later, rules) that are used to solve a particular problem.

### 1.5 Questions

- Once we have some facts, we can ask some questions about them.
- Example : `?- owns(mary, book).` 
  - If we interpret `mary` to be a person called Mary, and `book` to be some particular book, this question is asking `Does Mary own the book?`, or `Is it a fact that Mary owns the book?` We are not asking whether she owns all books, or books in general.
  - When a question is asked of a Prolog system, it will search through the database. It looks for facts that **unify** the fact in the question. 
    - Two facts **unify** if their predicates are the same (spelled the same way),
- Example 2 :

Database : 

```
likes(joe, fish). 
ikes(joe, mary).
likes(mary, book).
likes(john, book).
likes(john, france).
```

Questions : 

```
?- likes(joe, money).
no
?- likes(mary, joe).
no
?- likes(mary, book).
yes
```



- **no** :  nothing **unifies** with the question.
- **no** is the same as **false**.
- Example 3 :

Database :

```
human(socrates).
human(aristotle).
athenian(socrates).   
```

Questions : 

```
?- athenian(socrates).
yes
?- athenian(aristotle).
no
?- greek(socrates)
Existence error: procedure greek
no
```



### 1.6 Variables : 

- In Prolog we can not only name particular objects,but we can also use terms like X to stand for objects that we are unwilling or unable to name. 
- Any name beginning with a capital letter is taken to be a variable.
- When Prolog uses a variable, the variable can be either instantiated or not instantiated. 
	- A variable is instantiated when there is an object that the variable stands for. 
	- A variable is not instantiated when what the variable stands for is not yet known.
- When Prolog is asked a question containing a variable, Prolog **searches** through all its facts to find an **object** that the variable could stand for.

#### Example 1 : 

Database :

```
likes(john, flowers).
likes(john, mary).
likes(paul, mary).
```

Question 

```
?- likes(john, X).
X = flowers
```



- **Explanation** :

  1. the variable X is initially not instantiated. Prolog searches though the database, looking for a fact that unifies with the question.

  2. If an `uninstantiated` variable appears as an argument, Prolog will allow that argument to unify with any other argument in the same position in the fact (Prolog searches for any fact where the predicate is likes, and the first argument is john.)
  3. Prolog searches through the database in the order it was typed in (or top-to-bottom of the page) so the fact likes(john, flowers) is found first.
  4. X is **instantiated** to flowers. Prolog now **marks** the place in the database where a unifier is found.
  5. If we hit "Enter", we are satisfied we the answer , if we hit ";", Prolog must forget that X stands for flowers, and resume searching with X `uninstantiated` again. Because we are searching for an alternative solution, the search is continued from the **place-marker**. (will give us `X = Mary` )
  6. if we hit ";" it returns **no**.

​    

#### Example 2 (same database) : 

```
?- likes(X, mary).
X = john ;
X = paul ;
no
```

- IMPORTANT : in SWI-Prolog, we have this output  (will stop searching if there's not more instantiations available)

```
?- likes(X, mary).
X = john ;
X = paul .
```



### 1.7 Conjunctions

- when asking a question : `,` -> **and**

Example :

Database

```
likes(mary, chocolate).
likes(mary, wine).
likes(john, wine).
likes(john, mary).
```

Questions 

```
?- likes(john, mary), likes(mary, john).
no
```

In SWI-Prolog 

```
likes(john, mary), likes(mary, john).
false.
```



- **IMPORTANT** :
  - Prolog answers the question by attempting to satisfy the first goal. If the **first goal** is in the database, then Prolog will **mark** the place in the database, and **attempt** to satisfy the second goal. 
  - If the second goal is **satisfied**, then Prolog marks that goal’s place in the database, and we have found a solution that satisfies both goals. It is most important to remember that each goal keeps its own **place-marker**.
  - If the second goal of a conjunction is not satisfied, then Prolog will attempt to re-satisfy the previous goal (in this case the first goal). **Starting from the goal’s own place-marker**. then will try to satisfy the next goal **starting from the top of the database** (basically backtracking).
- Example ( explanation page 12 &13 )  : 

```
?- likes(mary, X), likes(john, X).
X = wine.
```



### 1.8 Rules

- In Prolog, rules are used when you want to say that a fact depends on a group of other facts. In English, we use the word “if” to express a rule
- A rule is a general statement about objects and their relationships.
- **Syntax** : 
  - In Prolog, a rule consists of a **head** and a **body**. The head and body are connected by the symbol “:-”, which is made up of a colon and a hyphen. The “:-” is pronounced if. 
    - **The head** of the rule describes what fact the rule is intended to define. 
    - The body, in this case likes(X, wine), describes the conjunction of goals that must be satisfied, one after the other, for the head to be true.
- Example1 : 
  - `likes(john, X) :- likes(X, wine).`
- Example 2 :

Database : 

```
male(albert).
male(edward).
female(alice).
female(victoria).
parents(edward, victoria, albert).
parents(alice, victoria, albert).
sister_of(X, Y) :- female(X), parents(X, M, F), parents(Y, M, F).
```

Question 

```
?- sister_of(alice, edward).
yes(in SWI-prolog true )
```

Explanation : 

1. First, the question unifies with the head of the only sister_of rule above, so **X** in the rule becomes instantiated to `alice`, and **Y** becomes instantiated to `edward`. The place marker for the question is put against this rule. Now Prolog attempts to satisfy the three goals in the body, one by one. 
2. The first goal is `female(alice)` because **X** was instantiated to `alice` in the previous step. This goal is true from the list of facts, so the goal succeeds. As it succeeds, Prolog marks the goal’s place in the database (the third entry in the database). No new variables were instantiated, so no other note is made. Prolog now attempts to satisfy the next goal. 
3. Now Prolog searches for `parents(alice, M, F)`, where **M** and **F** will unify with any arguments because they are `uninstantiated`. A unifying fact is `parents(alice, victoria, albert)`, so the goal succeeds. Prolog marks the place in the database (sixth down from the top) and records that **M** became instantiated to `victoria`, and **F** to `albert`.
4. Now Prolog searches for `parents(edward, victoria, albert)` because **Y** is known as `edward` from the question, and **M** and **F** were known to stand for `victoria` and `albert` from the previous goal. The goal succeeds, because a unifying fact is found (fifth down from the top). Since it is the last goal in the conjunction, the entire goal succeeds, and the fact `sister_of(alice, edward)` is established as **true**. Prolog answers `yes.`

Question 2 : 

```
?- sister_of(alice, X).
X = edward ;                                                                                         X = alice.  
```



- a clause in the database : a **fact** or a **rule** .



##  Chapter 2 : a closer look

### 2.1 Syntax

- Prolog programs are built from terms
- A term is either 
  - a constant, 
  - a variable, 
  - a structure.

#### 2.1.1 Constants 

- they name specific objects or specific relationships. There are two kinds of constants: atoms & numbers
- **atoms**
  - two kinds of atoms : 
    - atoms made up from letters&digits :
      - they generally begin with a lower case letter
      - Examples : `likes mary john book wine owns jewels can_steal`
    - atoms made up from signs 
      - Examples :  `?-` , `:-` , `-->`
  - we can put atoms between ``` ` then they may have **any** character in their name. 
    - Example `’george-smith’`
- Numbers : 
  - `-17 -2.67e2 0 1 99.9 512 8192 14765 67344 6.02e-23`

 #### 2.1.2 Variables

- Variables look like atoms, except they have names beginning with a **capital letter** or an **underline sign** “_”.
- stands for some object that we are unable or unwilling to name at the time we write the program.
- Examples :  `Answer Input Gross_Pay _3_blind_mice A_very_long_variable_name`
- **anonymous variables** : 
  - when we needs to use a variable, but its name will never be used.
  - Example :
    - if we want to find out if anyone likes John, but we do not need to know just who it is,
    - `?- likes(_, john).`

#### 2.1.3 Structures

- also called “compound terms”
- A structure is a single object consisting of a collection of other objects, called components
- A structure is written in Prolog by specifying its `functor` and its `components`.
  -  The `functor` names the general kind of structure, and corresponds to a datatype in an ordinary programming language. 
  - The `components` are enclosed in round brackets and separated by commas.
- Example `owns(john, book(ulysses, author(james, joyce), 3129)).`
  - John owns the 3,129th copy of Ulysses, by James Joyce.

### 2.2 Characters

- In Standard Prolog, a character is actually an atom of length 1. It is most common to use input and output operations on characters; 
- Prolog recognizes two kinds of characters:
  - Printing characters: cause a symbol to appear on your computer terminal’s display.
  - Non-printing characters : 
    - do not cause a symbol to appear, but cause an action to be carried out. 
    - Such actions include printing a blank space, beginning new lines of text, or perhaps making a beeping sound.

### 2.3 Operators

- Sometimes it is convenient to write some `functors` as operators. This is a form of syntax that makes some structures easier to read. 
- If we had to write the arithmetic expression `x + y * z` in the normal way for structures, it would look like this: `+(x,*(y,z))`, and this would be a legal Prolog term. 
- in Prolog, 3+4 does not mean the same thing as 7. The term 3+4 is another way to write the term +(3,4), which is a **data structure**.
- Types of operators : 
  -  Operators like plus (+), hyphen (-), asterisk (*), and slash (/) are written between their arguments, so we call them **infix operators**.
  - It is also possible to put operators before their arguments, as in “-x + y”, where the hyphen before the x is used in to denote **negation**. Operators that come before their arguments are called **prefix operators**.
  - Operators that are written after their arguments( the factorial of x is written “x!” ) are called **postfix operators**. 
- The **precedence** of an operator is used to indicate which operation is carried out first. Each operator that is used in Prolog has a precedence class associated with it (an integer value associated with an operator)
- **left associative** operators :
  - add, subtract, multiply, and divide
  - expressions like “8/4/4” are read as “(8/4)/4”



### 2.4 Equality and Unification

- `?-X=Y`

- pronounced “X equals Y”, Prolog attempts to unify `X` and `Y`, and the goal succeeds if they unify

- The equality predicate is built-in

- Given a goal of the form `X=Y`, where `X` and `Y` are any two terms which are permitted to contain `uninstantiated` variables, the rules for deciding whether `X` and `Y` are equal are as follows:

  - If `X` is an `uninstantiated` variable, and if `Y` is instantiated to any term, then `X` and `Y` are equal. Also, `X` will become instantiated to whatever `Y` is

    - Example : `?- rides(student, bicycle) = X.` { X is instantiated to the structure rides }

  - Integers and atoms are always equal : 

    ```
    policeman = policeman succeeds
    paper = pencil fails
    1066 = 1066 succeeds
    1206 = 1583 fails
    ```

  - Two structures are equal if : 

    - they have the same `functor` and number of components
    - all the corresponding components are equal.
    - Example : `rides(student, bicycle) = rides(student, X)`
      - goal succeeds, and causes X to be instantiated to bicycle

  - If `X`and `Y` are both `uninstantiated`, they **share**

    - whenever one of them becomes instantiated to some term, the other one automatically is instantiated to the same term.

  - **NOTES**  : An X = Y goal will always succeed if either argument is `uninstantiated`.

### 2.5 Arithmetic

```
X =:=Y X and Y stand for the same number
X =\=Y X and Y stand for different numbers
X < Y X is less than Y
X > Y X is greater than Y
X =< Y X is less than or equal to Y
X >= Y X is greater than or equal to Y
```

- Note that the “less than or equal to” symbol is not written as “<=” as in many programming languages. This is done so that the Prolog programmer is free to use the “<=” atom, which looks like an arrow, for other purposes
- The arguments could be variables instantiated to integers, or they could be integers written as constants, or they could be more general expressions.

Example : 

Database : 

```
reigns(rhodri, 844, 878).
reigns(anarawd, 878, 916).
reigns(hywel_dda, 916, 950).
reigns(lago_ap_idwal, 950, 979).
reigns(hywel_ap_ieuaf, 979, 985).
reigns(cadwallon, 985, 986).
reigns(maredudd, 986, 999).
```



Then we define this : `X was a prince during year Y if: X reigned between years A and B, and Y is between A and B, inclusive.`

```
prince(X, Y) :-
reigns(X, A, B),
Y >= A,
Y =< B.
```

Question : 

```
?- prince(cadwallon, 986).
yes
?- prince(X, 979).
X=lago_ap_idwal ;
X=hywel_ap_ieuaf
yes
```



Example 2 :

 

```
pop(usa, 203).
pop(india, 548).
pop(china, 800).
pop(brazil, 108).
area(usa, 3).
area(india, 1).
area(china, 4).
area(brazil, 3).

density(X, Y) :-
pop(X, P),
area(X, A),
Y is P / A.
```



- The rule is read as follows: 
  - The population density of country X is Y, if: 
    - The population of X is P
    - and The area of X is A, 
    - and Y is calculated by dividing P by A.

- **is** : 
  - The “is” operator is an infix operator. Its right-hand argument is a term which is interpreted as an arithmetic expression. To satisfy an “is”, Prolog first evaluates its right-hand argument according to the rules of arithmetic. The answer is unified with the left-hand argument to determine whether the goal succeeds
  - The left hand argument needs to be **always instantiated** .
  - We need to use the “is” predicate any time we require to evaluate an arithmetic expression. 
  - Example : `?- X is 2+3.` , X become equal to **5**
  - We can define a predicate for addition : `add(X, Y, Z) :- Z is X + Y.`
    - the predicate is true if Z is X+Y (note that X and Y **must** be instantiated.)



Depending on what computer you use, various arithmetic operators can be used on the right-hand side of the “is” operator. All Standard Prolog systems, however, will have the following

```
X + Y the sum of X and Y
X - Y the difference of X and Y
X * Y the product of X and Y
X / Y the quotient of X divided by Y
X // Y the integer quotient of X divided by Y
X mod Y the remainder of X divided by Y
```



### 2.6 Summary of Satisfying Goals

- Prolog performs a task in response to a question from the programmer (you). 
- A question provides a conjunction of goals to be satisfied. Prolog uses the known clauses to satisfy the goals. A fact can cause a goal to be satisfied immediately, whereas a rule can only reduce the task to that of satisfying a conjunction of sub goals. 
- However, a clause can only be used if it unifies the goal under consideration. If a goal cannot be satisfied, backtracking will be initiated. 
- Backtracking consists of reviewing what has been done, attempting to re-satisfy the goals by finding an alternative way to satisfying them.
-  Furthermore, if you are not content with an answer to your question, you can initiate backtracking yourself by typing a semicolon when Prolog informs you of a solution.



**General rule of Unification (IMPORTANT)** 

- The rules for deciding whether a goal unifies with the head of a use of a clause are as follows. Note that in the use of a clause, all variables are initially `uninstantiated`. 
  - An `uninstantiated` variable will unify with any object. As a result, that object will be what the variable stands for. 
  - Otherwise, an integer or atom will unify with only itself.
  - Otherwise, a structure will unify with another structure with the same `functor` and number of arguments, and all the corresponding arguments must unify.

## Using Data Structures

### 3.1 Structures and Trees

- based on structure
- we take the predicate , and create a tree out of it 

### 3.2 Lists

- The list is an ordered sequence of elements that can have any length.
- The “elements” of a list may be any terms — constants, variables, structures — which of course includes other lists.
- A list is either :
  - an empty list, having no element :
    
    - `[]`
    
  - it is a structure that has two components: the **head** and **tail**.
  
  - the head of the list is the first element of the list.
  
  - The tail of the list is a list that consists of every element except the first.
  
    - Example : The head and tail of a list are components of the `functor` named “.”, which is the dot (called the period or full stop). Thus, the list consisting of one element “a” is “.(a,[])” 
  
      -  the list consisting of the atoms a, b and c is written `.(a,.(b,.(c,[])))`,
  
    - we can also use another notation , called the `list notation` : `[a]`
    
    - | List                    | Head       | Tail               |
      | ----------------------- | ---------- | ------------------ |
      | [a,b,c]                 | a          | [b,c]              |
      | []                      | (none)     | (none)             |
      | [[the, cat], sat]       | [the, cat] | [sat]              |
      | [the, [cat, sat]]       | the        | [[cat, sat]]       |
      | [the, [cat, sat], down] | the        | [[cat, sat], down] |
      | [X+Y,x+y]               | X+Y        | [x+y]              |

- Notice that the empty list has neither a head nor a tail. When we try to unify it with [X|Y] **it will fail.**

Example : 

```
p([1,2,3]).
p([the, cat, sat, [on, the, mat]]).
?- p([X|Y]).
X=1 Y= [2, 3] ;
X = the [Y = cat, sat, [on, the, mat]]
?- p([_,_,_,[_|X]]).
X = [the, mat]
```



Examples 2 :

| List 1        | List 2                  | Instantiations                   |
| ------------- | ----------------------- | -------------------------------- |
| [X, Y, Z]     | [john, likes, fish]     | X = john Y = likes Z = fish      |
| [cat]         | [X\|Y]                  | X = cat Y = []                   |
| [X, Y\|Z]     | [mary, likes, wine]     | X = mary Y = likes Z = [wine]    |
| [[the, Y]\|Z] | [[X, hare], [is, here]] | X = the Y = hare Z = [[is,here]] |
| [golden\|T]   | [golden, norfolk]       | T = [norfolk]                    |
| [vale, horse] | [horse, X]              | (NONE)                           |
| [white\|Q]    | [P\|horse]              | P = white Q = horse              |



-  it is possible to use the list notation to create structures that resemble lists, but which do not terminate with the empty list.  One such structure, `[white|horse]`,

### 3.3 Recursive Search

Example  :

```
member(X, [X|_]).
member(X, [_|Y]) :- member(X, Y).
?- member(d, [a, b, c, d, e, f, g]).
yes
?- member(2, [3, a, 4, f]).
no
```



**Circular definition(error)**

```
parent(X, Y) :- child(Y, X).
child(A, B) :- parent(B, A)
```

In this example, to satisfy parent, we set up child as a goal. However, the definition for child uses only parent as a goal. You should be able to see that asking a question about parent or child would lead to a loop in which Prolog would never infer anything new, and that the loop would never terminate.

**left recursion(error):**

```
person(X) :- person(Y), mother(X, Y).
person(adam).
?- person(X).
```

**Solution left recursion (this case)**

```
person(adam).
person(X) :- person(Y), mother(X, Y).
```



- **Important note** : Don’t assume that, just because you have provided all the relevant facts and rules, Prolog will always find them. You must bear in mind when you write Prolog programs how Prolog searches through the database and which variables will be instantiated when one of your rules is used.
- When we write f(N-1) he searches for f(X-Y) !!!

### 3.4 Mapping

- Given a Prolog structure, we frequently wish to construct a new structure that is similar to the old one but changed in some way. We traverse the old structure component-by-component, and construct the components of the new structure. We call this mapping.

A Prolog program to change one sentence into another can be written as follows:

1. We need to define a Prolog predicate, called `alter`, such that **alter(X,Y) means that sentence X can be altered to give sentence Y**. It is convenient for X and Y to be lists, with atoms standing for the words, so sentences can be written like this: `[this, is, a, sentence]`
   - once alter is defined, we could ask Prolog a question of the form `?- alter([do,you,know,french], X).`, prolog will reply `X=[no,i,know,german].`
2. Because alter deals with lists, the first fact about alter needs to deal with what happens if the list is empty. In this case, we will say that an empty list is altered into an empty list: `alter([],[]).`

3. Altering a list with head H and tail T gives a list with head X and tail Y if: changing word H gives word X, and altering the list T gives the list Y.

4. we need to say what is meant by “changing” one word into another. This can be done by having a database of facts in which change(X, Y) means word X can be changed into word Y. 

5. At the end of the database we need a “catchall” fact, because if a word is not changed into another word it needs to be changed into itself. 

   ```
   change(you, i).
   /*...*/
   change(X, X). /* this is the "catchall" */
   ```



Full Program : 

```
change(you, i).
change(are, [am,not]).
change(french, german).
change(do, no).
change(X, X). /* this is the "catchall" */

alter([],[]).
alter([H|T],[X|Y]):- change(H,X),alter(T,Y).
```



### 3.5 Recursive Comparison (checking all elements of a list)

Example : 

```
fuel_consumed(waster, [3.1, 10.4, 15.9, 10.3]).
fuel_consumed(guzzler, [3.2, 9.9, 13.0, 11.6]).
fuel_consumed(prodigal, [2.8, 9.8, 13.1, 10.4]).

equal_or_better_consumption(Good, Bad) :-
    Threshold is (Good + Bad) / 40,
    Worst is Bad + Threshold,
    Good < Worst.

fuel_consumed(Car1, Con1),
fuel_consumed(Car2, Con2),
always_better(Con1, Con2).

always_better([], []).
always_better([Con1|T1], [Con2|T2]) :-
equal_or_better_consumption(Con1, Con2),
always_better(T1, T2).


sometimes_better([Con1|_], [Con2|_]) :-
equal_or_better_consumption(Con1, Con2).

sometimes_better([_|Con1], [_|Con2]) :-
sometimes_better(Con1, Con2).
```

### 3.6 Joining Structures Together

**As A rule of thumb, when you want to loop through a list and put each of its elements in another list , you'd have something like `functor([H1|T1],[H2|T2]):-functor(T1,T2)` and we add also `functor([],[])` as a finish condition** 

#### Append 

- The list processing predicate append is used to join two lists together to form another, new, list. For example, it is true that : 
  - `append([a, b, c], [3, 2, 1], [a, b, c, 3, 2, 1]).`

- The predicate append is most often used to create a new list from concatenating two others, like this: 
  - `?- append([alpha, beta], [gamma, delta], X). `
    `X = [alpha, beta, gamma, delta]`

- But it can also be used in other ways:
  - `?- append(X, [b,c,d], [a,b,c,d]). `
    `X=[a]`

The predicate **append** is defined as follows:

```
append([], L, L). 
append([X|L1], L2, [X|L3]) :- append(L1, L2, L3).
```



#### Bicycle example

```
partsof(X, [X]) :- basicpart(X).

partsof(X, P) :-
    assembly(X, Subparts),
    partsoflist(Subparts, P).
    
partsoflist([], []).
partsoflist([P|Tail], Total) :-
    partsof(P, Headparts),
    partsoflist(Tail, Tailparts),
    append(Headparts, Tailparts, Total)
```



### 3.7 Accumulators

- Using an intermediate variable to store result while traversing the structure (like an `i` in `for` loop)

**With accumulators we will generally have `functor([], A, A).` in order to define the finish condition of accumulation**

#### Calculating length recursively (traditional approach)

```
listlen([],0).
listlen([H|T],N) :- listlen(T,N1),N is N1+1.
```

#### Calculating length using an accumulator

```
lenacc([], A, A).
lenacc([H|T], A, N) :- A1 is A + 1, lenacc(T, A1, N)
```

##### Notes

- All N's share. So when its value is changed all parent shared versions will be changed too

#### Relation between both approaches

```
listlen(L, N) :- lenacc(L, 0, N). /* we start from 0 and we increment */
```



#### Using accumulators to optimize rules and facts

##### bikes example using accumulators

- `partsacc(X,A,P)` : means that the parts of object X, when added to the list A, give the list P.
- `A` : accumulator that represents t**he list of (basic) parts that have been found so far.**

```
% partsof(X, P) :- partsacc(X, [], P).

partsacc(X, A, [X|A]) :- basicpart(X).
partsacc(X, A, P) :- 
	assembly(X, Subparts),
	partsacclist(Subparts, A, P).

partsacclist([], A, A).
partsacclist([P|Tail], A, Total) :-
	partsacc(P, A,Hp),
	partsacclist(Tail, Hp, Total).
```

### 3.8 Difference Structures

- **With accumulators**, we use two arguments to organize the building of some output structure. One is for “the result so far” and one is for the “final result”. 
- **With difference lists**, we also use two arguments, but with a different interpretation. The first argument is for the “final result”, and the second argument is for a “hole in the final result where further information can be put”. 

> get back to this

## Chapter 4 : Backtracking and the “Cut”

1. An attempt can be made to satisfy a goal. When we satisfy a goal, we search the database from the top. Two things can happen:
   1. A unifying fact (or rule head) can be found. In this case, we say the goal has been matched. We mark the place in the database, and instantiate any previously uninstantiated variables that have unified. If we matched against a rule, we shall first have to attempt to satisfy the sub goals introduced by the rule. If the goal succeeds, we then attempt to satisfy the next goal. In our diagrams, this is the goal in the next box below the arrow. If the original goal appears in a conjunction, this will be the goal to its right in the program.
   2.  No unifying fact (or rule head) can be found. In this case, we say the goal has failed. We then attempt to re-satisfy the goal in the box above the arrowhead. If the original goal appears in a conjunction, then this will be the goal on its left in the program.
2. We can attempt to re-satisfy a goal. First of all, we attempt to re-satisfy each of the `subgoals` in turn, the arrow retreating up the page. If no `subgoal` can be re-satisfied in a suitable way, we attempt to find an alternative clause for the goal itself. In this case, we must make uninstantiated any variables that became instantiated when the previous clause was chosen. This is what we mean by **“undoing”** all the work previously done by this goal. Next, we resume searching the database, but we begin the search from where the goal’s place-marker was previously put. As before, this new “backtracked” goal may either succeed or fail, and either step (1) or (2) above would occur.

### 4.1 Generating Multiple Solutions

The simplest way a set of facts can allow multiple solutions to a question is when there are several facts that will match against the question.

#### Example 1 :

##### Input 

```
possible_pair(X, Y) :- boy(X), girl(Y).
boy(john).
boy(marmaduke).
boy(bertram).
boy(charles).
girl(griselda).
girl(ermintrude).
girl(brunhilde).
```

##### Output : 

```
?- possible_pair(X, Y).
X = john, Y = griselda ;
X = john, Y = ermintrude ;
X = john, Y = brunhilde ;
X = marmaduke, Y = griselda ;
X = marmaduke, Y = ermintrude ;
X = marmaduke, Y = brunhilde ;
X = bertram, Y = griselda ;
X = bertram, Y = ermintrude ;
X = bertram, Y = brunhilde ;
X = charles, Y = griselda ;
X = charles, Y = ermintrude ;
X = charles, Y = brunhilde
```



#### Example 2 : membership 

```
member(X, [X|_]).
member(X, [_|Y]) :- member(X, Y).
```

```
?- member(a, [a,b,r,a,c,a,d,a,b,r,a]). /* will succeed 5 times */
```

- To make it succeed only once we use the **Cut**

### 4.2 The “Cut”

- The “cut” allows you to tell Prolog which previous choices it need not consider again when it backtracks though the chain of satisfied goals. There are **two reasons** why it may be important to do this:
  - Your program will **operate faster** because it will not waste time attempting to satisfy goals that you can tell beforehand will never contribute to a solution;
  - Your program may occupy **less of the computer’s memory space** because more economical use of memory can be made if backtracking points do not have to be recorded for later examination





Example : 

```
facility(Pers, Fac) :-
    book_overdue(Pers, Book),
    !,
    basic_facility(Fac)
facility(Pers, Fac) :- general_facility(Fac).
basic_facility(reference).
basic_facility(enquiries).
additional_facility(borrowing).
additional_facility(inter_library_loan).
general_facility(X) :- basic_facility(X).
general_facility(X) :- additional_facility(X).

client(’A. Jones’).
client(’W. Metesk’)
book_overdue(’C. Watzer’, book10089).
book_overdue(’A. Jones’, book29907)
```





- When the cut is encountered, it “cuts” the flow of satisfaction line so that if it is forced to retreat beyond this point it will have to take a short cut (go bac to facility , and can never satisfy the same rule again while backtracking)

- In summary, the effect of the cut in this example is to say: 

> If a client is found to have an overdue book, then only allow the client the basic facilities of the library. Don’t bother going through all the client’s overdue books, and don’t consider any other rule about facilities

- In this example, the cut committed the system to all the decisions made from it back to the facility goal. This is called the **parent goal** of the cut goal

> **When a cut is encountered as a goal, the system thereupon becomes committed to all choices made since the parent goal was invoked. All other alternatives are discarded. Hence an attempt to re-satisfy any goal between the parent goal and the cut goal will fail.**

- In other words, only one alternative, if it exists, will be taken in consideration, if something fails afterward and we backtrack to the cut , we get all the way up to the parent goal of the rule that introduced the cut. **if the parent goal is a root goal, the program will stop right there, otherwise will `cut` to the goal that introduced this parent goal and searches for other alternatives if they exist (always go up two levels)** 

### 4.3 Common Uses of the Cut

- We can divide the common uses of “cut” into three main areas:
  - The first concerns places where we want to tell the Prolog system that it has found the right rule for a particular goal. Here, the cut says, “if you get this far, you have picked the correct rule for this goal.”
  - The second concerns places where we want to tell the Prolog system to fail a particular goal immediately without trying for alternative solutions. Here, we use the cut in conjunction with the fail predicate to say, “if you get to here, you should stop trying to satisfy this goal.”
  - The third concerns places where we want to terminate the generation of alternative solutions through backtracking. Here, the cut says, “if you get to here, you have found the only solution to this problem, and there is no point in ever looking for alternatives.”



#### 4.3.1 Confirming the Choice of a Rule

```
sum_to(1, 1) :- !.
sum_to(N, Res) :-
    N1 isN-1,
    sum_to(N1, Res1),
    Res is Res1 + N.	
```

- If Prolog ever backtracks and comes to reconsider the choice of rule when applied to the number 1, it will find that the second rule is applicable. 
- As far as it can see, both rules provide alternatives for the goal sum_to(1, X). We must tell it that on no account is the second rule ever to be tried if the number is 1. 
- One way of doing this is to put a cut in the first rule (as shown). **This tells Prolog that, once it has got this far in the first rule, it must never remake the decision about which rule to use for the sum_to goal. It will only get this far if the number is in fact 1.**

Example 2 : 

```
go :- sum_to(1, X), foo(apples).
?- go.
```

- the goal foo(apples) fails, then at the point of failure we will jump past  sum_to(1,X), because both its goals cannot be satisfied (because of the cut inside), then it will backtrack past that point and will try to find another definition for { `go`

#### `\+` Predicate : 

- Predicate `\+` is defined in such a way that the goal `\+X` succeeds only if X, when seen as a Prolog goal, fails. So `\+X` means that “X is not satisfiable as a Prolog goal”

- Can be used to replace cut 



#### 4.3.2 The “cut-fail” Combination

- the cut is used in conjunction with the built-in fail predicate. This is another built-in predicate, like `\+`. It has no arguments, which means that the success of the goal fail does not depend on what any variables stand for. Indeed, fail is defined in such a way that as a goal it always fails and causes backtracking to take place. 
- This is just like what happens if we try to satisfy a goal for a predicate with no facts or rules. When fail is encountered after a cut, the normal backtracking behavior will be altered by the effect of the cut. In fact, the particular combination “cut-fail” turns out to be quite useful in practice.

Example : 

- If we have a foreigner then we should fail and stop searching for other alternatives 

```
average_taxpayer(X) :- foreigner(X), !, fail.
average_taxpayer(X) :-
    spouse(X, Y),
    gross_income(Y, Inc),
    Inc > 3000,
    !, fail.
average_taxpayer(X) :-
    gross_income(X, Inc),
    2000 < Inc, 20000 > Inc.
gross_income(X, Y) :-
    receives_pension(X, P),
    P < 5000,
    !, fail.
gross_income(X, Y) :-
    gross_salary(X, Z),
    investment_income(X, W),
    Y is Z + W.
investment_income(X, Y) :- ...
```



- This is used to avoid checking for foreigner(X) in each of the rules.

#### 4.3.3 Terminating a “generate and test”

- Very often a program will have parts that conform to the following general model. There will be a sequence of goals that can succeed in many ways, and which generates many possible solutions on backtracking. 
- After this, there are goals that check whether a solution generated is acceptable for some purpose. If these goals fail, backtracking will lead to another solution being proposed. This will be tested for appropriateness, and so on. 
- This process will stop when either an acceptable solution is generated (success), or when no more solutions can be found (failure)
- We can call the goals that are yielding all the alternatives the “generator” and those that check whether a solution is acceptable the “tester”. 

##### Example : Tic Tac Toe

- line(B,X,Y,Z) : instantiates the arguments X,Y,Z to the three squares that make up a line in board B:

```
line(b(X,Y,Z,_,_,_,_,_,_), X, Y, Z).
line(b(_,_,_,X,Y,Z,_,_,_), X, Y, Z).
line(b(_,_,_,_,_,_,X,Y,Z), X, Y, Z).
line(b(X,_,_,Y,_,_,Z,_,_), X, Y, Z).
line(b(_,X,_,_,Y,_,_,Z,_), X, Y, Z).
line(b(_,_,X,_,_,Y,_,_,Z), X, Y, Z).
line(b(X,_,_,_,Y,_,_,_,Z), X, Y, Z).
line(b(_,_,X,_,Y,_,Z,_,_), X, Y, Z).
```

```
forced_move(Board) :-
    line(Board, X, Y, Z),
    threatening(X, Y, Z),
    !.
```

```
threatening(e, x, x).
threatening(x, e, x).
threatening(x, x, e).
```



> “when I look for forced moves, it is only the first solution that is important.”

### 4.4 Problems with the Cut

- For, whereas a cut when a rule is used one way can be harmless or even beneficial, the very same cut can cause strange behavior if the rule is suddenly used in another way

Example : 

```
?- append(X, Y, [a,b,c]). 
```



- This goal will match the head of the first rule, giving: 
  - `X=[], Y=[a,b,c]` 
- but now the cut is encountered. This will freeze all the choices we have made, and so if we ask for another solution, the answer will be `no` even though there actually are other solutions to the question.

> If you introduce cuts to obtain correct behavior when the goals are of one form, there is no guarantee that anything sensible will happen if goals of another form start appearing.

- It follows that it is only possible to use the cut reliably if you have a clear policy about how your rules are going to be used. If you change this policy, all the uses of cut must be reviewed.

## Chapter 7 : More Example Programs

### 7.1 A Sorted Tree Dictionary

#### Introductory example 

```
winnings(abaris, 582).
winnings(careful, 17).
winnings(jingling_silver, 300).
winnings(maloja, 356).
```

- searching `winnings(maloja, X)` will have to look from top to bottom ( **not efficient** ) , one way to solved this is using a **sorted tree**.

#### What is a Sorted tree ?

- A sorted tree consists of some structures called nodes, where there is one node for each entry in the dictionary. Each node has **four** components.
- One of these components, called the **key**, is the one whose name determines its place in the dictionary (the name of the horse in our example). The **other item** is used to store any other information about the object involved (the winnings in our example).
-  In addition, each node contains a **tail** (like the tail of a list) to a node containing a key whose name is alphabetically less than the name of the key in the node itself. Furthermore, the node contains **another tail**, to a node whose name is alphabetically greater than the key in the node.



```
% THIS NEEDS TO BE GIVEN IN PARAMETER : 
% LIKE lookup(H,w(....),G).
% OTHERWISE, a new w will be created instead
%w(massinga,858,w(braemar,385,w(adela,588,_,_),_),w(panorama,158,w(nettleweed,579,_,_),_)).

lookup(H, w(H,G,_,_), G1) :-!, G=G1.
lookup(H, w(H1,_,Before,_), G) :-H @< H1,lookup(H, Before, G).
lookup(H, w(H1,_,_,After), G) :-H @> H1,lookup(H, After, G).
```



- If we do `lookup(abaris, X, 582), lookup(maloja, X, 356).`
  1. X will be instantiated as a `w(abaris,582,_,_)`
  2. first clause won't unify (because x , is instantiated), so one of the other 2 clauses will be called , and then `after` or `before` will be instantiated (in this case after because m>a)



### 7.2 Searching a Maze



## Chapter 10 : The Relation of Prolog to Logic

