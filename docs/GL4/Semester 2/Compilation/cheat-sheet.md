---
slug: /gl4/semester-2/compilation/cheat-sheet
---

# Cheat Sheet

Author [@Saief1999](https://github.com/Saief1999)

## Introduction

### compilateurs vs interpreteurs

compilateur : programme de traduction automatique d'un programme dans la langage src -> langage cible (exécutable)

interpréteur : analyse les instructions l'une aprés l'autre et les éxecute

interpréteur :

(-)doit être présent sur le système à chaque fois que le programme est exécuté, ce qui n'est pas le cas avec un compilateur
(+) sont généralement plus court que les compilateurs
(-) programme plus lent
(+) plus simple à tester et tolére plus d'erreur

#### Langage P-codes ( interpreteur ~ compilateur ) { Java }

Code traduit (compilé) en langage intérmédiate
Ce code est aprés interprétépar une machine virtuelle

 -> les intérpréteurs de p-code sont relativement petits et rapides .

Langage formelle : sous-ensemble de $\sigma^{*}$

- syntax décrit formellement

### Structure d'un compilateur

- Phase d'analyse
  - Analyse lexicale : reconnaissance des variables, instr's, opérateurs
  - Analyse Syntaxique:  élaboration de la structure syntaxique du programme (va se réferer au grammaire de ce langage)
  - Analyse sémantique : vériei des propriétés sémantiques ( types, par exemple )

- Phase de synthése et de production : production de code cible

### Analyse lexicale

- unités lexicales : suivant le type de mot
- élminie les caractères superflus
- indetifier les mots clés, séparateurs, opérateurs ...

outils théoriques utilisés : expressions régulières et automates à états finis.
(recherche si un mot fait partie d'un langage )

### Analyse syntaxique

regrouper les unités lexicales en structures grammaticales, de découvrir la structure du programme.
-> sait comment doivent être construites les expressions
Outils théoriques : grammaires et automates à pile

Notes: les langages de programmation sont généralement hors-contexte $ \neq $ languages contextuelles (naturelles)

### Analyse sémantique

- On opére certains contrôles afin de vérifier que l'assemblage des constituants du programme a un sens. (vérification de type par exemple)

- Outil théorique utilisé : schéma de traduction dirigée par la syntaxe

### Phase de production : Génération de code

produire les instructions en langage cible

### Phase de production : Optimisation du code

- detections de sous expressions communes dans les expressions arithmétiques
- detection de "dead code"
...

### Phases parallèles

- Gestion de la table des symboles
  - La table des symboles est la structure de données utilisée servant à
    stocker les informations qui concernent les identificateurs du
    programme source (par exemple leur type, leur emplacement
    mémoire, leur portée, visibilité, nombre et type et mode de passage
    des paramètres d'une fonction, ...)
  - rempli dans les phases d'analyses ( surtout syntaxique et sémantique )
  - exploité dans les phases d'analyse syntaxique et sémantique ainsi que la phase de  génération de code
- Gestion des erreurs
  - Erreur lexicale, syntaxique et sémantique
  - Mécanismes de reprise de l'analyse ( pour analyser l'erreur )

Structure d'un compilateur : ce n'est pas généralement sequentiel , c'est généralement parallèle

## Analyse lexical

Analyse lexial :

- généralement simple à écrire
- généralement plus coûteux que les autres analyse , car ça nécissite l'accés à la mèmoire secondaire
( accées code source ) pour identifier les **unités lexicale**

MC_if : mot clé if

lexème :

- instance particulière d'un unité lexicale
- chaine de caractères qui concorde avec une certaine unité lexicale

modèle: forme générale d'une unité lexicale (syntax)

Analyseur lexical : lit une unité lexicale puis l'envoie à l'analysteur syntaxique

## Analyse synataxique ascendant

languages hors contexte -> automate à pile

**reduire** : réduire une chaine qui se termine par ce symbole est correspond à une régle de notre grammaire

Example :

Si on a $S->aSbS|c$ : si on trouve $aSbS$ on la remplace par $S$

**décaler** : avancer le pointeur source et empiler

LR : Left rightmost derivation

on accepte le mot : quand la pile est vide & la chaine complétement lû -> ceci sera noté **ACC**

Quand le `.` est au final , ça s'appele un item de réduction

une ensemble d'items : représente un état de l'automate

> il faut généralement utilisé des grammaires non ambigues pour éviter les problèmes

### Femteure d'un ensemble d'items

$\alpha$ et $\beta$ : ensemble de T/NT
$B$ : NT

Si on a un `.` avant un NT $A$, on ajoute les régles de la forme $A->\beta$ est on l'ajoute un point au début (devient alors $A->. \beta$)

### Transition par $X$ d'un ensemble d'items $I$

$\delta(I,X)=$ fermeture de tous les items $A->\alpha X.\beta$ ou $A->\alpha.X \beta$ est dans I

I : ensemble d'items
X : un T/NT

si on a $A->\alpha .X\beta$  dans notre item , on choisit comme element de départ  $A->\alpha X.\beta$ **en ajoutant aussi sa fermeture**
