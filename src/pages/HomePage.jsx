import { FaEdit, FaTrash, FaPlus } from "react-icons/fa"
import { useOrders } from "../hooks/useOrders"
import { useNavigate } from "react-router-dom"

function Home() {
  const { orders, loading, removeOrder, updateExistingOrder } = useOrders()
  const navigate = useNavigate()

  const harga = 15000
  const totalPesanan = orders.reduce((acc, o) => acc + o.id, 0)
  const totalHarga = orders.reduce((acc, o) => acc + o.id * harga, 0)

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
      <div className="max-w-xl w-full space-y-5">
        {/* Nama Web */}
        <h1 className="text-5xl font-extrabold text-white text-center drop-shadow-lg">
          Sahuria
        </h1>

        {/* Informasi Menu + Tambah Pesanan */}
        <div className="flex justify-between items-center bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-5 shadow-lg">
          <div>
            <h2 className="text-3xl font-bold text-green-900 mb-1">
              Paket Sahur Ayam Bakar
            </h2>
            <p className="text-green-700 text-sm">
              Harga per porsi: Rp {harga.toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => navigate("/pesan")}
            className="flex items-center gap-2 bg-green-900 hover:bg-green-800 text-white px-4 py-2 rounded-xl font-semibold shadow-md transition transform hover:scale-105"
          >
            <FaPlus /> Tambah Pesanan
          </button>
        </div>

        {/* Total Pesanan & Harga */}
        <div className="flex justify-center space-x-12 mb-5 text-white font-semibold drop-shadow-lg">
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
                  {order.name} - Kamar {order.id}
                </span>
                <span className="text-green-700 text-sm mt-1">
                  {order.description || "-"}
                </span>
              </div>

              <div className="flex items-center space-x-5">
                <div className="text-green-900 font-semibold text-right min-w-[70px]">
                  {order.id} pcs
                  <br />
                  Rp {(order.id * harga).toLocaleString()}
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

      {/* Footer */}
      <footer className="mt-10 text-center text-white/80 text-sm select-none">
        Created by Sahuria Team KADA 110
      </footer>
    </div>
  )
}

export default Home
