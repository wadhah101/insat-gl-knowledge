# Complexity Theory

## 1. Introduction

Complexity Theory is a sub-field of computer science in which we will estimate algorithm costs  mathematically and independently from the underlying hardware



## 2. Model of computation

### 2.1 Definition

To calculate an algorithm cost, we need a model of computation $\mathcal{M}$.

A model of computation gives what are the instructions possible in our algorithms, and what are their cost.

By default we will use the **Random Access Machine** model in which we will pose the following assumptions:

- Memory Access (read/write) is done on constant time.
- Each arithmetic instruction can be executed no more than a constant time for standard types.
- Each Bit-wise Instruction can be executed no more than a constant time for standard types.
- Each Boolean Test can be executed no more than a constant time for standard types.

Here by standard types, we mean Integers with no more than $m_{\text{integer}}=64$  bits, and Floating point types with no more than $m_{\text{Float}}=128$ bits  

### 2.2 Algorithm Cost

Using the model $\mathcal{M}$, any algorithm can be decomposed into one of the elementary instructions described above.

To simplify the analysis, we can require that the cost of each  elementary instruction is $1$

### 2.3 Example





## 3. Big $\mathcal{O}$-Notation

### 3.1 Mathematical Definition

*This is not a general definition, but for all practical purposes, it will work well in competitive programming setting.*

Let $f,g\in\mathscr{F}(\mathbb{R}_+,\mathbb{R}_+)$ be two real valued functions with positive values.

By definition, we say that $f$ is asymptotically bounded by $g$ if:
$$
\exists K \in\mathbb{R}_+,R\in\mathbb{R}_+ /\quad \forall x>R, \quad  f(x) \le Kg(x)
$$
If $g$ is eventually strictly positive, this is equivalent to:
$$
\exists K \in\mathbb{R}_+^*,R\in\mathbb{R}_+ / \quad \forall x > R, \quad \frac{f(x)}{g(x)} \le K
$$
We say that $f$ is eventually bounded from above by some constant multiple of $g$, or roughly speaking $f$ is a big $\mathcal{O}$ of $g$, and we note it by:
$$
f = \mathcal{O}(g)
$$

### 3.2 Properties

| Name           | Equation                                                     | Utility                   |
| -------------- | ------------------------------------------------------------ | ------------------------- |
| Reflexive      | $f=\mathcal{O}(f)$                                           | Generally not useful      |
| Transitive     | $f=\mathcal{O}(g) \ \text{and} \ g=\mathcal{O}(h) \implies f=\mathcal{O}(h)$ | Get an easier upper bound |
| Sum            | $$ f_1+f_2=\mathcal{O}(\max(f_1,f_2))$$                      | Get an easier upper bound |
| Scaling        | $f=\mathcal{O}(g) \implies f=\mathcal{O}(k\cdot g) \quad \forall k\in\mathbb{R}_+^*$ | Remove constants          |
| Product        | $\begin{cases} f_1=\mathcal{O}(g_1) \\ f_2=\mathcal{O}(g_2)\end{cases} \implies f_1f_2=\mathcal{O}(g_1g_2)$ | Simplify products         |
| Cumulative Sum | $f \ \text{increasing} \implies \sum_{i=1}^nf(i)=\mathcal{O}\left(\int_{1}^{n+1} f(x)dx\right)$ |                           |



## 4. Big $\Omega$-Notation

### 4.1 Mathematical Definition

*This is not a general definition, but for all practical purposes, it will work well in competitive programming setting.*

Let $f,g\in\mathscr{F}(\mathbb{R}_+,\mathbb{R}_+)$ be two real valued functions with positive values.

By definition, we say that $f$ is asymptotically bounded from below by $g$ if:
$$
\exists K \in\mathbb{R}_+,R\in\mathbb{R}_+ /\quad \forall x>R, \quad  f(x) \ge Kg(x)
$$
If $g$ is eventually strictly positive, this is equivalent to:
$$
\exists K \in\mathbb{R}_+^*,R\in\mathbb{R}_+ / \quad \forall x > R, \quad \frac{f(x)}{g(x)} \ge K
$$
We say that $f$ is eventually bounded from below by some constant multiple of $g$, or roughly speaking $f$ is a big $\mathcal{O}$ of $g$, and we note it by:
$$
f = \Omega(g)
$$

### 3.3 Properties

| Name           | Equation                                                     | Utility                   |
| -------------- | ------------------------------------------------------------ | ------------------------- |
| Reflexive      | $f=\Omega(f)$                                                | Generally not useful      |
| Transitive     | $f=\Omega(g) \ \text{and} \ g=\Omega(h) \implies f=\Omega(h)$ | Get an easier upper bound |
| Sum            | $f_1+f_2=\Omega(\min(f_1,f_2))$                              | Get an easier upper bound |
| Scaling        | $f=\Omega(g) \implies f=\Omega(k\cdot g) \quad \forall k\in\mathbb{R}_+^*$ | Remove constants          |
| Product        | $\begin{cases} f_1=\Omega(g_1) \\ f_2=\Omega(g_2)\end{cases} \implies f_1f_2=\Omega(g_1g_2)$ | Simplify products         |
| Cumulative Sum | $f \ \text{increasing} \implies \sum_{i=1}^nf(i)=\Omega\left(\int_{1}^{n} f(x)dx\right)$ |                           |
| Duality        | $f=\mathcal{O}(g) \iff g=\Omega(f)$                          |                           |



## 5. Big $\Theta$- Notation

### 5.1 Mathematical Definition

*This is not a general definition, but for all practical purposes, it will work well in competitive programming setting.*

Let $f,g\in\mathscr{F}(\mathbb{R}_+,\mathbb{R}_+)$ be two real valued functions with positive values.

By definition, we say that $f=\Theta(g)$  if $f=\mathcal{O}(g)$ and $f=\Omega(g)$



## 6. Examples

| Function                        | Big $\mathcal{O}$         | Big $\Omega$        | Big $\Theta$ |
| ------------------------------- | ------------------------- | ------------------- | ------------ |
| $f(n)=n^5+10n-50$               | $\mathcal{O}(n^5)$        | $\Omega(n^5)$       |              |
| $f(n)= n-\frac{1}{n}$           | $\mathcal{O}(n)$          | $\Omega(n)$         |              |
| $f(n)= e^n-n$                   | $\mathcal{O}(e^n)$        | $\Omega(e^n)$       |              |
| $f(n)=\sin n$                   | $\mathcal{O}(1)$          | $\Omega(1)$         |              |
| $f(n)=\exp(\sin^2 n^{10})+ n^2$ | $\mathcal{O}(n^2)$        | $\Omega(n^2)$       |              |
| $f(n)=\sum_{k=1}^n3^k$          | $\mathcal{O}(3^n)$        | $\Omega(3^n)$       |              |
| $f(n)=\exp(n^2(\sin n+2))$      | $\mathcal{O}(\exp(3n^2))$ | $\Omega(\exp(n^2))$ |              |

