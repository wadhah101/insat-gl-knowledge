
# Nested Queries 

| With Select                                                                                                                                                                                                                                                                         | With Update                                                                | With Insert                                                                                           | With Delete                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| ``SELECT (SELECT query that returns one value) FROM table  WHERE conditions``  <br />  <br /> ``SELECT columns FROM (SELECT query that retuns multiple rows ) WHERE condition``  <br />  <br />  `` SELECT column_name FROM   tables  WHERE  column_name OPERATOR  (SELECT Query)`` | ``UPDATE table SET column_name = new_value WHERE OPERATOR (SELECT Query)`` | ``INSERT INTO table_name [ (columns..) ]  VALUES (SELECT Query that reurns one value , [val , ...])`` | ``DELETE FROM TABLE_NAME WHERE OPERATOR (SELECT Query)`` |
<!--## With Select
       SELECT ( SELECT Query that returns one value 
      // Don't forget to make the join condition with the table called in the main select )
       FROM table 
       WHERE conditions 
  ------------------------------    
       SELECT columns 
       FROM (SELECT query that retuns multiple values )
       WHERE condition
---------------------------------------
      SELECT column_name
      FROM   tables 
      WHERE  column_name OPERATOR  (SELECT Query)
## With Update 
       UPDATE table
      SET column_name = new_value
      WHERE OPERATOR [ VALUE ] (SELECT Query)
## With Insert 
       INSERT INTO table_name [ (columns..) ] 
       VALUES (SELECT Query that reurns one value , [val , ...]) 
   ## With Delete
       DELETE FROM TABLE_NAME
       WHERE OPERATOR (SELECT Query)
-->
 **OPERATOR**  : EXISTS / NOT EXISTS  -- BETWEEN -- IN 
   

# Views 
### Creation
#### Virtual View 
- ``CREATE VIEW view_name(col1,col2,..) AS  query  [WITH CHECK OPTION] [WITH READ ONLY] ``
- `` REPLACE VIEW view_name(cols) AS query  [WITH CHECK OPTION] [WITH READ ONLY]``
#### Concrete View 
- ``CREATE CONCRETE VIEW view_name(col1,col2,..) AS  query  [WITH CHECK OPTION] [WITH READ ONLY] ``
 
### Delete

`` DROP VIEW view_name ``
### Recursive Queries (^SQL3)

```sql
     WITH [RECURSIVE] name AS (
     Initialisation Query 
     UNION ALL
     Recursive Query with terminate condition in where 
     )
     SELECT * from name; -- Displaying result data 
```

- PostgreSQL requires the RECURSIVE keyword in recursive definitions but it is optional for other databases.

![image](https://cdn.sqlservertutorial.net/wp-content/uploads/SQL-Server-Recursive-CTE-execution-flow.png)


# PL/SQL 
 ``DECLARE``<br /> ``VarName [constant] type [:= val];``<br /> ``BEGIN``<br />``EXCEPTION``<br />``END`` 

 
# Functions and Procedures 
## Functions 
| Oracle                                                                                                                                                                                                                                                                 | PostgreSQL                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ``CREATE FUNCTION func_name[(in / out / in out parms)] RETURN returnType AS``<br /> ``DECLARE``<br /> ``VarName [constant] type [:= val];``<br /> ``BEGIN``<br />``-- SELECT must always be used with INTO``<br />``RETURN statement``<br />``EXCEPTION``<br />``END`` | ``CREATE FUNCTION func_name() RETURNS returnType AS $$``<br />``DECLARE``<br />``VarName [constant] type [:= val];``<br /> ``BEGIN``<br />``RETURN statement``<br />``EXCEPTION``<br />``END``<br />``$$ LANGUAGE plpgsql;`` |
     
          
  ## Procedures
  
  | Oracle                                                                                                                                                                                                                                                            | PostgreSQL                                                                                                                                                                       |
  | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | ``CREATE procedure proc_name[(in / out / in out parms)] AS ``<br /> ``DECLARE``<br /> ``VarName [constant] type [:= val];``<br /> ``BEGIN``<br />``-- SELECT must always be used with INTO``<br />``RETURN statement``<br />``EXCEPTION``<br />``END proc_name;`` | ``CREATE Procedure prod_name() AS $$``<br />``DECLARE``<br />``VarName [constant] type [:= val];``<br /> ``BEGIN``<br />``EXCEPTION``<br />``END``<br />``$$ LANGUAGE plpgsql;`` |
     
 

    
- Var Types
    - RECORD, INTEGER , VARCHAR(n) , CHAR ,DATE , DECIMAL ... 
    - TABLES , LINE ..
    - %TYPE  %ROWTYPE
### Custom Type : 
            
            CREATE TYPE type_name AS (
            var_name    var_type ,
              );
              
- Return Types:     
     - INTEGER , VARCHAR(n) , CHAR ,DATE , DECIMAL ... 
     - setof (type) : return more then one row
   
   **Example:** 
   
            CREATE OR REPLACE function cat() RETURNS setof varchar language plpgsql as $$
            DECLARE 
              liste CURSOR for SELECT tablename FROM pg_tables where tableowner='root';
              tablename RECORD ;
              BEGIN

              for tablename in liste 
              loop 
              return NEXT tablename.tablename ;
              end loop;

              END 
               $$;


# Triggers

       CREATE TRIGGER trigger_name
       {BEFORE | AFTER} {INSERT | UPDATE| DELETE } [OF colums]
       ON table_name
       [REFERENCING {OLD | NEW | PARENT } [ROW] [AS] alias]
       [FOR EACH ROW]
          
        --trigger_body (pl/sql bloc) 
        or
        --calling a function (EXECUTE PROCEDURE func_name();) ; 
        this function should RETURN a TRIGGER

# Cursor
 - It helps you store multiple lines and Mange access to them

### Creation


| Oracle                                                                                                                | PostgreSQL                       |
| --------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| ``CURSOR cursorname IS SELECT ..FROM .. WHERE..``<br />``FOR UPDATE/DELETE [OF Column list ]][NOWAIT WAIT duration]`` | ``cursorname CURSOR  FOR Query`` |

### Iterating Rows


| Oracle                                                                                  | PostgreSQL                                                                                                                    |
| --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| ``FOR record_variable IN cursor_variable`` <br/>``LOOP``<br/>``...``<br/> ``END LOOP;`` | ``LOOP``<br/>``FETCH FROM cursor_variable INTO record_variable;``<br/>``EXIT WHEN NOT FOUND;``<br/>``...``<br />``END LOOP;`` |

In PostgreSQL : we should open the Cursor after Declation 
        
# Exceptions

we add exceptions within a PL/SQL bloc : 

       DECLARE 
       -- Variables, curseurs, exceptions définies par l'utilisateur
       BEGIN *

       -- Instructions 

       EXCEPTION (facultatif)
       -- Actions à effectuer lorsque des erreurs se produisent
       END; *
  -------------------------------------       
         
      EXCEPTION 
      WHEN DefinedException | costum exception THEN
      statement;
      ...
   
      WHEN OTHERS THEN
      statement;

  
  - Defined exception
      - NO_DATA_FOUND 
      - TOO_MANY_ROWS
      - ..
 - Custom exception in oracle: 
      - **Declaration** : ``exception_name EXCEPTION; ``
      - **Raising an exception** : ``RAISE  exception_name;``
      
 - Custom exception in PostgreSQL: 
           ``raise exception '%','Exception text';``
      
