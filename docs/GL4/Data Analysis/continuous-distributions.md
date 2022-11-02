# Continuous Distributions 

## 1. Normal Distribution

### 1.1 Definition

A continuous random variable $X$ is said to follow the normal distribution with mean $\mu$ and variance $\sigma^2$ if:
$$
f_X(x)=\frac{1}{\sqrt{2\pi}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}
$$

### 1.2 Significance

Normal distributions are important in [statistics](https://en.wikipedia.org/wiki/Statistics) and are often used in the [natural](https://en.wikipedia.org/wiki/Natural_science) and [social sciences](https://en.wikipedia.org/wiki/Social_science) to represent real-valued [random variables](https://en.wikipedia.org/wiki/Random_variable) whose distributions are not known.

Their importance is partly due to the [central limit theorem](https://en.wikipedia.org/wiki/Central_limit_theorem). It states that, under some conditions, the average of many samples (observations) of a random variable with finite mean and variance is itself a random variable—whose distribution [converges](https://en.wikipedia.org/wiki/Convergence_in_distribution) to a normal distribution as the number of samples increases. Therefore, physical quantities that are expected to be the sum of many independent processes, such as [measurement errors](https://en.wikipedia.org/wiki/Measurement_error), often have distributions that are nearly normal.

Moreover, Gaussian distributions have some unique properties that are valuable in analytic studies. For instance, any linear combination of a fixed collection of normal deviates is a normal deviate. Many results and methods, such as [propagation of uncertainty](https://en.wikipedia.org/wiki/Propagation_of_uncertainty) and [least squares](https://en.wikipedia.org/wiki/Least_squares) parameter fitting, can be derived analytically in explicit form when the relevant variables are normally distributed.

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

- 

As a conclusion:
$$
\boxed{X\sim \mathcal{N}(\mu,\sigma)\implies ax+b\sim\mathcal{N}\left(a\mu+b,a^2\sigma^2\right)}
$$

### 1.5 Sum of independent normal variables

#### 1.5.1 Case of two centered normal variables

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

> Conclusion:
> $$
> Y\sim\mathcal{N}\left(0,\sigma_1^2+\sigma_2^2\right)
> $$

#### 1.5.2 Case of two independent normal variables

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

#### 1.5.3 General Case:

- Let $n\in\mathbb{N}^*$
- Let $X_1\sim\mathcal{N}(\mu_1,\sigma_1^2),\dots,X_n\sim\mathcal{N}(\mu_n,\sigma_n^2)$  be $n$ independent random variables

It can be trivially concluded from $1.5.2$ that:
$$
\boxed{\sum_{i=1}^nX_i\sim\mathcal{N}\left(\sum_{i=1}^n\mu_i,\sum_{i=1}^n\sigma_i^2\right)}
$$


## 2. $\Gamma$ distributions

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

The gamma distribution has been used to model the size of [insurance claims](https://en.wikipedia.org/wiki/Insurance_policy)[[22\]](https://en.wikipedia.org/wiki/Gamma_distribution#cite_note-22) and rainfalls.[[23\]](https://en.wikipedia.org/wiki/Gamma_distribution#cite_note-Aksoy-23) This means that aggregate insurance claims and the amount of rainfall accumulated in a reservoir are modelled by a [gamma process](https://en.wikipedia.org/wiki/Gamma_process) – much like the [exponential distribution](https://en.wikipedia.org/wiki/Exponential_distribution) generates a [Poisson process](https://en.wikipedia.org/wiki/Poisson_process).

The gamma distribution is also used to model errors in multi-level [Poisson regression](https://en.wikipedia.org/wiki/Poisson_regression) models, because a [mixture](https://en.wikipedia.org/wiki/Mixture_distribution) of [Poisson distributions](https://en.wikipedia.org/wiki/Poisson_distribution) with gamma distributed rates has a known closed form distribution, called [negative binomial](https://en.wikipedia.org/wiki/Negative_binomial_distribution).

In wireless communication, the gamma distribution is used to model the [multi-path fading](https://en.wikipedia.org/wiki/Multi-path_fading) of signal power.

### 2.3 $\mathcal{E}(\lambda)=\Gamma(1,\lambda)$

This can be checked easily

### 2.4 Sum of gamma distributions

#### 2.4.1 Two gamma distributions

1. Let $\alpha_1,\alpha_2,\beta\in\mathbb{R}_+^*$
2. Let $X\sim \Gamma(\alpha_1,\beta), Y\sim\Gamma(\alpha_2,\beta),$ two independent random variables and let $Z=X+Y$ 

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

#### 2.4.2 General Case

- Let $n\in\mathbb{N}^*$
- Let $X_1\sim\Gamma(\alpha_1,\beta),\dots,X_n\sim\Gamma(\alpha_n,\beta)$  be $n$ independents gamma distributions have the same $\beta$ parameter

​	It can be proved by induction that:
$$
\boxed{\sum_{i=1}^nX_i\sim\Gamma\left(\sum_{i=1}^n\alpha_i,\beta\right)}
$$

### 2.5 Sum of Exponential distributions:

- Let $n\in\mathbb{N}^*,\lambda\in\mathbb{R}_+^*$
- Let $X_1,\dots,X_n\sim\mathcal{E}(\lambda)$  be $n$ independents exponential random variables having the same parameter $\lambda$

This is a special case of $2.4:$
$$
\boxed{\sum_{i=1}^nX_i\sim\Gamma\left(n,\lambda\right)}
$$

## 3. $\chi^2$ distributions

### 3.1 Definition

Let $X$ be a continuous random variable.

By definition, $X$ is said to follow the $\chi^2$ distribution with $k$ degrees of freedom if
$$
X\sim \Gamma(\frac{k}{2},\frac{1}{2})=\chi^2_k
$$

### 3.2 Significance

For $k\in\mathbb{N},$ The $\chi^2_k$ distribution is the distribution of the sum of square of $k$ independent standard normal random variables.

The chi-squared distribution is a special case of the [gamma distribution](https://en.wikipedia.org/wiki/Gamma_distribution) and is one of the most widely used [probability distributions](https://en.wikipedia.org/wiki/Probability_distribution) in [inferential statistics](https://en.wikipedia.org/wiki/Inferential_statistics), notably in [hypothesis testing](https://en.wikipedia.org/wiki/Hypothesis_testing) and in construction of [confidence intervals](https://en.wikipedia.org/wiki/Confidence_interval).

The chi-squared distribution is used in the common [chi-squared tests](https://en.wikipedia.org/wiki/Chi-squared_test) for [goodness of fit](https://en.wikipedia.org/wiki/Goodness_of_fit) of an observed distribution to a theoretical one, the [independence](https://en.wikipedia.org/wiki/Statistical_independence) of two criteria of classification of [qualitative data](https://en.wikipedia.org/wiki/Data_analysis), and in confidence interval estimation for a population [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) of a normal distribution from a sample standard deviation. Many other statistical tests also use this distribution, such as [Friedman's analysis of variance by ranks](https://en.wikipedia.org/wiki/Friedman_test).

### 3.3 Square of a standard normal random variable

Let $X\in\mathcal{N}(0,1),$ and let $Y=X^2$
$$
\begin{align*}
\forall x\in\mathbb{R}_+^*,F_Y(x)&=\mathcal{P}(X^2<x)\\
&=\mathcal{P}(-\sqrt{x}<X<\sqrt{x})\\
&=\frac{1}{\sqrt{2\pi}}\int_{-\sqrt{x}}^{\sqrt{x}}e^{-\frac{t^2}{2}}\text{dt}\\
&=\frac{\sqrt{2}}{\sqrt{\pi}}\int_{0}^{\sqrt{x}}e^{-\frac{t^2}{2}}\text{dt}\\
\implies\forall x\in\mathbb{R}_+^*,f_Y(x)&=F_Y'(x)\\
&=\frac{1}{2\sqrt{x}}\cdot\left(\frac{\sqrt{2}}{\sqrt{\pi}}e^{-\frac{(\sqrt x)^2}{2}}\right)\\
&=\frac{1}{\sqrt{2\pi}}e^{-\frac{x}{2}}
\end{align*}
$$
$\forall x\leq0,$ it is trivial that $F_Y(x)=0,$ So consequently $\forall x\leq 0,f_Y(x)=0$

So we can conclude that:
$$
\boxed{X^2\sim\Gamma(\frac{1}{2},\frac{1}{2})=\chi^2_1}
$$

### 3.4 Sum of squares of independent standard normal random variables

- Let $n\in\mathbb{N}^*$
- Let $X_1,\dots,X_n \sim \mathcal{N}(0,1)$ be independent standard normal random variables

$$
\boxed{\sum_{i=0}^nX_i^2\sim \Gamma(\frac{n}{2},\frac{1}{2})=\chi^2_n}
$$

This follows immediately from the sum of gamma distributions.



### 3.5 Sum of chi-square distributions

- Let $n\in\mathbb{N}^*$
- Let $d_1,\dots,d_n\in\mathbb{N}^*,$ and let $r=\sum_{i=1}^nd_i$
- Let $X_1\sim \chi^2_{d_1},\dots,X_n\sim \chi^2_{d_n}$:

$$
\boxed{\sum_{i=1}^nX_i\sim \chi^2_{r}}
$$

This follows immediately from the sum of gamma distributions.



## 4. $\mathcal{F}$- distributions

### 4.1 Definition

- Let $d_1\,d_2 \in\mathbb{N}^*$
- $X$ a continuous random variable

By definition, we say that $X$ follows the $F$ distribution with parameters $(d_1,d_2)$ if there exists $X_1\sim\chi^2_{d_1},X_2\sim \chi^2_{d_2}$ such that $X_1,X_2$ are independents and:
$$
X=\frac{\tfrac{X_1}{d_1}}{\tfrac{X_2}{d_2}}
$$
By definition:
$$
\boxed{\forall d_1,d_2\in\mathbb{N}^*,\quad\forall X_1\sim\chi^2_{d_1},\forall X_2\sim\chi^2_{d_2} \text{ independents}:\quad \frac{\tfrac{X_1}{d_1}}{\tfrac{X_2}{d_2}}\sim\mathcal{F}(d_1,d_2)}
$$




### 4.2 Significance

the $F$-distribution arises frequently as the [null distribution](https://en.wikipedia.org/wiki/Null_distribution) of a [test statistic](https://en.wikipedia.org/wiki/Test_statistic), most notably in the [analysis of variance](https://en.wikipedia.org/wiki/Analysis_of_variance) (ANOVA) and other [*F*-tests](https://en.wikipedia.org/wiki/F-test).

A [random variate](https://en.wikipedia.org/wiki/Random_variate) of the *F*-distribution with parameters $d_1$ and $d_2$ arises as the ratio of two appropriately scaled [chi-squared](https://en.wikipedia.org/wiki/Chi-squared_distribution) variates with respective degree of freedoms $d_1$ and $d_2$.

### 4.3 Probability Distribution Function

Let $d_1,d_2\in\mathbb{N}^*$

We have $\chi_{d_1}^2,\chi_{d_2}^2> 0$, So:
$$
\begin{align*}
\forall x \in \mathbb{R}_+^*,f_{\mathcal{F}(d_1,d_2)}(x)&=\int_{\mathbb{R}_+^*}tf_{\chi^2_{d_1}/d_1}(xt)f_{\chi^2_{d_2}/d_2}(t)\text{dt}\\
&=\int_{\mathbb{R}_+^*}d_1d_2tf_{\chi^2_{d_1}}(xd_1t)f_{\chi^2_{d_2}}(d_2t)\text{dt}\\
&=d_1d_2\int_{\mathbb{R}_+^*}tf_{\chi^2_{d_1}}(xd_1t)f_{\chi^2_{d_2}}(d_2t)\text{dt}\\
&=d_1d_2\int_{\mathbb{R}_+^*}t\frac{d_1^{\tfrac{d_1}{2}-1}t^{\tfrac{d_1}{2}-1}x^{\tfrac{d_1}{2}-1}e^{-\tfrac{d_1x}{2}t}d_2^{\tfrac{d_2}{2}-1}t^{\tfrac{d_2}{2}-1}e^{-\tfrac{d_2}{2}t}}{2^{\tfrac{d_1+d_2}{2}}\Gamma(\tfrac{d_1}{2})\Gamma(\tfrac{d_2}{2})}\text{dt}\\
&=\frac{d_1^{\tfrac{d_1}{2}}d_2^{\tfrac{d_2}{2}}x^{\tfrac{d_1}{2}-1}}{2^{\tfrac{d_1+d_2}{2}}\Gamma(\tfrac{d_1}{2})\Gamma(\tfrac{d_2}{2})}\int_{\mathbb{R}_+^*}t^{\tfrac{d_1+d_2}{2}-1}e^{-\tfrac{d_1x+d_2}{2}t}\text{dt}\\
&=\frac{d_1^{\tfrac{d_1}{2}}d_2^{\tfrac{d_2}{2}}x^{\tfrac{d_1}{2}-1}}{2^{\tfrac{d_1+d_2}{2}}\Gamma(\tfrac{d_1}{2})\Gamma(\tfrac{d_2}{2})}\int_{\mathbb{R}_+^*}\left(\frac{2}{d_1x+d_2}\right)^{\tfrac{d_1+d_2}{2}}u^{\tfrac{d_1+d_2}{2}-1}e^{-u}\text{du} \text{ with }u=\frac{2t}{d_1x+d_2}\\
&=\frac{d_1^{\tfrac{d_1}{2}}d_2^{\tfrac{d_2}{2}}x^{\tfrac{d_1}{2}-1}}{\left(d_1x+d_2\right)^{\tfrac{d_1+d_2}{2}}\Gamma(\tfrac{d_1}{2})\Gamma(\tfrac{d_2}{2})}\int_{\mathbb{R}_+^*}u^{\tfrac{d_1+d_2}{2}-1}e^{-u}\text{du}\\
&=\frac{d_1^{\tfrac{d_1}{2}}d_2^{\tfrac{d_2}{2}}x^{\tfrac{d_1}{2}-1}}{\left(d_1x+d_2\right)^{\tfrac{d_1+d_2}{2}}\Gamma(\tfrac{d_1}{2})\Gamma(\tfrac{d_2}{2})}\Gamma\left(\frac{d_1+d_2}{2}\right)\\
&=\frac{d_1^{\tfrac{d_1}{2}}d_2^{\tfrac{d_2}{2}}x^{\tfrac{d_1}{2}-1}}{\left(d_1x+d_2\right)^{\tfrac{d_1+d_2}{2}}\Beta(\tfrac{d_1}{2},\tfrac{d_2}{2})}\\
&=\frac{1}{x\Beta(\tfrac{d_1}{2},\tfrac{d_2}{2})}\sqrt{\frac{(d_1x)^{d_1}d_2^{d_2}}{(d_1x+d_2)^{d_1+d_2}}}
\end{align*}
$$




## 5. Sudent's $t$-distribution

### 5.1 Definition

In [probability](https://en.wikipedia.org/wiki/Probability) and [statistics](https://en.wikipedia.org/wiki/Statistics), **Student's $t$-distribution** (or simply the **$t$-distribution**) is any member of a family of continuous [probability distributions](https://en.wikipedia.org/wiki/Probability_distribution) that arise when estimating the [mean](https://en.wikipedia.org/wiki/Expected_value) of a [normally distributed](https://en.wikipedia.org/wiki/Normal_distribution) [population](https://en.wikipedia.org/wiki/Statistical_population) in situations where the [sample size](https://en.wikipedia.org/wiki/Sample_size) is small and the population's [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) is unknown. It was developed by English statistician [William Sealy Gosset](https://en.wikipedia.org/wiki/William_Sealy_Gosset) under the pseudonym "Student".

- Let $d_1\,d_2 \in\mathbb{N}^*$
- $X$ a continuous random variable

By definition, we say that $X$ follows the $t$ distribution with $\nu$ degrees of freedom if there exists $P\sim\mathcal{N}(0,1),S\sim \chi^2_{\nu}$ such that $X,S$ are independents and:
$$
X=\frac{P}{\sqrt{\tfrac{S}{\nu}}}
$$
By definition:
$$
\boxed{\forall \nu\in\mathbb{N}^*,\quad\forall P\sim\mathcal{N}(0,1),\forall S\sim\chi^2_{\nu} \text{ independents}:\quad \frac{P}{\sqrt{\tfrac{S}{\nu}}}\sim\mathcal{T}(\nu)}
$$



### 5.2 Significance

The $t$-distribution plays a role in a number of widely used statistical analyses, including [Student's *t*-test](https://en.wikipedia.org/wiki/Student's_t-test) for assessing the [statistical significance](https://en.wikipedia.org/wiki/Statistical_significance) of the difference between two sample means, the construction of [confidence intervals](https://en.wikipedia.org/wiki/Confidence_interval) for the difference between two population means, and in linear [regression analysis](https://en.wikipedia.org/wiki/Regression_analysis). Student's *t*-distribution also arises in the [Bayesian analysis](https://en.wikipedia.org/wiki/Bayesian_analysis) of data from a normal family.

If we take a sample of $n$ observations from a normal distribution, then the *$t$*-distribution with $\nu=n-1$ [degrees of freedom](https://en.wikipedia.org/wiki/Degrees_of_freedom_(statistics)) can be defined as the distribution of the location of the sample mean relative to the true mean, divided by the sample standard deviation, after multiplying by the standardizing term $\sqrt{n}$. In this way, the *t*-distribution can be used to construct a [confidence interval](https://en.wikipedia.org/wiki/Confidence_interval) for the true mean.

The $t$-distribution is symmetric and bell-shaped, like the normal distribution. However, the $t$-distribution has heavier tails, meaning that it is more prone to producing values that fall far from its mean. This makes it useful for understanding the statistical behavior of certain types of ratios of random quantities, in which variation in the denominator is amplified and may produce outlying values when the denominator of the ratio falls close to zero. The Student's $t$-distribution is a special case of the [generalised hyperbolic distribution](https://en.wikipedia.org/wiki/Generalised_hyperbolic_distribution).



#### 5.3 Probability Distribution Function

$$
\forall x\in\mathbb{R},\quad f_{\mathcal{T}(\nu)}(x)=\frac{\Gamma(\tfrac{n+1}{2})}{\sqrt{n\pi}\Gamma(\tfrac{n}{2})}\left(1+\frac{x^2}{2}\right)^{-\tfrac{n+1}{2}}
$$
