---
slug: /gl3/semester-1/complexity-theory/sheets/recursion
---

# Recursive Algorithms

The time complexity of recursive algorithms are usually not as simple as their iterative conterparts.

For that we will need to learn the theory behind it, and then practice on some examples.

## 1. Theoretical Appraoch

For simplicity, we won't consider indirect recursive calls, and we will only consider deterministic algorithms

### 1.1 Main Result

Let $\mathcal{A}$ a recursive algorithm accepting as input $X$

- We will call $T(X)$ the execution cost of $\mathcal{A}$ on $X$

- We will suppose that on the input $X$, $\mathcal{A}$ had $n$ recursive calls with respective inputs $X_1,\dots,X_n.$
- We will suppose that the iterative portion of $\mathcal{A}$ has cost $f(X)$

We have the following result:

$$
T(X)=\sum_{i=1}^n T(X_i)+f(X)
$$

### 1.2 GCD Example

Consider the following $\gcd$ algorithm with $a\ge b$:

```python
#Assuming a >= b
def gcd(a,b):
    if b==0:
        return a
    return gcd(b,a%b)
```

We can establish the running time as:

$$
T(a,b)=T(b,a\bmod b)+\mathcal{O}(1)
$$

So the time complexity of this algorithm is the number of iterations of the Euclidean algorithm.

Now we will prove that $a \bmod b \le \frac{a}{2}$

- If $b\le \frac{a}{2},$ then the result is immediate
- Else, we have $b> \frac{a}{2}$, so that $a=b+r$ with $r=a-b < \frac{a}{2} \quad \blacksquare$

With $r_0=a,r_1=b,r_i=r_{i-2}\bmod r_{i-1}$, and by induction, we can prove that:

$$
r_i \le 2^{-\frac{i}{2}}r_0
$$

Now, we will estimate an index $k_*$ from which $r_k$ must be zero:

$$
\begin{align*}
2^{-\frac{k}{2}}r_0 < 1 \iff &-\frac{k}{2}\ln 2 < -\ln r_0\\
\iff &k > 2\frac{\ln a}{\ln 2}\\
\implies k_*&= \left \lceil2\frac{\ln a}{\ln 2} \right \rceil+1 \quad \text{is a choice}
\end{align*}
$$

We have $T(a,b) \le k_* =\mathcal{O}(\log a)$

## 2. Master Theorem

### 2.1 Importance

Usually, a recursive algorithm $\mathcal{A}$ will divide a problem of size $n$ into $a$ problems of size $\frac{n}{b}$ with an additional iterative cost of $f(n)$.

The cost of $\mathcal{A}$ can be described using this recurrence formula:

$$
T_n=aT_{\frac{n}{b}}+f(n)
$$

The Master Theorem will give a sharp estimate for the asymptotic behaviour of $(T_n)_{n}$ based on the values of $a,b$ and the function $f$

### 2.2 Table

Let $c_*=\log_b a$

| Description | Condition | Result |
| --- | --- | --- |
| Work to split/recombine a problem is dwarfed by subproblems. | $f(n)=\mathcal{O}(n^c)$ with $c<c_*$ | $T_n=\Theta(n^c)$ |
| Work to split/recombine a problem is comparable to subproblems. | $f(n)=\mathcal{O}\left(n^{c_*} (\log n)^k\right)$ with $k\ge 0$ | $T_n=\Theta(n^{c_*}\left(\log n\right)^{k+1})$ |
| Work to split/recombine a problem dominates subproblems. | $f(n)=\mathcal{O}(n^c)$ with $c>c_*$ | $T_n=\Theta(f(n))$ |

### 2.3 Merge Sort example

```python
def merge(A,B):
    C=[]
    i=0
    j=0
    while i < len(A) or j < len(B):
        if i == len(A):
            C.append(B[j])
            j+=1
        elif j == len(B):
            C.append(A[i])
            i+=1
        elif A[i] < B[j]:
            C.append(A[i])
            i+=1
        else:
            C.append(B[j])
            j+=1
    return C

def merge_sort(A):
    n=len(A)
    if n<2:
     return A
    B,C=A[:n//2],A[n//2:]
    B=merge_sort(B)
    C=merge_sort(C)
    return merge(B,C)
```

#### 2.3.1 `merge` complexity

$$
\mathcal{O}(\text{len}(A)+\text{len}(B))
$$

#### 2.3.2 `merge_sort` complexity

Let $T_n$ be the cost of a merge sort of an array of size $n$

The merge procedure has two arrays of size $\lfloor \frac{n}{2}\rfloor$ and $\lceil \frac{n}{2}\rceil$. So it has a complexity of:

$$
\mathcal{O}( \lfloor \frac{n}{2}\rfloor+ \lceil \frac{n}{2}\rceil ) = \mathcal{O}(n)
$$

Now, we can establish this recurrent relation for $T_n$:

$$
T_{n}=2T_{\lfloor\frac{n}{2}\rfloor}+\mathcal{O}(n)
$$

We have $c=1,$ and $c_*=\log_2 2=1=c$. So we have the second case of the master theorem.

So, the complexity of merge sort is:

$$
T_n = \mathcal{O}(n\log n)
$$
