const menu = {
  namaMenu: "Paket Sahur Ayam Bakar",
  harga: 25000,
  orders: [
    { id: 1, nama: "Andi", keterangan: "Pedas sedang", jumlah: 2 },
    { id: 2, nama: "Budi", keterangan: "Tanpa sambal", jumlah: 1 },
    { id: 3, nama: "Siti", keterangan: "Extra nasi", jumlah: 3 },
  ],
}
function Home() {
  const totalPesanan = menu.orders.reduce((acc, item) => acc + item.jumlah, 0)

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* Header Menu */}
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2">{menu.namaMenu}</h1>
        <p className="text-gray-500 mb-4">
          Harga: Rp {menu.harga.toLocaleString()}
        </p>

        <div className="inline-block bg-black text-white px-6 py-2 rounded-full text-sm">
          Total Pesanan: {totalPesanan}
        </div>
      </div>

      {/* List Pemesan */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-4 font-semibold text-gray-600 border-b px-6 py-4 bg-gray-50">
          <span>Nama</span>
          <span>Keterangan</span>
          <span className="text-center">Jumlah</span>
          <span className="text-right">Subtotal</span>
        </div>

        {menu.orders.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-4 items-center px-6 py-4 border-b last:border-none hover:bg-gray-50 transition"
          >
            <span className="font-medium">{order.nama}</span>
            <span className="text-gray-500">{order.keterangan}</span>
            <span className="text-center">{order.jumlah}</span>
            <span className="text-right font-medium">
              Rp {(order.jumlah * menu.harga).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
