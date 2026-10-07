---
title: LLM Fundamentals Explained
description: ''
pubDate: '2026-04-22'
updatedDate: '2026-04-29'
category: AI
tags:
  - AI
  - LLM
lang: en
originalLang: zh
translationSlug: 'llm基础原理解析.md'
---

> 中文版：[LLM基础原理解析](/zh/blog/llm基础原理解析.md/)

If you want to understand AI, you first need some grasp of how it actually works underneath. Modern large models are built on neural networks and deep learning, or more precisely on multi-layer neural networks.

## 1. The Basic Mathematical Model of a Neural Network

At the very beginning, a model is made up of a few things:

- How many layers the neural network has
- How many neurons in each layer
- Which activation function to use

Actually, the model already has parameters at this point. Those parameters are usually:

1. Randomly initialized
2. Initialized according to some rule

So when people say "training a large model", what they really mean is training the parameters inside the model. This parameter-training process generally runs through the backpropagation algorithm, which I'll get into in detail later.

Also, the parameters here don't refer to the neurons. A single neuron usually contains a lot of parameters.

The simplest neuron can be written in the following form

$y = \sigma(w_1x_1+w_2x_2+...+w_nx_n+b)$

It can also be written as $f_{\theta}(x)$, where $\theta$ represents the set of parameters

Here $\sigma$ refers to the activation function, and $w_1,...w_n$ along with $b$ are the model's parameters.

As you can see, $w_1...w_n$ together with the bias parameter $b$ at the end form a linear function, while the $\sigma$ wrapped around the outside performs a nonlinear transformation.

Of course, a neural network usually has multiple layers of neurons

Suppose the input vector is:

$x \in \mathbb{R}^{n}$

Note that what goes in here is a vector, which is also related, in its mathematical form, to RAG later on.

Suppose this layer has $m$ neurons. The whole layer can then be expressed in aggregate as:

$h = \sigma(Wx+b)$

Where:

- $W \in \mathbb{R}^{m \times n}$
- $b \in \mathbb{R}^{m}$
- $h \in \mathbb{R}^{m}$

The $W$ here is a parameter matrix, the collection of all the parameters in this entire layer.

In the end, an $n$-dimensional input produces an $m$-dimensional output.

Why is the output $m$-dimensional? There's actually an even simpler way to understand it

Each neuron is a function that operates on the input vector. The parameter $w$ here can be understood as a kind of weight, and the parameter $b$ is the bias. In the end, the vector is computed down to a single value.

$h_j = \sigma(w_j^{T}x + b_j)$ where $j \in (1,2,3...m)$

$m$ neurons give you $m$ values, and stacked together they form an $m$-dimensional vector.

$h = \begin{bmatrix} h_1 \\ h_2 \\ \vdots \\ h_m \end{bmatrix} \in \mathbb{R}^{m}$

## 2. How Input Enters the Neural Network

I described some of this in the earlier RAG article. First, the text entered by the user needs to be cut into tokens by a tokenizer

For instance, didn't GPT 5.5 recently become more token-efficient precisely because it changed the way it handles tokens?

### 2.1 tokenizer

A tokenizer generally consists of two steps:

1. Text splitting

For example, given the input:

```
how are you
```

The output might become:

```
"how","are","you"
```

Of course this is the idealized case. As far as I remember, GPT's tokenizer is open source, so if you're interested you can try it out yourself

2. Mapping to token_id

```
["how", "are", "you"] → [101, 57, 302]
```

### 2.2 embedding

A token_id itself is nothing but an ID number. You need to look up the corresponding vector in the embedding table, and this number is exactly what you use to do the lookup, to find which row of the table it belongs to

$E \in \mathbb{R}^{V \times D}$

Here $V$ represents the vocabulary size, which is the height of the table, and $D$ is the vector dimension, which is the width of the table

Of course, a sentence usually has multiple tokens. For example, a sentence is tokenized into 4 token_ids

When multiple sentences are fed in at once, what you look up is a three-dimensional tensor

In real situations, a model usually processes one batch at a time, that is, a group of samples sent into the model together for processing

### 2.3 Adding positional encoding

As I wrote in that RAG article, a token_id itself carries no positional information, so you need something like a positional encoding to mark the position it sits at

## 3. How a Neural Network Learns

Roughly, it's divided into the following steps:

1. Input data: such as a piece of text, or an image
2. Forward propagation: that is, the model, based on the current parameters, computes the output from the neurons
3. Compute the loss: compare the prediction against the correct answer to get the loss
4. Backpropagation: compute the effect of each parameter on the loss
5. Gradient descent: update the model's parameters in the direction that makes the loss smaller

We've already roughly covered the input data and forward propagation, so let's first talk about how the loss is computed

