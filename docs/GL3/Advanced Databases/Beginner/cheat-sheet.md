
# Managing Users

- ``GRANT privileges ON table TO user (PUBLIC) [WITH GRANT OPTION ]``
- ``REVOKE privileges ON table FROM user``
- Privileges:

| ``ALL PREVILEGES`` | ``UPDATE (columns)`` | ``SELECT (columns)`` | ``INSERT (columns)`` | ``DELETE (columns)`` | ``ALTER (columns)`` | ``INDEX`` |
| ------------------ | -------------------- | -------------------- | -------------------- | -------------------- | ------------------- | --------- |

## ROLES

```sql
    CREATE ROLE role_name;

```

```sql
   GRANT previlege ON table TO role;
```

```sql

 GRANT role TO user;

```

# Managing Tables

## Creation

- ``CREATE TABLE table_name ( column_name  [TYPE] [COLUMN_CONSTRAINT]  , [TABLE CONSTRAINT] [REFRENTIAL CONSTAINT]);``

  - **TABLE CONSTRAINT** :
    - ``CONSTRAINT`` const_name ``CONST_TYPE`` (Column1, column2,... )
  - **COLUMN CONSTRAINT**:
      [CONSTRAINT constraint_name]
    - `` AUTO_INCREMENT ``
    - ``UNIQUE``
    - ``NULL`` / ``NOT NULL``
    - ``DEFAULT``'val'
    - ``PRIMARY KEY``
    - ``REFRENCES`` 'table_name'
    - ``CHECK`` 'constraint'

  - **REFERENCIAL CONSTRAINT** :
    - ``FOREIGN KEY``(column_name) ``REFERENCES`` table_name(primarykey) [FOREIGN KEY CONSTRAINT]
    - **FOREIGN KEY CONSTRAINT**:
      - ``ON DELETE`` {CASCADE/SET NULL/ SET DEFAULT}
      - ``ON UPDATE`` {CASCADE/SET NULL/ SET DEFAULT}

  - **TYPE**:
    - ``VARCHAR(n)``
    - ``INTEGER``
    - ``BOOL``
    - ``DATE``
    - ``DATETIME``

### FIND MORE: `https://www.w3schools.com/sql/sql_datatypes.asp`

## Modification

- ``ALTER TABLE table_name [OPERATION];``

  - OPERATIONS :
    - ``RENAME TO`` new_table_name
    - ``RENAME COLUMN`` column_name ``TO`` new_name
    - ``DROP COLUMN`` column_name
    - ``DROP CONSTRAINT`` const_name
    - ``ADD COLUMN`` column_name
    - ``ADD CONSTRAINT`` constraint_details
    - ``MODIFY COLUMN`` column_name

## Delete

- ``DROP TABLE Table_name {CASCADE CONSTRAINT | RESTRICT };``

# Managing Data

## SELECT

```sql
     SELECT {DISTINCT | ALL} columns
     FROM tables 
     WHERE conditions
     GROUP BY columns 
     HAVING conditions
     [UNION | INTERSECT | MINUS <sub-Query>]
     ORDER BY columns 
```

### Operations can be used in ``WHERE`` and ``HAVING`` clause

 | < , > , = ,<= , >= | LIKE | IS NULL | IN (va1, val) | BETWEEN n1 AND n2 |
 | ------------------ | ---- | ------- | ------------- | ----------------- |
  
### Functions can be used in ``SELECT`` statement, ``WHERE`` and ``ORDER BY`` clause

1 - **Multiple-Row Functions** : Aggregate Functions

 | SUM | AVG | MIN | MAX | COUNT |
 | --- | --- | --- | --- | ----- |

2  - **Single-Row functions**

- UPPER, LOWER , INITCAP
- CONCAT, LENGTH, SUBSTR, INSTR, LPAD, RPAD, TRIM , REPLACE.
- MONTHS_BETWEEN, ADD_MONTHS, NEXT_DAY, LAST_DAY, CURTIME , DATE_FORMAT(date, format) ,YEAR(date)
- ROUND, TRUNC, MOD.

  See More : <https://docs.oracle.com/database/121/SQLRF/functions002.htm#SQLRF51178>

## UPDATE

- ``
  UPDATE table
  SET changes
  WHERE condition
  ``

## INSERT

- ``INSET INTO table_name (col1, col2, ...) VALUES (val1, val2 ,...);``

## DELETE

- ``DELETE FROM table_name WHERE condition``
