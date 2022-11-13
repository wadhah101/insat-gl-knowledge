---
slug: /gl5/semester-1/sri/indexation/cheat-sheet
---

# Cheat sheet

Author [@medbensalah](https://github.com/medbensalah)

## Indexation

### Definition

Processus permettant de construire un ensemble d'éléments
**clés** permettant de caractériser le contenu d’un
document / retrouver ce document en réponse à une requête

#### Indexation Libre / Controlée

##### Indexation Libre

- Mots, termes des documents

##### Indexation Contrôlée

- Listes de termes prédéfinies
- Vocabulaire contrôlé
- Thésaurus

##### Construction d'index

![Construction](assets/Construction.png)

##### Tokenisation

- Identification des élements élementaires
  - phonèmes
  - morphèmes
  - mots, ...
- Complexe en certains langues

##### Filtrae des mots vides "StopWords"

- Determinants
- pronons
- prépositions, ...

> parfois ces mots portent un sens

##### Normalisation

- Normalisation textuelle
  - Unifier les termes
  - Enlever la ponctuation
  - La casse : réduction des lettres en miniscules
  - Enlever les accents
  - Unifier les dates et les valeurs monétraires
- Normalisation linguistique

  - Lemmatisation
    - verbe => infinitif
    - nom, adj, article => masculin singulier
  - Racinisation (Stemming)
  - Etiquetage
    - Associer aux mots leur catégorie morphosyntaxique (treeTagger)

- Recherche de groupes de mots
  - n-grammes ; n > 1 / un n-gramme sera considéré comme un terme

##### Construction de l'index

- Algorithme naïf

  ```Algorithhm
  input requête q;

  for every document d in collection
        if d matches q
            add its docid to list L;

  output list L
  ```

- Index inversé

  - Construire une matrice d'incidence

    |        | documents |
    | ------ | :-------: |
    | termes |   0 / 1   |

    0: Le terme n'appartient pas au document

    1 : le terme apparait dans le document

    matrice éparse => représenter que les 1

- Composantes

  ![IndexInverse](assets/IndexInverse.png)

  **Dictionnaire :** en mémoire centrale permettant un accès rapide
  aux termes et leurs informations

  **Postings :** au niveau du disque et sauvegardant les
  informations des termes et les identifiants des documents

  Ce qu'on stocke dépend du modèle de la recherche : + Recherche booléenne : L'identifiant du document est suffisant

  ![Screenshot_93](assets/Screenshot_93.png) + Recherche Rankée : Fréquence ou score du terme

  ![Screenshot_94](assets/Screenshot_94.png) + Recherche de proximité / de séquence : Fréquence ou score du terme

  ![Screenshot_95](assets/Screenshot_95.png)

  Les liste de posting peuvent être triées selon: + Document ID : ![Screenshot_97](assets/Screenshot_97.png) + Term Frequency : ![Screenshot_96](assets/Screenshot_96.png)

- Construction d'un fichier inverse

  - Extraire les termes de chque document

    | Termes | Document |
    | ------ | :------: |
    | terme  |   doc#   |

  - Trier les termes par ordre alphabétique

    ![Screenshot_99](assets/Screenshot_99.png)

  - Indexation

  - ![Screenshot_100](assets/Screenshot_100.png) ![Screenshot_101](assets/Screenshot_101.png)
  - Compression

    Minimiser le nombre de bits transférés

#### Variable-Byte Encoding

Le bit du poids le plus fort est un **stop bit**

- Exemple:

  13 = 00000000 00000000 00000000 00001101

  VBE : 10001101

- Exemple:

  131 = 00000000 00000000 00000000 10000011

  VBE : 00000001 10000011
- Exemple:

  1337 = 00000000 00000000 00000101 00111001

  VBE : 00001010 10111001

- Exercice

  ```Algorithm
  00000111 10011100 10000101 01111010 01011000 10111101
         924       |    5   |           2010173        |
  ```
