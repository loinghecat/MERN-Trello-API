import { StatusCodes } from 'http-status-codes'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
import ApiError from '~/utils/ApiError'

const createNew = async ( reqBody ) => {
  try {
    const newColumn = {
      ...reqBody
    }
    const createdColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)
    if (getNewColumn) {
      getNewColumn.cards = []
      await boardModel.pushToColumnOrderIds(getNewColumn)
    }
    return getNewColumn
  } catch (error) {
    {throw error}
  }
}
const update = async ( columnId, reqBody ) => {
  try {
    const updatedData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedColumn = await columnModel.update(columnId, updatedData)
    return updatedColumn
  } catch (error) {
    {throw error}
  }
}
const deleteItem = async ( columnId) => {
  try {
    const targetColumn = await columnModel.findOneById(columnId)
    if (!targetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Column not found!')
    }
    await columnModel.deleteOneById(columnId)
    await cardModel.deleteManyByColumnId(columnId)
    await boardModel.pullFromColumnOrderIds(targetColumn)
    return { deleteResult: 'Deleted successfully!' }
  } catch (error) {
    {throw error}
  }
}
export const columnService = {
  createNew,
  update,
  deleteItem
}