### 3.1 Computing the loss

The loss here is computed through a function:

$L(\hat{y},y)$

The notation is as follows:

$L$: the loss function

$\hat{y}$: the model's prediction

$y$: the true answer

LLMs generally compute their loss using cross-entropy loss

1. logits

First, we all know that a model's output is generally a sequence of tokens

Such as

```
token1,token2,token3...
```

An LLM's training objective is to predict the next token based on the preceding tokens

The model does not output tokens directly. The model itself has a vocabulary, which to be precise is a token table. At each prediction position, the model scores every token in the entire vocabulary. Suppose the vocabulary size is $V$, then the model outputs

$z_1,z_2,z_3...z_v$

This can also be represented as a vector

$z \in \mathbb{R}^{V}$

Here $z_i$ represents the raw score for the $i$-th token to be the next token. These scores are called logits. They are not probabilities yet; they can be positive or negative, and they don't necessarily add up to 1

1. softmax

What needs to be done next is to turn these raw scores into a set of probabilities

$p_1,p_2,p_3...p_n$

Here each $p$ is between 0 and 1

And they add up to 1

If ordinary normalization were used here, such as:

$\frac{z_i}{\sum z_j}$

then several problems would arise

1. The values have both positive and negative signs

2. The differences between scores are not very pronounced, so large scores don't stand out enough

Here we can solve this problem by using the exponential function

$p_i = \frac{e^{z_i}}{\sum_{j=1}^{n} e^{z_j}}$

First, the result of the exponential function is always positive, and second, the exponential function grows very fast, so differences become quite pronounced

$\sum_{i=1}^{n} p_i = \sum_{i=1}^{n} \frac{e^{z_i}}{\sum_{j=1}^{n} e^{z_j}} = \frac{\sum_{i=1}^{n} e^{z_i}}{\sum_{j=1}^{n} e^{z_j}} = 1$

1. Cross-entropy loss computation

> softmax is responsible for turning logits into probabilities, and cross-entropy loss is responsible for checking how much probability the model gives to the correct answer

If the probability that the model gives to the $k$-th token after softmax is $p_k$

then the cross-entropy loss is

$L = -\log p_k$

**The reason here is that** $p_k$** is greater than 0 and less than 1, so **$\log p_k$** is less than 0, hence the need to add a minus sign**

| Probability the model gives the correct token (pk) | Loss (L=-log pk) |
| --- | --- |
| 1.0 | 0 |
| 0.9 | 0.105 |
| 0.5 | 0.693 |
| 0.1 | 2.303 |
| 0.01 | 4.605 |
| 0.001 | 6.908 |

As you can see

- If the model is very confident and correct, the loss is close to 0
- If the model only gives a 0.1 probability to the correct answer, the loss grows noticeably
- If the model almost doesn't believe the correct answer, say 0.001, the loss becomes very large

And why use log here? You can see from the table that if the probability of the correct answer goes from 0.9 to 0.8 the loss changes little, but if it goes from 0.1 down to 0.001, the gap grows noticeably larger, making it more sensitive than a simple 1-p

There's another very important point. We all know that when a model outputs, it outputs a sequence of tokens. If it were 1-p, the probabilities would multiply together and get smaller and smaller, which is very hard to compute

$P = P(x_1)P(x_2|x_1)(x_3|x_1x_2)$ if you take a log, you can turn multiplication into addition

$\log ab = \log a+ \log b$

Then the loss for the whole sequence can be written as

$L = -\sum_t \log P(x_t \mid x_{<t})$

Taking the average gives (the loss over the whole sequence is usually averaged):

$L = -\frac{1}{T}\sum_{t=1}^{T} \log P(x_t \mid x_{<t})$

### 3.2 Backpropagation

Backpropagation, i.e. Backpropagation, is essentially:

> Use the chain rule to work backward from the loss function, computing each parameter's effect on the loss

We already know from before that a neural network is not a single formula, but a layer of nested functions

$h_1 = \sigma(W_1 x + b_1)$

$h_2 = \sigma(W_2 h_1 + b_2)$

$\hat{y} = W_3 h_2 + b_3$

$L = \mathrm{Loss}(\hat{y}, y)$

Here $W_1$ is at the very front and $L$, that is the loss, is at the very end. If you want to know how $W_1$ should be changed, then you need to know

$W_1 \to h_1 \to h_2 \to \hat{y} \to L$

the effect of $W_1$ on the final loss along this entire chain. This requires the chain rule, and the chain rule is the core of backpropagation

### 3.2.1 The chain rule

The simplest chain rule is: if

$z=f(y),y=g(x)$

then

$\frac{dz}{dx} = \frac{dz}{dy} \cdot \frac{dy}{dx}$

