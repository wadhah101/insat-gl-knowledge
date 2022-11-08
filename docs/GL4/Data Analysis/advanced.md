# Advanced Probability

## 1. Tchebychev Inequality

### 1.1 Statement

Let $X\sim \mathcal{D}$ with finite variance $\sigma^2$ and finite expectation $\mu.$ Then:
$$
\forall r\in\mathbb{R}_+^*,\quad \mathcal{P}\left(\lvert X-\mu \rvert \ge r\sigma\right) \le \frac{1}{r^2}
$$

### 1.2 Proof

Let $X\sim \mathcal{D}$ with finite variance $\sigma^2$ and finite expectation $\mu$

Suppose that $\exists r\in\mathbb{R}_+^*:$
$$
\mathcal{P}(\lvert X-\mu \rvert \ge r\sigma)> \frac{1}{r^2}
$$
So we have:
$$
\begin{align*}
\mathcal{P}((X-\mu)^2 \ge r^2\sigma^2)&> \frac{1}{r^2}\\
\implies  r^2\sigma^2\mathcal{P}((X-\mu)^2 \ge r^2\sigma^2)&> \sigma^2\\
\mathbb{V}[X]&= \mathbb{E}\left[(X-\mu)^2\right]\\
&=\mathbb{E}\left[(X-\mu)^2 \mid (X-\mu)^2 \ge r^2\sigma^2\right]\cdot \mathcal{P}((X-\mu)^2 \ge r^2\sigma^2)\\
&\quad + \mathbb{E}\left[(X-\mu)^2 \mid (X-\mu)^2 < r^2\sigma^2\right]\cdot \mathcal{P}((X-\mu)^2 < r^2\sigma^2) \\
&\ge \mathbb{E}\left[(X-\mu)^2 \mid (X-\mu)^2 \ge r^2\sigma^2\right]\cdot \mathcal{P}((X-\mu)^2 \ge r^2\sigma^2) \\
&\ge r^2\sigma^2\mathcal{P}((X-\mu)^2 \ge r^2\sigma^2) \\
&> \sigma^2
\end{align*}
$$
Which is a contradiction as $\mathbb{V}[X]=\sigma^2 \quad \blacksquare$







## 2. Discrete Compound Distribution 

A discrete compound distribution is a discrete distribution whose parameter is a random variable $X$.

For example, if $X\sim U(0,1)$,  $\mathcal{B}(X)$ is said to be a compound discrete distribution

We will analyse two cases:

+ The random variable $X$ is discrete
+ The random variable $X$ is continuous

### 2.1 Compounding with a discrete random variable

#### 2.1.1 Definition

- Let $\mathcal{D}$ a family of distributions with parameter $s\in S$ and values on $A$
- Let $X$ be a discrete distribution with values on $Q\subseteq S$

a discrete random variable $Y$ is said to follow the compound distribution $\mathcal{D}(X)$ if:
$$
\forall k \in Q, \quad Y[X=k]\sim \mathcal{D}(k)
$$

#### 2.1.2 Probability Mass function

$$
\forall y \in A,\quad \mathcal{P}(Y=y)=\sum_{k\in Q}\mathcal{P}(Y=y\mid X=k)\cdot \mathcal{P}(X=k)=\sum_{k\in Q}\mathcal{P}(Y[X=k]=y)\cdot \mathcal{P}(X=k)
$$

#### 2.1.3 Example

- Let $n\in\mathbb{N},p\in[0,1]$
- Let $X\sim \mathcal{D}(1,n)$
- Let $Y\sim \mathcal{D}(1,X).$ It can be thought as following a Bernoulli distribution with a random size $X$ 

**Our goal is to calculate the probability distribution of $Y$, and then its expected value and variance**

