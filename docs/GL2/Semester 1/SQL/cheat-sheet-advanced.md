---
slug: /gl2/semester-1/sql/cheat-sheet-advanced
---

# Advanced SQL

Author [@rihemebh](https://github.com/rihemebh)

## Nested Queries

| With Select | With Update | With Insert | With Delete |
| ----------- | ----------- | ----------- | ----------- |

| `SELECT (SELECT query that returns one value) FROM table WHERE conditions`

`SELECT columns FROM (SELECT query that retuns multiple rows ) WHERE condition`

`SELECT column_name FROM tables WHERE column_name OPERATOR (SELECT Query)` | `UPDATE table SET column_name = new_value WHERE OPERATOR (SELECT Query)` | `INSERT INTO table_name [ (columns..) ] VALUES (SELECT Query that reurns one value , [val , ...])` | `DELETE FROM TABLE_NAME WHERE OPERATOR (SELECT Query)` |

<!--## With Select
       SELECT ( SELECT Query that returns one value
      // Don't forget to make the join condition with the table called in the main select )
       FROM table
       WHERE conditions
       SELECT columns
       FROM (SELECT query that retuns multiple values )
       WHERE condition
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

**OPERATOR** : EXISTS / NOT EXISTS -- BETWEEN -- IN

## Views

### Creation

#### Virtual View

- `CREATE VIEW view_name(col1,col2,..) AS query [WITH CHECK OPTION] [WITH READ ONLY]`
- `REPLACE VIEW view_name(cols) AS query [WITH CHECK OPTION] [WITH READ ONLY]`

#### Concrete View

- `CREATE CONCRETE VIEW view_name(col1,col2,..) AS query [WITH CHECK OPTION] [WITH READ ONLY]`

### Delete

`DROP VIEW view_name`

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

## PL/SQL

`DECLARE`

`VarName [constant] type [:= val];`

`BEGIN`

`EXCEPTION`

`END`

### Functions and Procedures

#### Functions

| Oracle | PostgreSQL |
| ------ | ---------- |

| `CREATE FUNCTION func_name[(in / out / in out parms)] RETURN returnType AS`

`DECLARE`

`VarName [constant] type [:= val];`

`BEGIN`

`-- SELECT must always be used with INTO`

`RETURN statement`

`EXCEPTION`

`END` | `CREATE FUNCTION func_name() RETURNS returnType AS $$`

`DECLARE`

`VarName [constant] type [:= val];`

`BEGIN`

`RETURN statement`

`EXCEPTION`

`END`

`$$ LANGUAGE plpgsql;` |

#### Procedures

| Oracle                                                     | PostgreSQL |
| ---------------------------------------------------------- | ---------- |
| `CREATE procedure proc_name[(in / out / in out parms)] AS` |

`DECLARE`

`VarName [constant] type [:= val];`

`BEGIN`

`-- SELECT must always be used with INTO`

`RETURN statement`

`EXCEPTION`

`END proc_name;` | `CREATE Procedure prod_name() AS $$`

`DECLARE`

`VarName [constant] type [:= val];`

`BEGIN`

`EXCEPTION`

`END`

`$$ LANGUAGE plpgsql;` |

- Var Types
  - RECORD, INTEGER , VARCHAR(n) , CHAR ,DATE , DECIMAL ...
  - TABLES , LINE ..
  - %TYPE %ROWTYPE

### Custom Type

```sql
CREATE TYPE type_name AS (
var_name    var_type ,
  );
```

- Return Types:

  - INTEGER , VARCHAR(n) , CHAR ,DATE , DECIMAL ...
  - setof (type) : return more then one row

    **Example:**

```sql
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
```

### Triggers

```sql
       CREATE TRIGGER trigger_name
       {BEFORE | AFTER} {INSERT | UPDATE| DELETE } [OF colums]
       ON table_name
       [REFERENCING {OLD | NEW | PARENT } [ROW] [AS] alias]
       [FOR EACH ROW]

        --trigger_body (pl/sql bloc)
        or
        --calling a function (EXECUTE PROCEDURE func_name();) ;
        this function should RETURN a TRIGGER
```

### Cursor

- It helps you store multiple lines and Mange access to them

#### Cursor Creation

| Oracle | PostgreSQL |
| ------ | ---------- |

| `CURSOR cursorname IS SELECT ..FROM .. WHERE..`

`FOR UPDATE/DELETE [OF Column list ]][NOWAIT WAIT duration]` | `cursorname CURSOR FOR Query` |

#### Iterating Rows

| Oracle | PostgreSQL |
| ------ | ---------- |

| `FOR record_variable IN cursor_variable`

`LOOP`

`...`

`END LOOP;` | `LOOP`

`FETCH FROM cursor_variable INTO record_variable;`

`EXIT WHEN NOT FOUND;`

`...`

`END LOOP;` |

In PostgreSQL : we should open the Cursor after Declation

### Exceptions

we add exceptions within a PL/SQL bloc :

```sql
DECLARE
-- Variables, curseurs, exceptions définies par l'utilisateur
BEGIN *

-- Instructions

EXCEPTION (facultatif)
-- Actions à effectuer lorsque des erreurs se produisent
END;
```

```sql
EXCEPTION
WHEN DefinedException | costum exception THEN
statement;
...

WHEN OTHERS THEN
statement;
```

- Defined exception
  - NO_DATA_FOUND
  - TOO_MANY_ROWS
  - ..
- Custom exception in oracle:

  - **Declaration** : `exception_name EXCEPTION;`
  - **Raising an exception** : `RAISE exception_name;`

- Custom exception in PostgreSQL:

  `raise exception '%','Exception text';`
