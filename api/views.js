export default async function handler(req, res) {
  // آدرس دیتابیس فایربیس شما (محل ذخیره بازدیدها)
  const FIREBASE_DB_URL = 'https://footballtestkia-default-rtdb.firebaseio.com';

  try {
    if (req.method === 'POST') {
      // ۱. دریافت مقدار فعلی بازدید
      const getRes = await fetch(FIREBASE_DB_URL);
      const currentViews = await getRes.json();
      
      const newViews = (Number(currentViews) || 0) + 1;

      // ۲. افزایش مقدار بازدید در فایربیس
      await fetch(FIREBASE_DB_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newViews)
      });

      return res.status(200).json({ views: newViews });
    } else {
      // دریافت مقدار بازدید بدون افزایش آن
      const getRes = await fetch(FIREBASE_DB_URL);
      const views = await getRes.json();
      return res.status(200).json({ views: views || 0 });
    }
  } catch (error) {
    return res.status(500).json({ error: 'خطا در ارتباط با فایربیس' });
  }
}
