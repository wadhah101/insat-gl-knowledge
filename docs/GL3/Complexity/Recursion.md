# Recursion

**Process** : 

1. Break the problem I am trying to solve down into a problem that is *one step simpler*
2. *Assume* that my function will work to solve the simpler problem — really *believe* it beyond any doubt
3. Ask myself: Since I *know* I can solve the simpler problem, how would I solve the more complex problem?

Example : reversing a string 

If the string is only one character (or, for that matter, if it is empty), then we don’t need to do anything to reverse the string, and we can simply return it:

```c
function reverse(string) {
  // Base case
  if (string.length < 2) return string;
}
```

Now, for the more challenging part — figuring out how to write the recursive call to accomplish the rest of the task. Let’s go through the thought process that we outlined above:

1. I am trying to reverse a string. A problem one step simpler would be to reverse a string that is *one letter shorter*.
2. I will assume, and *believe* with every fiber of my being, that my functioncan correctly reverse a string that is one letter shorter than the one I amcurrently trying to reverse.
3. I ask myself: Since I *know and believe* that my function can correctly reverse a string that is one letter shorter than the one I am currently trying to reverse, how can I reverse the whole string? Well, I can take all of the characters except the first one, reverse those (which I *know and believe* that my function can do), and then tack the first character on to the end! In code, it would look like this:

```cpp

function reverse(string) {
  // Base case
  if (string.length < 2) return string;  // Recursive case
  return reverse(string.slice(1, string.length)) + string[0];
}
```

One common mistake that I see people make when trying to develop a recursive algorithm to solve a problem is that they try to think about how to break the problem down all the way to the base case. I would like to emphasize that in order to develop the function above, I did not think about how I could break the problem down all the way to the base case. 
That is the function’s job, not yours. 
Instead, I only thought about the problem that is one step simpler than the problem I am really trying to solve, and then I wrote my recursive algorithm to build up from there to solve the real problem.

---