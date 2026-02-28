import axios from "axios"

const BASE_URL = "http://localhost:3000/product/"

export const getOrders = async () => {
  try {
    const { data } = await axios.get(BASE_URL)
    return data
  } catch (error) {
    console.error("Failed to fetch orders:", error)
    return []
  }
}
