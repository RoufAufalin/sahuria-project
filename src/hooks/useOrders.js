import { useState, useEffect } from "react"
import * as orderService from "../services/orderServices"

export const useOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit] = useState(5)

  const [summary, setSummary] = useState({
    totalPesanan: 0,
    totalHarga: 0,
  })

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async (currentPage = page) => {
    try {
      setLoading(true)
      const data = await orderService.getOrders(currentPage, limit)

      setSummary(data.summary)
      setOrders(data)
      setPage(currentPage)
    } catch (error) {
      console.error("Failed to fetch orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const refreshOrders = async () => {
    await fetchOrders()
  }

  const removeOrder = async (id) => {
    try {
      const deletedId = await orderService.deleteOrder(id)

      if (deletedId) {
        setOrders((prev) => ({
          ...prev,
          total: prev.total - 1,
          data: prev.data.filter((order) => order._id !== id),
        }))
      }
    } catch (error) {
      console.error("Failed to delete order:", error)
    }
  }

  const addNewOrder = async (order) => {
    try {
      const newOrder = await orderService.addOrder(order)

      setOrders((prev) => ({
        ...prev,
        total: prev.total + 1,
        data: [...(prev.data || []), newOrder],
      }))
    } catch (error) {
      console.error("Failed to add order:", error)
    }
  }

  const updateExistingOrder = async (id, updatedOrder) => {
    try {
      const updatedData = await orderService.updateOrder(id, updatedOrder)

      if (updatedData) {
        setOrders((prev) => ({
          ...prev,
          data: prev.data.map((order) =>
            order._id === id ? { ...order, ...updatedData } : order,
          ),
        }))
      }
    } catch (error) {
      console.error("Failed to update order:", error)
    }
  }

  return {
    orders,
    loading,
    page,
    limit,
    fetchOrders,
    addNewOrder,
    updateExistingOrder,
    removeOrder,
    summary,
  }
}
