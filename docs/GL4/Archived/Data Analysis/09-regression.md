---
slug: /gl4/archived/data-analysis/09-regression
---

# Linear Regression

## 1. Notations

- Let $p\in\mathbb{N}^*$ be the number of features
- Let $n\in\mathbb{N}^*$ be the number of observations
- Let $(X_1,Y_1),\dots ,(X_n,Y_n)\in\mathbb{R}^p\times \mathbb{R}$ be the observations
- Let $X=\begin{pmatrix}1&X_1^T\\1&X_2^T\\\vdots\\1&X_n^T\end{pmatrix},Y=\begin{pmatrix}Y_1\\Y_2\\ \vdots \\Y_n\end{pmatrix}$

We want to find the best vector $\beta\in\mathbb{R}^{p+1}$ that minimizes the distance:

$$
\lVert Y-X\beta \rVert_2
$$

## 2. Value of $\beta$

### 2.1 General Case

minimizing $\lVert Y-X\beta \rVert_2$ is the same as minimizing $\lVert Y-X\beta \rVert_2^2.$ So we will approach the second problem.

First of all, we search for all values annihilating the derivative

$$
\begin{align*}
\frac{\partial \lVert Y-X\beta \rVert_2^2}{\partial\beta}&=\frac{\partial \lVert Y-X\beta \rVert_2^2}{\partial (Y-X\beta)}\frac{\partial (Y-X\beta)}{\partial\beta}\\&=2(Y-X\beta)^TX\\
\frac{\partial \lVert Y-X\beta \rVert_2^2}{\partial\beta}=0&\iff 2(Y-X\beta)^TX=0\\
&\iff X^T(Y-X\beta)=0\\
&\iff X^TX\beta=X^TY\\
&\implies \beta=(X^TX)^+X^TY \text{ is a solution, where }.^+ \text{ is the pseudoinverse} \\
&\implies \beta=X^+Y \text{ is a solution}
\end{align*}
$$

$\lVert Y-X\beta \rVert_2^2$ is a convex quadratic. So this value $\beta$ is a value minimizing the distance.

$$
\boxed{\beta=(X^TX)^+X^TY}
$$

### 2.2 Probabilistic Approach: $p=1$

For this case, we can even approach the problem probabilisticly.

We will treat $y$ and $x$ as random variables.

- Let $\beta_0,\beta_1\in\mathbb{R}/\quad y=\beta_0+\beta_1 x+\varepsilon$
- We will assume that $\varepsilon \sim \mathcal{N}(0,\sigma^2)$ is independent of $x$

We have:

$$
\begin{cases}
\text{Cov}[x,y]=\beta_1\mathbb{V}[x]\\
\mathbb{E}[y]=\beta_0+\beta_1\mathbb{E}[x]
\end{cases} \implies \begin{cases}
\beta_1=\frac{\text{Cov}[x,y]}{\mathbb{V}[x]}\\
\beta_0=\mathbb{E}[y]-\beta_1\mathbb{E}[x]
\end{cases}
$$

> This approach can be extended for $p>1.$ But this is beyond this scope.

### 2.3 Probabilstic Approach: General Case

We will treat $y,x_1,\dots,x_p$ as random variables.

- Let $\bold{x}=\begin{pmatrix}x_1 \\ \vdots \\ x_p\end{pmatrix}$
- Let $\beta \in\mathbb{R}^p,\beta_0\in\mathbb{R}/ y=\langle\beta,\bold{x}\rangle+\beta_0 + \varepsilon$
- Furthermore, we will assume that: $\varepsilon \sim \mathcal{N}(0,\sigma^2)$ is independent of all $x_i$
- Let $C=\mathbb{E}\left[\left(\bold{x}-\mathbb{E}[\bold{x}]\right)\left(\bold{x}-\mathbb{E}[\bold{x}]\right)^T\right]$ be the covariance matrix of $\bold{x}$
- Let $w=\begin{pmatrix}\text{Cov}[x_1,y]\\ \vdots \\ \text{Cov}[x_p,y]\end{pmatrix}$ the cross-covariance between $\bold{x}$ and $y.$

First of all, we will calculate $\beta$

$$
\begin{align*}
\forall i\in\{1,\dots,p\},\quad\text{Cov}[x_i,y]&=\sum_{j=1}^p\beta_j\text{Cov}[x_i,x_j]\\
\iff C\beta&=w \\
\implies \beta&=C^+w \text{ is a solution}
\end{align*}
$$

For $\beta_0$

$$
\beta_0=\mathbb{E}[y]-\langle\beta,\mathbb{E}[\bold{x}]\rangle
$$

As a conclusion:

$$
\boxed{\begin{cases}\beta=C^+w\\
\beta_0=\mathbb{E}[y]-\langle \beta,\mathbb{E}[\bold{x}]\rangle\end{cases}}
$$

Now the knowledge of $\beta_0,\beta$ requires the explicit knowledge of $C,w,\mathbb{E}[\bold{x}],\mathbb{E}[y].$ which almost all of the time is not the case.

So we will estimate $\beta_0,\beta$ by estimating those statistical parameters:

