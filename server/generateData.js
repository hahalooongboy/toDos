const faker = require( 'faker' );

var database = { todos: [] };

for ( var i = 1; i <= 30; i++ ) {
  database.todos.push( {
    id: faker.random.uuid(),
    name: faker.random.word(),
    description: faker.random.words(),
    dueDate: faker.date.future(),
    isComplete: faker.random.boolean()
  } )
}

console.log( JSON.stringify( database ) );

