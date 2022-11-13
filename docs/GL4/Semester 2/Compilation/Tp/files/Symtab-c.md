---
slug: /Gl4/semester-2/compilation/files/Symtab-c.md
---

# Symtab.c

```c

#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "symtab.h"

// #define SYMBOL_TABLE_LENGTH 300

// NODE symbol_table[SYMBOL_TABLE_LENGTH];

int first_empty = 0;
extern int line;

int get_next_empty_element(void)
{
    if (first_empty < SYMBOL_TABLE_LENGTH)
        return first_empty++;
    else
    {
        printf("Line: %d : Compiler error! Symbol table overflow!", line);
        exit(EXIT_FAILURE);
    }
}

int get_last_element_index(void)
{
    return first_empty - 1;
}

int insert_symbol(char *name, char *function, char *kind, char *type, int level, int class_id)
{
    int index = get_next_empty_element();
    symbol_table[index].name = name;
    symbol_table[index].function = function;
    symbol_table[index].kind = kind;
    symbol_table[index].type = type;
    symbol_table[index].level = level;
    symbol_table[index].class_id = class_id;
    if ((strcmp(kind, "VARIABLE") == 0 || strcmp(kind, "METHOD") == 0) && strcmp(function, "DECLARATION") == 0)
        symbol_table[index].initialized = 0;
    else
        symbol_table[index].initialized = -1;
    symbol_table[index].param_index = 0;
    symbol_table[index].line = line;
    return index;
}

// method param delete

int remove_param(int index)
{
    NODE *method = &symbol_table[index];
    method->param_index--;
}

// method param insert

void set_param(char *name, char *type)
{
    // check if param already exists
    NODE *function = &symbol_table[get_last_element_index()];
    int index = function->param_index;
    if (index < PARAM_NUMBER)
    {
        if (index != 0)
        {
            for (int i = 0; i < index; i++)
            {
                if (strcmp(function->params_names[i], name) == 0)
                {
                    printf("Line: %d : Compiler error! Method parameter ' %s ' already declared !", line, name);
                    exit(EXIT_FAILURE);
                }
            }
        }
        function->params_names[function->param_index] = name;
        function->params_types[function->param_index] = type;
        function->param_index = function->param_index + 1;
    }
    else
    {
        printf("Line: %d : Compiler error! Method parameters ' %s 'number overflow, max is %d !", line, function->name, PARAM_NUMBER);
        exit(EXIT_FAILURE);
    }
}

// method call param
void insert_call_param(int f_index, char *val, char *type)
{
    NODE *function = &symbol_table[f_index];
    int index = function->param_index;
    char *ident_type = "";
    if (strcmp(type, "IDENT") == 0)
    {
        int i = f_index - 1;
        int test = 0;
        while (symbol_table[i].class_id == function->class_id)
        {
            if (strcmp(val, symbol_table[i].name) == 0 && strcmp("DECLARATION", symbol_table[i].function) == 0)
            {
                ident_type = symbol_table[i].type;
                test = 1;
                break;
            }
            i--;
        }
        if (test == 0)
        {
            printf("Line: %d : Compiler error! Variable ' %s ' is not defined !", line, val);
            exit(EXIT_FAILURE);
        }
    }
    if (index < PARAM_NUMBER)
    {
        function->params_names[function->param_index] = val;
        if (strcmp(type, "IDENT") != 0)
            function->params_types[function->param_index] = type;
        else
            function->params_types[function->param_index] = ident_type;
        function->param_index = function->param_index + 1;
    }
    else
    {
        printf("Line: %d : Compiler error! Method ' %s ' parameters number overflow, max is %d !", line, function->name, PARAM_NUMBER);
        exit(EXIT_FAILURE);
    }
}
// check if variable already declared in method(local) or class scope(global)

int lookup_variable(char *name, char *type, int level, int class_id)
{
    if (level == 0)
    {
        int i = get_last_element_index();
        while (strcmp(symbol_table[i].kind, "VARIABLE") == 0)
        {
            if (strcmp(symbol_table[i].name, name) == 0)
            {
                printf("Line: %d : Compiler error! Variable already declared in class scope!", line);
                exit(EXIT_FAILURE);
            }
            else
            {
                i--;
            }
        }
    }
    else if (level == 1)
    {
        int i = get_last_element_index();
        while (strcmp(symbol_table[i].kind, "VARIABLE") == 0)
        {
            if (strcmp(symbol_table[i].name, name) == 0)
            {
                printf("Line: %d : Compiler error! Variable already declared in method scope!", line);
                exit(EXIT_FAILURE);
            }
            else
                i--;
        }
        NODE *function = &symbol_table[i];
        for (int j = 0; j < function->param_index; j++)
        {
            if (strcmp(function->params_names[j], name) == 0)
            {
                printf("Line: %d : Compiler error! Variable already declared in method ' %s ' scope!", line, function->name);
                exit(EXIT_FAILURE);
            }
        }
    }
    int x =insert_symbol(name, "DECLARATION", "VARIABLE", type, level, class_id);
    return x;
}

// check if class already exists

int lookup_class(char *name, int class_id)
{
    if (first_empty == 0)
    {
        return insert_symbol(name, "DECLARATION", "CLASS", "NOTYPE", 0, class_id);
    }
    else
    {
        for (int i = first_empty - 1; i >= 0; i--)
        {
            if (strcmp(symbol_table[i].kind, "CLASS") == 0 && strcmp(symbol_table[i].function, "DECLARATION") == 0 && strcmp(symbol_table[i].name, name) == 0)
            {
                printf("Line: %d : Compiler error! Class ' %s ' is already declared!", line, name);
                exit(EXIT_FAILURE);
            }
        }
        return insert_symbol(name, "DECLARATION", "CLASS", "IDENT", 0, class_id);
    }
}

// check if method already declared in class scope

int lookup_method(char *name, char *return_type, int class_id)
{
    return insert_symbol(name, "DECLARATION", "METHOD", return_type, 0, class_id);
}

void lookup_override()
{
    for (int i = 0; i <= get_last_element_index(); i++)
    {
        if (strcmp(symbol_table[i].kind, "METHOD") == 0 && strcmp(symbol_table[i].function, "DECLARATION") == 0)
        {
            NODE *dec1 = &symbol_table[i];
            for (int j = i + 1; j <= get_last_element_index(); j++)
            {
                if (strcmp(symbol_table[j].kind, "METHOD") == 0 && strcmp(symbol_table[j].function, "DECLARATION") == 0 && strcmp(symbol_table[i].name, symbol_table[j].name) == 0 && symbol_table[i].class_id == symbol_table[j].class_id)
                {
                    NODE *dec2 = &symbol_table[j];
                    int test = 1;
                    if (dec1->param_index == dec2->param_index)
                    {
                        for (int k = 0; k < dec1->param_index; k++)
                        {
                            if (strcmp(dec1->params_types[k], dec2->params_types[k]) != 0)
                            {
                                test = 0;
                                break;
                            }
                        }
                    }
                    else
                        break;
                    if (strcmp(dec1->type, dec2->type) == 0 && test == 1)
                    {
                        printf("Line: %d : Compiler error! Method ' %s ' is already declared in class scope!", dec2->line, dec2->name);
                        exit(EXIT_FAILURE);
                    }
                }
            }
        }
    }
}

int lookup_declarations(char *name, char *function, char *kind, int level, int class_id)
{
    int i = first_empty - 1;
    int test = 0;
    for (i; i >= 0; i--)
    {
        if (symbol_table[i].class_id == class_id && strcmp(symbol_table[i].function, "DECLARATION") == 0)
        {
            if (strcmp(symbol_table[i].kind, "METHOD") == 0)
            {
                for (int j = 0; j < symbol_table[i].param_index; j++)
                {
                    if (strcmp(symbol_table[i].params_names[j], name) == 0)
                    {
                        NODE *method = &symbol_table[i];
                        method->params_init[j]++;
                        return insert_symbol(name, function, kind, "NOTYPE", level, class_id);
                        test = 1;
                        break;
                    }
                }
            }
            else if (strcmp(symbol_table[i].name, name) == 0 && strcmp(symbol_table[i].kind, kind) == 0)
            {
                NODE *variable = &symbol_table[i];
                variable->initialized++;
                return insert_symbol(name, function, kind, "NOTYPE", level, class_id);
                break;
            }
            if (test == 1)
                break;
        }
    }
    if (i < 0)
    {
        printf("Line: %d : Compiler error! Variable ' %s ' is not declared!", line, name);
        exit(EXIT_FAILURE);
    }
}

// main check

int check_method_call_param(NODE *call, NODE *dec)
{
    if (dec->param_index == call->param_index)
    {
        int var_test = 1;
        for (int k = 0; k < dec->param_index; k++)
        {
            if (strcmp(call->params_types[k], dec->params_types[k]) != 0)
            {
                return 0;
            }
        }
        return 1;
    }
    return 0;
}

void check_methods_declared(void)
{

    for (int i = 0; i <= get_last_element_index(); i++)
    {
        if (strcmp(symbol_table[i].kind, "METHOD") == 0 && strcmp(symbol_table[i].function, "USE") == 0)
        {
            NODE *node = &symbol_table[i - 1];
            NODE *call = &symbol_table[i];
            if (strcmp(node->type, "NEW_IDENT") == 0)
            {
                int index = -1;
                int cid = -1;
                for (int j = 0; j <= get_last_element_index(); j++)
                {
                    if (strcmp(symbol_table[j].kind, "CLASS") == 0 && strcmp(symbol_table[j].function, "DECLARATION") == 0 && strcmp(symbol_table[j].name, node->name) == 0)
                    {
                        index = j + 1;
                        cid = symbol_table[j].class_id;
                    }
                }
                int test = 0;
                while (symbol_table[index].class_id == cid && index <= get_last_element_index())
                {
                    if (strcmp(symbol_table[index].kind, "METHOD") == 0 && strcmp(symbol_table[index].function, "DECLARATION") == 0 && strcmp(symbol_table[index].name, call->name) == 0)
                    {
                        NODE *dec = &symbol_table[index];
                        if (check_method_call_param(call, dec) == 1)
                        {
                            test = 1;
                            break;
                        }
                    }
                    index++;
                }
                if (test == 0)
                {
                    printf("Line: %d : Compiler error! Method ' %s ' is not declared in class scope ' %s ' or does not have valide arguments !", call->line, call->name, node->name);
                    exit(EXIT_FAILURE);
                }
            }
            else
            {
                int test = 0;
                for (int j = 0; j <= get_last_element_index(); j++)
                {
                    if (symbol_table[j].class_id == call->class_id && strcmp(symbol_table[j].kind, "METHOD") == 0 && strcmp(symbol_table[j].function, "DECLARATION") == 0 && strcmp(symbol_table[j].name, call->name) == 0)
                    {
                        NODE *dec = &symbol_table[j];
                        if (check_method_call_param(call, dec) == 1)
                        {
                            test = 1;
                            break;
                        }
                    }
                }
                if (test == 0)
                {
                    printf("Line: %d : Compiler error! Method ' %s ' is not declared or does not have valide arguments !", symbol_table[i].line, symbol_table[i].name);
                    exit(EXIT_FAILURE);
                }
            }
        }
    }
}

void check_class_declared(void)
{
    for (int i = 0; i <= get_last_element_index(); i++)
    {
        int test = 0;
        if (strcmp(symbol_table[i].kind, "VARIABLE") == 0 && strcmp(symbol_table[i].function, "INSTANTIATION") == 0)
        {
            for (int j = 0; j <= get_last_element_index(); j++)
            {
                if (strcmp(symbol_table[j].kind, "CLASS") == 0 && strcmp(symbol_table[j].function, "DECLARATION") == 0 && strcmp(symbol_table[j].name, symbol_table[i].name) == 0)
                {
                    test = 1;
                    break;
                }
            }
            if (test == 0)
            {
                printf("Line: %d : Compiler error! Class ' %s ' is not declared!", symbol_table[i].line, symbol_table[i].name);
                exit(EXIT_FAILURE);
            }
        }
    }
}
void check_main(void)
{
    check_class_declared();
    check_methods_declared();
    lookup_override();
    for (int i = 0; i <= get_last_element_index(); i++)
    {
        if (strcmp(symbol_table[i].kind, "METHOD") == 0 && strcmp(symbol_table[i].function, "DECLARATION") == 0)
        {
            for (int j = 0; j < symbol_table[i].param_index; i++)
            {
                if (symbol_table[i].params_init[j] == 0)
                    printf("Line: %d : Warning! Parameter ' %s ' in method ' %s ' is not used !\n\n", symbol_table[i].line, symbol_table[i].params_names[j], symbol_table[i].name);
            }
        }
        if (symbol_table[i].initialized == 0)
            printf("Line: %d : Warning! Variable ' %s ' is not used !\n\n", symbol_table[i].line, symbol_table[i].name);
    }
}

// variable
// visualization
void print_symtab(void)
{
    int i, j;
    printf("\n\nSYMBOL TABLE\n");
    printf("\n#       name           function            kind             type       level  c_id   init      p1                     p2                p3                    p4                  p5 ");
    printf("\n-- ---------------- ---------------- ---------------- ---------------- ------ ------ ---- ------------------ ------------------ ------------------  ------------------  ------------------");
    for (i = 0; i < first_empty; i++)
    {
        printf("\n%2d %-16s %-16s %-16s %-16s %-6d %-6d %-5d ", i,
               symbol_table[i].name,
               symbol_table[i].function,
               symbol_table[i].kind,
               symbol_table[i].type,
               symbol_table[i].level,
               symbol_table[i].class_id,
               symbol_table[i].initialized);
        if (symbol_table[i].param_index != 0)
        {
            for (j = 0; j < symbol_table[i].param_index; j++)
            {
                printf("%s:%-10s:%3d  ", symbol_table[i].params_names[j], symbol_table[i].params_types[j], symbol_table[i].params_init[j]);
            }
        }
        else
            printf(" -");
    }
    printf("\n\n");
}
```
