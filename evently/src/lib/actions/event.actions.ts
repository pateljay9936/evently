'use server'

import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import Order from '@/lib/database/models/order.model'
import Category from '../database/models/category.model'
import Event from '@/lib/database/models/event.model'
import { handleError } from '@/lib/utils'
import { CreateEventParams } from '@/types'

export async function createEvent ({ event , userId , path }: CreateEventParams) {
  try {
    await connectToDatabase()
    
    const organizer = await User.findById(userId)
    if (!organizer) {
        throw new Error('User not found')
    }

    
    const newEvent = await Event.create({ 
        ...event, 
        category: event.categoryId,
        organizer: userId,
    })

    return JSON.parse(JSON.stringify(newEvent))
  } catch (error) {
    console.log(error)
    handleError(error)
  }
} 