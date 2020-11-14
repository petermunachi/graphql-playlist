const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require("./schema/schema");
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/graphql-playlist', {useNewUrlParser: true, useUnifiedTopology: true}).
  catch(error => console.log("Error while tying to connect to database" , error));

mongoose.connection.on('error', err => {
  console.log(err);
});
mongoose.connection.on('disconnect', err => {
  console.log(err);
});
mongoose.connection.on('connected', () => {
  console.log("Connected to database");
});



app.use('/graphql',graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(4000, ()=>{
  console.log("App listening on port 4000");
})