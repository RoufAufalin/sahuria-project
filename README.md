# 🍗 Sahuria - Paket Sahur 15 K

Aplikasi pemesanan Paket Sahur berbasis React + REST API.
User dapat menambahkan, mengupdate, menghapus, dan melihat total pesanan
secara real-time.

---

## 🧑‍💻 Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/username/sahuria.git
cd sahuria
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run Development Server

```bash
npm run dev
```

---

## 🌍 API Endpoint Example

Base URL diambil dari environment variable:

    VITE_API_URL

### Contoh Endpoint

    GET    /orders
    POST   /orders
    PUT    /orders/:id
    DELETE /orders/:id

---

## 📊 Summary Response Example

Backend mengembalikan response seperti berikut:

```json
{
  "data": [...],
  "page": 1,
  "limit": 5,
  "total": 20,
  "summary": {
    "totalPesanan": 50,
    "totalHarga": 750000
  }
}
```

---

## 🧠 State Management

Menggunakan custom hook `useOrders` untuk menangani:

- Fetch data
- Update state orders
- Remove order
- Handle pagination
- Handle summary

Redux tidak digunakan karena state masih manageable menggunakan custom
hook.

---

## 🔐 Environment Notes

- File `.env` tidak di-commit ke repository.
- Gunakan `.env.example` untuk dokumentasi variabel environment.

Contoh `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📸 Preview

Tambahkan screenshot aplikasi di sini:

    ![Preview](./preview.png)

---

## 📌 Future Improvement

- Toast notification
- Authentication
- Role management
- Export laporan ke Excel
- Dashboard analytics

---

## 👨‍💻 Author

Dibuat untuk pembelajaran dan pengembangan aplikasi pemesanan sederhana.
