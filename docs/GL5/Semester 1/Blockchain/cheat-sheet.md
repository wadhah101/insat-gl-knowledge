---
slug: /gl5/semester-1/blockchain/cheat-sheet
---

# Cheat sheet

Author [@rihemebh](https://github.com/rihemebh) + Resumé essia

## What is blockchain

Blockchain is a system that records transactions that are devided into multiple blocks connected to each others where can anybody add a transaction and check if particular one exists.

- It is impossible to change information or cheat.
- Transactions are duplicated and distributed accross the network.
- Blockchain is decentrelized.
- Blockchain is managed on a peer-to-peer network of computers, which are referred to as **nodes**. It can also be described as a distributed ledger: a decentralized way to chronologically document transactions.

## How it works

If two parties **agree to a transaction**, this information is **broadcast** to the computers (nodes) of the peer-to-peer network, where it is then **validated**. Once the transaction has been verified, it is added to a block together with other transactions. This block is then **hashed**. Every block contains a **reference to the hash** of the block that came before it. This guarantees the position of the block in the chain and ensures that it **cannot be tampered** with. The new block is then permanently added to the blockchain and **distributed to all its participants**. The transaction is now complete.

-- Click [here](https://blog.bosch-si.com/blockchain/10-things-you-need-to-know-about-blockchain/) to see all the blog

## Keywords to know

| Keyword | Explanation |
| --- | --- |
| Transaction | Transaction in blockchain chould be anything not only money |
| Nodes | are the computers uses in the network |
| Ledger | A ledger is a book or collection of accounts in which account transactions are recorded |
| Bitcoin | The first and most popular cryptocurrency based off the decentralized ledger of blockchain |
| Coin | Representation of a digital asset built on a new blockchain |
| Ethereum | Blockchain application that uses a built-in programming language that allows users to build decentralized ledgers modified to their own needs. Smart contracts are used to validate transactions in the ledger |
| Gossip | It is a peer-to-peer communication mechanism in which nodes periodically exchange state information about themselves and other nodes they know |

## Public, Private & consortium Blockchain

Both are working in the same way, the difference here who is allowed to participate.

### Public Blockchain

- Open to everyone
- Anyone could participate
- Verifying transactions takes a lot of time due to the large number of participants.

### Private Blockchain

- Controlled by one entity that decides who is allowed to participate.
- This entity may also set up rules and regulations to govern transactions.
- Transactions are generally conducted faster within a private blockchain because of the limited number of participants.

### Consortium Blockchain

- Hybrid form of public and private blockchains.
- There is more than one central in-charge, or we can say more than one organization involved who provides access to pre-selected nodes for reading, writing, and auditing the blockchain.

## Blockchain usecases examples

- Banking and finance
  - International Payments
  - Insurance
  - Peer-to-Peer Transactions
- Business
  - Supply Chain Management
  - Healthcare (to track a patient history)
- Government
  - Voting
  - Identity Management
  - Taxes
- Other Industries
  - Cybersecurity
  - Big Data

## Block

Each block contains a set of transactions and other essential details. Each block header contains the **previous block hash**, **current block hash**, **nonce** (for bitwoin blocks), **Merkle root** (the address to the tree that contains the transactions' hashes), and other details. The number of transactions in the block varies and so do the fees associated with.

## Bitcoin

The cryptocurrency was invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto To have an account we choose a private key based on which our address is calculated : This private key is our only way to access our address which is public.

- BTC uses POW as a consensus : each block contains a sha256 hash.

Types of nodes :

- Simple node: gets and sends crypto, it has credentials and a wallet
- Miner node: creates the block

### Fork

Making a new copy of the existing ledger of the blockchain by altering the newest block (two miners make a block at the same time, altering the rules..).

Two main forks happened:

- 2013: Bitcoin cash
- 2015: Bitcoin SV

### Proof of Work

A common consensus algorithm that requires a participant node to prove that the work done and submitted by them qualifies them to receive the right to add new transactions to the blockchain. However, this whole mining mechanism of bitcoin needs high energy consumption and a longer processing time. It is based on the physical capacities of minors. It has several problems : 51% attack, energivore …

## Ethereum

- (ETH) is the currency used on the Ethereum network.
- It natively supports **smart contracts**, an essential tool behind decentralized applications.
- Ethereum was conceived in 2013.
- On 15 September 2022, Ethereum transitioned its consensus mechanism from proof-of-work (PoW) to proof-of-stake (PoS) in an upgrade process known as "the Merge".
- Ether is not actually stored in your wallet. Your wallet holds private keys you use as you would a password when you initiate a transaction. You receive a private key for each ether you own. This key is essential for accessing your ether. That's why you hear so much about securing keys using different storage methods.
- On the Ethereum blockchain, gas refers to the cost necessary to perform a transaction on the network. Called GWEI and is energy.
- Gas limit refers to the maximum amount of gas you are willing to consume on a transaction.

### Smart Contracts

Smart contracts are simply programs stored on a blockchain that run when predetermined conditions are met. They typically are used to automate the execution of an agreement so that all participants can be immediately certain of the outcome, without any intermediary’s involvement or time loss.

### Ethereum 2.0

A big, multi-year long, upgrade to massively increase the blockchain’s scalability with sharding, increase security with proof of stake, and improve its programmability by changing a bunch of technical things we got wrong the first time.

### Proof of Stake

a common consensus algorithm that evolved as a low-cost, low-energy consuming. It is based on the trust for validators.

### Validator

- Solo validators must stake **32 ETH** to activate their validation ability.
- The validators are randomly selected to validate, together, the defined block.
- A validator creates a new block and attests that the information is valid in a process called attestation, where the block is broadcast to other validators called a committee who verify it and vote for its validity.
- Dishonest validators are punished by having their staked ETH burned and being removed from the network. Burning refers to sending crypto to a wallet that has no keys, which takes them out of circulation.
