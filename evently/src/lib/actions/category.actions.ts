'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import Order from '@/lib/database/models/order.model'
import Event from '@/lib/database/models/event.model'
import { handleError } from '@/lib/utils'

import { CreateCategoryParams, UpdateUserParams } from '@/types'
import Category from '../database/models/category.model'

export async function createCategory( {categoryName} : CreateCategoryParams) {
  try {
    await connectToDatabase()

    const newCategory = await Category.create({name: categoryName})
    return JSON.parse(JSON.stringify(newCategory))
  } catch (error) {
    handleError(error)
  }
}

export async function getAllCategory() {
    try {
      await connectToDatabase()
  
      const categories = await Category.find()
      return JSON.parse(JSON.stringify(categories))
    } catch (error) {
      handleError(error)
    }
  }