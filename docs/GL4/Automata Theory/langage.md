# Finite Langage

## 1. Notations

We will denote by $\Sigma$ a finite set representing the alphabet.

## 2. Kronecker Constructions

### 2.1 Word

A *word*, or also called a *string*, is an element $u\in\Sigma^m$ for some $m\in\mathbb{N}$

$m$ is said to be the length of $u$, which is also denoted by $\lvert u \rvert$

We will denote by $u_1,\dots,u_m\in\Sigma $ the elements of $u$. For simplicity, we will simply write $u=u_1\dots u_m$

A character $a\in\Sigma$ is a word of length $1$

### 2.2 Set of Words

The set of words over $\Sigma$ is defined as:
$$
\Sigma^*=\bigcup_{n\in\mathbb{N}}\Sigma^n
$$
It is also called the Kleene star of $\Sigma$.

### 2.3 Empty string

The empty string $\varepsilon$ is the unique element of $\Sigma^0$.

It is also the unique string of length $0$

## 2.4 Concatenation Operator

#### 2.4.1 Definition

Let $u=u_1\dots u_n,v=v_1\dots v_m\in\Sigma^*$ be two strings of respective lengths $n$ and $m$.

The concatenation operator denoted by $uv$ or $u\cdot v$ is the string of length $n+m$ defined by:
$$
u\cdot v=u_1\dots u_nv_1\dots v_m
$$

#### 2.4.2 Properties

- $\Sigma ^*$ is closed with respect to concatenation
  $$
  \forall u,v\in \Sigma^*, \quad u\cdot v \in \Sigma^*
  $$
  

- Concatenation is associative: 
  $$
  \forall u,v,w\in\Sigma ^*,\quad (u\cdot v)\cdot w=u\cdot (v\cdot w)
  $$

- Concatenation is not commutative unless the alphabet $\Sigma$ has less than two characters
  $$
  \forall a,b\in\Sigma,\quad a\ne b\implies a\cdot b\ne b\cdot a
  $$

- The unique neutral element of concatenation is the empty string $\varepsilon$

- Formally speaking, $(\Sigma^*,\cdot)$ is a monoid

 

## 3. Formal Language

### 3.1 Definition

A formal Language $\mathcal{L}$ over $\Sigma^*$ is simply a subset of $\Sigma^*$

### 3.2 Example

Let $\Sigma=\{a,b\}$

The set $\mathcal{L}=\{a^nb^n,\quad n\in\mathbb{N}\}$ is a formal language

### 3.3 Concatenation

#### 3.3.1 Definition

Let $\mathcal{L}_1,\mathcal{L}_2$  be two formal languages over the same alphabet $\Sigma$.

The concatenation of the two languages is the language $\mathcal{L}=\mathcal{L}_1\cdot \mathcal{L}_2=\mathcal{L}_1\mathcal{L}_2$ defined by:
$$
\mathcal{L}=\left\{u\cdot v,\quad (u,v)\in\mathcal{L}_1\times \mathcal{L}_2\right\}
$$

#### 3.3.2 Properties

- $\mathscr{P}(\Sigma ^*)$ is closed with respect to concatenation
  $$
  \forall \mathcal{L}_1,\mathcal{L}_2\in\mathscr{P}(\Sigma^*), \quad \mathcal{L}_1\cdot \mathcal{L}_2 \in \mathscr{P}(\Sigma^*)
  $$
  

- Concatenation is associative: 
  $$
  \forall \mathcal{L}_1,\mathcal{L}_2,\mathcal{L}_3\in \mathscr{P}(\Sigma ^*),\quad (\mathcal{L}_1\cdot \mathcal{L}_2)\cdot \mathcal{L}_3=\mathcal{L}_1\cdot (\mathcal{L}_2\cdot \mathcal{L}_3)
  $$

- Concatenation is not commutative unless the alphabet $\Sigma$ has less than two characters
  $$
  \forall a,b\in\Sigma,\mathcal{L}_1=\{a\},\mathcal{L}_2=\{b\}\quad a\ne b\implies \mathcal{L}_1\cdot \mathcal{L}_2\ne \mathcal{L}_2\cdot \mathcal{L}_1
  $$

- The unique neutral element of concatenation is the empty language $\mathcal{L}_{\varepsilon}=\{\varepsilon\}$

- The empty set $\emptyset$ is an absorbant element with respect to concatenation:
  $$
  \forall \mathcal{L}\in\mathscr{P}(\Sigma^*),\quad \mathcal{L}\cdot \emptyset=\emptyset \cdot \mathcal{L}= \emptyset
  $$
  

- Formally speaking, $(\mathscr{P}(\Sigma^*),\cdot)$ is a monoid







### 3.4 Language Union

#### 3.4.1 Definition

The union of two languages $\mathcal{L}_1$ and $\mathcal{L}_2$ is the language denoted by $\mathcal{L}_1+\mathcal{L}_2$ defined by:
$$
\mathcal{L}_1+\mathcal{L}_2=\mathcal{L}_1\cup \mathcal{L}_2
$$

#### 3.4.2 Properties

- Union is associative and commutative

- $\emptyset$ is the neutral element of the union operator

- Union is distributive with respect to concatenation:
  $$
  \forall \mathcal{L}_1,\mathcal{L}_2,\mathcal{L}_3\in\mathscr{P}(\Sigma^*),\quad \mathcal{L}_1\cdot (\mathcal{L}_2 + \mathcal{L}_3)=\mathcal{L}_1 \cdot \mathcal{L}_2+ \mathcal{L}_1 \cdot \mathcal{L}_3 \\
  \forall \mathcal{L}_1,\mathcal{L}_2,\mathcal{L}_3\in\mathscr{P}(\Sigma^*),\quad (\mathcal{L}_1 + \mathcal{L}_2) \cdot \mathcal{L}_3=\mathcal{L}_1 \cdot \mathcal{L}_3+ \mathcal{L}_2 \cdot \mathcal{L}_3
  $$



### 3.4 Kleene Operators

#### 3.4.1 Kleene Star

For a language $\mathcal{L}$, the Kleene Star $\mathcal{L}^*$ is the smallest language which:

- Is a superset of $\mathcal{L}$
- Is closed under concatenation

It is defined by:
$$
\mathcal{L}^*=\bigcup_{n\in\mathbb{N}}\mathcal{L}^n=\sum_{n\in\mathbb{N}} \mathcal{L}^n
$$
With $\mathcal{L}^n$ defined recursively by:

- $\mathcal{L}^0=\{\varepsilon\}$
- $\forall n\in\mathbb{N}^*, \quad \mathcal{L}^n=\mathcal{L} \cdot \mathcal{L}^{n-1}$

#### 3.4.2 Kleene plus

It is defined by:
$$
\mathcal{L}^+=\sum_{n\in\mathbb{N}^*}\mathcal{L}^n
$$


## 4. Linear Language Equation

### 4.1 Definition 

A linear language equation is an equation of the form:
$$
\mathcal{L}=A\mathcal{L}+B
$$
Where $\mathcal{L}$ is the unknown language, and $A,B\in\mathscr{P}(\Sigma^*)$ are two languages

### 4.2 Solution

The smallest solution with respect to set inclusion, is the language:
$$
\mathcal{L}=A^*B
$$

### 4.3 Unicity

If $\varepsilon \notin A$, then the solution $A^*B$ is the unique solution