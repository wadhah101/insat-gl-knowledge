---
slug: /gl3/complexity-theory/advance
---

# Advanced Formulation

## 1. Introduction

The definitions we proposed for $\mathcal{O}$ and $\Omega$ works well on most simple algorithms whose cost is a function of one parameter.

In general, if the cost depends on many parameters, there will be problems while estimating the complexity.

Furthermore, the algorithm itself can have non-deterministic behaviour, which sometimes can be described using some probability distribution.

Our proposed definition, while simple, cannot deal with these scenarios. And so, we will propose more robust definitions that work with those cases.

Finally, it is possible that the input itself follows some probability distribution, on which the algorithmic definitions maybe a little bit pessimistic. And with that we will introduce a definition for average case complexity

This section is very technical, and is intended only for those who can understand even the tiniest details. This chapter is as optional as it gets :smile:.

## 2. Deterministic Algorithm

### 2.1 Introduction

We will start by deterministic algorithms, as they are the easiest to model.

A deterministic algorithm is an algorithm that gives the same output for the same input.

### 2.2 Notations

- Let $\mathcal{A}$ be an algorithm, that accepts inputs in some set $\mathcal{I}$
- $\mathcal{S}\in \mathscr{F}(\mathcal{I},\mathbb{R}_+)$ some unbounded function defining the size of the input

- Let $E(\mathcal{A},X)$ be the total cost of instructions that are executed while working with the input $X$
- Let $C_{\mathcal{A}}(x)=\sup_{\mathcal{S}(X)\le x}E(\mathcal{A},X)$ be the maximum number of elementary instructions executed while working on input with size $\le x$
- Let $g\in\mathscr{F}(\mathbb{R}_+,\mathbb{R}_+)$ some real valued function that is eventually strictly positive

### 3.4 $\mathcal{O}$ Notation

By definition, we say that $\mathcal{A}$ has time complexity $g$ if:
$$
C_\mathcal{A} =\mathcal{O}(g)
$$

### 2.2 $\Omega$ Notation

By definition, we say that $\mathcal{A}$ has time complexity bound from below by g if:
$$
C_\mathcal{A} =\Omega(g)
$$

#### Example 1

```python
def sum(arr: Array[int]):
 S=0
    for a in arr:
        S+=a
    return S
```

- $\mathcal{S}(\texttt{arr}) = \text{length}(\texttt{arr})$

- $E(\texttt{sum},\texttt{arr})= 2 + 2\cdot \text{length}(\texttt{arr})$

- For $C_{\texttt{sum}}$ we have:
  $$
  C_\texttt{sum}(n)=\sup_{\mathcal{S}(\texttt{arr}) \le n}E(\texttt{sum},\texttt{arr})= \sup_{\mathcal{S}(\texttt{arr}) \le n}2+2 \mathcal{S}(\texttt{arr})=2n+2
  $$

So we have:
$$
\begin{cases}
C_{\texttt{sum}}=\mathcal{O}(n)\\
C_{\texttt{sum}}=\Omega(n)
\end{cases} \implies C_{\texttt{sum}}=\Theta(n)
$$

## 3. Non-Deterministic Algorithm

- Let $\mathcal{A}$ be an algorithm, that accepts inputs in some set $\mathcal{I}$

- $\mathcal{S}\in \mathscr{F}(\mathcal{I},\mathbb{R}_+)$ some unbounded function defining the size of the input

- Let $\mathscr{P}(\mathcal{A},X)$ the set of all possible executions for $\mathcal{A}$ while accepting $X$

- Let $E(p)$ be the total cost of instructions that are executed on the path $p$

- Let $ C^{W}_{\mathcal{A}}(x)$ defined as follow:
  $$
  C^{W}_{\mathcal{A}}(x)=\sup_{\mathcal{S}(X)\le x}\sup_{p\in\mathscr{P}(\mathcal{A},X)}E(p)
  $$
  It is maximum number of elementary instructions executed while working on input with size $\le x$ executed on the worst path

- Let $ C^{B}_{\mathcal{A}}(x)$ defined as follow:
  $$
  C_{W,\mathcal{A}}(x)=\sup_{\mathcal{S}(X)\le x}\inf_{p\in\mathscr{P}(\mathcal{A},X)}E(p)
  $$
  It is maximum number of elementary instructions executed while working on input with size $\le x$ executed on the best path

- Let $g\in\mathscr{F}(\mathbb{R}_+,\mathbb{R}_+)$ some real valued function that is eventually strictly positive

## 4. Randomised Algorithm

### 4.1 Introduction

In many cases, for every input $X$, the non-deterministic algorithm will have a random execution $\Phi $ that follows some distribution $\mathcal{U}(X)$

### 4.2 Notations

- Let $\mathcal{A}$ be an algorithm, that accepts inputs in some set $\mathcal{I}$

- $\mathcal{S}\in \mathscr{F}(\mathcal{I},\mathbb{R}_+)$ some unbounded function defining the size of the input

- Let $\mathscr{P}(\mathcal{A},X)$ the set of all possible executions for $\mathcal{A}$ while accepting $X$

- Let $\Phi(X)$ be a random execution while accepting $X$

- Let $E(\Phi)$ be the total cost of instructions that are executed on a random path

- Let $ \tilde{C}_{\mathcal{A}}(x)$ defined as follow:
  $$
  \tilde{C}_{\mathcal{A}}(x)=\sup_{\mathcal{S}(X)\le x} \mathbb{E}\big[E(\Phi(X))\big]
  $$
  It is maximum number of elementary instructions executed on average while working on input with size $\le x$

- Let $g\in\mathscr{F}(\mathbb{R}_+,\mathbb{R}_+)$ some real valued function that is eventually strictly positive

## 5. Deterministic Average Case Complexity

