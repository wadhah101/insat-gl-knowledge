# Iterative Algorithms

## 1. Statement

### 1.1 Rule

The cost of a statement is:

- $1$ if it is an elementary statement
- Otherwise, it is a subroutine. The cost of the statement is the subroutine's cost.

### 1.2 Example 1

```python
a=5
```

The cost of this statement is $1$

### 1.3 Example 2

```python
A=[(77*i+13)%59 for i in range(n)]
A.sort()
```

- Cost of the first statement is $\mathcal{O}(n)$ as it creates an array of size $n$
- Cost of the second statement is the cost of the `sort` method on $A$

## 2. Branching

### 2.1 Rule

The cost of a conditional statement is the cost of the executed path.

When in doubt, we can bound all paths from above by $\mathcal{O}(\max_i C_i)$ where $C_i$ the cost of the $i^\text{th}$ path

### 2.2 Example

```python
R=0
if x==0:
    for i in range(n):
        for j in range(n):
            R+=i*j
else:
    for i in range(n):
        R+=i
            
```

- If we know that $x=0$, then the complexity is $\mathcal{O}(n^2)$
- If we know that $x\ne 0$, then the complexity is $\mathcal{O}(n)$
- If we have know no information on $x$, then we will estimate the complexity using $\mathcal{O}(\max(n,n^2))=\mathcal{O}(n^2)$

## 3. Loops

### 3.1 Rule

We will suppose that we will iterate over a multiset $S$

Let $f(x)$ be the cost of the body of the loop as a function of the loop variable $x$.

The cost of the loop is then:
$$
\sum_{k\in S} f(k)
$$

### 3.2 Example 1

```python
R=0
for i in range(n):
    R+=5
```

The complexity of this algorithm is:
$$
\mathcal{O}(n)
$$

### 3.3 Example 2

```python
R=0
while n > 0:
    R+=n
    n=n//2
```

We have $S=\{\lfloor \frac{n}{2^k}\rfloor, \quad k\in\mathbb{N}\}$

We have $f(x)=\mathcal{O}(1).$ and $\lvert S \rvert= \log n$

So the complexity of the algorithm is:
$$
\mathcal{O}(\log n)
$$

### 3.4 Example 3

```python
k=1
R=0
while n//k > 0:
    for j in range(n//k):
        R+=1
    k*=2
```

#### 3.4.1 Outer Loop

This is an example of a nested loop.

$S_1$ is the iterated values of the outer loop

We have $S_1=\{2^s, \quad s\in\mathbb{N} \space \text{and} \space 2^s\le n\}$

#### 3.4.2 Inner Loop

Let $f_1(k)$ is the cost of the inner loop

We have $S_2=\{0,\dots,\lfloor \frac{n}{k}\rfloor -1 \}$

The complexity of the inner loop is:
$$
\mathcal{O}\left(\frac{n}{k}\right)
$$

#### 3.4.3 Complexity of the Algorithm

We have:
$$
\begin{align*}
\sum_{k\in S_1}f_1(k)
&=\mathcal{O}\left(\sum_{k\in S_1}\frac{n}{k}\right) \\
\sum_{k\in S_1} \frac{n}{k}&=\sum_{s\in\mathbb{N} \wedge 2^s\le n } \frac{n}{2^s}\\
&\le \sum_{s\in\mathbb{N}}\frac{n}{2^s}\\
&\le n \sum_{s\in\mathbb{N}}\frac{1}{2^s}\\
&\le 2n \\
\implies \sum_{k\in S_1}f_1(k)&=\mathcal{O}(n)
\end{align*}
$$
So the algorithm is $\mathcal{O}(n)$

### 3.5 Example 4

```python
for i in range(42):
    for j in range(3):
        for k in range(n):
            for s in range(r):
                break
            if k>math.sqrt(n):
                break
```

The complexity of such algorithm is:
$$
\mathcal{O}(\sqrt n)
$$
