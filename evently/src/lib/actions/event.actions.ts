'use server'

import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import Order from '@/lib/database/models/order.model'
import Category from '../database/models/category.model'
import Event from '@/lib/database/models/event.model'
import { handleError } from '@/lib/utils'
import { CreateEventParams, NewEventParams } from '@/types'
import path from 'path'
import { Model, model } from 'mongoose'
import { revalidatePath } from 'next/cache'

export async function createEvent ({ event , userId , path }: CreateEventParams) {
  try {
    await connectToDatabase()
    
    const organizer = await User.findById(userId)
    if (!organizer) {
        throw new Error('User not found')
    }
    console.log({'event': event})
    
    const e : NewEventParams ={ 
      ...event, 
      category: event.categoryId,
      organizer: userId,
  }

//   const  e = new Event({
//     title: "Sample Event",
//     description: "This is a sample event for debugging and testing purposes.",
//     location: "Sample Location",
//     imageUrl: "https://example.com/sample-image.jpg",
//     startDateTime: new Date("2022-12-01T00:00:00Z"),
//     endDateTime: new Date("2022-12-02T00:00:00Z"),
//     isFree: true,
//     price: 0,
//     category: event.categoryId, // replace with a real Category ID
//     organizer: userId, // replace with a real User ID
//     url: "https://example.com/sample-event"
// });

    const newEvent = await Event.create(e)
    revalidatePath(path)

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
