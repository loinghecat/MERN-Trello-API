import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'

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
export const columnService = {
  createNew,
  update
}