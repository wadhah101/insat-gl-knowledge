---
slug: /gl4/data-analysis/conjoint
---

# Conjoint Probability

## 1. Discrete Random Variables

### 1.1 Definition

Let $X, Y$ be two discrete Random Variables with finite co-domains.
Let $U=\{x_1,\dots,x_n\},V=\{y_1,\dots,y_m\}$ be the possible values of X and Y respectively
We define the random variable $Z=(X, Y)$ as a joint random variable defined by the law:
$$
\forall (x,y)\in U\times V,\quad \mathcal{P}(Z=(x,y))=\mathcal{P}(X=x \wedge Y=y)
$$

### 1.2 Matrix Form

We can express the joint probabilities compactly in the following form:
$$
M=\begin{pmatrix}
p_{1,1}&\dots&p_{1,m}\\
p_{2,1}&\dots&p_{2,m}\\
\vdots &\ddots&\vdots\\
p_{n,1}&\dots&p_{n,m}
\end{pmatrix}
$$
With $\forall i,\in\{1,\dots,n\},\forall j\in\{1,\dots,m\},\quad p_{i,j}=\mathcal{P}(X=x_i \wedge Y=y_j)$

If $X$ and $Y$ are independent, then:
$$
p_{i,j}=\mathcal{P}(X=x_i)\cdot \mathcal{P}(Y=y_j)
$$

### 1.3 Joint Distribution Matrix

Let $M$ be a matrix with positive entries.

$M$ is said to be a joint distribution matrix if its entries sum to one:
$$
\sum_{i,j}M_{i,j}=1
$$

### 1.4 Event Probability

Let $A\subseteq U\times V$

We have:
$$
\mathcal{P}((X,Y)\in A)=\sum_{(x,y)\in A}\mathcal{P}(X=x\wedge Y=y)
$$

### 1.5 Marginal Distribution

#### 1.5.1 Marginal Distribution of $X$

The marginal distribution of $X$ is the probability distribution of X determined
from $(X, Y)$
$$
\forall x\in U,\quad \mathcal{P}(X=x)=\sum_{y\in V}\mathcal{P}(X=x\wedge Y=y)
$$

#### 1.5.2 Marginal Distribution of $Y$

The marginal distribution of $Y$ is the probability distribution of X determined
from $(X, Y)$
$$
\forall x\in V,\quad \mathcal{P}(Y=y)=\sum_{x\in U}\mathcal{P}(X=x\wedge Y=y)
$$

### 1.6 Conditional Distribution

#### 1.6.1 Conditional Distribution of $X$ knowing $Y=y$

$$
\forall x\in U,\quad \mathcal{P}(X[Y=y]=x)=\mathcal{P}(X_{Y=y}=x)=\mathcal{P}(Y=y \mid X=x)=\frac{\mathcal{P}(X=x \wedge Y=y)}{\mathcal{P}(Y=y)}
$$

#### 1.6.2 Conditional Distribution of $Y$ knowing $X=x$

$$
\forall y\in V,\quad \mathcal{P}(Y[X=x]=y)=\mathcal{P}(Y_{X=x}=y)=\mathcal{P}(Y=y \mid X=x)=\frac{\mathcal{P}(X=x \wedge Y=y)}{\mathcal{P}(Y=y)}
$$

## 2. Continuous Real Random Variables

### 2.1 Definition

Let $X, Y$ be two continuous Random Variables with a joint probability density function $f_{X,Y}$.
We define the random variable $Z=(X, Y)$ as a joint random variable defined by the law:
$$
\forall (x,y)\in \mathbb{R}^2,\quad F_Z(Z \le (x,y))=\mathcal{P}(X \le x \wedge Y\le y)=\int_{-\infty}^x\int_{-\infty}^y f_{X,Y}(u,v)\space\text{dvdu}=\iint_{\mathopen]-\infty,x\mathclose]\times \mathopen]-\infty,y\mathclose]}f_{X,Y}(u)\space \text{du}
$$

### 2.2 Joint Distribution Function

A function $h\in\mathscr{L}^1(\mathbb{R})$ is said to be a joint distribution function if:

1. $h$ is positive: $h\ge 0$

2. The integral of $h$ is $1$:
$$
\lVert h \rVert_1=\iint_{\mathbb{R}^2}h(u)\text{du}=\int_{\mathbb{R}}\int_{\mathbb{R}}h(x,y)\space \text{dydx}=1
$$

### 2.4 Event Probability

Let $A\subseteq \mathcal{B}$

We have:
$$
\mathcal{P}((X,Y)\in A)=\iint_{A}h(u)\space \text{du}
$$

### 2.5 Marginal Distribution

#### 2.5.1 Marginal Distribution of $X$

