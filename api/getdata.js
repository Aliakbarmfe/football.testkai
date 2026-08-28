// api/getdata.js

export default async function handler(req, res) {
  // آدرس دیتابیس بر اساس پروژه footballtestkia شما
  const FIREBASE_DB_URL = "https://footballtestkia-default-rtdb.firebaseio.com";

  try {
    const response = await fetch(`${FIREBASE_DB_URL}/.json`);
    
    if (!response.ok) {
      throw new Error(`خطای فایربیس: ${response.statusText}`);
    }

    const data = await response.json();

    // تنظیم هدرها برای حل مشکل CORS و ارسال پاسخ
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
    
    return res.status(200).json(data || {});
  } catch (error) {
    return res.status(500).json({ 
      error: "خطا در دریافت اطلاعات از فایربیس", 
      details: error.message 
    });
  }
}
