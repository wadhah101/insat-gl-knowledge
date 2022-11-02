# Estimating Statistics

## 1. Estimator

### 1.1 Notations

- Let $n\in\mathbb{N}^*$
- Let $\mathcal{D}(s)$ be some distribution depending on $s$

- Let $X_1,\dots,X_n\sim\mathcal{D}(s)$ be random variables
- Let $\mathcal{A}$ be a vector space of real continuous random variables. If required, $\mathcal{A}$ should even be an associative algebra

### 1.2 Definition

An estimator of $s,$ denoted $\hat{s}$ (when there is no confusion) is a function $\mathcal{A}^n\rightarrow \mathcal{A}$

Informally, this function estimates $s$ from the observed data.

The estimator is said to be unbiased if:
$$
\forall X_1,\dots,X_n\in\mathcal{A},\quad\mathbb{E}[\hat{s}(X_1,\dots,X_n)]=s
$$

## 2. Estimating mean 

The trivial mean estimator is:
$$
\hat{\mu}(X_1,\dots,X_n)=\frac{1}{n}\sum_{i=1}^nX_i
$$
We have:
$$
\mathbb{E}[\hat{\mu}(X_1,\dots,X_n)]=\mathbb{E}\left[\frac{1}{n}\sum_{i=1}^nX_i\right]=\frac{1}{n}\sum_{i=1}^n\mathbb{E}[X_i]=\mu
$$
So $\hat{\mu}$ is unbiased. Furthermore:
$$
\begin{align*}
\mathbb{V}[\hat{\mu}(X_1,\dots,X_n)]&=\text{Cov}\left[\frac{1}{n}\sum_{i=1}^nX_i,\frac{1}{n}\sum_{i=1}^nX_i\right]\\
&=\frac{1}{n^2}\sum_{1\leq i,j\leq n}\text{Cov}[X_i,X_j]\\
\end{align*}
$$
Assuming that $X_1,\dots,X_n$ are independent, we have:
$$
\boxed{\mathbb{V}[X]=\frac{1}{n^2}\sum_{i=1}^n\mathbb{V}[X_i]=\frac{\sigma^2}{n}}
$$

## 3. Estimating variance

> Assumption: $X_1,\dots,X_n$ are independent.

## 3.1 Trivial estimator $\hat{\sigma^2}$

$$
\hat{\sigma^2}(X_1,\dots,X_n)=\frac{1}{n}\sum_{i=1}^n\left(X_i-\hat{\mu}(X_1,\dots,X_n)\right)^2
$$

the mean of this estimator is:
$$
\begin{align*}
\mathbb{E}\left[\hat{\sigma^2}(X_1,\dots,X_n)\right]&=\mathbb{E}\left[\frac{1}{n}\sum_{i=1}^n\left(X_i-\hat{\mu}(X_1,\dots,X_n)\right)^2\right]\\
&=\frac{1}{n}\sum_{i=1}^n\mathbb{E}\left[\left(X_i-\hat{\mu}(X_1,\dots,X_n)\right)^2\right]\\
&=\frac{1}{n}\sum_{i=1}^n\mathbb{E}[X_i^2]-2\mathbb{E}\left[X_i\hat{\mu}(X_1,\dots,X_n)\right]+\mathbb{E}\left[\hat{\mu}(X_1,\dots,X_n)^2\right]\\
&=\frac{1}{n}\sum_{i=1}^n\mathbb{E}[X_i^2]-2\mathbb{E}\left[X_i\hat{\mu}(X_1,\dots,X_n)\right]+\mathbb{E}\left[\hat{\mu}(X_1,\dots,X_n)^2\right]\\
&=\frac{1}{n}\sum_{i=1}^n\mathbb{V}[X_i]+\mathbb{E}[X_i]^2-2\text{Cov}\left[X_i,\hat{\mu}(X_1,\dots,X_n)\right]-2\mathbb{E}[X_i]\mathbb{E}\left[\hat{\mu}
(X_1,\dots,X_n)\right]\\&+\mathbb{V}\left[\hat{\mu}(X_1,\dots,X_n)\right]+\mathbb{E}\left[\hat{\mu}(X_1,\dots,X_n)\right]^2\\
&=\frac{1}{n}\sum_{i=1}^n\sigma^2+\mu^2-2\frac{\sigma^2}{n}-2\mu^2+\frac{\sigma^2}{n}+\mu^2\\
&=\frac{1}{n}\sum_{i=1}^n\frac{n-1}{n}\sigma^2\\
&=\frac{n-1}{n}\sigma^2
\end{align*}
$$
Thus this estimator is biased.

## 3.2 Bessel's Correction: $\hat{\sigma}_*^2$

This is an unbiased estimator of the variance:
$$
\hat{\sigma}_*^2(X_1,\dots,X_n)=\frac{n}{n-1}\hat{\sigma}^2(X_1,\dots,X_n)=\frac{1}{n-1}\sum_{i=1}^n\left(X_i-\hat\mu(X_1,\dots,X_n)\right)^2
$$

## 3.3 God's Estimator

This in an estimator depending on the prior knowledge of the mean:
$$
\hat{\sigma^2_G}(X_1,\dots,X_n)=\frac{1}{n}\sum_{i=1}^n(X_i-\mu)^2
$$
The expected value of this estimator is:
$$
\begin{align*}\mathbb{E}\left[\hat{\sigma^2_G}(X_1,\dots,X_n)\right]&=\mathbb{E}\left[\frac{1}{n}\sum_{i=1}^n\left(X_i-\mu\right)^2\right]\\
&=\frac{1}{n}\sum_{i=1}^n\mathbb{E}[X_i^2]-2\mathbb{E}[\mu X_i]+\mathbb{E}[\mu^2]\\
&=\frac{1}{n}\sum_{i=1}^n\mathbb{V}[X_i]+\mathbb{E}[X_i]^2-2\mu\mathbb{E}[ X_i]+\mu^2\\
&=\frac{1}{n}\sum_{i=1}^n\sigma^2\\
&=\sigma^2
\end{align*}
$$
Thus this estimator is unbiased

