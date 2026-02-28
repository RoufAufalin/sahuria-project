import { FaEdit, FaTrash } from "react-icons/fa"
import { useOrders } from "../hooks/useOrders"
import { useNavigate } from "react-router-dom" // <-- import useNavigate

function Home() {
  const { orders, loading, removeOrder, updateExistingOrder } = useOrders()
  const navigate = useNavigate() // hook untuk navigasi

  const harga = 15000
  const totalPesanan = orders.reduce((acc, o) => acc + o.jumlah, 0)
  const totalHarga = orders.reduce((acc, o) => acc + o.jumlah * harga, 0)

  const handleEdit = (order) => {
    const updated = { ...order, keterangan: "Updated" }
    updateExistingOrder(order._id, updated)
  }

  if (loading)
    return <div className="text-center mt-10 text-white">Loading...</div>

  return (
    <div
      className="min-h-screen flex flex-col justify-between p-6 items-center"
      style={{
        background: "linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)",
      }}
    >
      <div className="max-w-xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-4xl font-extrabold text-white text-center drop-shadow-md">
            Paket Sahur Ayam Bakar
          </h1>

          {/* Tombol navigasi ke halaman Pesanan */}
          <button
            onClick={() => navigate("/pesanan")}
            className="bg-white/30 hover:bg-white/50 text-green-900 font-semibold px-4 py-2 rounded-xl transition shadow-md"
          >
            Lihat Halaman Pesanan
          </button>
        </div>

        {/* Total Pesanan & Harga */}
        <div className="flex justify-center space-x-12 mb-10 text-white font-semibold drop-shadow-lg">
          <div>
            Total Pesanan: <span className="font-bold">{totalPesanan} pcs</span>
          </div>
          <div>
            Total Harga:{" "}
            <span className="font-bold">Rp {totalHarga.toLocaleString()}</span>
          </div>
        </div>

        {/* List Orders */}
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex justify-between items-center
                bg-white/20 backdrop-blur-md border border-white/30
                rounded-xl p-5 shadow-lg
                transition hover:shadow-2xl hover:bg-white/30"
            >
              <div className="flex flex-col text-left max-w-[60%]">
                <span className="text-green-900 font-semibold text-xl">
                  {order.name} - Kamar {order.kamar}
                </span>
                <span className="text-green-700 text-sm mt-1">
                  {order.description || "-"}
                </span>
              </div>

              <div className="flex items-center space-x-5">
                <div className="text-green-900 font-semibold text-right min-w-[70px]">
                  {order.jumlah} pcs
                  <br />
                  Rp {(order.jumlah * harga).toLocaleString()}
                </div>

                <button
                  onClick={() => handleEdit(order)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white p-3 rounded-full shadow-md transition transform hover:scale-110"
                >
                  <FaEdit size={18} />
                </button>
                <button
                  onClick={() => removeOrder(order._id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-md transition transform hover:scale-110"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="mt-10 text-center text-white/80 text-sm select-none">
        Created by Sahuria Team KADA 110
      </footer>
    </div>
  )
}

export default Home
