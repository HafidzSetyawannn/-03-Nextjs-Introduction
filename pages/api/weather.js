// pages/api/weather.js
export default async function handler(req, res) {
     const city = req.query.city || 'Jakarta';
     const apiKey = '35c176f6e545016ca2125903900b0337';
     const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
   
     try {
       const response = await fetch(weatherUrl);
       const data = await response.json();
   
       if (response.ok) {
         res.status(200).json(data);
       } else {
         res.status(response.status).json({ message: data.message });
       }
     } catch (error) {
       res.status(500).json({ message: 'Internal Server Error' });
     }
   }
   