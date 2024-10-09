import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'
const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({message: 'Get all board'})
  })
  .post(boardValidation.createNew, boardController.createNew)
Router.route('/:id')
  .get(boardController.getDetails)
  .put((req, res) => {
    res.status(StatusCodes.OK).json({message: 'Update board by id'})
  })
  .delete((req, res) => {
    res.status(StatusCodes.OK).json({message: 'Delete board by id'})
  })
export const boardRoute = Router