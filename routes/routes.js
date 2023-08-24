const express = require('express');
const  {createNoteByUserId,createCategorieByUserId,createUser,getNotesByUserId,getUserInfos,getCategoriesByUserId,getNotesByCategorie} = require('../controllers/controller')
const routes = express.Router();

routes.route('/:email/:password').get(getUserInfos)
routes.route('/:email/:password/:username').post(createUser) 
routes.route('/:user_id').get(getNotesByUserId)
routes.route('/:user_id').post(createNoteByUserId)
routes.route('/categories/by_user_id/v1/:user_id').get(getCategoriesByUserId)
routes.route('/categories/by_user_id/v1/:user_id').post(createCategorieByUserId)
routes.route('/notes/by_user_id/v1/:user_id/:categorie').get(getNotesByCategorie)

module.exports = routes