$$
\boxed{\begin{cases}\hat{\beta}=\hat{C}^+\hat{w}\\
\hat{\beta_0}=\hat{\mu}(y)-\langle \hat{\beta},\hat{\mu}(\bold{x})\rangle\end{cases}}
$$

> If we have $n$ independent samples of $(\bold{x},y):\quad(\bold{x}_1,y_1),\dots,(\bold{x_n},y_n)$ treated as random variables.
>
> And if we use the appropriate estimators, this formula reduces to Linear Regression.

## 3. Significance of the model

Let's call $\mathcal{M}$ our linear model

> Assumption: the relation between $y$ and $\bold{x}$ is linear

We will use the $\mathcal{F}$-test.

### 3.1 Null Hyptothesis: $H_0:\beta_i=0\quad\forall i>0$

This null hyptothesis implies that $y$ is a constant function of $\bold{x}$

We will statistically test this hypothesis using ANOVA

### 3.2 ANOVA

#### Theorem

If the null hypothesis is true then:

$$
Z=\frac{\tfrac{(y- \bar{y})^T(y- \bar{y})}{p}}{\tfrac{(y- \langle\beta,\bold{x}\rangle-\beta_0)^T(y- \langle\beta,\bold{x}\rangle-\beta_0)}{n-p-1}}\sim\mathcal{F}(p,n-1-p)
$$

Let:

$$
\begin{cases}\text{FSS} = \sum_{i=1}^n(y^*_i-\bar{y})^2\\
\text{RSS} = \sum_{i=1}^n(y-y_i^*)^2\\
\text{TSS} = \sum_{i=1}^n(y-\bar{y}) = \text{FSS} +\text{RSS}
\end{cases}
$$

We say we reject the null hypothesis within a confidence interval of $(1-p)\%$ if:

$$
\begin{cases}
f=\tfrac{\text{FSS}}{\text{RSS}}\\
p=\mathcal{P}(Z\ge f)
\end{cases}
$$

### 3.3 Significance

Assuming a linear dependence between the variables, this result suggests that within a confidence of $(1-p)\%,$ $y$ is not a constant function of $\bold{x}.$

## 4. Confidence interval of the prediction

> Assumption: the relation between $y$ and $\bold{x}$ is linear

We will use student's $t$-test.

### 4.1 Confidence Interval of parameters

Let $\hat{\beta}$ be an estimator of $\beta.$ We have:

$$
\boxed{\forall i\in\{0,\dots,p\}\quad, T_i=\frac{\hat{\beta}_i-\beta_i}{\hat{\sigma}_*^2\sqrt{\left(\left(X^TX\right)^{-1}\right)_{i,i}}}\sim \mathcal{T}_{n-1-p}}
$$

Where $\hat{\sigma}^2_*$ is an unbiased estimation of $\sigma^2=\mathbb{V}[y^*]$ where $y^*=\langle \beta,\bold{x}\rangle+\beta_0=y-\varepsilon$. It is equal to:

$$
\boxed{\hat{\sigma}^2_*=\frac{\text{RSS}}{n-1-p}}
$$

1. For $i\in\{0,\dots,p\}$
2. Let $t\in \mathbb{R}_+$
3. Let $\gamma=\in\mathbb{R}_+/\quad \mathcal{P}(\lvert T_i\rvert  \ge t)=\frac{\gamma}{2}$

We say that $\beta_i=\hat{\beta}_i\pm t\hat{\sigma}^2_*\sqrt{\left(\left(X^TX\right)^{-1}\right)_{i,i}}$ within a confidence interval of $(1-\gamma)\%.$

### 4.2 Confidence Interval of prediction

$$
\boxed{y^*= \hat{y}^*+t\hat{\sigma}^2_*\sqrt{\begin{pmatrix}1\\\bold{x}\end{pmatrix}^T\left(X^TX\right)^{-1}\begin{pmatrix}1\\\bold{x}\end{pmatrix}}=\langle\beta,\bold{x}\rangle+\beta_0+t\hat{\sigma}^2_*\sqrt{\begin{pmatrix}1\\\bold{x}\end{pmatrix}^T\left(X^TX\right)^{-1}\begin{pmatrix}1\\\bold{x}\end{pmatrix}}}
$$

### 4.3 Case of simple regression: $p=1$

1. The confidence interval of $\beta_0$ is:

   $$
   \beta_0=\hat{\beta}_0\pm t\frac{\sum_{i=1}^{n}(y-\bar{y})^2}{\sqrt{\sum_{i=1}^{n}(x-\bar{x})^2}}=\hat{\beta}_0\pm t\frac{\hat{\text{ss}}(y)}{\sqrt{\text{ss}(x)}}
   $$

2. The confidence interval of $\beta_1$ is:

   $$
   \beta_1=\hat{\beta}_1\pm t \text{ss}(y)\sqrt{\frac{1}{n}+\frac{\bar{x}^2}{\hat{\text{ss}}(x)}}
   $$

3. The confidence interval of the a new prediction $y^*$ using $x_0$ is:
   $$
   y^*=\beta_1x_0+\beta_0\pm t \text{ss}(y)\sqrt{\frac{1}{n}+\frac{(x_0-\bar{x})^2}{\hat{\text{ss}}(x)}}
   $$
