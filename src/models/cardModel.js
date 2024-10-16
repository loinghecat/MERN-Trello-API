import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import {GET_DB} from '~/config/mongodb'
import { ObjectId } from 'mongodb'

// Define Collection (name & schema)
const CARD_COLLECTION_NAME = 'cards'
const CARD_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().optional(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})
const INVALID_UPDATE_FIELDS = ['_id', 'createdAt', 'boardId']

const validatebeforeCreate = async (data) => {
  try {
    return await CARD_COLLECTION_SCHEMA.validateAsync(data,{abortEarly:false})
  } catch (error) {
    throw new Error(error)
  }
}
const createNew = async (data) => {
  try {
    const validatedData = await validatebeforeCreate(data)
    const newCardToAdd = {
      ...validatedData,
      boardId: new ObjectId(validatedData.boardId),
      columnId: new ObjectId(validatedData.columnId)
    }
    const createCard = await GET_DB().collection(CARD_COLLECTION_NAME).insertOne(newCardToAdd)
    return createCard
  } catch (error) {
    throw new Error(error)
  }
}
const findOneById = async (id) => {
  try {
    const result = await GET_DB().collection(CARD_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
    return result
  } catch (error) {
    throw new Error(error)
  }
}
const update = async (cardId, updateData) => {
  try {
    Object.keys(updateData).forEach(key => {
      if (INVALID_UPDATE_FIELDS.includes(key)) {
        delete updateData[key]
      }
    })
    if (updateData.columnId) {
      updateData.columnId = new ObjectId(updateData.columnId)
    }
    const result = await GET_DB().collection(CARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(cardId) },
      { $set: updateData },
      { returnDocument: 'after' }
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}
export const cardModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  update
}