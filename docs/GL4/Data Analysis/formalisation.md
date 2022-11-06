# Probability Formalisation



## 1. Sigma Algebra

### 1.1 Definition

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

### 1.2 Examples

- For any set $S,$ $\mathscr{P}(S)$ and $\{\empty,S\}$ are both a sigma algebra

### 1.3 Construction

For any set $S,$ and $U\subseteq \mathscr{P}(S),$ We can generate a $\sigma$-algebra  $\Sigma$ as follow:

We define $\Phi_0(A)=A$ and $\Phi_1(A)=\bar{A}=S\setminus A$

1.  $\Sigma_0=U\cup \{S\}$

2. We calculate $\Sigma_n$ as:
   $$
   \Sigma_n=\bigcup_{A\in \Sigma_{n-1}^{\mathbb{N}}}\bigcup_{\delta \in \{0,1\}^\mathbb{N}}\left\{\bigcup_{m\in\mathbb{N}}\Phi_{\delta_m}(A_m)\right\}
   $$

### 1.4 Importance







## 2. Measurable Space

### 2.1 Definition

Let $S$ be some set and $\mathcal{F}$ be a $\sigma$-algebra of $S$

The couple $(S,\mathcal{F})$ is called a measurable space



### 2.2 Measurable Set

A set $U\in\mathscr{P}(S)$ is said to be measurable if $U\in \mathcal{F}$



## 3. Measure Space

### 2.1 Definition

A measure space $(S,\mathcal{F},\mu)$ is a measurable space $(S,\mathcal{F})$ with an additional real valued function $\mu:\mathcal{F}\rightarrow \bar{\mathbb{R}}$ called measure satisfying the following conditions:

1. The measure of the empty set is null: $\mu(\emptyset)=0$

2. The measure function is non-negative $\forall A\in \mathcal{F}, \quad \mu(A)\ge 0$

3. The measure function is countably additive with respect to disjoint sets:
   $$
   \forall (A_n)\in \mathcal{F}^\mathbb{N} \space \text{pairwise disjoint}, \quad \mu\left(\bigcup_{n\in\mathbb{N}} A_n\right)=\sum_{n\in\mathbb{N}}\mu(A_n)
   $$

4. 

### 2.3 Measurable Function

- Let $(S,\mathcal{F},\mu)$ be a measure space
- Let $(E,\mathcal{E})$ be a measurable space

A function $f:S\rightarrow E$ is said to be measurable if the pre-image of any measurable set is measurable:
$$
\forall U\in \mathcal{E},\quad f^{-1}(U)\in \mathcal{F}
$$




## 4. Probability Space

### 4.1 Definition

A probability space is a measure space $(\Omega,\mathcal{F},\mu)$ with the additional constraint that $\mu(\Omega)=1$

### 4.2 Terminology





## 5. Random Variable

### 5.1 Definition

- Let $(\Omega,\mathcal{F},\mu)$ be a probability space
- Let $(E,\mathcal{E})$ a measurable space

A function $X:\Omega\rightarrow E$ is called a random variable if it is measurable. 

In other words, that is if it is a measurable function whose domain constitute a probability space.

### 5.2 Probability of an event

Let $U\in\mathcal{E}$ an event.

We define the probability that $X\in U$, denoted by $\mathcal{P}(X\in U)$  as follow:
$$
\mathcal{P}(X\in U)=\mu\left(\{\omega \in \Omega / \quad X(\omega)\in U\}\right)=\mu\left(X^{-1}(U)\right)
$$
This probability function constitute a measure of the measurable space $(E,\mathcal{E})$