We will start by the probability distribution function, as it represents the distribution of $Y$
$$
\begin{align*}
\forall k \in \{1,\dots,n\},\quad \mathcal{P}(Y=k)&=\sum_{s=1}^n\mathcal{P}(Y=k \mid X=s)\mathcal{P}(X=s)\\
&=\frac{1}{n}\sum_{s=1}^n \frac{\mathbb{1}_{[1,s]}(k)}{s} \\
&=\frac{1}{n}\sum_{s=k}^n \frac{1}{s}\\
\end{align*}
$$
For the expected value $\mathbb{E}[Y]$, we have:
$$
\begin{align*}
\forall k\in\{1,\dots,n\},\quad \mathbb{E}[Y\mid X=k]&=\frac{k+1}{2}\\
\implies \mathbb{E}[Y\mid X]&=\frac{X+1}{2}\\
\implies \mathbb{E}[Y]&=\mathbb{E}[\mathbb{E}[Y\mid X]] \\
&=\frac{1}{2}\mathbb{E}[X]+\frac{1}{2}\\
&=\frac{n+1}{4}+\frac{1}{2}\\
&=\frac{n+3}{4}
\end{align*}
$$
To calculate the variance, we will start by the conditional variance :
$$
\begin{align*}
\forall k\in\{1,\dots,n\},\quad \mathbb{V}[Y\mid X=k]&=\frac{k^2-1}{12}\\
\implies \mathbb{V}[Y\mid X]&=\frac{X^2-1}{12}
\end{align*}
$$
Now, we will calculate the variance $\mathbb{V}[Y]$ using the theorem of total variance:
$$
\begin{align*}
\mathbb{V}[Y]&=\mathbb{V}[\mathbb{E}[Y\mid X]] + \mathbb{E}[\mathbb{V}[Y\mid X]]\\
&=\mathbb{V}\left[\frac{X+1}{2}\right]+\mathbb{E}\left[\frac{X^2-1}{12}\right] \\
&=\frac{1}{4}\mathbb{V}[X]+\frac{1}{12}\mathbb{E}[X^2]-\frac{1}{12}\\
&=\frac{1}{4}\mathbb{V}[X]+\frac{1}{12}(\mathbb{V}[X]+\mathbb{E}[X]^2)-\frac{1}{12}\\
&=\frac{1}{3}\mathbb{V}[X]+\frac{1}{12}\mathbb{E}[X]^2-\frac{1}{12}\\
&=\frac{n^2-1}{36}+\frac{(n+1)^2}{48}-\frac{1}{12}\\
&=\frac{4n^2-4+3n^2+6n+3-12}{144}\\
&=\frac{7n^2+6n-13}{144}\\
&=\frac{(n-1)(7n+13)}{144}
\end{align*}
$$






### 2.2 Compounding with a continuous random variable

#### 2.2.1 Definition

- Let $\mathcal{D}$ a family of distributions with parameter $s\in S$ and values on $A$
- Let $X$ be a continuous distribution with values on $Q\subseteq S$

a discrete random variable $Y$ is said to follow the compound distribution $\mathcal{D}(X)$ if:
$$
\forall k \in Q, \quad Y[X=k]\sim \mathcal{D}(k)
$$

#### 2.2.2 Probability Mass function

$$
\forall y \in A,\quad \mathcal{P}(Y=y)=\int_Q\mathcal{P}(Y=y\mid X=t)\cdot f_X(t)\space \text{dt}=\int_Q\mathcal{P}(Y[X=t]=y)\cdot f_X(t)\space \text{dt}
$$



#### 2.2.3 Example

- Let $n\in\mathbb{N}$

- Let $X\sim \mathcal{U}(0,1)$
- Let $Y\sim \mathcal{B}(n,X).$ It can be thought as following a Bernoulli distribution with a random probability $X$ 

**Our goal is to calculate the probability distribution of $Y$, and then its expected value and variance**

We will start by the probability distribution function, as it represents the distribution of $Y$
$$
\begin{align*}
\forall k \in \{0,\dots,n\}, \mathcal{P}(Y=k)&=\int_{0}^1\mathcal{P}(Y=k \mid X=p)\cdot f_X(p)\space \text{dp}\\
&=\int_{0}^{1}{n \choose k}p^k(1-p)^{n-k} \space\text{dp} \\
&={n\choose k}\Beta(k+1,n-k+1) \quad \text{Where}\space \Beta \space \text{is the Beta function}\\
&={n\choose k}\frac{\Gamma(k+1)\Gamma(n-k+1)}{\Gamma(n+2)} \quad \text{as} \space \Beta(x,y)=\frac{\Gamma(x)\Gamma(y)}{\Gamma(x+y)}\\
&={n\choose k}\frac{k!(n-k)!}{(n+1)!}\\
&={n\choose k}\frac{k!(n-k)!}{(n+1)n!}\\
&=\frac{1}{n+1}\\
\implies Y &\space \text{follows the discrete uniform distribution} \space \mathcal{D}(0,n)
\end{align*}
$$


The expected value and variance are:
$$
\begin{align*}
\mathbb{E}[X]&=\frac{n+1}{2}\\
\mathbb{V}[X]&=\frac{(n+1)^2-1}{12}\\
&=\frac{n(n+2)}{12}
\end{align*}
$$




## 3. Discrete Compound Distribution 

A continuous compound distribution is a discrete distribution whose parameter is a random variable $X$.

For example, if $X\sim U(0,1)$,  $\mathcal{N}(X,1)$ is said to be a compound continuous distribution

We will analyse two cases:

+ The random variable $X$ is discrete
+ The random variable $X$ is continuous

