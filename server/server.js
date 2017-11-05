const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const app = express();
const port = 3000;

app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var enviroment = [];
var id = 0;

app.get('/enviroment',(req,res) => {
    res.json(enviroment);
  });
  
  app.get('/enviroment/:id', (req,res) => {
    let obj = _.find(enviroment, {id: req.params.id});
    res.json(obj || {});
  });

  app.post('/enviroment', (req,res) => {
    let obj = req.body;
    id++;
    obj.id = id + '';
    enviroment.push(obj);
    res.json(obj);
  });
  
  app.put('/enviroment/:id', (req, res) => {
    let update = req.body;
    if(update.id){
      delete update.id;
    }
    let obj = _.findIndex(enviroment, {id: req.params.id});
    if(!enviroment[obj]){
      res.send();
    }else{
      let updateObj = _.assign(enviroment[obj], update);
      res.json(updateObj);
    }
  });
  
  app.delete('/enviroment/:id', (req,res) => {
    let obj = _.findIndex(enviroment, {id: req.params.id});
    if(!enviroment[obj]){
      res.send();
    }else{
        let deletedObj = enviroment[obj];
        enviroment.splice(obj,1);
        res.json(deletedObj);
    }
  });

app.listen(port, () => {
    console.log('Listening on http://localhost', port);
  });

/*   enviroment = [
      {
          name
          type
          live
          age       
          description
      }
  ] */