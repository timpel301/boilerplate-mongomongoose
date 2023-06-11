const mongoose = require('mongoose');
require('dotenv').config();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String],
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Tim',
    age: 30,
    favoriteFoods: ['Pizza', 'Rice'],
  });
  person.save(function(err, doc) {
    if (err) {
      console.error(err);
      return done(err);
    }
    console.log(doc);
    done(null, doc);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, ...people){
    if (err) {
      console.error(err);
      return done(err);
    }
    done(null, ...people);
  });
};

const arrayOfPeople = [
  { name: 'John', age: 25, favoriteFoods: ['Pizza', 'Burger'] },
  { name: 'Jane', age: 30, favoriteFoods: ['Sushi', 'Pasta'] },
  { name: 'Tom', age: 35, favoriteFoods: ['Steak', 'Fish'] }
];

createManyPeople(arrayOfPeople, function (err, ...people) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(people);
});

const findPeopleByName = (personName, done) => {
  const searchQuery = {"name": personName};
  Person.find(searchQuery, function(err, people){
    if (err) {
      console.error(err);
      return;
    }
    console.log(people);
    done(null , people);
  });
};

const findOneByFood = (food, done) => {
  const searchQuery = {"favoriteFoods": food};
  Person.findOne(searchQuery, (err, food) => {
    if (err){
      console.error(err);
      return;
    }
    console.log(food);
    done(null ,food);
  });
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
