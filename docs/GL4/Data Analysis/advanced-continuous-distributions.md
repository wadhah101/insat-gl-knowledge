# Continuous Distributions 3

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
&=\frac{1}{\sqrt{2\pi x}}e^{-\frac{x}{2}}
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

### 3.6 Moment

Let $X\sim\chi_n^2$

As a $\chi^2$-distribution is a $\Gamma$-distribution, the calculation of the moments can be found [here](./continuous-distributions.md#gamma-distribution)

We will list here essentially the expected value and the variance.

#### 3.6.1 Expected Value

$$
\mathbb{E}[X]=\frac{\frac{n}{2}}{\frac{1}{2}}=n
$$

#### 3.6.2 Variance

$$
\mathbb{V}[X]=\frac{\frac{n}{2}}{\frac{1}{2^2}}=2n
$$

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
