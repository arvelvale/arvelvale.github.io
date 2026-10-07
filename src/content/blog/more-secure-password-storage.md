---
title: A More Secure Way to Store Passwords
description: ''
pubDate: '2026-04-21'
updatedDate: '2026-04-22'
category: Security
tags:
  - Security
lang: en
originalLang: zh
translationSlug: '更加安全的密码存储方式.md'
---

> 中文版：[更加安全的密码存储方式](/zh/blog/更加安全的密码存储方式.md/)

## 1. The Weaknesses of MD5 and SHA-1 Hashing

In earlier projects, user credentials like passwords were all stored with hashing methods like MD5 or SHA-1.

Hashing is a one-way encryption algorithm. You can get from the original password to the encrypted result, but you can't reverse the computation back to the original password.

But MD5 and SHA-1 are getting pretty old now. The Java Web course at school only covered these two and nothing deeper, and even when vibe coding, the AI uses this same method by default to hash and store passwords.

But this approach does have some weaknesses. For example:

1. MD5 and SHA-1 hash way too fast. A few lines of Python and it's done in seconds. That's what brings up the rainbow table.

2. Rainbow tables can be used to crack password databases. A rainbow table is a common attack against hash algorithms: you pre-compute a whole lot of common passwords in advance (hashing is so fast anyway), and if the attacker gets the hashes out of the database, they just look them up in the table. And if the site doesn't add salt, then all users with the same password have the same hash, so a single lookup can dump a whole batch of duplicate-password users at once.

So the collision resistance of MD5 and SHA-1 really is very low.

### 2. Defending Against Rainbow Table Attacks

The most common approach right now is salting, which means appending a specific string to each user's password. Generally each user gets a different string, so even if two users have the same password, their hashes are different. Then you run the hash. This raises the guessing cost of a rainbow table attack.

For example:

```
Zhang San: 123456 + x7K9...
Li Si: 123456 + p2lm...
```

But salting still can't solve the most core problem, which is that they're too fast. OWASP explicitly says modern password hashing should be slow, so that every guess an attacker makes is expensive.

OWASP's recommended approach is to use Argon2id. If that's not supported, you can also use encryption methods like bcrypt and PBKDF2.

### 3. Argon2id and PBKDF2

#### 3.1 Argon2id

This is the mainstream, modern family of password hashing algorithms, officially recommended by OWASP and the first choice. What makes it great isn't how slow it computes, but that the computation process eats up memory.

- A normal fast hash: like "doing a super fast mental math problem."
- Argon2id: like "solving a problem where you not only have to calculate over and over, you also have to take up a big table to lay out your materials."

3.2 PBKDF2

An old-guard encryption scheme, but still widely used. It essentially works through massive amounts of repeated computation to slow down how fast an attacker can crack it. Although Argon2id is stronger against brute force, PBKDF2 has the advantage on compliance: for example, with government agencies, strict compliance requirements, or situations where FIPS 140 requirements are involved.

Still, the first recommendation is Argon2id.