### 3.1 Compounding by a discrete distribution

#### 3.1.1 Definition

- Let $\mathcal{D}$ a family of distributions with parameter $s\in S$ and values on $A$
- Let $X$ be a discrete distribution with values on $Q\subseteq S$

a continuous random variable $Y$ is said to follow the compound distribution $\mathcal{D}(X)$ if:
$$
\forall k \in Q, \quad Y[X=k]\sim \mathcal{D}(k)
$$

#### 3.1.2 Probability Mass function

$$
\forall y \in A,\quad f_Y(y)=\sum_{k\in Q}f_{Y[X=k]}(y)\cdot \mathcal{P}(X=k)
$$



#### 3.1.3 Example 

- Let $p\in\space ]0,1]$

- Let $X\sim \mathcal{G}(p)$
- Let $Y\sim \mathcal{U}(0,X).$ It can be thought as following a uniform distribution with a random parameter $X$ 

**Our goal is to calculate the probability distribution of $Y$, and then its expected value**

We will start by the probability distribution function, as it represents the distribution of $Y$
$$
\begin{align*}
\forall y \in\mathbb{R}^*_+, f_Y(y)&= \sum_{n\in\mathbb{N}^*}f_{Y[X=n]}(y)\mathcal{P}(X=n) \\
&=\sum_{n\in\mathbb{N}^*}\frac{p}{n}(1-p)^{n-1}\mathbb{1}_{[0,n]}(y)\\
&=\sum_{n=\lceil y \rceil}^{+\infty}\frac{p}{n}(1-p)^{n-1}
\end{align*}
$$

The expected Value $\mathbb{E}[Y]$ is:
$$
\begin{align*}
\mathbb{E}[Y]&=\int_{\mathbb{R}_+}yf_Y(y)\space \text{dy}\\
&=\int_{\mathbb{R}_+}y\sum_{n=\lceil y \rceil}^{+\infty}\frac{p}{n}(1-p)^{n-1} \space \text{dy} \\
&=\sum_{m\in\mathbb{N}}\int_{m}^{m+1}\sum_{n=m+1}^{+\infty}y\frac{p}{n}(1-p)^{n-1} \text{dy} \\
&=\sum_{m\in\mathbb{N}}\sum_{n=m+1}^{+\infty}\frac{p}{n}(1-p)^{n-1}\int_{m}^{m+1}y\space \text{dy}\\
&=\sum_{m\in\mathbb{N}}\sum_{n=m+1}^{+\infty}\frac{p}{n}(1-p)^{n-1}\left[\frac{y^2}{2}\right]^{m+1}_m\\
&=\sum_{m\in\mathbb{N}}\sum_{n=m+1}^{+\infty}\frac{p}{n}(1-p)^{n-1}\frac{2m+1}{2}\\
&=\sum_{n\in\mathbb{N}^*}\sum_{m=0}^{n-1}\frac{p}{n}(1-p)^{n-1}\frac{2m+1}{2}\\
&=\sum_{n\in\mathbb{N}^*}\frac{p}{2n}(1-p)^{n-1}\sum_{m=0}^{n-1}2m+1\\
&=\sum_{n\in\mathbb{N}^*}\frac{p}{2n}(1-p)^{n-1}n^2\\
&=\frac{1}{2}\sum_{n\in\mathbb{N}}np(1-p)^{n-1}\\
&=\frac{1}{2}\mathbb{E}[X]\\
&=\frac{1}{2p}
\end{align*}
$$



It can be also calculated directly using the law of total expectation:
$$
\begin{align*}
\mathbb{E}[Y]&=\mathbb{E}[\mathbb{E}[Y\mid X]] \\
&= \sum_{n\in\mathbb{N}^*}\mathbb{E}[Y\mid X=n]\cdot \mathcal{P}(X=n)\\
&=\sum_{n\in\mathbb{N}^*}\frac{n}{2}p(1-p)^n \quad \text{since } Y[X=n] \sim \mathcal{U}(0,n)\\
&=\frac{1}{2}\mathbb{E}[X]\\
&=\frac{1}{2p}
\end{align*}
$$
A third method close to method 2 is to express $\mathbb{E}[Y\mid X]$ as a function of $X$:
$$
\begin{align*}
\forall n\in\mathbb{N}^*,\quad \mathbb{E}[Y\mid X=n]&=\frac{n}{2} \quad \text{as }Y[X=n]\sim\mathcal{U}(0,n)\\
\implies \mathbb{E}[Y\mid X]&=\frac{X}{2}\\
\implies \mathbb{E}[Y]&=\mathbb{E}[\mathbb{E}[Y\mid X]]\\
&=\mathbb{E}\left[\frac{X}{2}\right]\\
&=\frac{1}{2}\mathbb{E}[X]\\
&=\frac{1}{2p}
\end{align*}
$$