The marginal distribution of $X$ is the probability distribution of $X$ determined
from $(X, Y)$
$$
\forall x\in \mathbb{R},\quad f_X(x)=\int_{y\in\mathbb{R}}f_{X,Y}(x,y)\text{dy}
$$

#### 2.5.2 Marginal Distribution of $Y$

The marginal distribution of $Y$ is the probability distribution of $Y$ determined
from $(X, Y)$
$$
\forall y\in \mathbb{R},\quad f_Y(y)=\int_{x\in\mathbb{R}}f_{X,Y}(x,y)\text{dx}
$$

### 2.6 Conditional Distribution

#### 2.6.1 Conditional Distribution of $X$ knowing $Y=y$

It is the conditional distribution of $X$ with the knowledge that $Y=y$, it is defined as:
$$
\forall x\in \mathbb{R},\quad f_{X[Y=y]}(x)=f_{X_{\mid Y=y}}(x)=\frac{f_{X,Y}(x,y)}{f_Y(y)}
$$

#### 2.6.2 Conditional Distribution of $Y$ knowing $X=x$

It is the conditional distribution of $Y$ with the knowledge that $X=x$, it is defined as:
$$
\forall y\in \mathbb{R},\quad f_{Y[X=x]}(x)=f_{Y_{\mid X=x}}(y)=\frac{f_{X,Y}(x,y)}{f_X(x)}
$$

## 3. Conditional Expectation

### 3.1 Definition

Let $X$ and $Y$ two random variables.

The conditional expectation of $Y$ given $X=x$, noted $\mathbb{E}[Y\mid X=x],$ is the expected value of $Y$ with the additional information that $X=x$. It is equal to:
$$
\forall x,\quad \mathbb{E}[Y\mid X=x]=\mathbb{E}[Y_{\mid X=x}]
$$

### 3.2 As a random variable

By introducing the function $\varphi$ defined as follow:
$$
\begin{align*}
\varphi:&\mathbb{R}\rightarrow \mathbb{R}\\
&x\rightarrow \mathbb{E}[Y\mid X=x]
\end{align*}
$$
We will define the conditional expectation of $Y$ given $X$, denoted by $\mathbb{E}[Y\mid X]$ as following:
$$
\mathbb{E}[Y\mid X]=\varphi(X)
$$

> To calculate its distribution, see [Function on a random variable](11-advanced.md#random-variable-function)

### 3.3 Law of Total Expectation

Let $Y,X$ two random variables.

We have the following:
$$
\mathbb{E}[Y]=\mathbb{E}\left[\mathbb{E}[Y|\mid X\right] =\mathbb{E}_X\left[\mathbb{E}_Y[Y\mid X]\right]
$$
To avoid confusion, we noted:

+ $\mathbb{E}_Y$ to emphasise that the expectation is calculated against $Y$
+ $\mathbb{E}_X$ to emphasise that the expectation is calculated against $X$

## 4. Conditional Variance

### 4.1 Definition

Let $X$ and $Y$ two random variables.

The conditional variance of $Y$ given $X=x$, noted $\mathbb{V}[Y\mid X=x],$ is the variance of $Y$ with the additional information that $X=x$. It is equal to:
$$
\forall x,\quad \mathbb{V}[Y\mid X=x]=\mathbb{V}[Y_{\mid X=x}]
$$

### 4.2 As a random variable

By introducing the function $\varphi$ defined as follow:
$$
\begin{align*}
\varphi:&\mathbb{R}\rightarrow \mathbb{R}\\
&x\rightarrow \mathbb{V}[Y\mid X=x]
\end{align*}
$$
We will define the conditional variance of $Y$ given $X$, denoted by $\mathbb{V}[Y\mid X]$ as following:
$$
\mathbb{V}[Y\mid X]=\varphi(X)
$$

> To calculate its distribution, see [Function on a random variable](11-advanced.md#random-variable-function)

### 3.3 Law of Total Variance

Let $Y,X$ two random variables.

We have the following:
$$
\mathbb{V}[Y]=\mathbb{V}\left[\mathbb{E}[Y\mid X]\right]+\mathbb{E}\left[\mathbb{V}[Y\mid X]\right] =\mathbb{V}_X\left[\mathbb{E}_Y[Y\mid X]\right]+\mathbb{E}_X\left[\mathbb{V}_Y[Y\mid X]\right]
$$
To avoid confusion, we noted:

+ $\mathbb{E}_Y,\mathbb{V}_Y$ to emphasise that the expectation and variance are calculated respectively against $Y$
+ $\mathbb{E}_X,\mathbb{V}_X$ to emphasise that the expectation and variance are calculated respectively against $X$
