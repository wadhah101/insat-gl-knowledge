---
slug: /gl4/data-analysis/discrete-distributions
---

# Discrete Distributions 1

## 1. Uniform Distribution {#uniform-distribution}

### 1.1 Definition

A discrete random variable $X$ is said to follow the uniform distribution $\mathcal{D}(a,b)$ if:
$$
\forall k\in\{a,\dots,b\},\quad \mathcal{P}(X=k)=\frac{1}{b-a+1}
$$

### 1.2 Significance

### 1.3 Moments

#### 1.3.1 Non central Moments

$$
\forall n\in\mathbb{N},\quad \mathbb{E}[X^n]=\frac{1}{b-a+1}\sum_{k=a}^bk^n
$$

In particular, the expected value $\mathbb{E}[X]$ is:
$$
\boxed{\mathbb{E}[X]=\frac{1}{b-a+1}\sum_{k=a}^bk=\frac{(b-a+1)(a+b)}{2(b-a+1)}=\frac{a+b}{2}}
$$

#### 1.3.2 Central Moments

$$
\forall n\in\mathbb{N},\quad \mathbb{E}\left[(X-\mathbb{E}[X])^n\right]=\frac{1}{b-a+1}\sum_{k=a}^b\left(k-\frac{a+b}{2}\right)^n
$$

To get the exact expression of the variance, we will start by calculating the following quantity
$$
\begin{align*}
\sum_{k=a}^b(k+1)^3&= \sum_{k=a}^b k^3+3k^2+3k+1\\
\implies \sum_{k=a}^b3k^2&=(b+1)^3-a^3-\sum_{k=a}^b(3k-1)\\
3\sum_{k=a}^bk^2&=(b+1)^3-a^3-\frac{3}{2}(a+b)(b-a+1)-(b-a+1)\\
\implies 6 \sum_{k=a}^bk^2&=(b-a+1)\left(2a^2+2(1+b)a+2(b+1)^2-3(a+b)-2\right)\\
&=(b-a+1)(2a^2+2a+2ab+2b^2+4b+2-3a-3b-2)\\
&=(b-a+1)(2a^2-a+2ab+2b^2+b)\\
\implies \sum_{k=a}^bk^2&=\frac{1}{6}(b-a+1)(2a^2-a+2ab+2b^2+b)\\
\end{align*}
$$

From that, we can directly calculate the variance $\mathbb{V}[X]$ as follow:
$$
\begin{align*}
\mathbb{V}[X]&=\mathbb{E}[X^2]-\mathbb{E}[X]^2\\
&=\frac{1}{b-a+1}\sum_{k=a}^bk^2-\frac{(a+b)^2}{4}\\
&=\frac{2a^2-a+2ab+2b^2+b}{6}-\frac{(a+b)^2}{4}\\
&=\frac{4a^2-2a+4ab+4b^2+2b-3a^2-6ab-3b^2}{12}\\
&=\frac{a^2-2a+b^2+2b-2ab}{12} \\
&=\frac{(b-a)^2+2(b-a)}{12}\\
&=\frac{(b-a)^2+2(b-a)+1-1}{12}\\
&=\frac{(b-a+1)^2-1}{12 }
\end{align*}
$$

## 2. Bernoulli Distribution {#bernoulli-distribution}

### 2.1 Definition

A discrete random variable $X$ is said to follow the Bernoulli distribution $\mathcal{B}(p)$ if:
$$
\begin{cases}
\mathcal{P}(X=1)&=p \\
\mathcal{P}(X=0)&=1-p
\end{cases}
$$

### 2.2 Significance

