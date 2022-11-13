---
slug: /Gl4/semester-2/compilation/files/CodeGenerator.md
---

# CodeGenerator.h

```c
#ifndef CODEGENERATOR_H
#define CODEGENERATOR_H

static char * code_op [] = { "LDC", "LDV", "STORE", "APPEL", "ENTREE", "SORTIE", "RETOUR", "ADD", "MUL", "DIV",
                            "SUB", "INF", "INFE", "SUP", "SUPE", "DIF", "EGAL"}; 

typedef struct entree_code {
    char* code_op;                                        // Code name
    int operande;                                         // value
    char* function_name;     
    char* designation;                             // function name
} ENTREE_CODE;


//entree code table modifications

int  insert_code (char *code_op, int operande, char *function_name, char* designation);

int  insert_code_variable (char *code_op, char* name);

int  insert_code_ldv (char *code_op, char* name);

// selectors

int   get_next_empty_code(void);

int   get_last_code_index(void);

// check 

void  check_code_int(void);

void change_signature(void);

// void  lookup_class(char* name,int class_id);

// void  lookup_method(char* name,char* return_type,int class_id);

// void  lookup_declarations(char *name,char* function, char* kind,int level, int class_id);

// void            insert_call_param(int index,char* val,char* type);
// void            set_param(char* name, char* type);

// visualization

void print_codetab(void);    


#endif
```
