import React, { useState } from "react"; // ✅ Impor useState dari React

export default function WeatherPage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();

      if (res.ok) {
        setWeather(data);
      } else {
        setError(data.message || "Gagal mengambil data cuaca");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mengambil data cuaca.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Cari Cuaca</h1>
      <input
        type="text"
        placeholder="Masukkan Kota..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather} disabled={loading}>
        {loading ? "Loading..." : "Cari"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && weather.main ? (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperatur: {weather.main?.temp ?? "N/A"}°C</p>
          <p>
            Kondisi: {weather.weather?.[0]?.description ?? "Tidak tersedia"}
          </p>
        </div>
      ) : (
        <p>Masukkan kota dan tekan "Cari" untuk melihat cuaca.</p>
      )}
    </div>
  );
}