In plain language:

> If x affects y, and y affects z, then the effect of x on z = the effect of x on y × the effect of y on z

Of course, when I first saw this formula, I had a vague impression of it, but I still forgot what these d's were, so let me fill that in here

The $d$ here is the differential symbol from calculus, and it can also represent an infinitesimally small change

Here $\frac{dy}{dx}$ is the derivative of $y$ with respect to $x$. I remember the high school textbook describing it as the rate at which $y$ changes as $x$ changes

A more straightforward way of saying it:

> For every tiny change in x, roughly how much does y change? You can also think of it as an approximation of the tangent line

However, $d$ is normally used for single-variable functions, such as:

$y = f(x)$

There is only one input variable, so we write:

$\frac{dy}{dx}$

For multi-variable functions we have to switch to a different symbol, which is also something you'll see often when computing gradients below

If a function depends on many variables at the same time, such as:

$L = f(W_1,W_2,b_1,b_2,x,y)$

at this point, if you want to ask

> If only $W_1$ changes and everything else stays fixed, how does $L$ change?

After all, we all know that a neural network has more than one parameter, and what we want here is to compute each parameter's individual effect on the overall loss

So at this point we write:

$\frac{\partial L}{\partial W_1}$

This is called a partial derivative. By "partial" we mean: look only at the effect of one variable, and temporarily treat the other variables as constants

For example:

$L = x^2 + y^2$. As you can see, $L$ depends on both $x$ and $y$. If we only look at the effect of $x$ on $L$, $y^2$ can be treated as a constant, and the result is $2x$

### 3.2.2 Computing parameter gradients

In the network from before:

$h_1 = \sigma(W_1 x + b_1)$

$h_2 = \sigma(W_2 h_1 + b_2)$

$\hat{y} = W_3 h_2 + b_3$

$L = \mathrm{Loss}(\hat{y}, y)$

If you want to update the parameter at the very front, $W_1$, you need to know

$\frac{\partial L}{\partial W}$

It represents how the final loss $L$ will change if $W_1$ undergoes a very small change

And $W_1$ exerts its influence through a single chain:

$W_1 -> h_1 -> h_2 -> \hat{y} -> L$

By the chain rule, we know:

$\frac{\partial L}{\partial W_1} =$ $\frac{\partial L}{\partial \hat{y}} \cdot \frac{\partial \hat{y}}{\partial h_2} \cdot \frac{\partial h_2}{\partial h_1} \cdot \frac{\partial h_1}{\partial W_1}$

$L$ -> $\hat{y}$ -> ..., and from this you can see the way of "reverse" in backpropagation

### 3.2.3 Gradient descent for updating parameters

We already know from before that each parameter's effect on the loss function is:

$\frac{\partial L}{\partial W_1}$. Next, we can update the parameters based on the gradient. The most basic way of updating parameters is gradient descent:

$W_1 \leftarrow W_1 - \eta \frac{\partial L}{\partial W_1}$

$W_1$: the current parameter

$\leftarrow$: update the left side to become the new value on the right

$\eta$: the learning rate, controlling how big a step to take each time

$\frac{\partial L}{\partial W_1}$: the gradient of the loss $L$ with respect to the parameter $W_1$

-: move in the opposite direction of the gradient, because the gradient is the direction in which the loss increases fastest

So if you want the loss to decrease, you need to move in the opposite direction

New parameter = old parameter - a small step * gradient

The learning rate $\eta$ here is also very important. Without a learning rate, the steps could become too large and shoot straight past the lowest point

Back to the essence of $W_1$. In fact $W_1$ is essentially a parameter matrix: if the input $x$ has 3 numbers and the hidden layer $h_1$ has 4 neurons, then $W_1$ is a 4×3 matrix holding 12 numbers, where each number represents "how much influence a given input item has on a given neuron". So-called training a model is, at bottom, adjusting those 12 numbers (and all the other parameters in the network) again and again according to the gradient, until the loss $L$ is small enough.

At this point, a complete loop is closed:

Input $x$ → the parameter matrix $W$ performs a linear transformation → the activation function introduces nonlinearity → produce the output $\hat{y}$ → the loss function measures the gap → backpropagation uses the chain rule to compute gradients → gradient descent updates the parameters → feed in the next batch of data ......

Large language models look mysterious, but once you take them apart, every layer is doing exactly this one thing. The only difference is that the scale of the matrices has gone from 4×3 to a few thousand by a few thousand, and the parameter count has gone from a dozen or so to hundreds of billions. Scale brings emergence, but the principle hasn't changed. Once you understand this layer, looking back at terms like "temperature", "context window", and "fine-tuning", they all come back down to matrices and gradients.