*This example may illustrate how using the right tools can simplify your work and make your engineering life easier :smile:*

We can go further, and calculate the variance of $Y$

First of all, we calculate the conditional variance, given $X$:
$$
\begin{align*}
\forall n\in\mathbb{N}^*,\quad \mathbb{V}[Y\mid X=n]&=\frac{n^2}{12} \quad \text{since} \space Y[X=n]\sim\mathcal{U}(0,n) \\
\implies \mathbb{V}[Y \mid X]&=\frac{1}{12}X^2
\end{align*}
$$


Now using the law of total variance:
$$
\begin{align*}
\mathbb{V}[Y]&=\mathbb{E}[\mathbb{V}[Y\mid X]]+\mathbb{V}[\mathbb{E}[Y\mid X]]\\
&= \frac{1}{12}\mathbb{E}[X^2]+\mathbb{V}\left[\frac{1}{2}X\right] \\
&=\frac{1}{12}\mathbb{V}[X]+\frac{1}{12}\mathbb{E}[X]^2+\frac{1}{4}\mathbb{V}[X]\\
&= \frac{1}{3}\mathbb{V}[X]+\frac{1}{12}\mathbb{E}[X]^2\\
&=\frac{1}{3}\cdot\frac{1-p}{p^2}+\frac{1}{12p^2}\\
&=\frac{1}{12}\cdot \frac{5-4p}{p^2}
\end{align*}
$$





### 3.2 Compounding by a continuous distribution

#### 3.2.1 Definition

- Let $\mathcal{D}$ a family of distributions with parameter $s\in S$ and values on $A$
- Let $X$ be a continuous distribution with values on $Q\subseteq S$

a discrete random variable $Y$ is said to follow the compound distribution $\mathcal{D}(X)$ if:
$$
\forall k \in Q, \quad Y[X=k]\sim \mathcal{D}(k)
$$

#### 3.2.2 Probability Mass function

$$
\forall y \in A,\quad f_Y(y)=\int_Qf_{Y[X=t]}(y)\cdot f_X(t)\space \text{dt}
$$



#### 3.2.3 Example

- Let $p\in[0,1]$
- Let $X\sim \mathcal{U}(0,1)$
- Let $Y\sim \mathcal{E}(X)$ is a compound distribution, it can be thought as following a gamma distribution with random parameter $X$

**Our goal is to represent the distribution of $Y$, its expected value and its variance**

We will start by the probability distribution function
$$
\begin{align*}
\forall y \in\mathbb{R}^*_+, f_Y(y)&=\int_{\mathbb{R}}f_{Y[X=t]}(y)\cdot f_X(t)\space \text{dt}\\
&=\int_{0}^{1}te^{-ty} \space\text{dt} \\
&=\left[\frac{-te^{-ty}}{y}\right]^{1}_0+\frac{1}{y}\int_0^1e^{-ty}\text{dt} \\
&=\frac{-e^{-y}}{y}+\left[\frac{-e^{-ty}}{y^2}\right]^{1}_0\\
&=\frac{-e^{-y}}{y}+\frac{1-e^{-y}}{y^2}\\
&=\frac{1-e^{-y}-ye^{-y}}{y^2}\\
&=\frac{e^y-1-y}{y^2e^y}\\
f_Y(0)&=\int_{0}^1t\text{dt}\\
&=\frac{1}{2}
\end{align*}
$$



For the expected value, we will use the theorem of total expectation:
$$
\begin{align*}
\mathbb{E}[Y]&=\mathbb{E}[\mathbb{E}[Y\mid X]] \\
&=\int_0^1 \mathbb{E}[Y\mid X=t]\mathcal{P}(X=t)\text{dt}\\
&=\int_0^1\frac{1}{t} \text{dt} =+\infty\quad \text{diverges}
\end{align*}
$$
So this probability distribution does not have a mean value, and by extension it does not have a variance.

*This example serves as a proof that not all distributions have a mean value and/or a variance*

By contrast, the random variable $Z=\sqrt{Y}$ has a finite mean value, but does not have a variance (if it had one, $Y$ should then have a finite expected value):
$$
\begin{align*}
\mathbb{E}[Z]&=\mathbb{E}[\mathbb{E}[\sqrt{Y}\mid X]] \\
&=\int_0^1 \mathbb{E}[\sqrt{Y}\mid X=t]\mathcal{P}(X=t)\text{dt}\\
&=\int_0^1\frac{1}{\sqrt{t}} \text{dt} \\
&= \left[2\sqrt{t}\right]^{1}_0\\
&=2
\end{align*}
$$
