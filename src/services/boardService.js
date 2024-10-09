import { slugify } from '~/utils/formatters'
import {boardModel} from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
const createNew = async ( reqBody ) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    // Call the createNew method from the boardModel to create a new board into database
    const createdBoard = await boardModel.createNew(newBoard)
    // Call the findOneById method from the boardModel to get the newly created board
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    return getNewBoard
  } catch (error) {
    {throw error}
  }
}
const getDetails = async ( boardId ) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND,'Board not found')
    }
    return board
  } catch (error) {
    {throw error}
  }
}
export const boardService = { createNew,
  getDetails
 }