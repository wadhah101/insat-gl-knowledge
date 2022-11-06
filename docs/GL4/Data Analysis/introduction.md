# Introduction

## 1. Random Variable







## 2. Expected Value

Let $X$ be a random variable following some distribution $\mathcal{D}.$ 

The expected value of $X$, denoted $\mathbb{E}[X]$, if it exists, defines in some sense what value at average we expect from $X$



### 2.1 Discrete Case

If $\mathcal{D}$ is a discrete distribution, then:
$$
\mathbb{E}[X]=\sum_{k\in S}k\mathcal{P}(X=k)
$$
With $S$ defined as the support of $X$



### 2.2 Continuous Case

If $\mathcal{D}$ is a continuous distribution, then:
$$
\mathbb{E}[X]=\int_{S}xf(x)\space \text{dx}
$$
