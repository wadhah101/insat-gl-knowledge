# Discrete Distributions 2

## 4. Poisson Distribution

### 4.1 Definition

A discrete random variable is said to follow the poisson distribution $\mathtt{P}(\lambda)$ with $\lambda \in\mathbb{R}_+$ if:
$$
\forall n\in\mathbb{N},\quad \mathcal{P}(X=n)= \frac{\lambda^n}{n!}e^{-\lambda}
$$

### 4.2 Significance





## 5. Hyper-geometric Distribution

### 5.1 Prelude

For a random variable $X$ and event $E$.

We will denote by $X[E]$ the random variable $X$ knowing that $E$ occured

### 5.2 Definition

Let $N,K,n\in\mathbb{N}/ K\le N \space\text{and}\space n\le N$

We say that a random variable $X$ follows the hypergeometric distribution $\mathcal{H}(n,N,K)$ with parameters $N,K,n$ if:
$$
\exists X_1,\dots,X_{N} \sim \mathcal{B}(p) \space \text{i.i.d}\space / \quad X=S_{n}\left[S_N=K\right] \quad \text{with}\space  S_k=\sum_{i=1}^{k}X_i \quad \forall k\in\{1,\dots,N\}
$$

### 5.2 Significance



### 5.3 Probability Mass function

We have $S_n=\sum_{i=1}^n X_i\sim \mathcal{B}(n,p)$ and $S_N-S_n=\sum_{i=n+1}^N X_i \sim \mathcal{B}(N-n,p)$.

In fact, $S_n$ and $S_{N}-S_n$ are independent.

With that we have:
$$
\begin{align*}
\forall k\in\{0,\dots,K\},\quad \mathcal{P}(X=k)&=\mathcal{P}(S_n=k \mid S_N=K) \\
&= \frac{\mathcal{P}(S_n=k\space  \wedge \space S_N=K)}{\mathcal{P}(S_N=K)}\\
&= \frac{\mathcal{P}(S_n=k\space  \wedge \space S_N-S_n=K-k)}{\mathcal{P}(S_N=K)} \\
&=\frac{\mathcal{P}(S_n=k)\cdot \mathcal{P}(S_N-S_n=K-k)}{\mathcal{P}(S_N=K)} \\
&= \frac{{n \choose k}p^k(1-p)^{n-k}\times {N-n \choose K-k}p^{K-k}(1-p)^{N-n-K+k}}{{N \choose K}p^K(1-p)^{N-K}} \\
&= \frac{{n \choose k} \times {N-n \choose K-k} }{{N \choose K}} \\
&= \frac{n!(N-n)!K!(N-K)!}{k!(n-k)!(K-k)!(N-n-K+k)!N!}\\
&= \frac{K!}{k!(K-k)!}\cdot \frac{(N-K)!}{(n-k)!(N-n-n+k)!}\cdot \frac{n!(N-n)!}{N!}\\
&= \frac{{K \choose k}\cdot {N-K \choose n-k}}{{N \choose n}}
\end{align*}
$$



### 5.4 Moments



#### 5.4.1 Raw Moments

We will start by the expected value $\mathbb{E}[X]:$
$$
\begin{align*}
\mathbb{E}[X]&=\mathbb{E}[S_n \mid S_N= K] \\
&= \sum_{k=1}^n\mathbb{E}[X_k \mid S_N=K] \\
&= \sum_{k=1}^n\ \mathcal{P}(X_k = 1 \mid S_N  = K) \\
&= \sum_{k=1}^n \frac{\sum_{k=1}^n\ \mathcal{P}(X_k = 1 \wedge S_N  = K)}{\mathcal{P}( S_N  = K)} \\
&= \sum_{k=1}^n \frac{\sum_{k=1}^n\ \mathcal{P}(X_k = 1 \wedge S_N-X_k  = K-1)}{\mathcal{P}( S_N  = K)} \\
&=\sum_{k=1}^n \frac{\mathcal{P}(X_k = 1)  \cdot \mathcal{P}(S_N-X_k  = K-1)}{\mathcal{P}( S_N  = K)} \quad \text{as}\space S_N-X_k\space \text{and} \space X_k \space \text{are independent}  \\
&= \sum_{k=1}^n \frac{p  \cdot {N-1 \choose K-1}p^{K-1} (1-p)^{N-K}}{{N \choose K} p^K (1-P)^{N-K}} \\
&= \sum_{k=1}^n \frac{{N-1 \choose K-1}}{{N \choose K}} \\
&= n\cdot \frac{(N-1)!K!(N-K)!}{K!(N-K)!N!}\\
&= n\frac{N}{K}
\end{align*}
$$

#### 5.4.2 Central Moments

We will start by the variance $\mathbb{V}[X]:$
$$
\begin{align*}
\mathbb{V}[X]&= \text{Cov}\left(S_n[S_N=K],S_n[S_N=K]\right) \\
&= \text{Cov}\left(\left(\sum_{i=1}^n X_i\right)[S_N=K],\left(\sum_{j=1}^nX_j\right)[S_N=K]\right) \\
&= \text{Cov}\left(\sum_{i=1}^n X_i[S_N=K],\sum_{j=1}^nX_j[S_N=K]\right) \\
&= \sum_{i=1}^n \mathbb{V}[X_i[S_N=K]]+2\sum_{1\le i<j\le n }\text{Cov} \left(X_i[S_N=K],X_j[S_N=K]\right)\\
\forall i\neq j,\quad\text{Cov}(X_i[S_N=K],X_j[S_N=K])&=\mathbb{E}[X_i[S_N=K] \times X_j[S_N=K] ]-\mathbb{E}[X_i[S_N=K]]\times \mathbb{E}[X_j[S_N=K]] \\
&= \mathcal{P}\left[\left(X_i[S_N=K]\times X_j[S_N=K]\right) =1\right] -\frac{K^2}{N^2}\\
&= \mathcal{P}\left(\left(X_i[S_N=K]\times X_j[S_N=K]\right) = 1 \mid X_j[S_N=K]=1\right)\times \mathcal{P}(X_j[S_N=K]=1)-\frac{K^2}{N^2} \\
&= \mathcal{P}\left(X_i[S_N=K] = 1 \mid X_j[S_N=K]=1\right)\times \mathcal{P}(X_j[S_N=K]=1)-\frac{K^2}{N^2} \\
&= \mathcal{P}\left(X_i=1 \mid X_j[S_N=K]=1\wedge S_N=K\right)\times \frac{K}{N}-\frac{K^2}{N^2} \\
&= \mathcal{P}\left(X_i=1 \mid X_j=1\wedge S_N=K\right)\times \frac{K}{N}-\frac{K^2}{N^2} \\
&= \frac{\mathcal{P}\left(X_i=1 \wedge X_j=1\wedge S_N=K\right)}{\mathcal{P}(X_j=1\wedge S_n=K)}\times \frac{K}{N}-\frac{K^2}{N^2} \\
&=\frac{\mathcal{P}\left(X_i=1 \wedge X_j=1\wedge S_N-X_i-X_j=K-2\right)}{\mathcal{P}(X_j=1\wedge S_N-X_j=K-1)}\times \frac{K}{N}-\frac{K^2}{N^2} \\
&=\frac{\mathcal{P}\left(X_i=1) \cdot \mathcal{P}(X_j=1) \cdot \mathcal{P}( S_N-X_i-X_j=K-2\right)}{\mathcal{P}(X_j=1)\cdot \mathcal{P}( S_N-X_j=K-1)}\times \frac{K}{N}-\frac{K^2}{N^2} \\
&=\frac{p\cdot p \cdot {N-2 \choose K-2}p^{K-2}(1-p)^{N-K}}{p\cdot {N-1 \choose K-1}p^{K-1}(1-p)^{N-K}}\times \frac{K}{N}-\frac{K^2}{N^2} \\
&= \frac{K-1}{N-1}\times \frac{K}{N}-\frac{K^2}{N^2}\\
&= \frac{K}{N}\left(\frac{K-1}{N-1}-\frac{K}{N}\right)\\
\implies \mathbb{V}[X]&= \sum_{i=1}^n \mathbb{V}[X_i[S_N=K]]+2\sum_{1\le i<j\le n }\text{Cov} \left(X_i[S_N=K],X_j[S_N=K]\right)\\
&= n\frac{K}{N}\frac{N-K}{N}+2\times \frac{n(n-1)}{2}\cdot \frac{K}{N}\left(\frac{K-1}{N-1}-\frac{K}{N}\right) \\
&=\frac{K}{N}\left(n\frac{N-K}{N}+n(n-1)\cdot \left( \frac{K-1}{N-1}-\frac{K}{N}\right)\right) \\
&= n\frac{K}{N}\left(\frac{N-K}{N}+(n-1)\cdot \left( \frac{K-1}{N-1}-\frac{K}{N}\right)\right) \\
&= n\frac{K}{N}\left(\frac{(N-K)(N-1)+N(n-1)(K-1)-K(n-1)(N-1)}{N(N-1)}\right) \\
&= n\frac{K}{N}\left(\frac{N^2-KN-N+K+nNK-NK-nN+N-nNK+KN+nK-K}{N(N-1)}\right)  \\
&=n\frac{K}{N}\left(\frac{N^2-NK-nN+nK}{N(N-1)}\right)\\
&=n\frac{K}{N}\left(\frac{N(N-K)-n(N-K)}{N(N-1)}\right)\\
&=n\frac{K}{N}\cdot \frac{N-K}{N}\cdot \frac{N-n}{N-1}
\end{align*}
$$

