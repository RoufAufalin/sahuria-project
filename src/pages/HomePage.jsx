import { FaEdit, FaTrash, FaPlus } from "react-icons/fa"
import { useOrders } from "../hooks/useOrders"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import sahuriaImage from "../assets/sahuria.svg"

function Home() {
  const { orders, loading, removeOrder, fetchOrders, page, limit, summary } =
    useOrders()

  const navigate = useNavigate()
  const [orderToDelete, setOrderToDelete] = useState(null)

  const data = orders?.data || []

  console.log(data)

  const harga = 15000

  const handleEdit = (order) => {
    navigate("/pesan", { state: { order } })
  }

  if (loading)
    return <div className="text-center mt-10 text-white">Loading...</div>

  return (
    <div
      className="font-sans"
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(135deg, #e8f5e2 0%, #f5faf3 50%, #edf7e8 100%)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 16px 40px",
      }}
    >
      {/* Ambient Blobs */}
      <div
        style={{
          position: "fixed",
          top: "-5%",
          left: "-10%",
          width: "500px",
          height: "500px",
          background: "#84B179",
          borderRadius: "50%",
          filter: "blur(120px)",
          opacity: 0.25,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "-5%",
          right: "-10%",
          width: "500px",
          height: "500px",
          background: "#A2CB8B",
          borderRadius: "50%",
          filter: "blur(120px)",
          opacity: 0.2,
          pointerEvents: "none",
        }}
      />

      <div
        className="w-full"
        style={{
          maxWidth: "720px",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* HEADER CARD */}
        <div
          className="bg-white/80 backdrop-blur-xl border border-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.07)] mb-6"
          style={{
            borderRadius: "2.5rem",
            padding: "2rem",
          }}
        >
          {/* IMAGE */}
          <div className="flex justify-center mb-6">
            <img
              src={sahuriaImage}
              alt="Sahuria"
              style={{
                width: "140px",
                height: "auto",
              }}
            />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800">
            Paket Sahur Ayam Goreng + Tumis Tahu Toge
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Harga per porsi: Rp {harga.toLocaleString()}
          </p>

          <button
            onClick={() => navigate("/pesan")}
            className="mt-6 w-full flex justify-center items-center gap-2 text-white font-bold py-3.5 rounded-2xl transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #84B179, #A2CB8B)",
              boxShadow: "0 10px 30px -8px rgba(132,177,121,0.6)",
            }}
          >
            <FaPlus /> Tambah Pesanan
          </button>
        </div>

        {/* TOTAL INFO */}
        <div className="flex justify-between text-gray-600 font-semibold mb-6 px-2">
          <div>
            Total Pesanan:{" "}
            <span className="font-bold text-gray-800">
              {summary.totalPesanan} pcs
            </span>
          </div>
          <div>
            Total Harga:{" "}
            <span className="font-bold text-gray-800">
              Rp {summary.totalHarga.toLocaleString()}
            </span>
          </div>
        </div>

        {/* LIST ORDERS */}
        <div className="space-y-5">
          {data.map((order) => (
            <div
              key={order._id}
              className="bg-white/80 backdrop-blur-xl border border-white/80 shadow-[0_10px_40px_rgba(0,0,0,0.06)] flex justify-between items-center"
              style={{
                borderRadius: "2rem",
                padding: "1.5rem",
              }}
            >
              <div>
                <div className="font-bold text-gray-800 text-lg">
                  {order.nama} - Kamar {order.kamar}
                </div>
                <div className="text-sm text-gray-400">
                  {order.keterangan || "-"}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right text-gray-700 font-semibold">
                  {order.jumlah} pcs
                  <br />
                  Rp {(order.jumlah * harga).toLocaleString()}
                </div>

                <button
                  onClick={() => handleEdit(order)}
                  className="p-3 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white transition"
                >
                  <FaEdit size={16} />
                </button>

                <button
                  onClick={() => setOrderToDelete(order)}
                  className="p-3 rounded-full bg-red-500 hover:bg-red-600 text-white transition"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={page === 1}
            onClick={() => fetchOrders(page - 1)}
            className="px-4 py-2 rounded-xl bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>

          <span className="font-semibold text-gray-700">
            Halaman {orders.page}
          </span>

          <button
            disabled={orders.page * limit >= orders.total}
            onClick={() => fetchOrders(page + 1)}
            className="px-4 py-2 rounded-xl bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      {orderToDelete && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "2rem",
              width: "90%",
              maxWidth: "400px",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Hapus Pesanan?
            </h3>

            <p className="text-gray-500 mb-6">
              Yakin ingin menghapus pesanan atas nama{" "}
              <span className="font-semibold">{orderToDelete.nama}</span>?
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setOrderToDelete(null)}
                className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
              >
                Batal
              </button>

              <button
                onClick={async () => {
                  await removeOrder(orderToDelete._id)
                  setOrderToDelete(null)
                }}
                className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white transition"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
