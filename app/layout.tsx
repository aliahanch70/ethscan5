import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { cookies } from "next/headers"; // برای دسترسی به کوکی‌ها
import jwt from "jsonwebtoken"; // برای تایید JWT
import RootContent from "@/components/RootContent"; // Client Component

const SECRET_KEY = process.env.SECRET_KEY || ''; // کلید مخفی برای رمزگشایی JWT

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = getUserFromToken(); // دریافت کاربر از توکن (در سمت سرور)

  return (
    <html lang="fa">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-black dark:text-bodydark">
          {/* ارسال اطلاعات کاربر به Client Component */}
          <RootContent user={user}>{children}</RootContent>
        </div>
      </body>
    </html>
  );
}

// تابع سمت سرور برای گرفتن اطلاعات کاربر از JWT در کوکی‌ها
function getUserFromToken() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, SECRET_KEY);
      return decodedToken; // بازگشت payload دیکد شده توکن (مثلاً { username: 'example' })
    } catch (err) {
      console.error('خطا در تایید توکن:', err);
      return null; // توکن نامعتبر یا منقضی
    }
  }
  return null;
}
