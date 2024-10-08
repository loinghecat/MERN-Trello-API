import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next)=>{
  try {
    res.status(StatusCodes.CREATED).json({ message: 'post form controller validation Create new board' })
  } catch (error) {
    next(error)
  }
}
export const boardController = {
  createNew
}