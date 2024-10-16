import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'
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
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }
    // Process the data structure to match with the mock data used in the frontend
    // Clone a completely new object to avoid changing the original object
    const resBoard = cloneDeep(board)
    // Filter the cards based on the columnId
    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.toString() ===column._id.toString())
    })
    delete resBoard.cards
    return resBoard
  } catch (error) {
    {throw error}
  }
}
const update = async ( boardId, reqBody ) => {
  try {
    const updatedData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedBoard = await boardModel.update(boardId, updatedData)
    return updatedBoard
  } catch (error) {
    {throw error}
  }
}
const moveCardToDifferentColumn = async ( reqBody ) => {
  try {
    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updatedAt: Date.now()
    })
    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updatedAt: Date.now()
    })
    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId,
      updatedAt: Date.now()
    })
    return { updateResult: 'success' }
  } catch (error) {
    {throw error}
  }
}
export const boardService = { createNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}