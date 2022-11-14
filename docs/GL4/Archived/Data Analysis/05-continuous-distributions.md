---
slug: /gl4/archived/data-analysis/05-continuous-distributions
---

# Continuous Distributions 1

## 1. Uniform Distribution {#uniform-distribution}

### 1.1 Definition

A continuous random variable $X$ is said to follow the uniform distribution on an interval $[a,b]$ with $a<b$ denoted by $\mathcal{U}(a,b)$ if:

$$
f_X(x)=\begin{cases}
\frac{1}{b-a} &x\in[a,b]\\
0 & \text{otherwise}
\end{cases}
$$

## 1.2 Significance

In [probability theory](https://en.wikipedia.org/wiki/Probability_theory) and [statistics](https://en.wikipedia.org/wiki/Statistics), the **continuous uniform distribution** or **rectangular distribution** is a family of [symmetric](https://en.wikipedia.org/wiki/Symmetric_distribution) [probability distributions](https://en.wikipedia.org/wiki/Probability_distributions). The distribution describes an experiment where there is an arbitrary outcome that lies between certain bounds. The bounds are defined by the parameters, _a_ and _b_, which are the minimum and maximum values. The interval can either be [closed](https://en.wikipedia.org/wiki/Closed_interval) (e.g. $[a,b]$) or [open](https://en.wikipedia.org/wiki/Open_Interval) (e.g. $]a,b[$).

### 1.2 Standard Uniform distribution

It is the uniform distribution on the interval $[0,1]$:

$$
\mathcal{U}=\mathcal{U}(0,1)
$$

### 1.2 Opposite of Uniform Random Variable

Let $X \sim \mathcal{U}(a,b)$

$$
\begin{align*}
\forall x\in\mathbb{R},F_{-X}(x)&=\mathcal{P}(-X<x)\\
&=\mathcal{P}(X>-x)\\
&=1-F_X(-x)\\
\forall x\in\mathbb{R},f_{-X}(x)&=f'_X(-x)\\
&=\frac{1}{b-a}\mathbb{1}_{[a,b]}(-x)\\
&=\frac{1}{(-a)-(-b)}\mathbb{1}_{[-b,-a]}(x)\\
\implies -X&\sim\mathcal{U}(-b,-a)
\end{align*}
$$

### 1.3 Linear Transformation of a Uniform Random Variable

- Let $\alpha \in\mathbb{R}_+^*,\beta\in\mathbb{R}$
- Let $a,b\in\mathbb{R}$ with $a<b$
- Let $X\sim \mathcal{U}(a,b)$ and $Y=\alpha X+b$

$$
\begin{align*}
\forall x\in\mathbb{R},F_Y(x)&=\mathcal{P}(Y< x)\\
&=\mathcal{P}(\alpha X< x-\beta)\\
&= \mathcal{P}(X<\frac{x-\beta}{\alpha})\\
&=F_X\left(\frac{x-\beta}{\alpha}\right)\\
\implies \forall x\in\mathbb{R},F_Y(x)&=\frac{1}{a}F_X'\left(\frac{x-\beta}{\alpha}\right)\\
&=\frac{1}{\alpha}f_X(\frac{x-\beta}{\alpha})\\
&= \frac{1}{\alpha(b-a)} \mathbb{1}_{[a,b]}(\frac{x-\beta}{\alpha}) \\
&= \frac{1}{\alpha b-\alpha a}\mathbb{1}_{[\alpha a +\beta,\alpha b +\beta]}(x) \\
&= \frac{1}{(\alpha b +\beta) - (\alpha a +\beta)}\mathbb{1}_{[\alpha a +\beta,\alpha b +\beta]}(x) \\
\implies &Y\sim \mathcal{U}(\alpha a+\beta,\alpha b+\beta)
\end{align*}
$$

In particular:

$$
\boxed{X\sim\mathcal{U}(a,b)\iff \frac{X-a}{b-a}\sim\mathcal{U}(0,1)}
$$

For $\alpha < 0$, We have $Y=\alpha X+\beta=-\left(-\alpha X-\beta\right).$

We have:

$$
-\alpha X -\beta \sim \mathcal{U}(-\alpha a-\beta,-\alpha b-\beta) \implies \alpha X+\beta \sim\mathcal{U}(\alpha b+\beta,\alpha a+\beta)
$$

### 1.4 Moments & Central Moments

#### 1.4.1 Moments

$$
\begin{align*} \forall n\in\mathbb{N}^*,\quad \mathbb{E}[X^n]&=\int_{a}^b \frac{x^n}{b-a} \text{dx}\\
&=\frac{b^{n+1}-a^{n+1}}{(n+1)(b-a)}
\end{align*}
$$

In particular, the expected value $\mathbb{E}[X]$ is

$$
\boxed{\mathbb{E}[X]=\frac{a+b}{2}}
$$

#### 1.4.1 Central Moments

For $n\in\mathbb{N}^*$, the $n^\text{th}$-central moment of $X$ is the $n^\text{th}$-moment of $X-\mathbb{E}[X]$

But $X-\mathbb{E}[X]\sim \mathcal{U}(\frac{a-b}{2},\frac{b-a}{2})$

$$
\begin{align*} \forall n \in\mathbb{N}^*,\quad \mathbb{E}\left[\left(X-\mathbb{E}[X]\right)^n\right]&=\frac{(\frac{b-a}{2})^{n+1}-(\frac{a-b}{2})^{n+1}}{(n+1)(\frac{b-a}{2}-\frac{a-b}{2})} \\
&=\frac{1-(-1)^{n+1}}{2^n(n+1)}\cdot\frac{(b-a)^n}{b-a}
\end{align*}
$$

In particular, the variance $\mathbb{V}[X]$ is:

$$
\boxed{\mathbb{V}[X]=\frac{(b-a)^2}{12}}
$$

## 2. Exponential Distribution {#exponential-distribution}

### 2.1 Definition

A continuous random variable $X$ is said to follow the exponential distribution with paramter $\lambda\in\mathbb{R}_+^*$ if:

$$
f_X(x)=\begin{cases}
\lambda e^{-\lambda x} &x \in\mathbb{R}_+ \\
0 & \text{otherwise}
\end{cases}
$$

We denote it by:

$$
X \sim \mathcal{E}(\lambda)
$$

### 2.2 Significance

The exponential distribution is the probability distribution of the time between events in a Poisson point process. It is the continuous analogue of the geometric distribution, and it has the key property of being memoryless.

It is used to model radioactive decay.

### 2.3 Moments

#### 2.3.1 Raw Moments

$$
\begin{align*}
\forall n\in\mathbb{N},\quad \mathbb{E}[X^n]&=\int_{\mathbb{R}_+}\lambda t^ne^{-\lambda t} \text{dt}\\
&= \int_{\mathbb{R}_+}\left(\frac{u}{\lambda}\right)^ne^{-u} \text{du} \quad \text{with} \space u=\lambda t,\quad \text{du}=\lambda\text{dt}\\
&=\lambda^{-n}\int_{\mathbb{R}_+}u^ne^{-u} \text{du}\\
&=\frac{\Gamma(n+1)}{\lambda^n}\\
&=\frac{n!}{\lambda^n}
\end{align*}
$$

In particular, the expected value $\mathbb{E}[X]$ is:

$$
\boxed{\mathbb{E}[X]=\frac{1}{\lambda}}
$$

#### 2.3.2 Central moments

$$
\begin{align*}
\forall n\in\mathbb{N},\quad \mathbb{E}\left[\left(X-\mathbb{E}[X]\right)^n\right]&=\sum_{k=0}^n(-1)^{n-k}{n \choose k}\mathbb{E}[X^k]\mathbb{E}[X]^{n-k}\\
&=\sum_{k=0}^n(-1)^{n-k}{n \choose k}\frac{k!}{\lambda^n}\\
&=\frac{1}{\lambda^n}\sum_{k=0}^n(-1)^{n-k}\frac{n!}{(n-k)!}
\end{align*}
$$

In particular, the variance $\mathbb{V}[X]$ is:

$$
\boxed{\mathbb{V}[X]=\mathbb{E}[X^2]-\mathbb{E}[X]^2=\frac{2}{\lambda^2}-\frac{1}{\lambda^2}=\frac{1}{\lambda^2}}
$$

### 2.4 Memoryless

Memory-less is a fundamental property in the exponential distribution, It states:

$$
\forall T,r\in\mathbb{R}_+,\quad \mathcal{P}(X \ge T+r \mid X\ge T)=\mathcal{P}(X\ge r)
$$

The proof is as follow:

$$
\begin{align*}
\forall T,r\in\mathbb{R}_+,\quad \mathcal{P}(X \ge T+r \mid X\ge T)&=\frac{\mathcal{P}(X \ge T+r)}{\mathcal{P}(X\ge T)}\\
&=\frac{\int_{T+r}^{+\infty}\lambda e^{-\lambda u}\text{du}}{\int_{T}^{+\infty}\lambda e^{-\lambda u}\text{du}} \\
&=\frac{e^{-(T+r)\lambda}}{e^{-T\lambda}}\\
&=e^{-\lambda r}\\
&=\mathcal{P}(X \ge r)
\end{align*}
$$

### 2.5 Scaling

- Let $k\in\mathbb{R}_+^*$
- Let $X\sim \mathcal{E}(\lambda)$ and $Y=kX$

We will calculate the probability distribution function of $Y:$

$$
\begin{align*}
\forall x\in\mathbb{R}_+,\quad f_Y(x)&=\frac{1}{k}f_X\left(\frac{x}{k}\right)\\
&=\frac{\lambda}{k}e^{-\frac{\lambda}{k}x}
\end{align*}
$$

By that:

$$
\boxed{\forall k\in\mathbb{R}_+^*,\quad X\sim \mathcal{E}(\lambda) \iff kX\sim \mathcal{E}\left(\frac{\lambda}{k}\right)}
$$
