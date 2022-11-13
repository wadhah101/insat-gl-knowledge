---
slug: /Gl4/semester-2/compilation/files/SyntaxAnalyzer.md
---

# SyntaxAnalyzer.y

```c

%{

    #include <stdio.h>
    #include <string.h>
    #include <stdlib.h>
    #include <stdbool.h>
    #include "symtab.h"
    #include "codeGenerator.h"

    #define YYSTYPE char*

    int yyparse(void);
    int yyerror(char const *msg);
    int yylex(void);

    extern int line;

    int class_id = 0;
    int level = 0;
    bool isParam = false;
    int method_call_index = -1;
    int expression_level = 0;

    //other

    int address = 0;
    int code_index = -1;
    char* method_name = "";
    char* class_name = "";
    char* math_op = "";
    char* com_op = "";
    int retour = 0;

    #define YYERROR_VERBOSE 1


%}

%token  _PUBLIC
%token  _STATIC
%token  _CLASS
%token  _VOID
%token  _MAIN
%token  _EXTENDS
%token  _RETURN
%token  _SOP
%token  _LENGTH
%token  _THIS
%token  _NEW
%token  _IF
%token  _ELSE
%token  _WHILE
%token  _INTEGER
%token  _STRING
%token  _DATATYPE
%token  _OPENPARENT
%token  _CLOSEPARENT
%token  _OPENSQRBRACK
%token  _CLOSESQRBRACK
%token  _OPENBRAC
%token  _CLOSEBRAC
%token  _AND
%token  _OR
%token  _DOT
%token  _SEMICOLON
%token  _COMMA
%token  _DOUBLEQUOTE
%token  _SINGLEQUOTE
%token  _PLUS
%token  _MINUS
%token  _MULTIPLY
%token  _NOT
%token  _EQUAL
%token  _DIV
%token  _COMPOP
%token  _BOOLVALUE
%token  _INTEGERVALUE
%token  _IDENT


%start program

%%

program              : MainClass ClassDeclaration           { print_symtab();check_main();check_code_int();print_codetab(); printf("Analyze finished with success \n");}


MainMethodParam      : _STRING _OPENSQRBRACK _CLOSESQRBRACK _IDENT
                        {
                            code_index = insert_symbol("main","DECLARATION","METHOD","void",0,class_id);
                            set_param($4,strcat($1,"[]"));

                            insert_code("ENTREE",code_index,"main","");
                        }
                        | error _OPENSQRBRACK _CLOSESQRBRACK _IDENT                                 { yyerror (" String is needed  "); YYABORT}
                        | _STRING error _CLOSESQRBRACK _IDENT                                       { yyerror (" Open brackets is needed  "); YYABORT}
                        | _STRING _OPENSQRBRACK error _IDENT                                        { yyerror (" CLose brackets is needed  "); YYABORT}
                        | _STRING _OPENSQRBRACK _CLOSESQRBRACK error                                { yyerror (" Identifier is needed  "); YYABORT}
                        ;

MainClass            : ClassScope _OPENBRAC _PUBLIC _STATIC _VOID _MAIN _OPENPARENT MainMethodParam _CLOSEPARENT _OPENBRAC Statement _CLOSEBRAC _CLOSEBRAC     { insert_code("SORTIE",-1,"main",""); insert_code("SORTIE",-1,"","CLASS");}
                        | ClassScope error _PUBLIC _STATIC _VOID _MAIN _OPENPARENT MainMethodParam _CLOSEPARENT _OPENBRAC Statement _CLOSEBRAC _CLOSEBRAC      { yyerror (" Open brackets is needed  "); YYABORT}
                        | ClassScope _OPENBRAC error _STATIC _VOID _MAIN _OPENPARENT MainMethodParam _CLOSEPARENT _OPENBRAC Statement _CLOSEBRAC _CLOSEBRAC    { yyerror (" Public is needed  "); YYABORT}
                        | ClassScope _OPENBRAC _PUBLIC error _VOID _MAIN _OPENPARENT MainMethodParam _CLOSEPARENT _OPENBRAC Statement _CLOSEBRAC _CLOSEBRAC    { yyerror (" Static is needed  "); YYABORT}
                        | ClassScope _OPENBRAC _PUBLIC _STATIC error _MAIN _OPENPARENT MainMethodParam _CLOSEPARENT _OPENBRAC Statement _CLOSEBRAC _CLOSEBRAC  { yyerror (" Void is needed  "); YYABORT}
                        | ClassScope _OPENBRAC _PUBLIC _STATIC _VOID error _OPENPARENT MainMethodParam _CLOSEPARENT _OPENBRAC Statement _CLOSEBRAC _CLOSEBRAC  { yyerror (" Main is needed  "); YYABORT}
                        | ClassScope _OPENBRAC _PUBLIC _STATIC _VOID _MAIN error MainMethodParam _CLOSEPARENT _OPENBRAC Statement _CLOSEBRAC _CLOSEBRAC        { yyerror (" Open parentheses is needed  "); YYABORT}
                        | ClassScope _OPENBRAC _PUBLIC _STATIC _VOID _MAIN _OPENPARENT MainMethodParam error _OPENBRAC Statement _CLOSEBRAC _CLOSEBRAC         { yyerror (" Close parentheses is needed  "); YYABORT}
                        | ClassScope _OPENBRAC _PUBLIC _STATIC _VOID _MAIN _OPENPARENT MainMethodParam _CLOSEPARENT error Statement _CLOSEBRAC _CLOSEBRAC      { yyerror (" Open brackets is needed  "); YYABORT}
                        | ClassScope _OPENBRAC _PUBLIC _STATIC _VOID _MAIN _OPENPARENT MainMethodParam _CLOSEPARENT _OPENBRAC error _CLOSEBRAC _CLOSEBRAC      { yyerror (" Statement is needed  "); YYABORT}
                        | ClassScope _OPENBRAC _PUBLIC _STATIC _VOID _MAIN _OPENPARENT MainMethodParam _CLOSEPARENT _OPENBRAC Statement error _CLOSEBRAC       { yyerror (" Close brackets is needed  "); YYABORT}
                        | ClassScope _OPENBRAC _PUBLIC _STATIC _VOID _MAIN _OPENPARENT MainMethodParam _CLOSEPARENT _OPENBRAC Statement _CLOSEBRAC error       { yyerror (" close brackets is needed  "); YYABORT}
                        ;

SectionE_I           : _EXTENDS _IDENT
                        {
                            insert_symbol($2,"EXTENSION","CLASS","IDENT",0,class_id);
                            level = 0;
                        }
                        | error _IDENT        { yyerror (" Extends is needed  "); YYABORT}
                        | _EXTENDS error      { yyerror (" Identifier is needed  "); YYABORT}
                        |       {level = 0;}
                        ;

ClassScope           : _CLASS _IDENT
                        {
                            class_id +=1;

                            code_index  = lookup_class($2,class_id);
                            class_name = $2;
                            insert_code("ENTREE",code_index,"","CLASS");
                        }
                        | error _IDENT   { yyerror (" Class is needed  "); YYABORT}
                        | _CLASS error   { yyerror (" Identifier is needed  "); YYABORT}
                        ;

ClassDeclaration     : ClassScope  SectionE_I _OPENBRAC VarDeclaration MethodDeclaration _CLOSEBRAC
                        {
                            insert_code("SORTIE",-1,"","CLASS");
                            insert_code("RETOUR",retour+1,"","");
                        }
                        ClassDeclaration
                        | error SectionE_I _OPENBRAC VarDeclaration MethodDeclaration _CLOSEBRAC ClassDeclaration
                        | ClassScope SectionE_I error VarDeclaration MethodDeclaration _CLOSEBRAC ClassDeclaration    { yyerror (" Open brackets is needed  "); YYABORT}
                        | ClassScope SectionE_I _OPENBRAC VarDeclaration MethodDeclaration error ClassDeclaration     { yyerror (" Close brackets is needed  "); YYABORT}
                        |
                        ;

Type                 : _DATATYPE _IDENT
                        {
                            if(isParam)
                                set_param($2,$1);
                            else {
                                code_index = lookup_variable($2,$1,level,class_id);
                                insert_code("LDC",code_index,"","");
                                insert_code("STORE",address,"","");
                                address++;
                            }
                        }
                        /*| _IDENT _IDENT
                        {
                            if(isParam)
                                set_param($2,$1);
                            else {
                                code_index = lookup_variable($2,$1,level,class_id);
                                insert_code("LDC",code_index,"","");
                                insert_code("STORE",address,"","");
                                address++;
                            }

                        } */
                        | _INTEGER _IDENT
                        {
                            if(isParam)
                                set_param($2,$1);
                            else {
                                code_index = lookup_variable($2,$1,level,class_id);
                                insert_code("LDC",code_index,"","");
                                insert_code("STORE",address,"","");
                                address++;
                            }

                        }
                        | error _IDENT                    { yyerror (" Valid Type is needed  "); YYABORT}
                        //| _IDENT error                    { yyerror (" Identifier is needed  "); YYABORT}
                        | _DATATYPE error                 { yyerror (" Identifier is needed  "); YYABORT}
                        | _INTEGER error                  { yyerror (" Identifier is needed  "); YYABORT}
                        ;

MethodType           : _DATATYPE _IDENT
                        {
                            code_index = lookup_method($2,$1,class_id);
                            isParam = true;

                            method_name = $2;
                            insert_code("ENTREE",code_index,$2,"");
                        }
                        /*| _IDENT _IDENT
                        {
                            code_index = lookup_method($2,$1,class_id);
                            isParam = true;

                            method_name = $2;
                            insert_code("ENTREE",code_index,$2,"");
                        }*/
                        | _INTEGER _IDENT
                        {
                            code_index = lookup_method($2,$1,class_id);
                            isParam = true;

                            method_name = $2;
                            insert_code("ENTREE",code_index,$2,"");
                        }
                        | error _IDENT                    { yyerror (" Valid Type is needed  "); YYABORT}
                        //| _IDENT error                    { yyerror (" Identifier is needed "); YYABORT}
                        | _DATATYPE error                 { yyerror (" Identifier is needed  "); YYABORT}
                        | _INTEGER error                  { yyerror (" Identifier is needed  "); YYABORT}
                        ;

VarDeclaration       : Type _SEMICOLON VarDeclaration
                        |
                        | Type error VarDeclaration       { yyerror (" Semi colon is needed  "); YYABORT}
                        ;

SectionC_T           : _COMMA Type SectionC_T
                        | error Type SectionC_T           { yyerror (" Comma is needed  "); YYABORT}
                        |
                        ;

SectionT_SCT         :  Type SectionC_T { isParam = false; level = 1;}
                        |               { isParam = false; level = 1;}
                        ;

MethodDeclaration    : _PUBLIC MethodType _OPENPARENT SectionT_SCT _CLOSEPARENT _OPENBRAC VarDeclaration Statement _RETURN Expression _SEMICOLON _CLOSEBRAC
                        {
                            insert_code("SORTIE",-1,method_name,"");
                        }
                        MethodDeclaration
                        | error MethodType _OPENPARENT SectionT_SCT _CLOSEPARENT _OPENBRAC VarDeclaration Statement _RETURN Expression _SEMICOLON _CLOSEBRAC MethodDeclaration   { yyerror (" Public is needed  "); YYABORT}
                        | _PUBLIC error error SectionT_SCT _CLOSEPARENT _OPENBRAC VarDeclaration Statement _RETURN Expression _SEMICOLON _CLOSEBRAC MethodDeclaration       { yyerror (" Open parentheses is needed  "); YYABORT}
                        | _PUBLIC MethodType _OPENPARENT SectionT_SCT error _OPENBRAC VarDeclaration Statement _RETURN Expression _SEMICOLON _CLOSEBRAC MethodDeclaration        { yyerror (" Close parentheses is needed  "); YYABORT}
                        | _PUBLIC MethodType _OPENPARENT SectionT_SCT _CLOSEPARENT error VarDeclaration Statement _RETURN Expression _SEMICOLON _CLOSEBRAC MethodDeclaration     { yyerror (" Open brackets is needed  "); YYABORT}
                        | _PUBLIC MethodType _OPENPARENT SectionT_SCT _CLOSEPARENT _OPENBRAC VarDeclaration Statement error Expression _SEMICOLON _CLOSEBRAC MethodDeclaration   { yyerror (" Return is needed  "); YYABORT}
                        | _PUBLIC MethodType _OPENPARENT SectionT_SCT _CLOSEPARENT _OPENBRAC VarDeclaration Statement _RETURN Expression error _CLOSEBRAC MethodDeclaration      { yyerror (" Semi colon is needed  "); YYABORT}
                        | _PUBLIC MethodType _OPENPARENT SectionT_SCT _CLOSEPARENT _OPENBRAC VarDeclaration Statement _RETURN Expression _SEMICOLON error MethodDeclaration      { yyerror (" Close brackets is needed  "); YYABORT}
                        |
                        ;

Statement            : _OPENBRAC Statement Statement _CLOSEBRAC
                        | error Statement Statement _CLOSEBRAC                                               { yyerror (" Open brackets is needed  "); YYABORT}
                        | _OPENBRAC Statement Statement error                                                { yyerror (" Close brackets is needed  "); YYABORT}
                        | _IF _OPENPARENT Expression _CLOSEPARENT Statement Statement
                        {
                            insert_code("SAUT",-1,"","ELSE");
                        }
                        _ELSE Statement Statement
                        {
                            insert_code("SAUT",-1,"","DONE_IF");
                        }
                        | error _OPENPARENT Expression _CLOSEPARENT Statement _ELSE Statement               { yyerror (" If brackets is needed  "); YYABORT}
                        | _IF error Expression _CLOSEPARENT Statement _ELSE Statement                       { yyerror (" Open parentheses brackets is needed  "); YYABORT}
                        | _IF _OPENPARENT Expression error Statement _ELSE Statement                        { yyerror (" Close parentheses is needed  "); YYABORT}
                        | _IF _OPENPARENT Expression _CLOSEPARENT Statement error Statement                 { yyerror (" Else is needed  "); YYABORT}
                        | _WHILE _OPENPARENT Expression _CLOSEPARENT
                        {
                            //insert_code("TANTQUEFAUX",-1,"","");
                            change_signature();
                        }
                        Statement
                        {
                            insert_code("TANTQUE",-1,"","");
                        }
                        | error _OPENPARENT Expression _CLOSEPARENT Statement                               { yyerror (" While is needed  "); YYABORT}
                        | _WHILE error Expression _CLOSEPARENT Statement                                    { yyerror (" Open parentheses is needed  "); YYABORT}
                        | _WHILE _OPENPARENT Expression error Statement                                     { yyerror (" Close parentheses is needed  "); YYABORT}
                        | _SOP _OPENPARENT Expression _CLOSEPARENT _SEMICOLON Statement
                        | error _OPENPARENT Expression _CLOSEPARENT _SEMICOLON Statement                              { yyerror (" System.out.println is needed  "); YYABORT}
                        | _SOP error Expression _CLOSEPARENT _SEMICOLON Statement                                     { yyerror (" Open parentheses is needed  "); YYABORT}
                        | _SOP _OPENPARENT Expression error _SEMICOLON Statement                                      { yyerror (" Close parentheses is needed  "); YYABORT}
                        | _SOP _OPENPARENT Expression _CLOSEPARENT error Statement                                    { yyerror (" Semi colon is needed  "); YYABORT}
                        | _IDENT _EQUAL Expression _SEMICOLON
                        {
                            insert_code("STORE",-1,"","");
                            code_index = lookup_declarations($1,"ASSIGNMENT","VARIABLE",level,class_id);
                            insert_code_variable("STORE",$1);
                        }
                        Statement
                        | error _EQUAL Expression _SEMICOLON Statement                                      { yyerror (" Identifier is needed  "); YYABORT}
                        | _IDENT error Expression _SEMICOLON Statement                                      { yyerror (" Equal operator is needed  "); YYABORT}
                        | _IDENT _EQUAL Expression error Statement                                          { yyerror (" Semi colon is needed  "); YYABORT}
                        | _IDENT _OPENSQRBRACK Expression _CLOSESQRBRACK _EQUAL Expression _SEMICOLON Statement
                        {
                            lookup_declarations($1,"ASSIGNMENT","VARIABLE",level,class_id)

                        }
                        | error _OPENSQRBRACK Expression _CLOSESQRBRACK _EQUAL Expression _SEMICOLON Statement        { yyerror (" Identifier is needed  "); YYABORT}
                        | _IDENT error Expression _CLOSESQRBRACK _EQUAL Expression _SEMICOLON Statement               { yyerror (" Open brackets is needed  "); YYABORT}
                        | _IDENT _OPENSQRBRACK Expression error _EQUAL Expression _SEMICOLON  Statement               { yyerror (" Close brackets is needed  "); YYABORT}
                        | _IDENT _OPENSQRBRACK Expression _CLOSESQRBRACK error Expression _SEMICOLON  Statement       { yyerror (" Equal operator is needed  "); YYABORT}
                        | _IDENT _OPENSQRBRACK Expression _CLOSESQRBRACK _EQUAL Expression error  Statement           { yyerror (" Semi colon is needed  "); YYABORT}
                        |
                        ;

SectionC_E           : _COMMA Expression SectionC_E
                        | error Expression SectionC_E            { yyerror (" Comma is needed  "); YYABORT}
                        |
                        ;

LogicOperator        : _AND                      {com_op = "&&";}
                        | _COMPOP                {com_op = $1;}
                        ;

MathOperator         : _PLUS                    { math_op = "+";}
                        | _MINUS                { math_op = "-";}
                        | _MULTIPLY             { math_op = "*";}
                        | _DIV                  { math_op = "/";}
                        ;

SectionE_SCE         : Expression SectionC_E
                        {
                            method_call_index = -1;
                            expression_level=0;
                        }
                        |
                        {
                            method_call_index = -1;
                            expression_level=0;
                        }
                        ;

UseFunction          : _DOT _IDENT
                        {
                            method_call_index = insert_symbol($2,"USE","METHOD","DOT_IDENT",0,class_id);

                            retour = insert_code("APPEL",method_call_index,$2,"");
                        }
                        | error _IDENT                                                                   { yyerror (" Dot is needed  "); YYABORT}
                        | _DOT  error                                                                    { yyerror (" Identifier is needed  "); YYABORT}
                        ;

Expression           : Expression
                        {
                            if(method_call_index != -1) {
                                remove_param(method_call_index);
                            }
                            char * end;
                            long value = strtol($1,&end,10 );
                            if(end != NULL){
                                insert_code_ldv("LDV",$1);
                            }
                        }
                        MathOperator Expression
                        {
                            if(method_call_index != -1){
                                remove_param(method_call_index);
                                insert_call_param(method_call_index,"EXP","int");
                            }
                            char * end;
                            long value = strtol($4,&end,10);
                            printf("%s\n",end);
                            if(strcmp(end,"") != 0){
                                insert_code_ldv("LDV",$4);
                            }
                            if(strcmp(math_op,"+") == 0)
                                insert_code("ADD",-1,"","");
                            else if(strcmp(math_op,"*") == 0)
                                insert_code("MUL",-1,"","");
                            else if(strcmp(math_op,"/") == 0)
                                insert_code("DIV",-1,"","");
                            else
                                insert_code("SUB",-1,"","");
                        }
                        | Expression
                        {
                            if(method_call_index != -1) {
                                remove_param(method_call_index);
                            }
                            char * end;
                            long value = strtol($1,&end,10 );
                            if(end != NULL){
                                insert_code_ldv("LDV",$1);
                            }
                        }
                        LogicOperator Expression
                        {

                            if(method_call_index != -1) {
                                remove_param(method_call_index);
                                insert_call_param(method_call_index,"EXP","bool");
                            }

                            char * end;
                            long value = strtol($4,&end,10);
                            printf("%s\n",end);
                            if(strcmp(end,"") != 0){
                                insert_code_ldv("LDV",$4);
                            }

                            if(strcmp(com_op,"<") == 0)
                                insert_code("INF",-1,"","");
                            else if(strcmp(com_op,"<=")== 0)
                                insert_code("INFE",-1,"","");
                            else if(strcmp(com_op,">")== 0)
                                insert_code("SUP",-1,"","");
                            else if(strcmp(com_op,">=")== 0)
                                insert_code("SUPE",-1,"","");
                            else if(strcmp(com_op,">=") == 0)
                                insert_code("SUPE",-1,"","");
                            else
                                insert_code("EGAL",-1,"","");

                            insert_code("SIFAUX",-1,"","");
                        }
                        | Expression error Expression                                                    { yyerror (" Comparison operator is needed  "); YYABORT}
                        | Expression _OPENSQRBRACK Expression _CLOSESQRBRACK
                        {

                            if(method_call_index != -1) {
                                insert_call_param(method_call_index,"EXP","int[]");
                            }

                        }
                        | Expression error Expression _CLOSESQRBRACK                                     { yyerror (" Open brackets is needed  "); YYABORT}
                        | Expression _OPENSQRBRACK Expression error                                      { yyerror (" Close brackets is needed  "); YYABORT}
                        | Expression _DOT _LENGTH
                        {
                            if(method_call_index != -1) {
                                insert_call_param(method_call_index,"EXP","int");
                            }

                        }
                        | Expression error _LENGTH                                                       { yyerror (" Dot is needed  "); YYABORT}
                        | Expression _DOT error                                                          { yyerror (" Length is needed  "); YYABORT}
                        | Expression UseFunction _OPENPARENT SectionE_SCE _CLOSEPARENT
                        | Expression UseFunction error SectionE_SCE _CLOSEPARENT                         { yyerror (" Open parentheses is needed  "); YYABORT}
                        | Expression UseFunction _OPENPARENT SectionE_SCE error                          { yyerror (" Close parentheses is needed  "); YYABORT}
                        | _INTEGERVALUE
                        {
                            if(method_call_index != -1 && expression_level < 1)
                                insert_call_param(method_call_index,$1,"int");
                            else {
                                insert_code("LDC",strtol($1, NULL, 10),"","INTEGER_VALUE");
                                //address++;
                            }

                        }
                        | _MINUS _INTEGERVALUE
                        {

                            if(method_call_index != -1 && expression_level < 1)
                                insert_call_param(method_call_index,strcat("-",$2),"int");
                            else{
                                insert_code("LDC",-strtol($2, NULL, 10),"","INTEGER_VALUE");
                                insert_code("STORE",-1,"","");
                                //address++;
                            }
                        }
                        | _BOOLVALUE
                        {
                            if(method_call_index != -1 && expression_level < 1)
                                insert_call_param(method_call_index,$1,"bool");
                            else {
                                if (strcmp($1,"true") == 0)
                                {
                                    insert_code("LDC",1,"","BOOLEAN_VALUE");
                                    insert_code("STORE",-1,"","");
                                    //address++;
                                }
                                else {
                                    insert_code("LDC",0,"","BOOLEAN_VALUE");
                                    insert_code("STORE",-1,"","");
                                    //address++;
                                }
                            }
                        }
                        | _IDENT
                        {
                            if(method_call_index != -1 && expression_level < 1)
                              insert_call_param(method_call_index,$1,"IDENT");

                            code_index = lookup_declarations($1,"USE","VARIABLE",level,class_id);
                            //insert_use_code("LDV",code_index,"");
                        }
                        | _THIS
                        | _NEW _INTEGER _OPENSQRBRACK Expression _CLOSEBRAC
                        | error _INTEGER _OPENSQRBRACK Expression _CLOSEBRAC                             { yyerror (" New is needed  "); YYABORT}
                        | _NEW error _OPENSQRBRACK Expression _CLOSEBRAC                                 { yyerror (" Integer type is needed  "); YYABORT}
                        | _NEW _INTEGER error Expression _CLOSEBRAC                                      { yyerror (" Open brackets is needed  "); YYABORT}
                        | _NEW _INTEGER _OPENSQRBRACK Expression error                                   { yyerror (" Close brackets is needed  "); YYABORT}
                        | _NEW _IDENT _OPENPARENT _CLOSEPARENT
                        {
                            insert_symbol($2,"INSTANTIATION","VARIABLE","NEW_IDENT",0,class_id);
                        }
                        | error _IDENT _OPENPARENT _CLOSEPARENT                                          { yyerror (" New is needed  "); YYABORT}
                        | _NEW error _OPENPARENT _CLOSEPARENT                                            { yyerror (" Identifier is needed  "); YYABORT}
                        | _NEW _IDENT error _CLOSEPARENT                                                 { yyerror (" Open parentheses is needed  "); YYABORT}
                        | _NEW _IDENT _OPENPARENT error                                                  { yyerror (" Close parentheses is needed  "); YYABORT}
                        | _NOT Expression
                        | error Expression                                                               { yyerror (" Not operator is needed  "); YYABORT}
                        | _OPENPARENT Expression _CLOSEPARENT
                        | error Expression _CLOSEPARENT                                                  { yyerror (" open parentheses is needed  "); YYABORT}
                        | _OPENPARENT Expression error                                                   { yyerror (" Close parentheses is needed  "); YYABORT}
                        | error                                                                          { yyerror (" Integer Value or boolean value or identifier or this   is needed  "); YYABORT}
                        ;

%%

    int yyerror(char const *msg) {

        fprintf(stderr, "%s %d\n", msg,line);
        return 0;
    }

    extern FILE *yyin;

    int main()
    {
        yyparse();
    }
```
