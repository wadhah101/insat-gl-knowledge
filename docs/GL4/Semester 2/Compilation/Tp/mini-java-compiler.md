---
slug: /Gl4/semester-2/compilation/mini-java-compiler
---


# Mini-Java-Compiler

Author [@hamza-mahjoub](https://github.com/hamza-mahjoub)

## About the project

A compiler for the following mini java BNF grammar

```bash
Program ::= MainClass ( ClassDeclaration )* <EOF>

MainClass ::= "class" Identifier "{" "public" "static" "void" "main" "(" "String" "[" "]" Identifier ")" "{" Statement "}" "}"

ClassDeclaration ::= "class" Identifier ( "extends" Identifier )? "{" ( VarDeclaration )* ( MethodDeclaration )*  "}"

VarDeclaration ::= Type Identifier ";"

MethodDeclaration ::= "public" Type Identifier "(" ( Type Identifier ( "," Type Identifier )* )? ")" "{" ( VarDeclaration )* ( Statement )* "return" Expression ";" "}"

Type ::= "int" "[" "]"
 | "boolean"
 | "int"
 | Identifier

Statement ::= "{" ( Statement )* "}"

 | "if" "(" Expression ")" Statement "else" Statement

 | "while" "(" Expression ")" Statement

 | "System.out.println" "(" Expression ")" ";"

 | Identifier "=" Expression ";"

 | Identifier "[" Expression "]" "=" Expression ";"

Expression ::= Expression ( "&&" | "<" | "+" | "-" | "*" ) Expression

 | Expression "[" Expression "]"

 | Expression "." "length"

 | Expression "." Identifier "(" ( Expression ( "," Expression )* )? ")"

 | <INTEGER_LITERAL>
 | <BOOLEAN_LITERAL>

 | Identifier

 | "this"
 | "new" "int" "[" Expression "]"

 | "new" Identifier "(" ")"

 | "!" Expression

 | "(" Expression ")"

Identifier ::= <IDENTIFIER>

```

Where

- **identifier** follows the regex expression ```? /([A-Za-z_][A-Za-z0-9_]*)/ ?```
- **<INTEGER_LITERAL>** follows the regex expression ```? /(-?[1-9][0-9]*)/ ?```
- **<BOOLEAN_LITERAL>** follows the regex expression ```= ? /(true|false)/ ?```

## Technologies

- Flex
- Bison
- C language

## Project files

- [**LexicalAnalyzer.lex**](./files/LexicalAnalyzer.md) handles the text parsing and tokens generation.
- [**SyntaxAnalyzer.y**](./files/SyntaxAnalyzer.md) handles syntax errors and invokes **C** functions that handles the semantic logic.
- [**symtab.h**](./files/Symtab.md) contains semantic C functions declaration.
- [**symtab.c**](./files/Symtab-c.md) contains semantic C functions implementation.
- [**CodeGeneration.h**](files/CodeGenerator.md) contains assembly C functions declaration.
- [**CodeGeneration.c**](files/CodeGenerator-c.md) contains assembly C functions implementation.

## Get started

### Generating app.exe

Generate the **app.exe** by running the following python script:

```py

import os

os.system("flex LexicalAnalyzer.lex")

os.system("bison -d SyntaxAnalyzer.y")

os.system("gcc -o app SyntaxAnalyzer.tab.c lex.yy.c symtab.c codeGenerator.c")

```

then in **cmd**

```py
python script.py
```

### How to use the generated app.exe

Lets consider this test code:

```java
/* ===========================================================
  CECI EST UN COMMENTAIRE qui prendra fin a la prochaine
  accolade fermante

  TP1 - ift2030 - automne 2002
  ============================================================ */

class Calculator{
    public static void main(String[] a){
        System.out.println(new Calculator1().calculate());
    }
}

/* ====================================================
   Classe Calculator1
   ==================================================== */

class Calculator1{
    bool test;                          // @ 0
    int somme;                          // @ 1
    public int calculate (){
        int x;                          // @ 2
        int y;                          // @ 3
        x = 5;
        y = 6;
        somme = x * 10;
        y = somme + 15;
        somme = x / y;

        if (x < 1)
            y = 1 ;
        else {
            x = x + 1 ;
            while (x > somme)
                y = y + 1;
        }


        return x ;
    }
}
```

Use it as input for the generated app.exe:

```bash
app.exe < test.txt
```
