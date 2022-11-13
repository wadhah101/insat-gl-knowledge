---
slug: /gl4/semester-2/compilation/tp/files/codegenerator-c
---

# CodeGenerator.c

```c
#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "symtab.h"
#include "codeGenerator.h"

#define TAB_COD_INT_LENGTH 300

ENTREE_CODE tab_code_int[TAB_COD_INT_LENGTH];

int first_tab_code_empty = 0;

int get_next_empty_code(void)
{
    if (first_tab_code_empty < TAB_COD_INT_LENGTH)
        return first_tab_code_empty++;
    else
    {
        printf("Line: %d : Compiler error! Code table overflow!", line);
        exit(EXIT_FAILURE);
    }
}

int get_last_code_index(void)
{
    return first_tab_code_empty - 1;
}

int insert_code(char *code_op, int operande, char *function_name, char *designation)
{
    int index = get_next_empty_code();
    tab_code_int[index].code_op = code_op;
    tab_code_int[index].operande = operande;
    tab_code_int[index].function_name = function_name;
    tab_code_int[index].designation = designation;
    return index;
}

int insert_code_variable(char *code_op, char *name)
{
    int index = get_last_element_index();
    while (index >= 0)
    {
        if (strcmp(symbol_table[index].name, name) == 0 && strcmp(symbol_table[index].function, "DECLARATION") == 0)
        {
            break;
        }
        index--;
    }
    for (int i = 0; i <= get_last_code_index(); i++)
    {
        if (tab_code_int[i].operande == index)
        {
            ENTREE_CODE *entre = &tab_code_int[get_last_code_index()];
            entre->operande = tab_code_int[i + 1].operande;
            break;
        }
    }
}

int insert_code_ldv(char *code_op, char *name)
{
    int index = get_last_element_index();
    while (index >= 0)
    {
        if (strcmp(symbol_table[index].name, name) == 0 && strcmp(symbol_table[index].function, "ASSIGNMENT") == 0)
        {
            break;
        }
        index--;
    }
    if (index < 0)
    {
        printf("Line: %d : Compiler error! %s has no value !", line, name);
        exit(EXIT_FAILURE);
    }
    while (index >= 0)
    {
        if (strcmp(symbol_table[index].name, name) == 0 && strcmp(symbol_table[index].function, "DECLARATION") == 0)
        {
            break;
        }
        index--;
    }

    for (int i = get_last_code_index(); i >= 0; i--)
    {
        if (tab_code_int[i].operande == index && strcmp(tab_code_int[i].designation, "") == 0)
        {
            insert_code("LDV", tab_code_int[i + 1].operande, "", "VALUE_FETCHING");
            break;
        }
    }
}

void change_signature(void)
{
    for (int i = get_last_code_index(); i >= 0; i--)
    {
        if (strcmp(tab_code_int[i].code_op, "SIFAUX") == 0)
        {
            ENTREE_CODE *entre = &tab_code_int[i];
            entre->code_op = "TANTQUEFAUX";
            break;
        }
    }
}

void check_method_call(void)
{
    for (int i = 0; i <= get_last_code_index(); i++)
    {
        if (strcmp(tab_code_int[i].code_op, "APPEL") == 0)
        {
            for (int k = i + 1; k <= get_last_code_index(); k++)
            {
                if (strcmp(tab_code_int[k].function_name, tab_code_int[i].function_name) == 0 && strcmp(tab_code_int[k].code_op, "ENTREE") == 0)
                {
                    if (strcmp(symbol_table[tab_code_int[k].operande].function, "DECLARATION") == 0)
                    {
                        ENTREE_CODE *entre = &tab_code_int[i];
                        entre->operande = k;
                        break;
                    }
                }
            }
        }
    }
}

void check_if_call(void)
{
    int i = 0;
    int last_index = get_last_code_index();
    while (i <= last_index)
    {
        if (strcmp(tab_code_int[i].code_op, "SIFAUX") == 0)
        {
            for (int k = i + 1; k <= get_last_code_index(); k++)
            {
                if (strcmp(tab_code_int[k].designation, "ELSE") == 0)
                {
                    ENTREE_CODE *entre = &tab_code_int[i];
                    entre->operande = k + 1;
                    break;
                }
            }
        }
        else if (strcmp(tab_code_int[i].code_op, "SAUT") == 0)
        {
            int test = 0;
            for (int k = i + 1; k <= get_last_code_index(); k++)
            {
                if (strcmp(tab_code_int[k].designation, "DONE_IF") == 0)
                {
                    ENTREE_CODE *entre = &tab_code_int[i];
                    entre->operande = k;
                    test = k;
                    break;
                }
            }
            if (test != 0)
            {
                for (int j = test; j < last_index; j++)
                {
                    ENTREE_CODE *entre = &tab_code_int[j + 1];
                    tab_code_int[j] = *entre;
                }
                last_index--;
                first_tab_code_empty--;
            }
        }
        i++;
    }
}

void check_while_call(void)
{
    for(int i =0;i<=get_last_code_index();i++){
        if(strcmp(tab_code_int[i].code_op,"TANTQUEFAUX") == 0){
            for(int j =i+1;j<=get_last_code_index();j++){
                if(strcmp(tab_code_int[j].code_op,"TANTQUE")==0){
                    ENTREE_CODE *entre = &tab_code_int[i];
                    entre->operande = j+1;
                    entre = &tab_code_int[j];
                    entre->operande = i-3;
                    break;
                }
            }
            break;
        }
    }
}

void check_code_int(void)
{
    check_method_call();
    check_if_call();
    check_while_call();
}

// visualization
void print_codetab(void)
{
    int i;
    printf("\n\nCODE INT TABLE\n");
    printf("\n#       name           Operande            Function       Designation ");
    printf("\n-- ---------------- ---------------- ---------------- -------------------");
    for (i = 0; i < first_tab_code_empty; i++)
    {
        printf("\n%2d %-16s %-16d", i, tab_code_int[i].code_op, tab_code_int[i].operande);
        if (strcmp(tab_code_int[i].function_name, "") != 0)
            printf(" %-16s", tab_code_int[i].function_name);
        else
            printf(" -%-15s", "");
        if (strcmp(tab_code_int[i].designation, "") != 0)
            printf(" %-16s", tab_code_int[i].designation);
        else
            printf(" -%-15s", "");
    }
    printf("\n\n");
}
```
