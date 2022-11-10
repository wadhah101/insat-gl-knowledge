---
slug: /gl4/data-analysis/introduction
---

# Introduction

## 1 Probability Space

> The Formal Definition is found at [Probability Space](formalisation.md#probability-space)

### 1.1 Definition

A probability space is a triplet $\mathfrak{P}=\left(\Omega,\mathcal{F},\mu\right)$ with:

- $\Omega$ is the universe.
- $\mathcal{F}\subseteq \mathscr{P}(\Omega)$ is the set of all events.
- $\mu:\mathcal{F}\rightarrow [0,1]$ is a probability function that assigns a probability to each event.

We define the probability of an event $A\in\mathcal{F}$ as follow:
$$
\mathcal{P}(A)=\mu(A)
$$

### 1.2 Example: Dice Game {#dice-game}

You are playing a dice game with your friend, at each turn are throwing two dices; one at a time.

We will assume that both dices are fair, you want to calculate the probability that you get $i$ on the first dice and $j$ on the second dice for each $i,j\in\{1,2,3,4,5,6\}$

#### Solution

We will first create a mathematical model for this problem.

- Let $\Omega=\{1,2,3,4,5,6\}\times \{1,2,3,4,5,6\}$.
- Let $\mathcal{F}=\mathscr{P}(\Omega)=\{A / \quad A \subseteq \Omega\}$.
- Let $\mu:\mathcal{F}\rightarrow [0,1]$ defined simply by $\mu(A)=\frac{\lvert A \rvert}{\lvert \Omega \rvert }.$ The choice of such $\mu$ is justified as both dices are fair.

- Let $A_i$ be the event: $\texttt{The first dice has the value i}$.
- Let $B_j$ the event: $\texttt{The second dice has the value j}$.
- Let $C_{i,j}$ be the event: $\texttt{The first dice has the value i, and the second dice has the value j}$.

Mathematically, $C_{i,j}=A_i\cap B_j=\{(i,j)\},$ its probability is:
$$
\mathcal{P}(C_{i,j})=\frac{\lvert C_{i,j}\rvert}{\lvert \Omega \rvert}=\frac{1}{36}
$$

## 2. Random Variable

> The Formal Definition is found at [Random Variable](formalisation.md#random-variable)

### 2.1 Definition

A random variable is a function $X:\Omega\rightarrow S$.

In some sense, the probability that $X\in A$ from some $A\subseteq S$ is defined as:
$$
\mu(X^{-1}\left(A\right))
$$

### 2.2 Example: Dice Game 2

After throwing both dices, one of the following will happen:

- If the sum of the two dices is a prime number $p$, you will go forward by $p$

- Else, it is a composite number $n,$ you will go backward by $p$ where $p$ is the **biggest prime divisor** of $n$

Let $X$ be the random variable denoting the signed value of the steps that will be taken.

We will generate a table of values of possible sums each with its corresponding step:

|      | $1$                      | $2$                      | $3$                      | $4$                       | $5$                       | $6$                       |
| ---- | ------------------------ | ------------------------ | ------------------------ | ------------------------- | ------------------------- | ------------------------- |
| $1$  | Sum is $2$, Step is $2$  | Sum is $3$, Step is $3$  | Sum is $4$, Step is $-2$ | Sum is $5$, Step is $5$   | Sum is $6$, Step is $-3$  | Sum is $7$, Step is $7$   |
| $2$  | Sum is $3$, Step is $3$  | Sum is $4$, Step is $-2$ | Sum is $5$, Step is $5$  | Sum is $6$, Step is $-3$  | Sum is $7$, Step is $7$   | Sum is $8$, Step is $-2$  |
| $3$  | Sum is $4$, Step is $-2$ | Sum is $5$, Step is $5$  | Sum is $6$, Step is $-3$ | Sum is $7$, Step is $7$   | Sum is $8$, Step is $-2$  | Sum is $9$, Step is $-3$  |
| $4$  | Sum is $5$, Step is $5$  | Sum is $6$, Step is $-3$ | Sum is $7$, Step is $7$  | Sum is $8$, Step is $-2$  | Sum is $9$, Step is $-3$  | Sum is $10$, Step is $-5$ |
| $5$  | Sum is $6$, Step is $-3$ | Sum is $7$, Step is $7$  | Sum is $8$, Step is $-2$ | Sum is $9$, Step is $-3$  | Sum is $10$, Step is $-5$ | Sum is $11$, Step is $11$ |
| $6$  | Sum is $7$, Step is $7$  | Sum is $8$, Step is $-2$ | Sum is $9$, Step is $-3$ | Sum is $10$, Step is $-5$ | Sum is $11$, Step is $11$ | Sum is $12$, Step is $-3$ |

 We have:

- $X^{-1}(2)=\{(1,1)\}$
- $X^{-1}(3)=\{(1,2),(2,1)\}$
- $X^{-1}(5)=\{(1,4),(2,3),(3,2),(4,1)\}$
- $X^{-1}(7)=\{(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)\}$
- $X^{-1}(11)=\{(5,6),(6,5)\}$
- $X^{-1}(-2)=\{(1,3),(2,2),(3,1),(2,6),(3,5),(4,4),(5,3),(6,2)\}$
- $X^{-1}(-3)=\{(1,5),(2,4),(3,3),(4,2),(5,1),(3,6),(4,5),(5,4),(6,3),(6,6)\}$
- $X^{-1}(-5)=\{(4,6),(5,5),(6,4)\}$

Now we will build the table of probabilities of $X$

| Value | Probability                  |
| ----- | ---------------------------- |
| $-5$  | $\frac{3}{36}$               |
| $-3$  | $\frac{10}{36}=\frac{5}{18}$ |
| $-2$  | $\frac{8}{36}=\frac{2}{9}$   |
| $2$   | $\frac{1}{36}$               |
| $3$   | $\frac{2}{36}=\frac{1}{18}$  |
| $5$   | $\frac{4}{36}=\frac{1}{9}$   |
| $7$   | $\frac{6}{36}=\frac{1}{6}$   |
| $11$  | $\frac{2}{36}=\frac{1}{18}$  |

## 2. Expected Value

Let $X$ be a random variable following some distribution $\mathcal{D}.$

The expected value of $X$, denoted $\mathbb{E}[X]$, if it exists, defines in some sense what value at average we expect from $X$

### 2.1 Discrete Case

If $\mathcal{D}$ is a discrete distribution, then:
$$
\mathbb{E}[X]=\sum_{k\in S}k\mathcal{P}(X=k)
$$
With $S$ defined as the support of $X$

### 2.2 Continuous Case

If $\mathcal{D}$ is a continuous distribution, then:
$$
\mathbb{E}[X]=\int_{S}xf(x)\space \text{dx}
$$

### 2.3 Linearity

#### 2.3.1 Simple Case

- Let $a,b\in\mathbb{R}$
- Let $X,Y$ two random variables

The expected value is linear:
$$
\mathbb{E}[aX+bY]=a\mathbb{E}[X]+b\mathbb{E}[Y]
$$

#### 2.3.2 Generalisation

- Let $n\in\mathbb{N}$
- Let $a_1,\dots,a_n\in\mathbb{R}$
- Let $X_1,\dots,X_n$ be $n$ random variables
- Let $Y=\sum_{k=1}^n a_kX_k$

We have:
$$
\mathbb{E}[Y]=\mathbb{E}\left[\sum_{k=1}^na_kX_k\right]=\sum_{k=1}^na_k\mathbb{E}[X_k]
$$

### 2.4 Example: Dice Game 3

We want to calculate the expected number of steps taken on each step:
$$
\begin{align*}
\mathbb{E}[X]&=\sum_{k\in X(\Omega)}k\mathcal{P}(X=k) \\
&=\frac{-5\cdot 3-3\cdot 10 -2\cdot 8 +2 \cdot 1+3 \cdot 2+ 5\cdot 4+7\cdot 6+11\cdot 2}{36}\\
&=\frac{31}{36}\approx0.861
\end{align*}
$$

## 3. Variance

### 3.1 Definition

Let $X$ be a random variable following some distribution $\mathcal{D}.$

The variance of $X$, denoted $\mathbb{V}[X]$, if it exists, defines in some sense how far is $X$ from its expected value, on average.

It is defined as follow:
$$
\mathbb{V}[X]=\mathbb{E}\left[\left(X-\mathbb{E}[X]\right)^2\right]=\mathbb{E}[X^2]-\mathbb{E}[X]^2
$$

### 3.1 Discrete Case

If $\mathcal{D}$ is a discrete distribution, then:
$$
\mathbb{V}[X]=\sum_{k\in S}(k-\mathbb{E}[X])^2\mathcal{P}(X=k)
$$
With $S$ defined as the support of $X$

### 3.2 Continuous Case

If $\mathcal{D}$ is a continuous distribution, then:
$$
\mathbb{E}[X]=\int_{S}(x-\mathbb{E}[X])^2f(x)\space \text{dx}
$$

### 3.3 Variance of sum of independent random variables

#### 3.3.1 Simple Case

- Let $a,b\in\mathbb{R}$.
- Let $X,Y$ two independent random variables.

The expected value is linear:
$$
\mathbb{V}[aX+bY]=a^2\mathbb{V}[X]+b^2\mathbb{V}[Y]
$$

#### 3.3.2 Generalisation

- Let $n\in\mathbb{N}$
- Let $a_1,\dots,a_n\in\mathbb{R}$
- Let $X_1,\dots,X_n$ be $n$ independent random variables
- Let $Y=\sum_{k=1}^n a_kX_k$

We have:
$$
\mathbb{V}[Y]=\mathbb{V}\left[\sum_{k=1}^na_kX_k\right]=\sum_{k=1}^na_k^2\mathbb{V}[X_k]
$$

### 3.4 Example: Dice Game 4

$$
\begin{align*}
\mathbb{E}[X^2]&=\sum_{k\in X(\Omega)} k^2\mathcal{P}(X=k)\\
&=\frac{25\cdot 3 + 9 \cdot 10 + 4 \cdot 8+4\cdot 1 + 9 \cdot 2 + 25 \cdot 4 + 49 \cdot 6 + 121 \cdot 2}{36}\\
&=\frac{855}{36}\\
&=\frac{95}{4}\\
\implies \mathbb{V}[X]&=\mathbb{E}[X^2]-\mathbb{E}[X]^2\\
&=\frac{95}{4}-\frac{31^2}{36^2}\\
&=\frac{29819}{1296}\approx 23.008
\end{align*}
$$

## 4. Co-variance

### 4.1 Definition

Let $X,Y$ be two random variables.

The co-variance of $X$ and $Y$, denoted $\text{Cov}[X,Y]$, if it exists, defines in some sense how $X$ and $Y$ varies together.

It is defined as follow:
$$
\text{Cov}[X,Y]=\mathbb{E}\left[\left(X-\mathbb{E}[X]\right)\cdot \left(Y-\mathbb{E}[Y]\right)\right]=\mathbb{E}[XY]-\mathbb{E}[X]\mathbb{E}[Y]
$$

### 4.1 Discrete Case

If $\mathcal{D}$ is a discrete distribution, then:
$$
\text{Cov}[X,Y]=\sum_{u\in S_1}\sum_{v\in S_2}(u-\mathbb{E}[X])(v-\mathbb{E}[Y])\mathcal{P}(X=u\wedge Y=v)
$$
With $S$ defined as the support of $X$

### 4.2 Continuous Case

If $\mathcal{D}$ is a continuous distribution, then:
$$
\text{Cov}[X,Y]=\iint_{S_1\times S_2}(x-\mathbb{E}[X])(y-\mathbb{E}[Y])f(x,y)\space \text{dydx}
$$

### 4.3 Bi-linearity

#### 4.3.1 Simple Case

- Let $a,b\in\mathbb{R}$
- Let $X,Y,Z$ three random variables

The co-variance is left-linear:
$$
\text{Cov}[aX+bY,Z]=a\text{Cov}[X,Z]+b\text{Cov}[Y,Z]
$$

The co-variance is right-linear:
$$
\text{Cov}[X,aY+bZ]=a\text{Cov}[X,Y]+b\text{Cov}[X,Z]
$$

#### 4.3.2 Generalisation

- Let $n,m\in\mathbb{N}$
- Let $a_1,\dots,a_n,b_1,\dots,b_m\in\mathbb{R}$
- Let $X_1,\dots,X_n,Y_1,\dots,Y_m$ be $n+m$ random variables

We have:
$$
\text{Cov}\left[\sum_{i=1}^na_iX_i,\sum_{j=1}^mb_jY_j\right]=\sum_{i=1}^n\sum_{j=1}^ma_ib_j\text{Cov}\left[X_i,Y_j\right]
$$

#### 4.3.4 Symmetry

In fact, $\text{Cov}$ is also symmetric as:
$$
\text{Cov}[X,Y]=\text{Cov}[Y,X]
$$

#### 4.3.5 Positive semi-definite

More than that, $\text{Cov}$ is positive semi-definite as:
$$
\text{Cov}[X,X]=\mathbb{V}[X]\ge 0
$$

#### 4.3.6 Orthogonality between independent random variables

Let $X,Y$ two independent random variables. We have:
$$
\text{Cov}[X,Y]=0
$$
*The converse does not generally hold*

### 4.4 Relation to Variance

#### 4.4.1 Variance as a Co-variance

Let $X$ a random variable.

The variance of $X$ is in fact equal to:
$$
\mathbb{V}[X]=\text{Cov}[X,X]
$$

#### 4.4.2 Variance of a sum of random variables

- Let $n\in\mathbb{N}$
- Let $a_1,\dots,a_n\in\mathbb{R}$
- Let $X_1,\dots,X_n$ be $n$ random variables (not necessarily independent)
- Let $Y=\sum_{k=1}^n a_kX_k$

The variance of $Y$ is:
$$
\begin{align*}
\mathbb{V}[Y]&=\text{Cov}\left[\sum_{i=1}^na_iX_i,\sum_{j=1}^na_jX_j\right]\\
&=\sum_{i=1}^n\sum_{j=1}^na_ia_j\text{Cov}\left[X_i,X_j\right]
\\
&=\sum_{i=1}^na_i^2\text{Cov}[X_i,X_i]+\sum_{1\le i\ne j\le n}a_ia_j\text{Cov}[X_i,X_j]\\
&=\sum_{i=1}^na_i^2\mathbb{V}[X_i]+2\sum_{1\le i < j \le n}a_ia_j\text{Cov}[X_i,X_j]
\end{align*}
$$
