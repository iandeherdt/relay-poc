// Model types
export class Element {
  constructor(year, type, number){
    this.id = `${year}${type}${number}`
    this.year = year;
    this.type = type;
    this.number = number;
    this.facts = [];
    this.persons = [];
    this.transportations = []; 
  }
  addPerson(person){
    this.persons.push(person);
  }
  addFact(fact){
    this.facts.push(fact);
  }
}
export class Fact {
  constructor(id, articleType){
    this.id = id;
    this.articleType = articleType;
  }
}
export class Person {
  constructor(id, firstname, lastname){
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
  }
}


const fact1 = new Fact(1, 'Diefstal');
const fact2 = new Fact(2, 'Parkeren');
const fact3 = new Fact(3, 'Wildplassen');
const fact4 = new Fact(4, 'Autodiefstal');

const facts = [fact1, fact2, fact3, fact4];

const person1 = new Person(1, 'Ian', 'De Herdt');
const person2 = new Person(2, 'Bart', 'Van Houtte');
const person3 = new Person(3, 'Robin', 'Schuerewegen');
const person4 = new Person(4, 'Soren', 'Van Vucht');

const persons = [person1, person2, person3, person4];

const e400100 = new Element(2017, 'VR', 400100);
e400100.facts = [1, 2];
const e400200 = new Element(2017, 'GF', 400200);
e400200.facts = [3, 4];
const e400300 = new Element(2017, 'VR', 400300);

const elements = [e400100, e400200, e400300];

export function getElements(ids) { return elements.filter((item) => {return  ids.indexOf(item.number) !== -1}); }

export function getElement(number) { return elements.filter((item) => {return item.number === number}); }

export function getFacts(ids) { return facts.filter((item) => {return  ids.indexOf(item.id) !== -1}); }

export function getFact(id) { return facts.filter((item) => {return item.id === id}); }

export function updateFactType(id, articleType) {
  const fact = facts.filter((item) => {return item.id === id});
  fact.articleType = articleType;
}
