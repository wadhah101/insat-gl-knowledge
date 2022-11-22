---
slug: /gl3/semester-1/complexity-theory/sheets/fibonacci
---

# Fibonacci Sequence Problem

## 1. Problem

Given an integer $n$, calculate the $n^\text{th}$ term of the Fibonacci sequence $F_n$.

$F_n$ is defined by:

- $F_0=0$
- $F_1=1$
- $\forall n>1,\quad F_{n}=F_{n-1}+F_{n-2}$

## 2. Naive Solution

```python
def fibonacci(n:int):
    if n==0:
        return 0
    elif n==1:
        return 1
    return fibonacci(n-1)+fibonacci(n-2)
```

Let $T_n$ be the cost of calculating $n$ using this algorithm

### 2.1 Lower Bound

We have:

$$
T_n=T_{n-1}+T_{n-2}+\mathcal{O}(1)\ge T_{n-1}+T_{n-2}
$$

With $T_0=T_1=1$, and by recursion we can prove that:

$$
\forall n\in\mathbb{N},\quad T_n\ge F_n
$$

But, $(T_n)_{n\in\mathbb{N}}$ is increasing, so:

$$
T_n\ge 2T_{n-2}\implies T_n\ge 2^{\frac{n}{2}}T_0
$$

By that we have $T_n=\Omega(F_n)=\Omega(2^{\frac{n}{2}})$

### 2.2 Upper Bound

We also have for some fixed $K>0$:

$$
T_n\le T_{n-1}+T_{n-2} +K
$$

We can prove by induction that:

$$
T_n\le (1+Kn)F_{n+1}
$$

Also by induction, we can prove that:

$$
F_n\le 2^n
$$

So we have:

$$
T_n=\mathcal{O}(nF_n)=\mathcal{O}(n2^n)
$$

### 2.3 Sharper Bounds

In fact, it can be proven that:

$$
F_n=\frac{(\tfrac{1+\sqrt 5}{2})^n-(\tfrac{1-\sqrt 5}{2})^n}{\sqrt{5}}
$$

So we have:

$$
\begin{cases}
T_n&=\mathcal{O}\left(n\left(\frac{1+\sqrt 5}{2}\right)^n\right)\\
T_n&=\Omega\left(\left(\frac{1+\sqrt 5}{2}\right)^n\right)
\end{cases}
$$

We can do even more than that, using more advanced techniques, it can be established that:

$$
T_n=\Theta\left(\left(\frac{1+\sqrt 5}{2}\right)^n\right)
$$

## 3. Better Solution

```python
def fibonacci(n:int):
    u,v=(0,1)
    for i in range(n):
        u,v=(v,u+v)
    return u
```

Let $T_n$ be the cost of this algorithm for an input $n$:

$$
T_n=\Theta(n)
$$

## 4. Fast Solution

```python
def matMul(A:Mat[p,q],B:Mat[q,r]):
    C:Mat[2,2]=zeros([2,2])
    for i in range(p):
        for j in range(q):
            for k in range(2):
                C[i,j]+=A[i,k]*B[k,j]
   return C


def matPow(A:Mat[p,p],n:int):
    if n == 0:
        return identity([2,2])
    elif n == 1:
        return A
    B=matPow(matMul(B,B),n//2)
    return matMul(B,matPow(A,n%2))

def matVectMul(A:Mat[p,q],u:Vect[q]):
    v:Vect[q]=zeros(q)
    for i in range(p):
        for j in range(q):
            v[i]+=A[i,j]*u[j]
    return v

def fibonacci(n:int):
    F:Mat[2,2]=Mat([[0,1],[1,1]])
    u:Vect[2]=Vect([0,1])
    v=matPow(F,n)*u
    return v[0]
```

### a. Complexity of `matMul`

$$
\mathcal{O}(pqr)
$$

### b. Complexity of `matPow`

$$
\mathcal{O}(p^3\log n)
$$

### c. Complexity of `matVectMul`

$$
\mathcal{O}(nm)
$$

### d. Complexity of `fibonacci`

We have $p=q=r=2$. So we have the complexity of `fibonacci` is

$$
T_n=\mathcal{O}(p^3\log n+pq)=\mathcal{O}(8\log n+4)=\mathcal{O}(\log n)
$$
