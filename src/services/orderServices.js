import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL

export const getOrders = async (page = 1, limit = 5) => {
  try {
    const { data } = await axios.get(`${BASE_URL}?page=${page}&limit=${limit}`)
    return data
  } catch (error) {
    console.error("Failed to fetch orders:", error)
    throw error
  }
}

export const addOrder = async (order) => {
  try {
    const { data } = await axios.post(BASE_URL, order)

    return data.data
  } catch (error) {
    console.error("Failed to add order:", error)
    throw error
  }
}

export const updateOrder = async (id, updatedOrder) => {
  try {
    const { data } = await axios.put(`${BASE_URL}/${id}`, updatedOrder)

    return data.data
  } catch (error) {
    console.error("Failed to update order:", error)
    throw error
  }
}

export const deleteOrder = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`)

    return id // kita return id supaya gampang remove dari state
  } catch (error) {
    console.error("Failed to delete order:", error)
    throw error
  }
}
