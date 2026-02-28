import { useState, useEffect } from "react"
import * as orderService from "../services/orderServices"

export const useOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  // fetch orders saat pertama load
  useEffect(() => {
    async function fetchData() {
      const data = await orderService.getOrders()
      setOrders(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  const refreshOrders = async () => {
    setLoading(true)
    const data = await orderService.getOrders()
    setOrders(data)
    setLoading(false)
  }

  const removeOrder = async (id) => {
    const success = await orderService.deleteOrder(id)
    if (success) {
      setOrders((prev) => prev.filter((order) => order._id !== id))
    }
  }

  const addNewOrder = async (order) => {
    const newOrder = await orderService.addOrder(order)
    if (newOrder) setOrders((prev) => [...prev, newOrder])
  }

  const updateExistingOrder = async (id, updatedOrder) => {
    const data = await orderService.updateOrder(id, updatedOrder)
    if (data) {
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, ...data } : o)),
      )
    }
  }

  return {
    orders,
    loading,
    refreshOrders,
    removeOrder,
    addNewOrder,
    updateExistingOrder,
  }
}
