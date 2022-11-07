# Probability Formalisation

## 1. Importance

This section will give how probability is formally defined.

It is not required at all, but it gives insight when a probability question makes sense. 

Also it gives how to construct some random variables.

**Be aware that this an advanced topic** :warning::warning::warning:.



### 1.1 Examples that have a meaning

- *Choose $X$ uniformly from $[0,1]$* 

- *Choose $X$ uniformly from $\{0,1,2,3\}$*

- *Let $X\sim \mathcal{U}(0,1),$ what is the probability that $X\in \mathbb{Q}$?* 

- Let $\bar{\mathbb{Q}}=\{\alpha\in\mathbb{R}/\quad \exists P\in\mathbb{Q}[x]/\quad P(\alpha)=0\}$ The set of all real numbers that are a solution to some polynomial function with rational coefficients. The statement below is a valid statement:

  *Let $X\sim \mathcal{N}(0,1)$, what is the probability that $X\in \bar{\mathbb{Q}}$?*



### 1.2 Examples that does not have a meaning

- *Choose $X$ uniformly from $\mathbb{N}$*

- *Choose $X$ uniformly from $\mathbb{R}$*

- Let $\mathcal{V}\subseteq \mathbb{R}$ a set such that $\forall x\in\mathbb{R},\exists!y\in\mathcal{V}/\quad x-y \in\mathbb{Q}\cap[0,1].$ Such set is called a [Vitali set](https://en.wikipedia.org/wiki/Vitali_set). The statement below does not have a meaning

  *Let $X\sim \mathcal{U}(0,1)$, what is the probability that $X\in\mathcal{V}$?*



### 1.3. Road Map

To formally define a probability, we need:

- A universe $\Omega$ 

- set $\mathcal{F}$ of events.
- Some probability function $\mu$ that assigns a probability $p\in[0,1]$ for every event $A\in\mathcal{F}.$

Now we will start by defining suitable set of events $\mathcal{F}.$

Then we will define some consistent probability functions $\mu$

Finally, we will formally define a random variable.



## 2. Sigma Algebra {#sigma-algebra}

### 2.1 Definition

Let $S$ be some set, and $\mathscr{P}(S)$ be its power set. 

A subset $\Sigma \subseteq \mathscr{P}(S)$ is called a $\sigma$-algebra if:

1. $S\in \Sigma$

2. $\Sigma$ is closed under set complementation:
   $$
   \forall A\in \Sigma ,\quad \bar{A}= S\setminus A \in \Sigma
   $$
   
3. $\Sigma$  is closed under countable union:
   $$
   \forall (A_n)_{n\in\mathbb{N}}\in\Sigma^{\mathbb{N}},\quad \bigcup_{n\in\mathbb{N}}A_n \in \Sigma
   $$

### 2.2 Example

For any set $S,$ $\mathscr{P}(S)$ and $\{\empty,S\}$ are both a sigma algebra

### 2.3 Importance

A $\sigma$-algebra gives 





## 3. Measurable Space {#measurable-space}



### 3.1 Definition

Let $S$ be some set and $\mathcal{F}$ be a [$\sigma$-algebra](#sigma-algebra) of $S$

The couple $(S,\mathcal{F})$ is called a **measurable space**



### 3.2 Significance

A measurable space is on some sense a space on which it is possible to define a function defining the "size" of any set $A\in\mathcal{F}$

This function will have some constraints that will be formalised next.



### 3.3 Examples

For any set $S,$ $(S,\mathscr{P}(S))$ is a measurable set



### 3.4 Measurable Set

A set $U\in\mathscr{P}(S)$ is said to be measurable if $U\in \mathcal{F}$

Any set $U\notin \mathcal{F}$ is called a non-measurable set.



## 4. Measure Space {#measure-space}



### 4.1 Definition

A **measure space** $(S,\mathcal{F},\mu)$ is a [*measurable space*](#measurable-space) $(S,\mathcal{F})$ with an additional *real valued function* $\mu:\mathcal{F}\rightarrow \bar{\mathbb{R}}$ called measure satisfying the following conditions:

1. The measure of the empty set is *null*: $\mu(\emptyset)=0$

2. The measure function is *non-negative*: $\forall A\in \mathcal{F}, \quad \mu(A)\ge 0$

3. The measure function is *countably additive* with respect to *disjoint sets*:
   $$
   \forall (A_n)\in \mathcal{F}^\mathbb{N} \space \text{pairwise disjoint}, \quad \mu\left(\bigcup_{n\in\mathbb{N}} A_n\right)=\sum_{n\in\mathbb{N}}\mu(A_n)
   $$
   

### 4.2 Significance

A measure space is a set $S$ with a function $\mu$ giving the size of measurable subsets $A\subseteq S$



### 4.3 Examples



#### 4.3.1 Finite Set

- Let $S$ be a finite set of size $n\in\mathbb{N}$
- Let $\mathcal{M}=(S,\mathscr{P}(S))$ be a measurable space

We will define $\mu$ as follow:
$$
\forall A\subseteq S, \quad \mu(A)=\vert A \rvert
$$
We can verify that $(\mathcal{M},\mu)$ is a measure space.

Also, with $p=\frac{\mu}{\lvert S \rvert}$, $(\mathcal{M},p)$ is also a measure space.



#### 4.3.2 Natural numbers

We will set $\mathcal{F}=\mathscr{P}(\mathbb{N})$

We will define $\mu$ as follow:
$$
\forall A\subseteq \mathbb{N} \quad \text{finite}, \quad \mu(A)=\vert A \rvert
$$
We can verify that $(\mathcal{M},\mu)$ is a measure space.

As an example, $\mu(\{1,2,8\})=3.$



We can also define another measure $\lambda$ as:
$$
\forall A\subseteq \mathbb{N}, \quad \mu(A)=\sum_{k\in A}2^{-k}
$$
As an example, $\lambda(\{0,2\})=1+\frac{1}{4}=1.25$

Also, $\lambda(\mathbb{N})=\sum_{n\in\mathbb{N}}2^{-n}=2$



#### 4.3.2 Real Line

$\mathbb{R}$ can be augmented to a measure space $(\mathbb{R},\mathcal{B},\mu)$ with $\mu$ defined as:
$$
\forall a\le b,\quad \mu(]a,b[)=b-a
$$
In fact:

- $\mu$ gives the length of a set $A\in\mathcal{B}$
- $\mathcal{B}$ is called a [Borel set](https://en.wikipedia.org/wiki/Borel_set), and its construction is a too advanced.
- $\mathcal{B}\neq \mathscr{P}(\mathbb{R}),$ as it happens that the [Vitali set](https://en.wikipedia.org/wiki/Vitali_set) $\mathcal{V}$ defined at $1.2$ is not a Borel set. 



### 4.3 Measurable Function

- Let $(S,\mathcal{F},\mu)$ be a measure space
- Let $(E,\mathcal{E})$ be a measurable space

A function $f:S\rightarrow E$ is said to be measurable if the pre-image of any measurable set is measurable:
$$
\forall U\in \mathcal{E},\quad f^{-1}(U)\in \mathcal{F}
$$




## 5. Probability Space

### 5.1 Definition

A probability space is a [*measure space*](#measure-space) $(\Omega,\mathcal{F},\mu)$ with the additional constraint that $\mu(\Omega)=1$

### 5.2 Terminology



### 5.3 Examples



#### 5.3.1 Finite Sets

The measure space $(\mathcal{M},p)$ from the example $4.3.1$ is a probability space

#### 5.3.2 Natural numbers

The measure $\lambda$ from $3.3.2$ is not a probability measure, but it induces a probability measure $\phi$ defined by:
$$
\forall A\subseteq \mathbb{N},\quad \phi(A)=\frac{\lambda(A)}{\lambda(\mathbb{N})}=\frac{1}{2}\sum_{k\in A}2^{-k}
$$
The measure $\mu$ from $3.3.2$ cannot induce a probability space like $\lambda$ as $\mu(\mathbb{N})=+\infty$



#### 5.3.3 Real numbers

Let $(\mathbb{R},\mathcal{B},\mu)$ the measure space defined in $4.3.3$

We will define another measure $\lambda$ defined as follow:
$$
\forall a\le b,\quad \lambda(\mathopen]a,b\mathclose[)=\mu([0,1]\cap\mathopen]a,b\mathclose[)
$$
With that, $(\mathbb{R},\mathcal{B},\lambda)$ is a probability space.

#### 5.3.4 Dirac Measure

Let $(\mathbb{R},\mathscr{P}(\mathbb{R}),\delta),$ with $\delta$ defined as:
$$
\forall A\subseteq \mathbb{R},\quad \delta(A)=\begin{cases}
1 &\text{if} \space 0\in A\\
0 &\text{otherwise}
\end{cases}
$$



## 6. Random Variable {#random-variable}



### 6.1 Definition

- Let $(\Omega,\mathcal{F},\mu)$ be a probability space
- Let $(E,\mathcal{E})$ a measurable space

A function $X:\Omega\rightarrow E$ is called a random variable if it is measurable. 

In other words, that is if it is a measurable function whose domain constitute a probability space.



### 6.2 Probability of an event

Let $U\in\mathcal{E}$ an event.

We define the probability that $X\in U$, denoted by $\mathcal{P}(X\in U)$  as follow:
$$
\mathcal{P}(X\in U)=\mu\left(\{\omega \in \Omega / \quad X(\omega)\in U\}\right)=\mu\left(X^{-1}(U)\right)
$$
### 6.3 Distribution

The probability function defined at 6.2 constitute a measure $\mathcal{D}$ of the measurable space $(E,\mathcal{E})$

This measure is defined as: $\forall U\in \mathcal{E},\quad\mathcal{D}(U)=\mu(X^{-1}(U)),$ and it is called the distribution of $X.$

If $X$ has a distribution $\mathcal{D}$, we say that $X$ follows a $\mathcal{D}$ distribution, and we note it as:
$$
X\sim \mathcal{D}
$$


### 6.4 Classification

We will only consider two types of random variables:

#### 6.4.1 Discrete Random Variable

A random variable is said to be discrete if $X(\Omega)$ is countable

#### 6.4.2 Continuous Random Variable

A random variable $X$ is said to be continuous if:
$$
\forall \omega\in \Omega,\quad \mathcal{P}(X=\omega)=0
$$


### 6.5 Examples

This examples show the formal construction of some random variables.

#### 6.5.1 Discrete Uniform Variable

- $n \in\mathbb{N}^*$
- Let $a,b\in\mathbb{N}^*$ such that $a\le b$
- Let $S=\{a,\dots,b\}$
- As $S$ is finite, we can define the probability space $(S,\mathscr{P}(S),p)$ as in $5.3.1$
- Let $X:S\rightarrow S$ defined by $X(\omega)=\omega$

We have:
$$
\forall s\in S,\quad \mathcal{P}(X=s)=p(X^{-1}(\omega))=p(\{\omega\})=\frac{1}{\lvert S \rvert}=\frac{1}{b-a+1}
$$

Note that as $X(S)=S$ is a countable set, this random variable is a discrete random variable. 




#### 6.5.2 Bernoulli Random Variable

- Let $(\mathbb{R},\mathcal{B},\lambda)$ as defined on $5.3.3$

- Let $E=\{0,1\}, \mathcal{E}=\mathscr{P}(E),$ so that $(E,\mathcal{E})$ is a measurable space

- Let $p\in[0,1]$.

- Let $X:\mathbb{R}\rightarrow E$ defined as:
  $$
  X(\omega)=\begin{cases} 1 & \text{if} \space x <p \\
  0& \text{otherwise}
  \end{cases}
  $$
  

We have:
$$
\begin{align*}
\mathcal{P}(X=1)&=\lambda(X^{-1}(1)) \\
&=\lambda(\mathopen]-\infty,p\mathclose[)\\
&=\mu([0,1]\cap \mathopen]-\infty,p\mathclose[) \\
&=\mu([0,p[)\\
&= p \\
\mathcal{P}(X=0)&=\mathcal{P}(X\ne 1) \\
&= 1-\mathcal{P}(X=1)\\
&= 1-p
\end{align*}
$$
 With that, we can verify that $X\sim \mathcal{B}(p)$

Note that as $X(\mathbb{R})=\{0,1\}$ is a countable set, this random variable is a discrete random variable.



#### 6.5.3 Continuous Uniform Variable

- Let $(\mathbb{R},\mathcal{B},\lambda)$ as defined on $5.3.3$
- Let $p\in[0,1]$.
- Let $X:\mathbb{R}\rightarrow \mathbb{R}$ defined as $W(\omega)=\omega$

We have:
$$
\begin{align*}
\forall a,b\in[0,1] /a\le b,\quad \mathcal{P}(X\in [a,b])&=\lambda(X^{-1}([a,b]))\\
&=\lambda([a,b])\\
&=\mu([0,1]\cap [a,b]) \\
&=\mu([a,b])\\
&=b-a
\end{align*}
$$
This result essentially says that $X\sim \mathcal{U}(0,1).$ And we can verify that $X$ is a continuous random variable 



Now we will calculate $\mathcal{P}(X\in \mathbb{Q})$

As $X$ is a continuous random variable, we have: $\forall x \in\mathbb{R},\quad \mathcal{P}(X=x)=0.$

Furthermore,  as $\mathbb{Q}$ is [infinitely countable](https://proofwiki.org/wiki/Rational_Numbers_are_Countably_Infinite), there exists a bijective function $\Phi:\mathbb{N}\rightarrow \mathbb{Q}$. with that:
$$
\begin{align*}
\mathcal{P}(X\in\mathbb{Q})&=\lambda(\mathbb{Q})\\
&=\lambda\left(\bigcup_{n\in\mathbb{N}}\{\Phi(n)\}\right)\\
&=\sum_{n\in\mathbb{N}}\lambda(\{\Phi(n)\})\\
&=\sum_{n\in\mathbb{N}}0\\
&=0
\end{align*}
$$

## 7. Discrete Random Variable

### 7.1 Definition

- Let $(\Omega,\mathcal{F},\mu)$ be a probability space
- Let $(E,\mathcal{E})$ a measurable space

A random variable $X:\Omega \rightarrow E$ is said to be **discrete** if $X(\Omega)$ is *countable*



### 7.2 Probability Mass Function

#### 7.2.1 Definition

The probability mass function $M_X$ is defined as:
$$
M_X(\omega)=\mathcal{P}(X=\omega)
$$
Now we will recover the probability of an event from its mass function.

#### 7.2.2 Probability of an event

Let $A\in \mathcal{E},$ we have the following:
$$
\begin{align*}
\mathcal{P}(X\in A)&=\mu(X^{-1}(A))\\
&=\mu\left(X^{-1}(A)\cap \Omega\right)\\
&=\mu\left(X^{-1}(A)\cap X^{-1}(X(\Omega))\right)\\
&=\mu\left(X^{-1}\left(A\cap X(\Omega)\right)\right)\\
&=\mathcal{P}(X\in A\cap X(\Omega) )
\end{align*}
$$
 As $A\cap X(\Omega)\subseteq X(\Omega)$ is countable, there [exists a bijective function](https://en.wikipedia.org/wiki/Countable_set) $\Phi: \mathcal{I}\rightarrow A \cap X(\Omega)$ with $\mathcal{I}\subseteq \mathbb{N}$. 

And from that we can calculate the probability of $A:$
$$
\begin{align*}
\mathcal{P}(X\in A)&=\mathcal{P}(X\in A\cap X(\Omega))\\
&=\mu\left(X^{-1}(A\cap X(\Omega))\right)\\
&=\mu\left(X^{-1}\left(\bigcup_{n\in\mathbb{N}}\{\Phi(n)\}\right)\right)\\
&=\mu\left(\bigcup_{n\in\mathbb{N}}X^{-1}\left(\{\Phi(n)\}\right)\right)\\
&=\sum_{n\in\mathbb{N}} \mu(X^{-1}(\Phi(n)))\\
&=\sum_{\omega \in A\cap X(\Omega)}\mu(X^{-1}(\omega)) \quad \text{we define this sum as the one above}\\
&=\sum_{\omega\in A\cap X(\Omega)}\mathcal{P}(X = \omega) \\
&=\sum_{\omega\in A\cap X(\Omega)}\mathcal{P}(X = \omega) + \mathcal{P}(X\in A \cap\bar{X}(\Omega))\quad \text{as the last term is zero} \\
&=\sum_{\omega\in A\cap X(\Omega)}\mathcal{P}(X = \omega) + \sum_{\omega \in A\cap \bar{X}(\Omega)}\mathcal{P}(X=\omega)  \quad \text{as every term is zero}\\
&=\sum_{\omega\in A}\mathcal{P}(X=\omega) \quad \text{it makes sense as only countably many terms are non-zero}
\end{align*}
$$
By that, for every event $A\in\mathcal{E}$ we have:
$$
\mathcal{P}(X\in A)=\sum_{\omega \in A}\mathcal{P}(X=\omega)=\sum_{\omega \in A}M_X(\omega)
$$

### 7.3 Examples

- The Discrete Uniform Variable shown in $6.5.1$
- The Bernoulli Random Variable shown in $6.5.2$
- Even when we expand the domain of the Bernoulli Random Variable to $E=\mathbb{R},\mathcal{E}=\mathcal{B}.$ It will always be a discrete random variable as $X(\Omega)=\{0,1\}$



## 8. Real Random Variable

### 8.1 Definition

- Let $(\Omega,\mathcal{F},\mu)$ be a [probability space](#probability-space)
- Let $E=\mathbb{R},\mathcal{E}=\mathcal{B}$ so that $(\mathbb{R},\mathcal{B})$ is a [measurable space](#measurable-space)

A **real random variable** is a  random variable $X:\Omega\rightarrow \mathbb{R}$

Furthermore, if it is continuous, it is said to be a continuous real random variable

### 8.2 Cumulative Distribution Function

For a random variable $X$, its cumulative distribution function $F_X$ is defined by:
$$
\forall x\in\mathbb{R},\quad F_X(x)=\mathcal{P}(X\le x)=\mathcal{P}(X\in\mathopen]-\infty,x\mathclose])
$$

#### Example

Let $X\sim \mathcal{U}(0,1)$

The cumulative distribution function of $X$ is:
$$
F_X(x)=\begin{cases}
0 &\text{if} \space x <0 \\
x &\text{if} \space x\in[0,1]\\
1 &\text{otherwise}
\end{cases}
$$


### 8.3 Probability Density Function

#### 8.3.1 Definition

Where it can be defined, the probability Density function $f_X$ is the derivative of the $F_X:$
$$
f_X=F_X'
$$

#### 8.3.2 Probability of an event

If $F_X$ is differentiable almost everywhere, then for every event $A\in\mathcal{B}:$
$$
\mathcal{P}(X\in A)=\int_{A}f_X(x)\space \text{dx}
$$
In particular, for every interval $[a,b]:$
$$
\mathcal{P}(X\in[a,b])=\int_{a}^bf_X(x)\space \text{dx}
$$

#### 8.3.3 Example

Let $X\sim \mathcal{U}(0,1)$

The probability density function $f_X$ can be defined as:
$$
f_X(x)=\begin{cases}
0 &\text{if} \space x <0 \\
1 &\text{if} \space x\in[0,1]\\
0 &\text{otherwise}
\end{cases}
$$
