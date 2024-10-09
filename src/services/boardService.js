import { slugify } from '~/utils/formatters'
import {boardModel} from '~/models/boardModel'
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
export const boardService = { createNew }