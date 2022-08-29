<h1 align="center">
  <br>
      Glady - Frontend
  <br>
</h1>

## Table of contents

  * [Installation](#installation)
     * [Prerequisites](#prerequisites)
     * [Frontend](#frontend)
     * [Backend](#backend)
     * [UnitTests](#unit-test)
  * [Application](#application)
    * [Topic](#topic)
    * [Level 1](#level-1)
    * [Level 2](#level-2)
    * [Level 3](#level-3-bonus)




<h2 id="installation">Installation</h2>

### Prerequisites

Be sure to get npm version **6.14.13 or later** and angular cli version 14.2.0 or above**
You can clone project from the main branch with the command below:

```
git clone "https://github.com/Melitchi/glady-frontend.git"
```

### Frontend


With your Terminal navigate to calculator-front/ and run :

```
npm install
```

Start the project with :
```
ng serve
```

### Backend

Open a new tab or a Terminal, navigate to calculator-server/ and run :
```
npm install 
```

Start the backend with:
```
npm start
```

### Unit Test

With AngularCLI you can use Karma and Jasmine
To execute tests, you have to navigate to calculator-front/ and run :
```
ng test
```


## Topic

In an **Angular 2+** project, allow users to find a combination of cards allowing him to reach the desired value.

For example, an user is interested to make a 30€ purchase in the shop **WedooStore** with the id **5**.
Our REST API will help him and find the suitable combination of cards to reach this amount.

The goal of this challenge is to create a component in which the user can type the desired amount he wants to
purchase. 

## Level 1

When the user has finished typing the amount (and clicked on a button to validate the amount), the calculator
will ask the API with the desired amount and:

1. if the desired amount is possible, **display a list of the cards needed to reach that amount** (for instance, if the 
user ask for 60 € but the shop doesn't have any 60 € card but 40 € and 20 € cards, the API will return one 20 € card 
and one 40 € card);
2. if the desired amount is not possible, then the component will allow the user to choose a possible amount
next to its value (for example, the user asks for 48 €, the component will let him choose 60 € (40+20) or 40 €).
When the user has made a choice, it will autocorrect the typed amount and do the step **1** with the chosen amount;
3. if the desired amount is higher or lower than the possible amounts, the component will auto-correct the user
with the possible value (for example, the user ask for 5 €, the API will return that only 20 € is possible) and 
do the step **#1** with the auto-corrected amount. 

The component should also emit the amount as an `@Output()`.


```
Montant désiré :
 _____________
|             |  
|     60      |
|_____________|

[   VALIDER   ]

Votre montant est composé des cartes suivantes :
 - 40 €
 - 20 €

```

## Level 2

In order not to let the user guessing the next possible amounts, the component will allow the user to ask for the next
amounts thanks to "minus" and "plus" buttons. When clicked, the component will ask the API for the next amount and correct
the typed amount when the new amount and display a list of the cards needed to reach that amount.

*Note: the component can assume that only integer amounts are possible.*

```
Montant désiré :
 _____________
|             |  [  Montant suivant  ]
|     60      |
|_____________|  [ Montant précédent ]

[   VALIDER   ]

Votre montant est composé des cartes suivantes :
 - 40 €
 - 20 €

```

## Level 3 (bonus)

Refactor the component so that it can be used as a form control in a reactive form (FormGroup).

The value of the component will be an object following this interface:
```typescript
interface CalculatorComponentValue {
    value: number;
    cards: number[];
}
```