## 4. Estimating Covariance

Let $Z_1,\dots,Z_n$ be $n$ independent and identically distributed contintuos random real vectors with mean $\mu$ and covariance matrix $C$



### 4.1 Naive Estimator

$$
\hat{\text{Cov}}\left(Z_1,\dots,Z_n\right)=\frac{1}{n}\sum_{i=1}^n(Z_i-\hat{\mu}(Z_1,\dots,Z_n))(Z_i-\hat{\mu}(Z_1,\dots,Z_n))^T
$$

The expected value of this estimator is:
$$
\begin{align*}
\mathbb{E}[\hat{\text{Cov}}(Z_1,\dots,Z_n)]&=\frac{1}{n}\sum_{i=1}^n\mathbb{E}\left[\left(Z_i-\hat{\mu}(Z_1,\dots,Z_n)\right)\left(Z_i-\hat{\mu}(Z_1,\dots,Z_n)\right)^T\right]\\
&=\frac{1}{n}\sum_{i=1}^n\mathbb{E}\left[Z_iZ_i^T\right]-\mathbb{E}\left[Z_i\hat{\mu}(Z_1,\dots,Z_n)^T\right]-\mathbb{E}\left[\hat{\mu}(Z_1,\dots,Z_n)Z_i^T\right]\\&+\mathbb{E}\left[\hat{\mu}(Z_1,\dots,Z_n)\hat{\mu}(Z_1,\dots,Z_n)^T\right]\\
&=\frac{1}{n}\left(\sum_{i=1}^n\mathbb{E}[Z_iZ_i^T]\right)-\mathbb{E}\left[\hat{\mu}(Z_1,\dots,Z_n)\hat{\mu}(Z_1,\dots,Z_n)^T\right]\\
&=\frac{1}{n}\left(\sum_{i=1}^n\text{Cov}[Z_i,Z_i]+\mathbb{E}[Z_i]\mathbb{E}[Z_i]^T\right)-\mathbb{E}\left[\frac{1}{n^2}\sum_{1\leq i,j\leq n} Z_iZ_j^T\right]\\
&=\frac{1}{n}\left(\sum_{i=1}^n C+\mu\mu^T\right)-\frac{1}{n^2}\sum_{1\leq i,j\leq n}\mathbb{E}\left[ Z_iZ_j^T\right]\\
&=\frac{1}{n}\left(\sum_{i=1}^n C+\mu\mu^T\right)-\frac{1}{n^2}\sum_{1\leq i\leq n}\mathbb{E}\left[ Z_iZ_i^T\right]-\frac{1}{n^2}\sum_{1\leq i\neq j\leq n}\mathbb{E}\left[ Z_i\right]\mathbb{E}\left[Z_j\right]^T\\
&=\frac{1}{n}\sum_{i=1}^n C+\mu\mu^T-\frac{1}{n^2}\sum_{1\leq i\leq n}C+\mu\mu^T-\frac{1}{n^2}\sum_{1\leq i\neq j\leq n} \mu\mu^T\\
&=C+\mu\mu^T-\frac{C+\mu\mu^T}{n}-\frac{n-1}{n}\mu\mu^T\\
&=\frac{n-1}{n}C
\end{align*}
$$
Thus this estimator is biased.

### 4.2 Bessel's Correction

This is the same correction as the sample variance's correction:
$$
\hat{\text{Cov}_*}(Z_1,\dots,Z_n)=\frac{n}{n-1}\hat{\text{Cov}}(Z_1,\dots,Z_n)=\frac{1}{n-1}\sum_{i=1}^n(Z_i-\hat{\mu}(Z_1,\dots,Z_n))\cdot(Z_i-\hat{\mu}(Z_1,\dots,Z_n))^T
$$
This estimator is an unbiased estimator of the covariance matrix

### 4.3 God's Estimator

This in an estimator depending on the prior knowledge of the mean:
$$
\hat{\text{Cov}}_G(Z_1,\dots,Z_n)=\frac{1}{n}\sum_{i=1}^n\left(Z_i-\mu\right)\left(Z_i-\mu\right)^T
$$
Its expected values is:
$$
\begin{align*}
\mathbb{E}\left[\hat{\text{Cov}}_G(Z_1,\dots,Z_n)\right]&=\frac{1}{n}\sum_{i=1}^n\mathbb{E}\left[\left(Z_i-\mu\right)\left(Z_i-\mu\right)^T\right]\\
&=\frac{1}{n}\sum_{i=1}^n\mathbb{E}\left[Z_iZ_i^T\right]-\mathbb{E}\left[Z_i\mu^T\right]-\mathbb{E}\left[\mu Z_i^T\right]+\mathbb{E}[\mu\mu^T]\\
&=\frac{1}{n}\sum_{i=1}^n C+\mu\mu^T-\mathbb{E}\left[Z_i\right]\mu^T-\mu\mathbb{E}\left[ Z_i^T\right]+\mu\mu^T\\
&=\frac{1}{n}\sum_{i=1}^n C+\mu\mu^T-\mathbb{E}\left[Z_i\right]\mu^T-\mu\mathbb{E}\left[ Z_i\right]^T+\mu\mu^T\\
&=\frac{1}{n}\sum_{i=1}^n C+\mu\mu^T-\mu\mu^T-\mu\mu^T+\mu\mu^T\\
&=\frac{1}{n}\sum_{i=1}^n C\\
&= C
\end{align*}
$$
