# Cheat sheet

## Good design rules

### Architecture risks

#### Software rigidity

- Hard to modify
- Little changes cascade into lot more changes

#### Fragility

- software breaks in multiple unrelated places when a small change is introduced

#### Immobility

- modules cant be easily ported outside the project

#### Viscosity

- software is flexible to a fault
- multiple ways exist to achieve the same goal
- hacks are easier than proper implementation

#### Useless Repetition

- Lack of useful abstractions

#### Opacity

- software modules are hard to understand

#### Useless Complexity

- Introducing not needed complexity trying to avoid other pitfalls

### Extended SOLID principles

#### Open/Closed principle OCP

- Classes should be open for open for extension and closed for modification

#### The Liskov Substitution Principle LSP

- Sub class should be able to replace its parent class without the module knowing

#### Dependency inversion principle DIP

- Classes should depend on abstractions ( Interfaces ) not concrete implementations

#### Interface Segregation Principle ISP

- Interfaces should serve a single purpose and be decomposable

#### Reuse Equivalency Principle REP

- every reusable piece of code must be managed in version to ensure compatibility

#### The Common Closure Principle CCP

- classes that are impacted with same changes are placed in same package

#### The Common Reuse Principle CRP

- reusing a single class means reusing the whole package
- classes come bundled together for changes

#### The Acyclic Dependencies Principle ADP

- X depends on Y and Y depends on X
- Package should never have cyclic dependencies

#### Stable Dependencies Principle SDP

- Volatility is how much a software changes
- avoid depending on volatile pieces
- Stability is how hard a piece changes
- A package should only depend on packages stabler than it

#### Stable Abstractions Principle (SAP)

- Most stable packages should be more abstract
- Unstable packages should be the concrete ones
