// api/getdata.js

export default async function handler(req, res) {
  // لینک Realtime Database فایربیس شما
  const FIREBASE_DB_URL = "https://YOUR_FIREBASE_PROJECT_ID.firebaseio.com";

  try {
    const response = await fetch(`${FIREBASE_DB_URL}/.json`);
    const data = await response.json();

    // تنظیم هدرها برای جلوگیری از خطای CORS و کش
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
    
    return res.status(200).json(data || {});
  } catch (error) {
    return res.status(500).json({ error: "خطا در دریافت اطلاعات از فایربیس", details: error.message });
  }
}