### 5.1 Introduction

In many cases, the input itself will follow some distribution $\mathcal{D}.$

In that case, doing a supremum over all inputs of size $\le x$  is a pessimistic measure of complexity.

With the knowledge of $\mathcal{D},$ we can estimate the average case complexity

### 5.2 Notations

- Let $\mathcal{A}$ be an algorithm, that accepts inputs in some set $\mathcal{I}$
- Let $\mathcal{X}$ be a random input
- $\mathcal{S}\in \mathscr{F}(\mathcal{I},\mathbb{R}_+)$ some unbounded function defining the size of the input
- Let $E(\mathcal{A},X)$ be the total cost of instructions that are executed on $\mathcal{A}$ while accepting $X$

### 5.3 Per Input size

$$
\tilde{C}_{\mathcal{A}}(x)=\sup_{r\le x} \mathbb{E}\big[E(\mathcal{A},\mathcal{X}) \mid S(\mathcal{X})=r\big]
$$

### 5.4 Averaging over all Inputs

$$
\tilde{C}_{\mathcal{A}}(x)=\mathbb{E}\big[E(\mathcal{A},\mathcal{X}) \mid S(\mathcal{X})\le x\big]
$$

## 6. Non-Deterministic Average Case Complexity

### 6.1 Introduction

In many cases, the input itself will follow some distribution $\mathcal{D}.$

In that case, doing a supremum over all inputs of size $\le x$  is a pessimistic measure of complexity.

With the knowledge of $\mathcal{D},$ we can estimate the average case complexity

### 6.2 Notations

- Let $\mathcal{A}$ be an algorithm, that accepts inputs in some set $\mathcal{I}$

- Let $\mathcal{X}$ be a random input

- $\mathcal{S}\in \mathscr{F}(\mathcal{I},\mathbb{R}_+)$ some unbounded function defining the size of the input

- Let $E(\mathcal{A},X)$ be the total cost of instructions that are executed on $\mathcal{A}$ while accepting $X$

- Let $ \tilde{C}_{\mathcal{A}}(x)$ defined as follow:
  $$
  \tilde{C}_{\mathcal{A}}(x)=\sup_{r\le x} \mathbb{E}\big[E(\mathcal{A},\mathcal{X}) \mid S(\mathcal{X})=r\big]
  $$

- Let $\mathscr{P}(\mathcal{A},X)$ the set of all possible executions for $\mathcal{A}$ while accepting $X$

- Let $E(p)$ be the total cost of instructions that are executed on the path $p$

- Let $ C^{W}_{\mathcal{A}}(x)$ defined as follow:
  $$
  C^{W}_{\mathcal{A}}(x)
  =\sup_{r\le x} \mathbb{E}\left[\sup_{p\in\mathscr{P}(\mathcal{A},\mathcal{X})}E(p) \mid S(\mathcal{X})=r\right]
  $$
  It is maximum number of elementary instructions executed while working on input with size $\le x$ executed on the worst path

- Let $ C^{B}_{\mathcal{A}}(x)$ defined as follow:
  $$
  C^{W}_{\mathcal{A}}(x)
  =\sup_{r\le x} \mathbb{E}\left[\inf_{p\in\mathscr{P}(\mathcal{A},\mathcal{X})}E(p) \mid S(\mathcal{X})=r\right]
  $$
  It is maximum number of elementary instructions executed while working on input with size $\le x$ executed on the best path

- Let $g\in\mathscr{F}(\mathbb{R}_+,\mathbb{R}_+)$ some real valued function that is eventually strictly positive

### 6.4 Averaging over all Inputs

$$
C^{W}_{\mathcal{A}}(x)
=\mathbb{E}\left[\sup_{p\in\mathscr{P}(\mathcal{A},\mathcal{X})}E(p) \mid S(\mathcal{X})\le x\right]
$$

$$
C^{W}_{\mathcal{A}}(x)
=\mathbb{E}\left[\inf_{p\in\mathscr{P}(\mathcal{A},\mathcal{X})}E(p) \mid S(\mathcal{X})\le x\right]
$$

## 7. Non-Deterministic Average Case Complexity

### 7.1 Introduction

In many cases, the input itself will follow some distribution $\mathcal{D}.$

In that case, doing a supremum over all inputs of size $\le x$  is a pessimistic measure of complexity.

With the knowledge of $\mathcal{D},$ we can estimate the average case complexity

### 7.2 Notations

- Let $\mathcal{A}$ be an algorithm, that accepts inputs in some set $\mathcal{I}$
- Let $\mathcal{X}$ be a random input
- $\mathcal{S}\in \mathscr{F}(\mathcal{I},\mathbb{R}_+)$ some unbounded function defining the size of the input
- Let $\Phi(X)$ be a random execution while accepting $X$
- Let $E(\Phi)$ be the total cost of instructions that are executed on a random path

- Let $ C^{B}_{\mathcal{A}}(x)$ defined as follow:
  $$
  C^{W}_{\mathcal{A}}(x)
  =\sup_{r\le x} \mathbb{E}_{\mathcal{X}}\left[\mathbb{E}_{\Phi}\left[E(\Phi(\mathcal{X}))\right] \mid S(\mathcal{X})=r\right]
  $$
  It is maximum number of elementary instructions executed while working on input with size $\le x$ executed on the best path

- Let $g\in\mathscr{F}(\mathbb{R}_+,\mathbb{R}_+)$ some real valued function that is eventually strictly positive

### 7.4 Averaging over All inputs

$$
C^{W}_{\mathcal{A}}(x)
= \mathbb{E}_{\mathcal{X}}\left[\mathbb{E}_{\Phi}\left[E(\Phi(\mathcal{X}))\right] \mid S(\mathcal{X})\le x\right]
$$
