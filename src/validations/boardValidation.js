import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import { BOARD_TYPES } from '~/utils/constants'
import ApiError from '~/utils/ApiError'
const createNew = async (req, res, next)=>{
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'string.base': 'Title must be a string',
      'string.empty': 'Title cannot be empty',
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title must be less than or equal to 50 characters long',
      'any.required': 'Title is required',
      'string.trim': 'Title cannot have whitespace',
    }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string().required().valid(BOARD_TYPES.PUBLIC,BOARD_TYPES.PRIVATE),

  })
  try {
    await correctCondition.validateAsync(req.body, {abortEarly: false})
    //Move to the next middleware if no error
    next()
  } catch (error) {
    const errorMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customError)
  }
}
export const boardValidation = {
  createNew
}
