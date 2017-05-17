
'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex')


router.get('/', (req, res, next) => {
  knex('classifieds')
    .select('id', 'title', 'description', 'price', 'item_image', 'created_at')
    .then((items) => {
      res.send(items)
    })
})

router.get('/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id)
  knex('classifieds')
    .select('id', 'title', 'description', 'price', 'item_image')
    .where('id', id)
    .then((item) => {
      res.send(item[0])
    })
})


router.post('/', (req, res, next) => {
  knex('classifieds')
    .returning(['id', 'title', 'description', 'price', 'item_image'])
    .insert({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      item_image: req.body.item_image
    }).then((item) => {
      res.send(item[0])
    })
})

router.patch('/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id)
  let updated = req.body
  console.log('here', req.body)
  knex('classifieds')
    .where('id', id)
    .update({title: req.body.title, description: req.body.description, price: req.body.price, item_image: req.body.item_image})
    .returning(['id', 'title', 'description', 'price', 'item_image'])
    .then((item) => {
        console.log(item[0])
      delete item.created_at
      delete item.updated_at
      res.set('Content-Type', 'application/json')
      res.send(item[0])
    })
})

router.delete('/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id)
  knex('classifieds')
    .returning(['id', 'title', 'description', 'price', 'item_image'])
    .where('id', id)
    .del()
    .then((item) => {
      res.send(item[0])
    })
})



module.exports = router;
