'use server'

import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import Order from '@/lib/database/models/order.model'
import Category from '../database/models/category.model'
import Event from '@/lib/database/models/event.model'
import { handleError } from '@/lib/utils'
import { CreateEventParams, DeleteEventParams, GetAllEventsParams, GetEventsByUserParams, GetRelatedEventsByCategoryParams, NewEventParams, UpdateEventParams } from '@/types'
import path from 'path'
import { Model, model } from 'mongoose'
import { revalidatePath } from 'next/cache'

export async function populateEvent(query: any) {
  return query
    .populate({ path: 'category', Model: 'Category', select: '_id name' })  // sometime, This is not working: idk  why?     may be due to populate() is having  some problem to get the category data from  its document.
    .populate({ path: 'organizer', model: 'User', select: '_id firstName lastName' })
}

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: 'i' } })
}

export async function getEventById(eventId: string) {
  try {
    await connectToDatabase()
    const event = await populateEvent(Event.findById(eventId))
    if (!event) {
      throw new Error('Event not found')
    }
    return JSON.parse(JSON.stringify(event))
  } catch (error) {
    handleError(error)
  }
}

export async function getAllEvents({ query, limit = 6, page, category }: GetAllEventsParams) {
  try {
    await connectToDatabase()

    const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
    const categoryCondition = category ? await getCategoryByName(category) : null
    const conditions = {
      $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
    }

    const skipAmount = (Number(page) - 1) * limit
    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    }
  } catch (error) {
    handleError(error)
  }
}


export async function createEvent({ event, userId, path }: CreateEventParams) {
  try {
    await connectToDatabase()

    const organizer = await User.findById(userId)
    if (!organizer) {
      throw new Error('User not found')
    }
    console.log({ 'event': event })

    const e: NewEventParams = {
      ...event,
      category: event.categoryId,
      organizer: userId,
    }

    const newEvent = await Event.create(e)
    revalidatePath(path)

    return JSON.parse(JSON.stringify(newEvent))
  } catch (error) {
    console.log(error)
    handleError(error)
  }
}

export async function deleteEvent({ eventId, path }: DeleteEventParams) {
  try {
    await connectToDatabase()
    const deleteEvent = await Event.findByIdAndDelete(eventId)
    if (deleteEvent) {
      revalidatePath(path)
      // console.log('Event deleted, event_ID --->', deleteEvent._id.toString())
    }
  } catch (error) {
    handleError(error)
  }

}

export async function updateEvent({ userId, event, path }: UpdateEventParams) {
  try {
    await connectToDatabase()

    const eventToUpdate = await Event.findById(event._id)
    console.log('eventToUpdate', eventToUpdate)

    console.log('eventToUpdate.organizer:', eventToUpdate.organizer.toString())
    console.log('userId:', userId)
    
    if (!eventToUpdate || eventToUpdate.organizer.toString() !== userId) {
      throw new Error('Unauthorized or event not found')
    }
    console.log('eventToUpdate', eventToUpdate)

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, category: event.categoryId },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedEvent))
  } catch (error) {
    console.log({error})
    handleError(error)
  }
}
// GET EVENTS BY ORGANIZER
export async function getEventsByUser({ userId, limit = 6, page }: GetEventsByUserParams) {
  try {
    await connectToDatabase()

    const conditions = { organizer: userId }
    const skipAmount = (page - 1) * limit

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}

// GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
export async function getRelatedEventsByCategory({
  categoryId,
  eventId,
  limit = 3,
  page = 1,
}: GetRelatedEventsByCategoryParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ category: categoryId }, { _id: { $ne: eventId } }] }

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}