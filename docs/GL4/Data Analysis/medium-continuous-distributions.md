# Continuous Distributions 2

## 1. Normal Distribution {#normal-distribution}

### 1.1 Definition

A continuous random variable $X$ is said to follow the normal distribution with mean $\mu$ and variance $\sigma^2$ if:
$$
f_X(x)=\frac{1}{\sqrt{2\pi}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}
$$

### 1.2 Significance

Normal distributions are important in [statistics](https://en.wikipedia.org/wiki/Statistics) and are often used in the [natural](https://en.wikipedia.org/wiki/Natural_science) and [social sciences](https://en.wikipedia.org/wiki/Social_science) to represent real-valued [random variables](https://en.wikipedia.org/wiki/Random_variable) whose distributions are not known.

Their importance is partly due to the [central limit theorem](https://en.wikipedia.org/wiki/Central_limit_theorem). It states that, under some conditions, the average of many samples (observations) of a random variable with finite mean and variance is itself a random variable—whose distribution [converges](https://en.wikipedia.org/wiki/Convergence_in_distribution) to a normal distribution as the number of samples increases. Therefore, physical quantities that are expected to be the sum of many independent processes, such as [measurement errors](https://en.wikipedia.org/wiki/Measurement_error), often have distributions that are nearly normal.

### 1.3 Standard Normal distribution

It is the normal distribution with unit mean and unit variance:

$$
\mathcal{S}\mathcal{N}=\mathcal{N}(0,1)
$$

### 1.4 Linear Transformation of a Normal random variable

#### 1.4.1 Opposite of standard normal random variable

Let $X\sim\mathcal{N}(0,1)$
$$
\begin{align*}
\forall x\in\mathbb{R},F_{-X}(x)&=\mathcal{P}(-X<x)\\
&=\mathcal{P}(X>-x)\\
&=\int_{-x}^{+\infty}\frac{1}{\sqrt{2\pi}}e^{-\frac {t^2}{2}}\text{dt}\\
&=\int_{-\infty}^{x}\frac{1}{\sqrt{2\pi}}e^{-\frac{u^2}{2}}\text{dt} \text{ with }u=-t\\
&=\mathcal{P}(X<x)\\
&=F_X(x)
\end{align*}
$$
As a conclusion:
$$
X\sim\mathcal{N}(0,1)\implies -X\sim \mathcal{N}(0,1)
$$

#### 1.4.2 Linear tranformation of a Normal random variable

- Let $a\in\mathbb{R}^*_+,b\in\mathbb{R},\mu\in\mathbb{R},\sigma\in\mathbb{R}_+^*$

- Let $X\sim \mathcal{N}(\mu,\sigma),Y=aX+b$

$$
\begin{align*}
\forall x\in\mathbb{R},F_Y(x)&=\mathcal{P}(Y< x)\\
&=\mathcal{P}(aX< x-b)\\
&= \mathcal{P}(X<\frac{x-b}{a})\\
&=F_X\left(\frac{x-b}{a}\right)\\
\implies \forall x\in\mathbb{R},F_Y(x)&=\frac{1}{a}F_X'\left(\frac{x-b}{a}\right)\\
&=\frac{1}{a}f_X(\frac{x-b}{a})\\
&=\frac{1}{\sqrt{2\pi}\sigma a}e^{-\frac{\left(\tfrac{x-b}{a}-\mu\right)^2}{2\sigma^2}}\\
&=\frac{1}{\sqrt{2\pi}\sigma a}e^{-\frac{\left(x-b-a\mu\right)^2}{2a^2\sigma^2}} \\
\implies &aX+b\sim\mathcal{N}(a\mu+b,a^2\sigma^2)
\end{align*}
$$

In particular:
$$
\boxed{X\sim\mathcal{N}(\mu,\sigma^2)\iff \frac{X-\mu}{\sigma}=\frac{X-\mathbb{E}[X]}{\sqrt{\mathbb{V}[X]}}\sim\mathcal{N}(0,1)}
$$

- For $a<0,$ we have $\frac{X-\mu}{\sigma} \sim \mathcal{N}(0,1)$, so $-\frac{X-\mu}{\sigma}\sim\mathcal{N}(0,1)$ .

  We have then, $-X+\mu\sim\mathcal{N}(0,\sigma^2)\implies -X\sim\mathcal{N}(-\mu,\sigma^2).$

  Which implies the following:
  $$
  aX+b=(-a)(-X)+b\sim \mathcal{N}((-a)(-\mu)+b,(-a)^2\sigma^2)=\mathcal{N}(a\mu+b,a^2\sigma^2)
  $$

As a conclusion:
$$
\boxed{X\sim \mathcal{N}(\mu,\sigma)\implies ax+b\sim\mathcal{N}\left(a\mu+b,a^2\sigma^2\right)}
$$

### 1.5 Moments

#### 1.5.1 Moment of a centered Normal distribution

Let $X\sim \mathcal{U}(0,\sigma^2),$ we have:
$$
\begin{align*}
\forall n\in\mathbb{N}_{\ge 2},\quad \mathbb{E}[X^n] &=\int_{\mathbb{R}}x^{n}f_X(x)\space \text{dx}\\
&=\int_{\mathbb{R}}\frac{1}{\sqrt{2\pi}\sigma}x^{n}e^{-\frac{x^2}{2\sigma^2}}\space \text{dx}\\
&=\int_{\mathbb{R}}\frac{1}{\sqrt{2\pi}\sigma}x^{n-1}xe^{-\frac{x^2}{2\sigma^2}}\space \text{dx}\\
&=\left[\left(\frac{(n-1)x^{n-2}}{n\sqrt{2\pi}\sigma}\right)\times \left(-\sigma^2e^{-\frac{x^2}{2\sigma^2}}\right)\right]^{+\infty}_{-\infty}-\int_{\mathbb{R}}\left(\frac{(n-1)x^{n-2}}{\sqrt{2\pi}\sigma}\right)\times\left(-\sigma^2e^{-\frac{x^2}{2\sigma^2}}\right) \space \text{dx}\\
&=(n-1)\sigma^2\mathbb{E}[X^{n-2}]\\
\implies \forall n\in\mathbb{N}_{\ge 2},\quad \mathbb{E}[X^n]&=\mathbb{E}[X^{n \bmod 2}]\prod_{k=1}^{\lfloor\frac{n}{2}\rfloor}\big((2k-1)\sigma^2\big) \\
&= \mathbb{E}[X^{n \bmod 2}]\sigma^{2\lfloor\frac{n}{2}\rfloor}\prod_{k=1}^{\lfloor\frac{n}{2}\rfloor}(2k-1)\\
\implies \forall n\in\mathbb{N}^*,\quad \mathbb{E}[X^{2n}]&= \sigma^{2n}\prod_{k=1}^{n}(2k-1)\\
&=\sigma^{2n}\frac{\prod_{k=1}^{n}2k(2k-1)}{\prod_{k=1}^n2k}\\
&=\sigma^{2n}\cdot \frac{(2n)!}{2^nn!}\\
\forall n\in\mathbb{N},\mathbb{E}[X^{2n+1}]&=0 \quad \text{because} \space \mathcal{N}(0,\sigma^2) \space \text{is symmetric}
\end{align*}
$$
In particular, the expected value $\mathbb{E}[X]$ is:
$$
\boxed{\mathbb{E}[X]=0}
$$
Also, the variance:
$$
\boxed{\mathbb{V}[X]=\sigma^2}
$$

#### 1.5.2 Central Moments

Let $X\sim \mathcal{N}(\mu,\sigma^2)$

As $\mathbb{E}\left[\left(X-\mathbb{E}[X]\right)\right] \sim \mathcal{N}(0,\sigma^2)$
$$
\forall n\in\mathbb{N}, \begin{cases}
\mathbb{E}\left[\left(X-\mathbb{E}[X]\right)^{2n}\right]&= \frac{(2n)!}{2^nn!}\sigma^{2n}\\
\mathbb{E}\left[\left(X-\mathbb{E}[X]\right)^{2n+1}\right]&=0
\end{cases}
$$

### 1.5.3 Non-central moments

Let $X\sim \mathcal{N}(\mu,\sigma^2)$
$$
\begin{align*}
\forall n\in\mathbb{N},\quad \mathbb{E}[X^{2n}]&=\mathbb{E}\left[\left(X-\mathbb{E}[X]+\mathbb{E}[X]\right)^{2n}\right] \\
&=\sum_{k=0}^{2n}{2n \choose k}\mathbb{E}[X]^{2n-k}\mathbb{E}\left[\left(X-\mathbb{E}[X]\right)^{k}\right] \\
&=\sum_{k=0}^{n}{2n \choose 2k}\mathbb{E}[X]^{2n-2k}\mathbb{E}\left[\left(X-\mathbb{E}[X]\right)^{2k}\right]\\
&=\sum_{k=0}^{n}{2n \choose 2k}\frac{(2k)!}{2^kk!}\mu^{2n-2k}\sigma^{2k} \\
\forall n\in\mathbb{N},\quad \mathbb{E}[X^{2n+1}]&=\mathbb{E}\left[\left(X-\mathbb{E}[X]+\mathbb{E}[X]\right)^{2n+1}\right] \\
&=\sum_{k=0}^{2n+1}{2n+1 \choose k}\mathbb{E}[X]^{2n+1-k}\mathbb{E}\left[\left(X-\mathbb{E}[X]\right)^{k}\right] \\
&=\sum_{k=0}^{n}{2n+1 \choose 2k}\mathbb{E}[X]^{2n+1-2k}\mathbb{E}\left[\left(X-\mathbb{E}[X]\right)^{2k}\right]\\
&=\sum_{k=0}^{n}{2n+1 \choose 2k}\frac{(2k)!}{2^kk!}\mu^{2n+1-2k}\sigma^{2k}
\end{align*}
$$

### 1.6 Sum of independent normal variables

#### 1.6.1 Case of two centered normal variables

- Let $X_1\sim \mathcal{N}(0,\sigma_1^2),X_2\sim\mathcal{N}(0,\sigma_2^2)$ two independent centered normal variables
- Let $Y=X_1+X_2$

$$
\begin{align*}
\forall x\in\mathbb{R},f_Y(x)&=\int_{\mathbb{R}}f_{X_1}(t)f_{X_2}(x-t)\text{dt}\\
&=\frac{1}{2\pi\sigma_1\sigma_2}\int_{\mathbb{R}}e^{-\left(\frac{t^2}{2\sigma_1^2}+\frac{(x-t)^2}{2\sigma_2^2}\right)}\text{dt}\\
&=\frac{1}{2\pi\sigma_1\sigma_2}\int_{\mathbb{R}}\exp\left(-\frac{1}{2}\left(\frac{t^2}{\sigma_1^2}+\frac{x^2-2xt+t^2}{\sigma_2^2}\right)\right)\text{dt}\\
&=\frac{e^{-\frac{x^2}{2\sigma_2^2}}}{2\pi\sigma_1\sigma_2}\int_{\mathbb{R}}\exp\left(-\frac{1}{2}\left(\left(\frac{1}{\sigma^2_1}+\frac{1}{\sigma_2^2}\right)t^2-2\frac{x}{\sigma_2^2}t\right)\right)\text{dt}\\
&=\frac{e^{-\frac{x^2}{2\sigma_2^2}}}{2\pi\sigma_1\sigma_2}\int_{\mathbb{R}}\exp\left(-\frac{1}{2}\left(\frac{t^2}{\sigma_*^2}-2\frac{x}{\sigma_2^2}t\right)\right)\text{dt}\text{with }\sigma_*^2=\frac{1}{\tfrac{1}{\sigma_1^2}+\tfrac{1}{\sigma_2^2}}\\
&=\frac{e^{-\frac{x^2}{2\sigma_2^2}}}{2\pi\sigma_1\sigma_2}\int_{\mathbb{R}}\exp\left(-\frac{1}{2\sigma_*^2}\left(t^2-2\frac{x\sigma_*^2}{\sigma_2^2}t\right)\right)\text{dt}\\
&=\frac{e^{-\frac{x^2}{2\sigma_2^2}}}{2\pi\sigma_1\sigma_2}\int_{\mathbb{R}}\exp\left(-\frac{1}{2\sigma_*^2}\left(\left(t^2-\frac{x\sigma_*^2}{\sigma_2^2}\right)^2-\frac{x^2\sigma_*^4}{\sigma_2^4}\right)\right)\text{dt} \\
&=\frac{e^{-\frac{x^2}{2\sigma_2^2}+\frac{x^2\sigma_*^2}{\sigma_2^4}}}{2\pi\sigma_1\sigma_2}\int_{\mathbb{R}}e^{-\frac{\left(t^2-\frac{x\sigma_*^2}{\sigma_2^2}\right)^2}{2\sigma_*^2}}\text{dt}\\
&=\frac{\sqrt{2\pi}\sigma_*e^{-\frac{x^2}{2\sigma_2^2}\left(\frac{\sigma_*^2}{\sigma^2_2}-1\right)}}{2\pi\sigma_1\sigma_2}\\
&=\frac{e^{\frac{x^2}{2\sigma_2^2}\left(\frac{1}{\sigma^2_2(\tfrac{1}{\sigma_1^2}+\tfrac{1}{\sigma_2^2})}-1\right)}}{\sqrt{2\pi}\tfrac{\sigma_1\sigma_2}{\sigma_*}}\\
&=\frac{e^{\frac{x^2}{2\sigma_2^2}\left(\frac{1}{\tfrac{\sigma^2_2}{\sigma_1^2}+1}-1\right)}}{\sqrt{2\pi\tfrac{\sigma_1^2\sigma_2^2}{\sigma_*^2}}}\\
&=\frac{e^{-\frac{x^2}{2\sigma_2^2}\cdot\frac{\sigma^2_2}{\sigma_1^2}\left(\frac{1}{\tfrac{\sigma^2_2}{\sigma_1^2}+1}\right)}}{\sqrt{2\pi\sigma_1^2\sigma_2^2\left(\tfrac{1}{\sigma_1^2}+\tfrac{1}{\sigma_2^2}\right)}}\\
&=\frac{e^{-\frac{x^2}{2}\cdot\frac{1}{\sigma_1^2+\sigma_2^2}}}{\sqrt{2\pi\left(\sigma_1^2+\sigma_2^2\right)}}\\
&=\frac{e^{-\frac{x^2}{2(\sigma_1^2+\sigma_2^2)}}}{\sqrt{2\pi}\cdot\sqrt{\sigma_1^2+\sigma_2^2}}
\end{align*}
$$

Conclusion:
$$
\boxed{Y\sim\mathcal{N}\left(0,\sigma_1^2+\sigma_2^2\right)}
$$

#### 1.6.2 Case of two independent normal variables

- Let $X_1\sim \mathcal{N}(\mu_1,\sigma_1^2),X_2\sim\mathcal{N}(\mu_2,\sigma_2^2)$ two independent normal variables
- Let $Y=X_1+X_2$

We have:
$$
\begin{cases}
X_1-\mu_1 \sim\mathcal{N}(0,\sigma_1^2)\\
X_2-\mu_2 \sim\mathcal{N}(0,\sigma_2^2)
\end{cases}
\implies (X_1-\mu_1)+(X_2-\mu_2)\sim\mathcal{N}\left(0,\sigma_1^2+\sigma_2^2\right)
$$
So we can conclude that:
$$
\boxed{Y=X_1+X_2\sim\mathcal{N}\left(\mu_1+\mu_2,\sigma_1^2+\sigma_2^2\right)}
$$

#### 1.6.3 General Case

- Let $n\in\mathbb{N}^*$
- Let $X_1\sim\mathcal{N}(\mu_1,\sigma_1^2),\dots,X_n\sim\mathcal{N}(\mu_n,\sigma_n^2)$  be $n$ independent random variables

It can be trivially concluded from $1.5.2$ that:
$$
\boxed{\sum_{i=1}^nX_i\sim\mathcal{N}\left(\sum_{i=1}^n\mu_i,\sum_{i=1}^n\sigma_i^2\right)}
$$

## 2. $\Gamma$ distributions {#gamma-distribution}

### 2.1 Definition

1. Let $\alpha,\beta\in\mathbb{R}_+^*$

2. Let $X$ a continuous random variable

By definition, $X$ is said to follow the gamma distribution of parameters $(\alpha,\beta)$ if:
$$
f_X(x)=\frac{x^{\alpha-1}\beta^\alpha e^{-\beta x}}{\Gamma(\alpha)}
$$
 We denote it by:
$$
X\sim \Gamma(\alpha,\beta)
$$

### 2.2 Significance

The gamma distribution has been used to model the size of [insurance claims](https://en.wikipedia.org/wiki/Insurance_policy) and rainfalls. This means that aggregate insurance claims and the amount of rainfall accumulated in a reservoir are modelled by a [gamma process](https://en.wikipedia.org/wiki/Gamma_process) – much like the [exponential distribution](https://en.wikipedia.org/wiki/Exponential_distribution) generates a [Poisson process](https://en.wikipedia.org/wiki/Poisson_process).

The gamma distribution is also used to model errors in multi-level [Poisson regression](https://en.wikipedia.org/wiki/Poisson_regression) models, because a [mixture](https://en.wikipedia.org/wiki/Mixture_distribution) of [Poisson distributions](https://en.wikipedia.org/wiki/Poisson_distribution) with gamma distributed rates has a known closed form distribution, called [negative binomial](https://en.wikipedia.org/wiki/Negative_binomial_distribution).

In wireless communication, the gamma distribution is used to model the [multi-path fading](https://en.wikipedia.org/wiki/Multi-path_fading) of signal power.

### 2.3 Exponential Distribution as a Gamma Distribution

We have:
$$
\mathcal{E}(\lambda)=\Gamma(1,\lambda)
$$

### 2.4 Moments

#### 2.4.1 Non-Central moments

Let $X\sim \Gamma(\alpha,\beta)$
$$
\begin{align*}
\forall n\in\mathbb{N},\quad \mathbb{E}[X^n]&=\int_{\mathbb{R}_+}x^nf_X(x) \space \text{dx}\\
&=\int_{\mathbb{R}_+}\frac{x^{\alpha+n-1}\beta^\alpha e^{-\beta x}}{\Gamma(\alpha)} \space \text{dx}\\
&=\frac{\Gamma(\alpha+n)}{\Gamma(\alpha)\beta^n}\int_{\mathbb{R}_+}\frac{x^{\alpha+n-1}\beta^{\alpha+n} e^{-\beta x}}{\Gamma(\alpha+n)} \space \text{dx}\\
&=\frac{\Gamma(\alpha+n)}{\Gamma(\alpha)\beta^n}\\
&=\beta^{-n}\prod_{i=0}^{n-1}\alpha+i
\end{align*}
$$
In particular, The expected value $\mathbb{E}[X]$ is:
$$
\boxed{\mathbb{E}[X]=\frac{\alpha}{\beta}}
$$

### 2.4.2 Central Moments

$$
\begin{align*}
\forall n\in\mathbb{N},\quad \mathbb{E}\left[\left(X-\mathbb{E}[X]\right)^n\right]&= \sum_{k=0}^n{n \choose k}(-1)^{n-k}\mathbb{E}[X^k]\mathbb{E}[X]^{n-k}\\
&=\sum_{k=0}^n {n \choose k}(-1)^{n-k}\frac{\alpha^{n-k}\Gamma(\alpha+k)}{\beta^n\Gamma(\alpha)}
\end{align*}
$$

In particular, the variance $\mathbb{V}[X]$ is:
$$
\boxed{\mathbb{V}[X]=\frac{\alpha^2\Gamma(\alpha)-2\alpha\Gamma(\alpha+1)+\Gamma(\alpha+2)}{\beta^2 \Gamma(\alpha)}=\frac{\alpha^2-2\alpha^2+\alpha(\alpha+1)}{\beta^2}=\frac{\alpha}{\beta^2}}
$$

### 2.5 Sum of gamma distributions

#### 2.5.1 Two gamma distributions

1. Let $\alpha_1,\alpha_2,\beta\in\mathbb{R}_+^*$
2. Let $X\sim \Gamma(\alpha_1,\beta), Y\sim\Gamma(\alpha_2,\beta),$ two independent random variables and let $Z=X+Y$.

$$
\begin{align*}
\forall x\in\mathbb{R}_+^*,f_Z(x)&=\int_{\mathbb{R}}f_X(t)f_Y(x-t)\text{dt}\\
&=\int_0^xf_X(t)f_Y(x-t)\text{dt}\\
&=\int_0^x\frac{t^{\alpha_1-1}\beta^{\alpha_1} e^{-\beta t}}{\Gamma(\alpha_1)}\cdot\frac{(x-t)^{\alpha_2-1}\beta^{\alpha_2} e^{-\beta (x-t)}}{\Gamma(\alpha_2)}\text{dt}\\
&=\frac{\beta^{\alpha_1+\alpha_2}e^{-\beta x}}{\Gamma(\alpha_1)\Gamma(\alpha_2)}\int_0^xt^{\alpha_1-1}(x-t)^{\alpha_2-1}\text{dt}\\
&=\frac{\beta^{\alpha_1+\alpha_2}e^{-\beta x}}{\Gamma(\alpha_1)\Gamma(\alpha_2)}\int_0^1(xu)^{\alpha_1-1}\left(x(1-u)\right)^{\alpha_2-1}x\space\text{du}\space \text{with }t=xu\\
&=\frac{\beta^{\alpha_1+\alpha_2}x^{\alpha_1+\alpha_2-1}e^{-\beta x}}{\Gamma(\alpha_1)\Gamma(\alpha_2)}\int_0^1u^{\alpha_1-1}\left(1-u\right)^{\alpha_2-1}\text{du}\\
&= \beta^{\alpha_1+\alpha_2}\frac{\Beta(\alpha_1,\alpha_2)}{\Gamma(\alpha_1)\Gamma(\alpha_2)}x^{\alpha_1+\alpha_2-1}e^{-\beta x}\\
&=\frac{\beta^{\alpha_1+\alpha_2}x^{\alpha_1+\alpha_2-1}e^{-\beta x}}{\Gamma(\alpha_1+\alpha_2)}\text{ because }\Beta(\alpha_1,\alpha_2)=\frac{\Gamma(\alpha_1)\Gamma(\alpha_2)}{\Gamma(\alpha_1+\alpha_2)}\\
\forall x\in\mathbb{R}_-,f_Z(x)&=0
\end{align*}
$$

So we can conclude that:
$$
\boxed{Z=X+Y\sim \Gamma(\alpha_1+\alpha_2,\beta)}
$$

#### 2.5.2 General Case

- Let $n\in\mathbb{N}^*$
- Let $X_1\sim\Gamma(\alpha_1,\beta),\dots,X_n\sim\Gamma(\alpha_n,\beta)$  be $n$ independents gamma distributions that have the same $\beta$ parameter

It can be proved by induction that:
$$
\boxed{\sum_{i=1}^nX_i\sim\Gamma\left(\sum_{i=1}^n\alpha_i,\beta\right)}
$$

### 2.6 Sum of Exponential distributions

- Let $n\in\mathbb{N}^*,\lambda\in\mathbb{R}_+^*$
- Let $X_1,\dots,X_n\sim\mathcal{E}(\lambda)$  be $n$ independent exponential random variables having the same parameter $\lambda$

This is a special case of $2.4:$
$$
\boxed{\sum_{i=1}^nX_i\sim\Gamma\left(n,\lambda\right)}
$$

### 2.7 Scaling of Gamma distributions

- Let $k\in\mathbb{R}_+^*$
- Let $X\sim \Gamma(\alpha,\beta)$ and $Y=kX$

We have:
$$
\begin{align*}
\forall x\in\mathbb{R}_+^*, \quad f_Y(x)&=\frac{1}{k}f\left(\frac{x}{k}\right)\\
&=\frac{1}{k}\cdot \frac{\beta^\alpha\left(\frac{x}{k}\right)^{\alpha-1}e^{\frac{-\beta}{k}x}}{\Gamma(\alpha)}\\
&=\frac{\left(\frac{\beta}{k}\right)^{\alpha}x^{\alpha-1}e^{\frac{-\beta}{k}x}}{\Gamma(\alpha)}
\end{align*}
$$
So we have $Y\sim \Gamma(\alpha,\frac{\beta}{k})$:
$$
\boxed{\forall k\in\mathbb{R}_+^*,\quad X\sim\Gamma(\alpha,\beta)\iff kX\sim \Gamma\left(\alpha,\frac{\beta}{k}\right)}
$$
