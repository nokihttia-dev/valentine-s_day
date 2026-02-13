# 💖 Valentine Project 2026: "The Love Charger" 

โปรเจกต์พิเศษที่สร้างขึ้นด้วยหัวใจ (และ Code) เพื่อเป็นของขวัญวันวาเลนไทน์ปี 2026 ให้กับแฟนครับ เนื่องจากปีนี้เราอยู่ไกลกัน ({DISTANCE} KM) เลยส่งความคิดถึงผ่านเว็บแอปพลิเคชันแบบ Interactive ที่ออกแบบมาให้มีลูกเล่นน่ารักๆ และสื่อความหมายดีๆ ครับ

---

## ✨ Features (ลูกเล่นสุดพิเศษ)

* **Interactive Avatars:** ตัวละคร Avatar (ปังปอนด์ & อ้วน) ที่ขยับตามอารมณ์และตอบสนองต่อการเล่น
* **Love Charging Game:** ระบบชาร์จพลังรัก ผู้ใช้ต้องกดค้างที่หัวใจเพื่อส่งพลังข้ามจังหวัดให้เต็ม 100% เพื่อปลดล็อก "The Message"
* **Memory Deck:** การ์ดความทรงจำแบบ Shuffle แตะเพื่อสลับดูรูปภาพ Captured Moment ของเรา
* **Memory Wall:** กำแพงรูปภาพความทรงจำที่จัดเรียงแบบ Polaroid สไตล์คลาสสิก
* **Vinyl Player:** เครื่องเล่นแผ่นเสียงจำลองที่เล่นเพลงโปรด (Dept - 17) ระหว่างเข้าชม
* **Floating Elements:** หัวใจและดาวลอยละล่องทั่วหน้าจอ เพิ่มบรรยากาศสุดโรแมนติก
* **Responsive Design:** รองรับการใช้งานทั้งบนมือถือและคอมพิวเตอร์ (Mobile First)

---

## 🛠 Tech Stack (เทคโนโลยีที่ใช้)

* **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animation:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Effects:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
* **Fonts:** [Google Fonts](https://fonts.google.com/) (Mali & Playfair Display)

---

## 🚀 Getting Started (วิธีการติดตั้งเพื่อรัน)

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/aitthikon/valentine-2026.git](https://github.com/aitthikon/valentine-2026.git)
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Assets:**
    * วางรูปภาพตัวละครใน: `public/images/unme/` (me.jpeg, u.jpeg)
    * วางรูปความทรงจำใน: `public/images/` (p1.jpg, p2.jpg, ...)
    * วางไฟล์เพลงใน: `public/music.mp3`

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    เปิดเว็บดูที่ `http://localhost:3000`

---

## 📂 Project Structure

```text
├── app/
│   ├── api/memories/      # API สำหรับจัดการดึงรูปภาพแบบสุ่ม
│   └── page.tsx           # หน้าหลัก (ValentinePage)
├── components/            # คอมโพเนนต์ย่อย (Avatar, VinylPlayer, Game)
├── public/
│   ├── images/            # Assets รูปภาพทั้งหมด
│   └── music.mp3          # เพลงประกอบโปรเจกต์
└── tailwind.config.ts     # การตั้งค่าธีมสี Rose และ Fonts