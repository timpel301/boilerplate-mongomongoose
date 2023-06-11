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
  Person.findOne(searchQuery, (err, person) => {
    if (err){
      console.error(err);
      return;
    }
    console.log(person);
    done(null ,person);
  });
};

const findPersonById = (personId, done) => {
  const searchQuery = {"_id": personId};
  Person.findById(searchQuery, (err, person) => {
    if (err){
      console.error(err);
      return;
    } 
    console.log(person);
    done(null , person);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId, (err, person) => {
    if (err){
      console.error(err);
      return;
    }
    person.favoriteFoods.push(foodToAdd);
    person.save((err,updatedPerson) => {
      if (err){
        console.error(err);
        return;
      }
      console.log(updatedPerson);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  const query = {"name": personName};
  Person.findOneAndUpdate(
    query,
    {"age": ageToSet},
    {
      new: true,
      runValidators: true,
      useFindAndModify: false
    },
    (err, doc) => {
      if (err){
        console.error(err);
        return done(err);
      }
      console.log(doc);
      done(null, doc);
    }
  );
};

const removeById = (personId, done) => {
  const query = {"_id": personId};
  Person.findByIdAndRemove(
    query,
    (err, doc) => {
      if(err){
        console.error(err);
        return done(err);
      }
      console.log(doc);
      done (null, doc);
    }
  );
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  const query = {"name": nameToRemove};
  Person.deleteMany(query, (err, people)=> {
    if (err){
      console.error(err);
      return done(err);
    }
    console.log(people);
    done(null, people);
    } 
  );
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  const query = {"favoriteFoods": foodToSearch};
  Person.find(query).sort({"name": 1}).limit(2).select({"age": false}).exec((err, data) => {
    if (err){
      console.error(err);
      return done(err);
    }
    console.log(data);
    done(null, data);
  }
  );
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
