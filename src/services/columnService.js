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
export const columnService = {
  createNew
}