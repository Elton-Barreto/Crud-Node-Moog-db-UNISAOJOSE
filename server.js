const express = require('express')
const app = express()
const { resolveInclude } = require('ejs')
const { restart } = require('nodemon')

app.set('view engine', 'ejs')

app.get('/', function(req, res){
    res.render('Home')
})
 
  app.get('/show', (req, res) => {
    db.collection('funcionario')
      .find()
      .toArray((err, results) => {
        if (err) return console.log(err)
        console.log(results)
        res.render('show', { data: results })
      })
  })

  app.use(bodyparser.urlencoded({ extended: true }))

app.listen(3000, () => {
    console.log('O servidor esta rodando na porta 3000')
    })

const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: true}))

const ObjectID = require('mongodb').ObjectId

const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://Elton:22725030@cluster0.aojb4.mongodb.net/crud?retryWrites=true&w=majority"
MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err);
        db = client.db('crud') 
    })

    app.post('/show', (req, res) => {
    db.collection('funcionario').save(req.body, (err, result) => {
        if (err) 
            return console.log(err)
                console.log('Salvo no Banco de Dados')
        res.redirect('/show')
      })
})

app
  .route('/edit/:id')
  .get((req, res) => {
    var id = req.params.id
    db.collection('funcionario')
      .find(ObjectID(id))
      .toArray((err, result) => {
        if (err) return console.log(err)
        res.render('edit', { data: result })
      })
  })

  .post((req, res) => {
    var id = req.params.id
    var name = req.body.name
    var surname = req.body.surname
    db.collection('funcionario').updateOne(
      {
        _id: ObjectID(id)
      },
      {
        $set: {
          name: name,
          surname: surname
        }
      },
      (err, result) => {
        if (err) return console.log(err)
        res.redirect('/show')
        console.log('Banco atualizado com sucesso')
      }
    )
  })

app.route('/delete/:id').get((req, res) => {
  var id = req.params.id
  db.collection('funcionario').deleteOne(
    {
      _id: ObjectID(id)
    },
    (err, result) => {
      if (err) return console.log(err)
      console.log('Valor removido com sucesso')
      res.redirect('/show')
    }
  )
})