In [probability theory](https://en.wikipedia.org/wiki/Probability_theory) and [statistics](https://en.wikipedia.org/wiki/Statistics), the **Bernoulli distribution**, named after Swiss mathematician [Jacob Bernoulli](https://en.wikipedia.org/wiki/Jacob_Bernoulli), is the [discrete probability distribution](https://en.wikipedia.org/wiki/Discrete_probability_distribution) of a [random variable](https://en.wikipedia.org/wiki/Random_variable) which takes the value $1$ with probability $p$ and the value $0$ with probability $q=1-p$.

Less formally, it can be thought of as a model for the set of possible outcomes of any single [experiment](https://en.wikipedia.org/wiki/Experiment) that asks a [yes–no question](https://en.wikipedia.org/wiki/Yes–no_question).

Such questions lead to [outcomes](https://en.wikipedia.org/wiki/Outcome_(probability)) that are [boolean](https://en.wikipedia.org/wiki/Boolean-valued_function)-valued: a single [bit](https://en.wikipedia.org/wiki/Bit) whose value is success/[yes](https://en.wikipedia.org/wiki/Yes_and_no)/[true](https://en.wikipedia.org/wiki/Truth)/[one](https://en.wikipedia.org/wiki/One) with [probability](https://en.wikipedia.org/wiki/Probability) $p$ and failure/no/[false](https://en.wikipedia.org/wiki/False_(logic))/[zero](https://en.wikipedia.org/wiki/Zero) with probability $q$.

It can be used to represent a (possibly biased) [coin toss](https://en.wikipedia.org/wiki/Coin_toss) where $1$ and $0$ would represent "heads" and "tails", respectively, and $p$ would be the probability of the coin landing on heads (or vice versa where $1$ would represent tails and $p$ would be the probability of tails).

In particular, unfair coins would have $p\neq \frac{1}{2}$

### 2.3 Moments

#### 2.3.1 Idempotence

The Bernoulli distribution is idempotent:
$$
\forall n\in\mathbb{N}^*,\quad X^n=X
$$

#### 2.3.2 Non-central moments

$$
\begin{align*}
\forall n \in\mathbb{N}^*,\quad \mathbb{E}[X^n]&=\mathbb{E}[X]\\
&=\mathcal{P}(X=1)\\
&=p
\end{align*}
$$

#### 2.3.3 Central Moments

$$
\begin{align*}
\forall n \in\mathbb{N}^*,\quad \mathbb{E}\left[(X-\mathbb{E}[X])^n\right]&=\mathbb{E}[X]\\
&=(1-p)^n\mathcal{P}(X=1)+(-p)^n\mathcal{P}(x=0)\\
&=(-p)^n(1-p)+p(1-p)^n \\
&=p(1-p)\left((1-p)^{n-1}-(-p)^{n-1}\right)
\end{align*}
$$

In particular, the variance $\mathbb{V}[X]$ is equal to:
$$
\boxed{\mathbb{V}[X]=p(1-p)}
$$

### 2.4 Product of Bernoulli distributions

- Let $n\in\mathbb{N}$

- Let $p_1,\dots,p_n\in[0,1]$

- Let $X_1\sim \mathcal{B}(p_1),\dots,X_n\sim \mathcal{B}(p_n)$

The random variable $P=\prod_{i=1}^nX_i$ follows a Bernoulli distribution $\mathcal{B}(p)$ with:
$$
p=\mathcal{P}\left(\bigwedge_{i=1}^n X_i=1\right)
$$
If the random variables are independent, then:
$$
p=\prod_{i=1}^n X_i
$$

#### 2.4.1 Example 1

- Let $X_1\sim \mathcal{B}(0.5)$
- Let $X_2\sim \mathcal{B}(0.7)$
- Let $X_3 \sim \mathcal{B}(0.3)$
- We will assume that $X_1,X_2,X_3$ are independent
- Let $P=X_1X_2X_3$

The probability distribution function of $P$ is:
$$
\mathcal{P}(P=k)=\begin{cases}
0.105 & k=1 \\
0.895 & k=0
\end{cases}
$$

#### 2.4.2 Example 2

- Let $X_1\sim \mathcal{B}(0.5)$
- Let $X_2\sim \mathcal{B}(0.7)$
- Let $X_3$ be the random variable defined to be $1$ if $X_2=X_1$ and $0$ otherwise
- We will assume that $X_1,X_2,X_3$ are independent
- Let $P=X_1X_2X_3$

$$
\mathcal{P}(X_1 = 1 \wedge X_2=1 \wedge X_3=1) =\mathcal{P}(X_1 = 1 \wedge X_2=1 \wedge X_1=X_2)=\mathcal{P}(X_1 = 1 \wedge X_2=1)=0.35
$$

So $P\sim \mathbb{B}(0.35)$

### 2.5 Binary Function on Bernoulli distributions

- Let $n\in\mathbb{N}$

- Let $p_1,\dots,p_n\in[0,1]$

- Let $X_1\sim \mathcal{B}(p_1),\dots,X_n\sim \mathcal{B}(p_n)$

- Let $F:\{0,1\}^n\rightarrow \{0,1\}$ be a binary function

Then the random variable $Y=F(X_1,\dots,X_n)$ follows a Bernoulli distribution $\mathcal{B}(p)$ with:
$$
p=\mathcal{P}\left((X_1,\dots,X_n)\in F^{-1}(1)\right)
$$
If the random variables are independent, then:
$$
p=\sum_{U\in F^{-1}(1)}\prod_{i=1}^n\mathcal{P}(X_i=U_i)
$$

#### 2.5.1 Example 1

- Let $X_1\sim \mathcal{B}(p_1=0.8)$
- Let $X_2 \sim \mathcal{B}(p_2=0.6)$
- Let $X_3 \sim \mathcal{B}(p_3=0.5)$
- We will assume $X_1,X_2,X_3$ are independent
- Let $F$ be a binary function defined by:

  | $x_1$ | $x_2$ | $x_3$ | $F(x_1,x_2,x_3)$ |
  | ----- | ----- | ----- | ---------------- |
  | $0$   | $0$   | $0$   | $1$              |
  | $0$   | $0$   | $1$   | $0$              |
  | $0$   | $1$   | $0$   | $1$              |
  | $0$   | $1$   | $1$   | $1$              |
  | $1$   | $0$   | $0$   | $0$              |
  | $1$   | $0$   | $1$   | $0$              |
  | $1$   | $1$   | $0$   | $0$              |
  | $1$   | $1$   | $1$   | $1$              |

- Let $Y=F(X_1,X_2,X_3)$

We have:
$$
\begin{align*}
\mathcal{P}(Y=1)&= \mathcal{P}(X_1 =0 \wedge X_2=0\wedge X_3=0) +\mathcal{P}(X_1 =0 \wedge X_2=1\wedge X_3=0) \\
&+\mathcal{P}(X_1 =0 \wedge X_2=1\wedge X_3=1)+\mathcal{P}(X_1 =1 \wedge X_2=1\wedge X_3=1)\\
&= \bar{p}_1\bar{p}_2\bar{p}_3+\bar{p}_1p_2\bar{p}_3+\bar{p}_1p_2p_3+p_1p_2p_3 \\
&= \bar{p}_1\bar{p_3}(\bar{p}_2+p_2)+p_2p_3(p_1+\bar{p}_1)\\
&= \bar{p}_1\bar{p_3}+p_2p_3 \\
&= 0.4\\
\mathcal{P}(Y=0)&=0.6
\end{align*}
$$
So $Y\sim \mathcal{P}(0.4)$

### Example 2

- We will define $X_1,X_2$ and $F$ as the first example
- Let $X_3=X_1\vee X_2$ the random variable equal to $1$ if $X_1=1 \or X_2=1$  
- Let $Y=F(X_1,X_2,X_3)$

$$
\begin{align*}
\mathcal{P}(Y=1)&= \mathcal{P}(X_1 =0 \wedge X_2=0\wedge X_3=0) +\mathcal{P}(X_1 =0 \wedge X_2=1\wedge X_3=0) \\
&\quad +\mathcal{P}(X_1 =0 \wedge X_2=1\wedge X_3=1)+\mathcal{P}(X_1 =1 \wedge X_2=1\wedge X_3=1)\\
&= \mathcal{P}(X_1 =0 \wedge X_2=0\wedge (X_1\vee X_2)=0) +\mathcal{P}(X_1 =0 \wedge X_2=1\wedge (X_1\vee X_2)=0) \\
&\quad +\mathcal{P}(X_1 =0 \wedge X_2=1\wedge (X_1\vee X_2)=1)+\mathcal{P}(X_1 =1 \wedge X_2=1\wedge (X_1\vee X_2)=1)\\
&= \mathcal{P}(X_1 =0 \wedge X_2=0\wedge  \text{Always}) +\mathcal{P}(X_1 =0 \wedge X_2=1\wedge \text{Impossible}) \\
&\quad +\mathcal{P}(X_1 =0 \wedge X_2=1\wedge \text{Always})+\mathcal{P}(X_1 =1 \wedge X_2=1\wedge 1=\text{Always})\\
&=\mathcal{P}(X_1 =0 \wedge X_2=0)+\mathcal{P}(X_1 =0 \wedge X_2=1)+\mathcal{P}(X_1 =1 \wedge X_2=1)\\
&=\bar{p}_1\bar{p}_2+\bar{p}_1p_2+p_1p_2\\
&=\bar{p}_1+p_1p_2\\
&=0.68
\end{align*}
$$

### 2.6 Conditioning a Bernoulli distribution

- Let $p\in[0,1]$
- Let $X$ be a Bernoulli distribution, and $\mathcal{A}$ an event

The random variable $Y$ defined by $\mathcal{P}(Y=k)=\mathcal{P}(X=k\mid \mathcal{A})$  follows the Bernoulli distribution $\mathcal{B}(p)$ with:
$$
p=\mathcal{P}(X=1\mid \mathcal{A})
$$

## 3. Binomial Distribution {#binomial-distribution}

### 3.1 Definition

A random variable $X$ is said to follow the binomial distribution $\mathcal{B}(n,p)$ with parametes $n\in\mathbb{N}$ and $p\in[0,1]$ if:
$$
\exists X_1,\dots,X_n \sim \mathcal{B}(p) \space \text{i.i.d} /\quad X=\sum_{k=0}^nX_i
$$

### 3.2 Significance

In [probability theory](https://en.wikipedia.org/wiki/Probability_theory) and [statistics](https://en.wikipedia.org/wiki/Statistics), the **binomial distribution** with parameters *n* and *p* is the [discrete probability distribution](https://en.wikipedia.org/wiki/Discrete_probability_distribution) of the number of successes in a sequence of *n* [independent](https://en.wikipedia.org/wiki/Statistical_independence) [experiments](https://en.wikipedia.org/wiki/Experiment_(probability_theory)), each asking a [yes–no question](https://en.wikipedia.org/wiki/Yes–no_question), and each with its own [Boolean](https://en.wikipedia.org/wiki/Boolean-valued_function)-valued [outcome](https://en.wikipedia.org/wiki/Outcome_(probability)): *success* (with probability $p$) or *failure* (with probability $q=1-p$)

### 3.3 Probability mass function

Let $S_k$ be the set of subsets of $I=\{1,\dots,n\}$ of size $k$

The number of such sets is:
$$
\lvert S_k \vert = {n \choose k}
$$
With that, the probability mass function is:
$$
\begin{align*}
\forall k\in\{0,\dots,n\},\quad \mathcal{P}(X=k)&=   \sum_{A\in S_k}\mathcal{P}\left(\bigwedge_{s\in A} X_s=1 \space \text{and} \space \bigwedge_{s\in I \setminus A} X_s=0 \right) \\
&= \sum_{A\in S_k}\prod_{s\in A}\mathcal{P}(X_s=1) \times \prod_{s\in I\setminus A}\mathcal{P}(X_s=0) \quad \text{thanks to independence} \\
&=\sum_{A\in S_k}\prod_{s\in A}p  \times \prod_{s\in I\setminus A}(1-p) \\
&=  \sum_{A\in S_k}p^{\lvert A\rvert} \times (1-p)^{n-\lvert A \rvert}\\
&=  \sum_{A\in S_k}p^{k} \times (1-p)^{n-k} \\
&=  \lvert S_k \rvert p^{k} \times (1-p)^{n-k} \\
&= {n \choose k}p^k(1-p)^{n-k}
\end{align*}
$$

### 3.4 Moments

#### 3.4.1 Raw Moments

The expected value can be calculated directly from the definition:
$$
\boxed{\mathbb{E}[X]=\sum_{k=1}^n\mathbb{E}[X_k]=np}
$$
For higher order moments:
$$
\begin{align*}
\forall m\in\mathbb{N}^*,\quad \mathbb{E}[X^m]&= \sum_{k=1}^n{n \choose k}k^mp^k(1-p)^{n-k}
\end{align*}
$$

#### 3.4.2 Central Moments

The variance can be calculated directly from the definition:
$$
\boxed{\mathbb{V}[X]=\sum_{k=1}^n\mathbb{V}[X_k]=np(1-p)}
$$
For higher order central moments:
$$
\begin{align*}
\forall m\in\mathbb{N}^*,\quad \mathbb{E}\left[\left(X-\mathbb{E}[X]\right)^m \right]&= \sum_{k=1}^n{n \choose k}(k-np)^mp^k(1-p)^{n-k}
\end{align*}
$$

## 4. Geometric Distribution {#geometric-distribution}

### 4.1 Definition

A random variable $X$ is said to follow the geometric distribution $\mathcal{G}(p)$ if:
$$
\exists X_1,\dots \sim \mathcal{B}(p) \space \text{i.i.d} / \quad X=\arg\min_{n\in\mathbb{N}^*} \{X_n=1\}
$$

### 4.2 Significance

In [probability theory](https://en.wikipedia.org/wiki/Probability_theory) and [statistics](https://en.wikipedia.org/wiki/Statistics), the **geometric distribution** is the probability distribution of the number $X$ of [Bernoulli trials](https://en.wikipedia.org/wiki/Bernoulli_trial) needed to get one success.

The geometric distribution gives the probability that the first occurrence of success requires $k$ independent trials, each with success probability $p$.

### 4.3 Probability mass function

$$
\begin{align*}
\forall n\in\mathbb{N}^*,\quad \mathcal{P}(X=n) &= \mathcal{P}(\arg\min_{k\in\mathbb{N}}\{X_k=1\}=n) \\
&=\mathcal{P}\left(\bigwedge_{k=1}^{n-1} X_k =0 \space \text{and} \space X_n=1\right) \\
&=\mathcal{P}(X_n=1)\times \prod_{k=1}^{n-1}\mathcal{P}(X_k=0) \\
&=p(1-p)^{n-1}
\end{align*}
$$

#### 4.4 Moments

#### 4.4.1 Prelude

Let $\varphi_n$ defined as:
$$
\begin{align*}
\varphi_{n}:&\mathbb{R}^*\rightarrow \mathbb{R}\\
&x\rightarrow \sum_{m\in\mathbb{N}}m^nx^m
\end{align*}
$$
*This function will be a helper function for calculating $\mathbb{E}[X^n]$*

In fact, $\varphi_n$ is differentiable and:
$$
\varphi'_n=\sum_{m\in\mathbb{N}^*}m^{n+1}x^{m-1}=\frac{1}{x}\varphi_{n+1}
$$
Which implies:
$$
\forall n\in\mathbb{N},\quad \varphi_{n+1}=x\varphi'_n
$$
And we have the following:
$$
\varphi_0=\sum_{m\in\mathbb{N}}x^m=\frac{1}{1-x}
$$

#### 4.4.2 Raw Moments

$$
\begin{align*}
\forall n\in\mathbb{N},\quad \mathbb{E}[X^n]&=\sum_{m\in\mathbb{N}}m^np(1-p)^{n-1} \\
&= \frac{p}{1-p}\varphi_n(1-p)
\end{align*}
$$

With that, we can calculate the expected value $\mathbb{E}[X]$ as:
$$
\begin{align*}
\forall x\in\mathbb{R}^*,\quad \varphi_1(x)&=x\varphi_0'(x)\\
&=\frac{x}{(1-x)^2}\\
\mathbb{E}[X]&=\frac{p}{1-p}\varphi_1(1-p) \\
&=\frac{p}{1-p}\cdot \frac{1-p}{p^2}\\
&=\frac{1}{p}
\end{align*}
$$

#### 4.4.3 Variance

The variance $\mathbb{V}[X]$ can be calculated as:
$$
\begin{align*}
\forall x\in\mathbb{R}\setminus\{0,1\},\quad \varphi_2(x)&=x\varphi_1'(x)\\
&=x\cdot \left(\frac{x}{(1-x)^2}\right)'\\
&=x\cdot \frac{(1-x)^2+2(1-x)x}{(1-x)^4}\\
&=x\cdot \frac{1-x+2x}{(1-x)^3}\\
&=\frac{x(x+1)}{(1-x)^3}\\
\mathbb{V}[X]&=\mathbb{E}[X^2]-\mathbb{E}[X]^2\\
&=\frac{p}{1-p}\cdot \varphi_2(1-p)-\frac{1}{p^2}\\
&=\frac{p}{1-p}\cdot \frac{(1-p)(2-p)}{p^3}-\frac{1}{p^2}\\
&=\frac{2-p-1}{p^2}\\
&=\frac{1-p}{p^2}
\end{align*}
$$

## 5. Negative Binomial Distribution {#negative-binomial-distribution}

A random variable $X$ is said to follow the negative binomial distribution $\mathcal{NB}(r,p)$  with paramters $r\in\mathbb{N}^*$  and $p\in[0,1]$ if:
$$
\exists X_1,\dots \sim \mathcal{B}(p) \space \text{i.i.d} / \quad X=\arg\min_{n\in\mathbb{N}} \left\{\sum_{k=1}^nX_k=r\right\}
$$

### 5.2 Significance

In [probability theory](https://en.wikipedia.org/wiki/Probability_theory) and [statistics](https://en.wikipedia.org/wiki/Statistics), the **negative binomial distribution** is a [discrete probability distribution](https://en.wikipedia.org/wiki/Discrete_probability_distribution) that models the number of trials in a sequence of independent and identically distributed [Bernoulli trials](https://en.wikipedia.org/wiki/Bernoulli_trial) so that a specified (non-random) number of successes $r$ occurs.

For example, we can define rolling a $6$ on a die as a success, and rolling any other number as a failure, and ask how many rolls will occur to get the third success $(r=3)$. In such a case, the probability distribution of the number of needed trials will be a negative binomial distribution.

### 5.3 Probability mass function

Let $S_{n,k}$ be the set of subsets of $I_n=\{1,\dots,n\}$ of size $k$
$$
\begin{align*}
\forall n\in\mathbb{N},\quad \mathcal{P}(X=n) &= \mathcal{P}\left(\arg\min_{n\in\mathbb{N}} \left\{\sum_{k=1}^nX_k=r\right\}\right) \\
&= \sum_{A\in S_{n-1,r-1}} \mathcal{P}\left(\bigwedge_{s\in A}X_s=1 \space \text{and} \space X_n=1 \space \text{and} \bigwedge_{s\in I_{n-1}\setminus A}X_s=0\right) \\
&= \sum_{A\in S_{n-1,r-1}} \mathcal{P}(X_n=1)\prod_{s\in A}\mathcal{P}(X_s=1) \cdot \prod_{s\in I_{n-1}\setminus A} \mathcal{P}(X_s=0) \\
&= \sum_{A\in S_{n-1,r-1}} p^{\lvert A \rvert +1} (1-p)^{n-1-\lvert A \rvert} \\
&= \sum_{A\in S_{n-1,r-1}} p^{r} (1-p)^{n-r} \\
&= \lvert S_{n-1,r-1}\rvert \cdot p^{r} (1-p)^{n-r} \\
&= {n-1 \choose r-1}p^r(1-p)^{n-r}
\end{align*}
$$

### 5.4 Moments

#### 5.4.1 Raw Moments

- Let $p\in[0,1]$
- For $r\in\mathbb{N},$ let $X_r\sim \mathcal{NB}(r,p)$

$$
\begin{align*}
\forall n\in\mathbb{N}^*,\quad \mathbb{E}[X_r^n]&=\sum_{m\in\mathbb{N}}{m-1 \choose r-1}m^np^r(1-p)^{m-r}\\
&=\sum_{m\in\mathbb{N}}\frac{(m-1)!}{(m-r)!(r-1)!}m^np^r(1-p)^{m-r}\\
&=\sum_{m\in\mathbb{N}}\frac{m!}{(m-r)!r!}rm^{n-1}p^r(1-p)^{m-r}\\
&=\sum_{m\in\mathbb{N}}{m \choose r}rm^{n-1}p^r(1-p)^{m-r}\\
&=\frac{r}{p}\sum_{m\in\mathbb{N}^*}{m-1\choose r}(m-1)^{n-1}p^{r+1}(1-p)^{m-1-r}\\
&=\frac{r}{p}\sum_{m\in\mathbb{N}^*}{m-1\choose r}\sum_{s=0}^{n-1}{n-1\choose s}(-1)^{n-1-s}m^sp^{r+1}(1-p)^{m-1-r}\\
&=\frac{r}{p}\sum_{s=0}^{n-1}(-1)^{n-1-s}{n-1\choose s}\sum_{m\in\mathbb{N}^*}{m-1\choose r}m^sp^{r+1}(1-p)^{m-1-r}\\
&=\frac{r}{p}\sum_{s=0}^{n-1}(-1)^{n-1-s}{n-1\choose s}\mathbb{E}[X^s_{r+1}]
\end{align*}
$$

In particular, the expected value is:
$$
\boxed{\mathbb{E}[X_r]=\frac{r}{p}\mathbb{E}[X^0_{r+1}]=\frac{r}{p}}
$$

#### 5.4.2 Central Moments

We will start by the variance
$$
\begin{align*}
\mathbb{E}[X_r^2]&=\frac{r}{p}\left(-\mathbb{E}[X_{r+1}^0]+\mathbb{E}[X_{r+1}]\right)\\
&=\frac{r}{p}\cdot (\frac{r+1}{p}-1)\\
&=\frac{r(r+1-p)}{p^2}\\
\implies \mathbb{V}[X_r]&=\mathbb{E}[X_r^2]-\mathbb{E}[X_r]^2\\
&=\frac{r(r+1-p)}{p^2}-\frac{r^2}{p^2}\\
&=r\frac{1-p}{p^2}
\end{align*}
$$

### 5.5 Relation to the Geometric Distribution

The geometric distribution is a special case of the negative binomial distribution.

In fact:
$$
\boxed{\forall p\in [0,1],\quad \mathcal{G}(p)=\mathcal{NB}(1,p)}
$$
