# Discrete Distributions



## 1. Uniform Distribution

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




## 2. Bernoulli Distribution

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

Less formally, it can be thought of as a model for the set of possible outcomes of any single [experiment](https://en.wikipedia.org/wiki/Experiment) that asks a [yes–no question](https://en.wikipedia.org/wiki/Yes–no_question). Such questions lead to [outcomes](https://en.wikipedia.org/wiki/Outcome_(probability)) that are [boolean](https://en.wikipedia.org/wiki/Boolean-valued_function)-valued: a single [bit](https://en.wikipedia.org/wiki/Bit) whose value is success/[yes](https://en.wikipedia.org/wiki/Yes_and_no)/[true](https://en.wikipedia.org/wiki/Truth)/[one](https://en.wikipedia.org/wiki/One) with [probability](https://en.wikipedia.org/wiki/Probability) $p$ and failure/no/[false](https://en.wikipedia.org/wiki/False_(logic))/[zero](https://en.wikipedia.org/wiki/Zero) with probability *q*. It can be used to represent a (possibly biased) [coin toss](https://en.wikipedia.org/wiki/Coin_toss) where $1$ and $0$ would represent "heads" and "tails", respectively, and $p$ would be the probability of the coin landing on heads (or vice versa where $1$ would represent tails and $p$ would be the probability of tails).  In particular, unfair coins would have $p\neq \frac{1}{2}$

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


## 3. Binomial Distribution

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


## 4. Geometric Distribution

### 4.1 Definition

A random variable $X$ is said to follow the geometric distribution $\mathcal{G}(p)$ if:
$$
\exists X_1,\dots \sim \mathcal{B}(p) \space \text{i.i.d} / \quad X=\arg\min_{n\in\mathbb{N}^*} \{X_n=1\}
$$

### 4.2 Significance

### 4.3 Probability mass function

$$
\begin{align*}
\forall n\in\mathbb{N}^*,\quad \mathcal{P}(X=n) &= \mathcal{P}(\arg\min_{k\in\mathbb{N}}\{X_k=1\}=n) \\
&=\mathcal{P}\left(\bigwedge_{k=1}^{n-1} X_k =0 \space \text{and} \space X_n=1\right) \\
&=\mathcal{P}(X_n=1)\times \prod_{k=1}^{n-1}\mathcal{P}(X_k=0) \\
&=p(1-p)^{n-1}
\end{align*}
$$





## 5. Negative Binomial Distribution

A random variable $X$ is said to follow the negative binomial distribution $\mathcal{NB}(r,p)$  with paramters $r\in\mathbb{N}^*$  and $p\in[0,1]$ if:
$$
\exists X_1,\dots \sim \mathcal{B}(p) \space \text{i.i.d} / \quad X=\arg\min_{n\in\mathbb{N}} \left\{\sum_{k=1}^nX_k=r\right\}
$$

### 5.2 Significance

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

