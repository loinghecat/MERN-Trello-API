import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req,res,next)=>{
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
  })
  try {
    console.log(req.body)
    await correctCondition.validateAsync(req.body, {abortEarly: false})
    res.status(StatusCodes.CREATED).json({message: 'validation Create new board'})
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({errors: new Error(error).message })
  }

}
export const boardValidation = {
  createNew
}
