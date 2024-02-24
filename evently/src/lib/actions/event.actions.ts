'use server'

import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import Order from '@/lib/database/models/order.model'
import Category from '../database/models/category.model'
import Event from '@/lib/database/models/event.model'
import { handleError } from '@/lib/utils'
import { CreateEventParams } from '@/types'
import path from 'path'
import { Model, model } from 'mongoose'

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

export async function populateAnyEvent (query: any) {
  return query
      .populate({path:'category', Model: 'Category', select: '_id name'})  // sometime, This is not working: idk  why?     may be due to populate() is having  some problem to get the category data from  its document.
      .populate({path: 'organizer', model: 'User', select: '_id firstName lastName'})
} 

export async function getEventsById (eventId: string) {
  try {
    await connectToDatabase()
    const event = await populateAnyEvent(Event.findById(eventId))
    if (!event) {
      throw new Error('Event not found')
    }
    return JSON.parse(JSON.stringify(event))
  } catch (error) {
    handleError(error)
  }
}
