import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
const port = 3000;
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

//MIDDLEWARE FOR POST
app.use(express.urlencoded());


//Läs från MongoDB

const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const db = client.db('users');
const userCollection = db.collection('users');


// app.get('/users', async (req, res) => {
//     const users = await userCollection.find({}).toArray();
//     res.json(users)
//   });
//MAIN PAGE
app.get('/index', async (req, res) => {
  const index = await userCollection.find({}).toArray();
  res.render('index', {index});
});


//RENDER USERS
  
 app.get('/users', async (req, res) => {
     const users = await userCollection.find({}).toArray();
     res.render('users', {users});
   });

   //RENDER USER
   app.get('/user/:id', async (req, res) => {
    const user = await userCollection.findOne({ _id: ObjectId(req.params.id) });
    res.render('user', {
      name: user.name,
      email: user.email,
      phone: user.phone,
      about: user.about
    });
  });

  //CREATE USER
   app.get('/users/create', (req, res) => {
     res.render('create');
   });

  app.post('/users/create', async (req, res) => {
    await userCollection.insertOne(req.body);
    res.redirect('/users');
  });
  
  
//   db.users.insertMany([
//     {name: 'Erik Eriksson',  email: 'erik.eriksson@gmail.com', phone: '0723581441', date: new Date('2014-02-15'), about: 'spelar kort'},
//     {name: 'Henry Cantwell', email: 'henry.cantwell@gmail.com', phone: '076234881', date: new Date('2015-02-15'), about: 'gillar aik'},
//     {name: 'Andre Branch', email: 'andre.branch@gmail.com', phone: '0704226768', date: new Date('2016-02-15'), about: 'gillar att sova'}
// ])
app.listen(port, () => console.log(`Listening on ${port}`));    