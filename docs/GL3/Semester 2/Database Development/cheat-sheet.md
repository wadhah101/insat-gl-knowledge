---
slug: /gl3/semester-2/database-development/cheat-sheet
---

# Cheat Sheet

Author [@Saief1999](https://github.com/Saief1999)

## Procédures

```sql
CREATE OR REPLACE PROCEDURE 
<procedure_name>
    (
    <parameterl  [IN|OUT|IN OUT] <datatype>
    ..
    .
    )
[ IS | AS ]
    <declaration_part>
BEGIN
    <execution part>
EXCEPTION
    <exception handling part>
END;
```

pour l'appeler :

```sql
nomProc(listeParamEffectifs);
nomFonc(listeParamEffectifs);
```

ou à extérieur d'un bloc pl/SQL

```sql
call nomProc(listeParamEffectifs);
call nomFonc(listeParamEffectifs);
```

Notes :

- Il est obligatoire de mettre AS / IS
- on met toujours `parameter in/out type`dans cet ordre
- **PAS DE DECLARE POUR LE BLOC DE DECLARATION**

Exemples :

```sql
CREATE OR REPLACE PROCEDURE welcome_msg (p_name IN VARCHAR2) 
IS
BEGIN
dbms_output.put_line ('Welcome '|| p_name);
END;
/
EXEC welcome_msg ('Guru99');
```

```sql
create procedure SUP_DETAIL (in COM char(12),in PRO char(15))
begin
delete from DETAIL
where NCOM = :COM and NPRO = :PRO;
if (select count(*) from DETAIL
where NCOM=:COM) = 0
then delete from COMMANDE
where NCOM = :COM
end if;
end;
```

## Fonctions

```sql
CREATE OR REPLACE FUNCTION 
<procedure_name>
(
<parameterl [IN|OUT|IN OUT] <datatype>
)
RETURN <datatype>
[ IS | AS ]
<declaration_part>
BEGIN
<execution part> 
EXCEPTION
<exception handling part>
END; 
```

## Dernières remarques

- Lorsque les tables qu’une procédure (ou une fonction) subissent des modifications structurelles, il faut alors la recompiler.

  ```sql
  ALTER {FUNCTION|PROCEDURE} nom COMPILE;
  ```

- Suppression d’une procédure ou une fonction:

  ```sql
  DROP {FUNCTION|PROCEDURE} nom;
  ```

## PL/SQL

### Syntaxe général

```sql
DECLARE
-- section optionnelle de déclarations
BEGIN
-- section obligatoire d'instructions
EXCEPTION
-- section optionnelle de gestion d'erreurs produites par l'exécution
END;
```

### Variables

- Déclaration

```sql
nomVariable [CONSTANT] type [:= valeur];
```

Autre façon d'affecter une valeur à une variable ( **la requête doit retourner un seul résultat !**) :

```sql
SELECT … INTO nomVariable FROM … WHERE … ; 
```

- Types
  - Scalaires: CHAR, NUMBER, DATE, VARCHAR2, ….
  - Composés: ligne, table, enregistrement
- `nomTable.nomColonne%TYPE` :
  - le type des valeurs de la colonne
  - ex. `numEmp EMP.EMPNO%TYPE;`
- `nomVariable%TYPE` :
  - le type de la variable (déclarée auparavant)
  - ex. `credit REAL;`
          `debit credit%TYPE;`
- `nomTable%ROWTYPE` :
  - type (composé) des lignes de la table
  - ex. `unEtudiant STUDENT%ROWTYPE;`

- Exemple :

```sql
DECLARE
nomPersonne CHAR(10) := 'Guillaume';
monAdr CONSTANT CHAR(20):= '2 rue de la Paix';
etage appart.Etg%TYPE;
monImmeuble immeuble%ROWTYPE;
BEGIN
SELECT * INTO monImmeuble FROM immeuble WHERE Adr=monAdr;
SELECT Etg INTO etage FROM appart
WHERE Adr=monImmeuble.Adr AND Num=10;
INSERT INTO personne VALUES(nomPersonne, 35, 'ING');
END;
```

### STRUCTURES DE CONTRÔLE DE RÉPÉTITION

```sql
IF condition1 THEN instructions1;
[ELSIF condition2 THEN instructions2;]
…
[ELSE instructions;] END IF;
CASE variable
WHEN valeur1 THEN instructions1;
…
[ELSE instructions] END CASE;
CASE
WHEN condition1 THEN instructions1;
…
[ELSE instructions] END CASE;
```

```sql
WHILE condition LOOP
instructions; END LOOP;
```

```sql
LOOP
[instructions1;]
EXIT [WHEN condition]; [instructions2;]
END LOOP;

```

```sql
FOR compteur IN [REVERSE] valInf .. valSup LOOP
instructions; END LOOP;
```

---

### sous-programme dans PL/SQL

- on peut les définir après `DECLARE` ,  sans utiliser le mot clé `CREATE`

```sql
DECLARE 
…
PROCEDURE nomProc … END nomProc; 
FUNCTION nomFonc … END nomFonc;
BEGIN 
… 
END
```

### Curseurs

- pour consulter un résultat de plusieurs lignes

#### Curseurs implicites

- Pour la consultation à un résultat et pour les modifications.
- Accessibles à travers le nom réservé SQL.
- Attributs qui offrent des informations sur la dernière commande exécutée :
  - `SQL%FOUND` : la dernière commande a affecté au moins une ligne
  - `SQL%NOTFOUND` : la dernière commande n'a affecté aucune ligne
  - `SQL%ROWCOUNT` : nombre de lignes affectées par la dernière commande

```sql
UPDATE immeuble SET NomGerant='Toto' WHERE NbEtg>10; DBMS_OUTPUT.PUT_LINE('Toto gère ' || SQL%ROWCOUNT || ' immeubles de plus de 10 étages')
```

#### Curseurs explicites

- Pour les consultations
- Doivent être déclarés, ouverts, consultés et fermés.
- **Déclaration** :
  - dans la section DECLARE
  - `CURSOR nomCurseur IS SELECT … FROM … WHERE …;`
- **Ouverture** :
  - exécution de la requête et initialisation
  - `OPEN nomCurseur;`
- **Chargement** :
  - récupération d'une ligne de résultat dans des variables et positionnement sur la ligne suivante
  - `FETCH nomCurseur INTO listeVariables;`
- **Fermeture** :
  - libération de la zone mémoire
  - `CLOSE nomCurseur;`

```sql
• nomCurseur%ISOPEN
– Vrai si le curseur est ouvert

• nomCurseur%FOUND
– Vrai si le dernier FETCH a trouvé une ligne

• nomCurseur%NOTFOUND
– Vrai si le dernier FETCH n a plus trouvé de ligne (fin du résultat)

• nomCurseur%ROWCOUNT
– Nombre de lignes trouvées par la requête
```

**Exemples** :

- Calculer le nombre d'occupants d'un immeuble

```sql
Declare 
    monAdr Constant char(20) := '2 rue de la paix'
    CURSOR cOcuupants IS
        SELECT NbOccup from appart where Adr = monAdr ; 
    occupApart appart.NbOccup%Type ; 
    total INTEGER := 0 ; 
begin
    open cOccupants ; 
    LOOP
        Fetch cOccupants INTO ocupAppart; 
        EXIT when cOccupants%NOTFOUND ; 
        total := total + occupAppart ,
    END LOOP ;
    close cOccupants ; 
    DBMS_OUTPUT.PUT_LINE(total || ' occupants dans l`immeuble')
end; 
```

**Utilisation de la boucle for**:

- Avantage de l'utilisation de for :
  - OPEN et CLOSE automatiques au début et à la fin de la boucle.
  - Variable de boucle de type curseur%ROWTYPE déclarée automatiquement.
  - FETCH automatique dans la variable de boucle à chaque itération.

```sql
declare
monAdr constant char(20) := '2 rue de la Paix';
CURSOR cOccupant is 
    select NBOccup From appart Where Adr = monAdr ; 
total integer := 0 ;
begin 
    for occupAppart in cOccupant loop
        total := total + occupAppart ;
    end loop ; 
DBMS_OUTPUT.PUT_LINE(total || ' occupants dans l`immeuble')
end; 
```

##### Curseurs et modifications

- On peut aussi modifier les lignes parcourues par le curseur
- **Déclaration** :

```sql
CURSOR nomCurseur IS SELECT … FROM … WHERE …
FOR UPDATE [OF listeColonnes] [NOWAIT | WAIT
durée];
```

- Effet: verrouillage des colonnes en attendant (WAIT durée) ou non (NOWAIT) qu'elles soient disponibles pour la modification ( c'est à dire on peut effectuer l'update que lorsque le curseur atteint la fin de SELECT)

- **Modification**: UPDATE ou DELETE sur la ligne courante

```sql
-- update
UPDATE table SET modifications
WHERE CURRENT OF nomCurseur;
-- delete
DELETE FROM table
WHERE CURRENT OF nomCurseur;
```

- Exemple :
  - Diminuer la superficie des appartements sous les combles (3ème étage) d'une maison donnée

```sql
DECLARE
    adrMaison CHAR(20) := '5 rue de la Seine';
    CURSOR cModif IS
    SELECT * FROM appart WHERE Adr=adrMaison AND Etg=3
    FOR UPDATE;
BEGIN
    FOR appartMaison IN cModif LOOP UPDATE appart
    SET Superficie=appartMaison.Superficie–3 WHERE
    CURRENT OF cModif;
    END LOOP;
END;
```

### Triggers

```sql
CREATE [OR REPLACE] TRIGGER nomDeclencheur
{BEFORE | AFTER | INSTEAD OF}
{DELETE | INSERT | UPDATE [OF colonne1, …] [OR …]}
ON {nomTable | nomVue}
[REFERENCING {OLD [AS] nomAncien | NEW [AS]
nomNouveau| PARENT [AS] nomParent } …]
[FOR EACH ROW]
[WHEN conditionSupplementaire]
{[DECLARE …] BEGIN … [EXCEPTION …] END;
| CALL nomSousProgramme(listeParametres)}
```

- À la place de l’événement : `INSTEAD OF` (uniquement pour vues multitables)

- Changement des noms par défaut : clause REFERENCING
  - `:OLD` désigne un enregistrement à effacer (déclencheur sur DELETE, UPDATE)
    - `REFERENCING OLD AS nomAncien`: permet d'utiliser `nomAncien` à la place de `:OLD`
  - `:NEW` désigne un enregistrement à insérer (déclencheur sur INSERT, UPDATE)
    - `REFERENCING NEW AS nomNouveau`: utiliser `nomNouveau` à la place de `:NEW`
    - `:PARENT` pour des tables imbriquées
      - `REFERENCING PARENT AS nomParent`

#### Exemples

##### Déclencheurs sur insertion

- Pour un nouvel occupant, vérifie si:
  - `occupant.DateArrivee >immeuble.DateConstr`

```sql
Create Trigger verifDate
before insert on occupant for each row
declare 
    Imm immeuble%rowtype;
begin
select * into Imm from Immeuble
where immeuble.adr = :New.adr  ; 

IF  (:New.DateArrive < Imm.dateConstr ) 
THEN raise_application_erreur(-20100,:New.Nom || ' arrivé avant la construction de l immeuble '||Imm.Adr);
END IF;
END ; 
```

- insérer automatiquement un appartement dans tout nouvel immeuble construit

```sql
Create trigger premierAppart
after insert on  immeuble
for each row
begin
insert into appart (Adr, Num, NbOccup) values (:New.adr, 1, 0) ;
end ; 
```

##### Déclencheurs sur suppression

- Au départ d'un occupant, décrémenter le nombre d'occupants de l'appartement en question

```sql
create trigger departOccupant 
after delete on occupant 
for each row

begin 
update appart
set nbOccup = nbOccup -1 
where ( (:Old.adr = appart.adr) and (appart.Num = :Old.numApp)) ;

end;
```

##### Déclencheur sur modification

- En cas de modification sur un occupant, modifier le nombre d'occupants des appartements concernés (si la modification concerne l'immeuble/l'appartement)

```sql
create trigger modifOccupant 
after update on occupant 
for each row 

begin
if ((:NEW.adr <> :Old.adr) OR ( :New.numApp <> :Old.numApp))
then 
-- nbre occupants -1 pour l'ancien appart
update appart
set nbOccup = nbOccup -1 
where ( (:Old.adr = appart.adr) and ( :Old.numApp =appart.Num)) ;
-- nbre occupants +1 pour le nouveau appart
update appart 
set nbOccup = nbOccup +1 
where ((:New.adr = appart.adr) and (:New.numApp = appart.num  ));

end if ; 
end ; 
```

##### Déclencheur sur conditions multiples

- Exemple: un seul déclencheur, qui regroupe toutes les actions sur occupant et qui actualise le nombre d'occupants des appartements

```sql
create trigger touteModifOccupant
after insert or update or delete on occupant 
for each row

If INSERTING  then ... ;
Elsif DELETING then ...  ;
Elsif UPDATING then ... ;
END IF
```

##### Déclencheurs sur modification de schéma, Droits

- Syntaxe :

```sql
CREATE [OR REPLACE] TRIGGER nomDeclencheur
{BEFORE | AFTER} action [OR action …] ON
{[nomSchema.]SCHEMA | DATABASE}
{[DECLARE …] BEGIN … [EXCEPTION …] END;
| CALL nomSousProgramme(listeParametres)}
```

- Quelques actions possibles :
  - CREATE, RENAME, ALTER, DROP sur un objet du dictionnaire de données.
  - GRANT, REVOKE droits pour un utilisateur.

##### EXEMPLE DE DÉCLENCHEUR SUR SCHÉMA

- Enregistrer dans une table les changements de nom des objets du dictionnaire de données

```sql
CREATE TRIGGER changementNom AFTER RENAME ON
DATABASE
BEGIN
-- On se sert de 2 attributs système
-- ora_dict_obj_name : nom objet affecté
-- ora_dict_obj_owner : propriétaire objet affecté
INSERT INTO changementsNoms VALUES (SYSDATE,
ora_dict_obj_name, ora_dict_obj_owner);
END;
```

##### Événements concernant le démarrage/arrêt de la base, les connexions des utilisateurs, les erreurs

```sql
CREATE [OR REPLACE] TRIGGER nomDeclencheur
{BEFORE | AFTER} evenement [OR evenement …] ON
{[nomSchema.]SCHEMA | DATABASE}
{[DECLARE …] BEGIN … [EXCEPTION …] END;

-- appel
CALL nomSousProgramme(listeParametres)}
```

- Exemples évènements
  - Démarrage (STARTUP) ou arrêt (SHUTDOWN) de la base
  - Connexion (LOGON) ou déconnexion (LOGOFF) d'un utilisateur
  - Erreurs: SERVERERROR, NO_DATA_FOUND, …

#### Manipulation des déclencheurs

```sql
-- Tout déclencheur est actif dès sa compilation!
-- Re-compilation d'un déclencheur après modification :
– ALTER TRIGGER nomDeclencheur COMPILE;

• Désactivation de déclencheurs :
– ALTER TRIGGER nomDeclencheur DISABLE;
– ALTER TABLE nomTable DISABLE ALLTRIGGERS;

• Réactivation de déclencheurs :
– ALTER TRIGGER nomDeclencheur ENABLE;
– ALTER TABLE nomTable ENABLE ALLTRIGGERS;

• Suppression d’un déclencheur :
– DROP TRIGGER nomDeclencheur;
```

### Exception

- Si la section `EXCEPTION` est absente, Oracle fournit un mécanisme de traitement des exceptions par défaut, qui conduit à l’arrêt du programme et au renvoi d’un message d’erreur à l’appelant.

```sql
EXCEPTION
WHEN excepition1 [OR Exception2 ...] THEN
    statement1;
    statement2;
[WHEN exception3  [OR Exception4 ...] THEN
    statement1;
    statement2;
... ]
[ WHEN OTHERS THEN
    statement1;
    statement2;
... ]
```

- Exemple :

```sql
WHEN NO_DATA_FOUND THEN
statement1;
...
WHEN TOO_MANY_ROWS THEN
statement1;
...
WHEN OTHERS THEN
statement1;
```

#### Types d'exception

- **Erreurs Oracle prédéfinies**
- **Erreurs Oracle non prédéfinies** : Ce sont des erreurs définies dans la section déclarative. Le serveur Oracle les déclenche implicitement, en utilisant la clause PRAGMA EXCEPTION_INIT qui permet d’associer un nom d’exception à un code d’erreur d’Oracle. Cela vous permet de faire référence à n’importe quelle exception interne d’Oracle, par un nom et d’écrire un traitement spécifique pour celle-ci.
- **Erreurs définies par l’utilisateur**

#### Exceptions de l'utilisateur

1. Déclaration d'une exception : `nom_exception EXCEPTION;`
2. Déclenchement d’une exception : `RAISE nom_exception;`
3. Associer un traitement à l’exception dans la section EXCEPTION.

##### PROCÉDURE RAISE_APPLICATION_ERROR

```sql
raise_application_error (error_number, message[,
{TRUE | FALSE}]);
```

- Cette procédure est utilisée pour générer des messages d'erreur définis par l'utilisateur à partir de sous-programmes stockés
- Elle permet de signaler les erreurs à l'application et d'éviter le renvoi d'exceptions non traitées.
