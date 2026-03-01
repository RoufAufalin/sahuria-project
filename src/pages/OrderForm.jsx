import React, { useState, useEffect } from "react"
import { useOrders } from "../hooks/useOrders"
import { useLocation } from "react-router-dom"

const initialErrors = {
  nama: "",
  jumlah: "",
  kamar: "",
}

const initialData = {
  nama: "",
  jumlah: "",
  kamar: "",
  keterangan: "",
}

function OrderForm() {
  const [errors, setErrors] = useState(initialErrors)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const location = useLocation()
  const editingOrder = location.state?.order

  const { addNewOrder, updateExistingOrder } = useOrders()

  const [formData, setFormData] = useState({
    nama: "",
    jumlah: "",
    kamar: "",
    keterangan: "",
  })

  useEffect(() => {
    if (editingOrder) {
      setFormData({
        nama: editingOrder.nama,
        jumlah: editingOrder.jumlah,
        kamar: editingOrder.kamar,
        keterangan: editingOrder.keterangan || "",
      })
    }
  }, [editingOrder])

  const validate = (name, value) => {
    if (name === "nama") {
      if (!value.trim()) return "Nama pemesan wajib diisi 😡"
    }
    if (name === "kamar") {
      if (!value.trim()) return "Nomor kamar wajib diisi 😡"
    }
    if (name === "jumlah") {
      if (!value) return "Jumlah porsi wajib diisi 😡"
      if (Number(value) < 1) return "Minimal 1 porsi 😡"
    }
    return ""
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // Clear error on change if field is now valid
    if (errors[name]) {
      setErrors({ ...errors, [name]: validate(name, value) })
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setErrors({ ...errors, [name]: validate(name, value) })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate all required fields on submit
    const newErrors = {
      nama: validate("nama", formData.nama),
      jumlah: validate("jumlah", formData.jumlah),
      kamar: validate("kamar", formData.kamar),
    }
    setErrors(newErrors)

    const hasError = Object.values(newErrors).some((err) => err !== "")
    if (hasError) return

    setIsLoading(true)
    setIsLoading(true)

    const payload = {
      nama: formData.nama,
      jumlah: Number(formData.jumlah),
      kamar: Number(formData.kamar),
      keterangan: formData.keterangan,
    }

    try {
      if (editingOrder) {
        // MODE UPDATE
        await updateExistingOrder(editingOrder._id, payload)
      } else {
        // MODE CREATE
        await addNewOrder(payload)
      }

      navigate("/") // balik ke home
    } catch (error) {
      console.error("Submit error:", error)
    }

    setIsSuccess(true)
  }

  const handleReset = () => {
    setFormData(initialData)
    setErrors(initialErrors)
    setIsSuccess(false)
  }

  // Helper to get input class based on error state
  const inputClass = (fieldName) => {
    const base =
      "w-full pl-12 pr-5 py-3.5 rounded-2xl border-2 bg-gray-50/50 focus:outline-none focus:ring-4 transition-all duration-300 font-medium text-gray-800 placeholder:text-gray-400"
    if (errors[fieldName]) {
      return `${base} border-red-400 focus:border-red-400 focus:ring-red-100`
    }
    return `${base} border-gray-100 focus:bg-white focus:border-[#84B179] focus:ring-[#A2CB8B]/20`
  }

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
      ></div>
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
      ></div>
      <div
        style={{
          position: "fixed",
          bottom: "-10%",
          left: "10%",
          width: "400px",
          height: "400px",
          background: "#84B179",
          borderRadius: "50%",
          filter: "blur(120px)",
          opacity: 0.2,
          pointerEvents: "none",
        }}
      ></div>

      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-[#84B179] transition-colors font-medium bg-white/70 px-4 py-2 rounded-xl backdrop-blur-sm border border-white shadow-sm"
        style={{ position: "fixed", top: "20px", left: "20px", zIndex: 20 }}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Kembali
      </button>

      {/* Form Card */}
      <div
        className="bg-white/80 backdrop-blur-xl border border-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.07)] w-full"
        style={{
          maxWidth: "520px",
          borderRadius: "2.5rem",
          padding: "clamp(2rem, 5vw, 2.5rem)",
          position: "relative",
          zIndex: 10,
        }}
      >
        {isSuccess ? (
          /* SUCCESS STATE */
          <div className="text-center py-6 flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-[#84B179]/10 flex items-center justify-center text-5xl shadow-inner">
              ✅
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800">
              Pesanan Diterima!
            </h2>
            <p className="text-gray-500 text-sm max-w-xs">
              Terima kasih,{" "}
              <strong className="text-[#84B179]">{formData.nama}</strong>!
              Pesanan sahurmu untuk kamar{" "}
              <strong className="text-[#84B179]">{formData.kamar}</strong>{" "}
              sedang diproses.
            </p>
            <div className="bg-[#84B179]/8 rounded-2xl p-4 w-full text-left space-y-2 border border-[#84B179]/20 mt-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Nama</span>
                <span className="font-bold text-gray-700">{formData.nama}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Kamar</span>
                <span className="font-bold text-gray-700">
                  {formData.kamar}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Jumlah Porsi</span>
                <span className="font-bold text-gray-700">
                  {formData.jumlah} porsi
                </span>
              </div>
              {formData.keterangan && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Keterangan</span>
                  <span className="font-bold text-gray-700 max-w-[60%] text-right">
                    {formData.keterangan}
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={handleReset}
              className="mt-4 w-full bg-[#84B179] hover:bg-[#77a56a] text-white font-bold py-3.5 rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_20px_-6px_rgba(132,177,121,0.6)]"
            >
              Pesan Lagi
            </button>
          </div>
        ) : (
          /* FORM STATE */
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#84B179]/10 mb-4 shadow-inner">
                <span className="text-3xl">🌙</span>
              </div>
              <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                {editingOrder ? "Edit Pesanan" : "Pesan Sahur"}
              </h1>
              <p className="text-gray-400 mt-2 text-sm font-medium">
                Isi form di bawah biar puasanya makin kuat!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Nama */}
              <div className="space-y-1.5">
                <label
                  htmlFor="nama"
                  className="text-sm font-bold text-gray-700 block"
                >
                  Nama Pemesan <span className="text-[#84B179]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className={`w-5 h-5 ${errors.nama ? "text-red-400" : "text-gray-400"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    required
                    placeholder="Tulis namamu..."
                    value={formData.nama}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass("nama")}
                  />
                </div>
                {errors.nama && (
                  <p className="text-xs text-red-500 font-medium pl-1 flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.nama}
                  </p>
                )}
              </div>

              {/* Kamar & Jumlah */}
              <div className="grid grid-cols-2 gap-4">
                {/* Kamar */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="kamar"
                    className="text-sm font-bold text-gray-700 block"
                  >
                    No. Kamar <span className="text-[#84B179]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className={`w-5 h-5 ${errors.kamar ? "text-red-400" : "text-gray-400"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="kamar"
                      name="kamar"
                      required
                      placeholder="Contoh: B-311"
                      value={formData.kamar}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClass("kamar")}
                    />
                  </div>
                  {errors.kamar && (
                    <p className="text-xs text-red-500 font-medium pl-1 flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.kamar}
                    </p>
                  )}
                </div>

                {/* Jumlah */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="jumlah"
                    className="text-sm font-bold text-gray-700 block"
                  >
                    Jumlah Porsi <span className="text-[#84B179]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className={`w-5 h-5 ${errors.jumlah ? "text-red-400" : "text-gray-400"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <input
                      type="number"
                      id="jumlah"
                      name="jumlah"
                      required
                      min="1"
                      placeholder="Berapa..."
                      value={formData.jumlah}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClass("jumlah")}
                    />
                  </div>
                  {errors.jumlah && (
                    <p className="text-xs text-red-500 font-medium pl-1 flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.jumlah}
                    </p>
                  )}
                </div>
              </div>

              {/* Keterangan */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="keterangan"
                    className="text-sm font-bold text-gray-700"
                  >
                    Keterangan{" "}
                    <span className="text-gray-400 font-normal text-xs ml-1">
                      (Opsional)
                    </span>
                  </label>
                  <span className="text-xs font-medium text-gray-400">
                    {formData.keterangan.length}/150
                  </span>
                </div>
                <textarea
                  id="keterangan"
                  name="keterangan"
                  rows="3"
                  maxLength="150"
                  placeholder="Contoh: Nasi porsi 1/2 😺, tambah gorengan😸, tambah sambal, tambah sayur😼, tambah lauk🙀.."
                  value={formData.keterangan}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-[#84B179] focus:ring-4 focus:ring-[#A2CB8B]/20 transition-all duration-300 font-medium text-gray-800 placeholder:text-gray-400 resize-none"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 text-white font-bold text-lg py-4 rounded-2xl transition-all duration-300 mt-2 disabled:opacity-80 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #84B179, #A2CB8B)",
                  boxShadow: "0 10px 30px -8px rgba(132,177,121,0.6)",
                  transform: isLoading ? "none" : undefined,
                }}
                onMouseEnter={(e) =>
                  !isLoading &&
                  (e.currentTarget.style.transform = "translateY(-2px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                {isLoading ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Memproses...
                  </>
                ) : (
                  <>
                    {editingOrder ? "Update Pesanan" : "Pesan Sekarang"}
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderForm
