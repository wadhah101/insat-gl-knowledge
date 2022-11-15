---
slug: /gl4/semester-2/compilation/tp/files/symtab
---

# Symtab.h

```c
#ifndef SYMTAB_H
#define SYMTAB_H

#define PARAM_NUMBER   5

static char *symbol_kinds[] = { "VARIABLE", "METHOD", "CLASS"};
static char *symbol_functions[] = { "DECLARATION", "PARAMETER", "INSTANTIATION","USE","ASSIGNMENT"};

extern int line;

typedef struct node {
    char* name;                                             // variable name
    char* function;                                         // rule function
    char* kind;                                             // variable global type
    char* type;                                             // variable type or method return type
    int initialized;                                        // if variable is initialized
    int level;                                              // variable level
    char* params_types[PARAM_NUMBER] ;                      // agrs type if function
    char* params_names[PARAM_NUMBER] ;                      // params if function
    int params_init[PARAM_NUMBER] ;                         // agrs init if function
    int param_index ;                                       //  current index
    int class_id;                                           // class id
    int line;

} NODE;

#define SYMBOL_TABLE_LENGTH 300

NODE symbol_table[SYMBOL_TABLE_LENGTH];

// check main

void check_main(void);

// node table modifications

int  insert_symbol(char *name,char* function,char* kind, char* type,int level,int class_id);

int  remove_param(int index);

// selectors

int   get_next_empty_element(void);

int   get_last_element_index(void);

// check

int   lookup_variable(char* name,char* type,int level, int class_id);

int  lookup_class(char* name,int class_id);

int  lookup_method(char* name,char* return_type,int class_id);

int  lookup_declarations(char *name,char* function, char* kind,int level, int class_id);

void            insert_call_param(int index,char* val,char* type);
void            set_param(char* name, char* type);

// visualization

void print_symtab(void);


#endif
```
