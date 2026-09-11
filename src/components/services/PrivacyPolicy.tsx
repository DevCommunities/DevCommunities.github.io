import { useState, useEffect } from "react";

export function PrivacyPolicy() {
  const [analyticsStatus, setAnalyticsStatus] = useState<string>("กำลังตรวจสอบ...");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("devcommu-analytics");
      if (consent === "declined") {
        setAnalyticsStatus("ปิดการวัดผล (Opted Out)");
      } else if (consent === "accepted") {
        setAnalyticsStatus("เปิดใช้งาน (Opted In)");
      } else {
        setAnalyticsStatus("ค่าเริ่มต้น (Default)");
      }
    } catch {
      setAnalyticsStatus("ไม่พร้อมใช้งานในโหมดปัจจุบัน");
    }
  }, []);

  const handleResetSettings = () => {
    try {
      localStorage.removeItem("devcommu-analytics");
      setAnalyticsStatus("รีเซ็ตเรียบร้อย (Default)");
      setToastMessage("รีเซ็ตการตั้งค่าคุกกี้และการวัดผลเรียบร้อยแล้ว กำลังโหลดหน้าใหม่...");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch {
      setToastMessage("ไม่สามารถเข้าถึงพื้นที่จัดเก็บในเบราว์เซอร์ได้");
    }
  };

  const handleOptOut = () => {
    try {
      localStorage.setItem("devcommu-analytics", "declined");
      setAnalyticsStatus("ปิดการวัดผล (Opted Out)");
      setToastMessage("ปิดการวัดผลเรียบร้อยแล้ว");
      setTimeout(() => setToastMessage(null), 3000);
    } catch {
      setToastMessage("เกิดข้อผิดพลาดในการบันทึกการตั้งค่า");
    }
  };

  return (
    <div className="dc-privacy-page pb-20 font-lineSansTH">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="alert"
          className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-slate-700 text-sm flex items-center gap-3 animate-fade-in"
        >
          <span className="text-[#e57192] text-lg">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <header className="mb-10 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold tracking-wider uppercase mb-3">
          <span>🔒</span>
          <span>DATA PROTECTION & PRIVACY POLICY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-lineSansTH_XB mb-4">
          นโยบายความเป็นส่วนตัว
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
          DevCommu ให้ความสำคัญสูงสุดต่อการคุ้มครองข้อมูลส่วนบุคคลของนักเรียน ผู้ปกครอง และผู้เข้าชมเว็บไซต์ทุกคน เรายึดถือความโปร่งใส ความปลอดภัย และปฏิบัติตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) อย่างเคร่งครัด
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-4 text-xs sm:text-sm text-slate-500">
          <span>📅 อัปเดตล่าสุด: 11 กันยายน 2569</span>
          <span>•</span>
          <span className="text-emerald-600 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            สอดคล้องตามมาตรฐาน PDPA ประเทศไทย
          </span>
        </div>
      </header>

      {/* Trust Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-xl mb-4 text-[#e57192]">
            🛡️
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-2 font-lineSansTH_XB">
            ไม่บันทึกข้อมูลฟอร์มลงเซิร์ฟเวอร์
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            แบบฟอร์มปรึกษาการเรียนทำงานบนเครื่องคุณ (Client-side Only) เพื่อเตรียมข้อความสำหรับคัดลอกไปส่งใน LINE เว็บไซต์ไม่มีการส่งข้อมูลดังกล่าวไปเก็บในฐานข้อมูลภายนอก
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl mb-4 text-blue-600">
            🧑‍🎓
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-2 font-lineSansTH_XB">
            คุ้มครองข้อมูลผู้เรียนและเยาวชน
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            ข้อมูล ภาพถ่าย และผลงานของน้อง ๆ นักเรียนที่จัดแสดงในหน้าความสำเร็จ (Hall of Fame) ได้รับความยินยอมจากเจ้าของข้อมูลและผู้ปกครอง เพื่อเป็นแรงบันดาลใจทางการศึกษา
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-xl mb-4 text-emerald-600">
            ⚙️
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-2 font-lineSansTH_XB">
            สิทธิในการควบคุมข้อมูลของคุณ
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            คุณมีสิทธิอย่างเต็มที่ในการเลือกเปิด/ปิดการวัดผลเว็บไซต์ (Analytics) และสามารถขอให้ตรวจสอบ แก้ไข หรือลบข้อมูลส่วนบุคคลที่เกี่ยวข้องได้ตลอดเวลา
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Table of Contents Sticky (Left) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 sticky top-24">
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-4 font-lineSansTH_XB">
              สารบัญหัวข้อนโยบาย
            </h4>
            <nav className="space-y-2 text-xs sm:text-sm">
              <a
                href="#section-1"
                className="block text-slate-600 hover:text-[#e57192] hover:translate-x-1 transition-all py-1"
              >
                1. บทนำและขอบเขตการคุ้มครอง
              </a>
              <a
                href="#section-2"
                className="block text-slate-600 hover:text-[#e57192] hover:translate-x-1 transition-all py-1"
              >
                2. ข้อมูลที่เราเก็บรวบรวม
              </a>
              <a
                href="#section-3"
                className="block text-slate-600 hover:text-[#e57192] hover:translate-x-1 transition-all py-1"
              >
                3. การทำงานของแบบฟอร์มปรึกษา
              </a>
              <a
                href="#section-4"
                className="block text-slate-600 hover:text-[#e57192] hover:translate-x-1 transition-all py-1"
              >
                4. คุกกี้และบริการของบุคคลที่สาม
              </a>
              <a
                href="#section-5"
                className="block text-slate-600 hover:text-[#e57192] hover:translate-x-1 transition-all py-1"
              >
                5. สิทธิของเจ้าของข้อมูล (PDPA)
              </a>
              <a
                href="#section-6"
                className="block text-slate-600 hover:text-[#e57192] hover:translate-x-1 transition-all py-1"
              >
                6. การตั้งค่าและรีเซ็ตคุกกี้
              </a>
              <a
                href="#section-7"
                className="block text-slate-600 hover:text-[#e57192] hover:translate-x-1 transition-all py-1"
              >
                7. ช่องทางติดต่อเรา
              </a>
            </nav>

            {/* Quick Contact Box */}
            <div className="mt-6 pt-5 border-t border-slate-200 text-xs text-slate-500">
              <p className="font-semibold text-slate-800 mb-1">
                มีข้อสงสัยเกี่ยวกับข้อมูล?
              </p>
              <p className="mb-3">
                ติดต่อเจ้าหน้าที่คุ้มครองข้อมูลได้โดยตรง
              </p>
              <a
                href="https://line.me/R/ti/p/@468httmq"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#06C755] font-bold hover:underline"
              >
                <span>💬 LINE: @468httmq</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Detailed Sections (Right) */}
        <main className="lg:col-span-8 space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">
          {/* Section 1 */}
          <section id="section-1" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 font-lineSansTH_XB flex items-center gap-2">
              <span className="text-[#e57192]">1.</span>
              <span>บทนำและขอบเขตการคุ้มครอง</span>
            </h2>
            <p className="mb-3">
              DevCommu ภายใต้ Solveserve Group ("เรา", "ผู้จัดทำ", "เว็บไซต์นี้") ให้ความสำคัญอย่างยิ่งต่อการคุ้มครองข้อมูลส่วนบุคคลของนักเรียน ผู้ปกครอง ติวเตอร์ และผู้เข้าใช้งานเว็บไซต์ทุกท่าน นโยบายความเป็นส่วนตัวนี้จัดทำขึ้นเพื่อชี้แจงรายละเอียดเกี่ยวกับการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคล รวมถึงสิทธิตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
            </p>
            <p>
              นโยบายนี้ครอบคลุมการใช้งานเว็บไซต์ <code>devcommu.com</code> หรือแพลตฟอร์มที่เชื่อมโยงกับ DevCommu (Solveserve Group)
            </p>
          </section>

          {/* Section 2 */}
          <section id="section-2" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 font-lineSansTH_XB flex items-center gap-2">
              <span className="text-[#e57192]">2.</span>
              <span>ข้อมูลที่เราเก็บรวบรวม (และข้อมูลที่เราไม่เก็บ)</span>
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">
                  ก. ข้อมูลที่ท่านส่งผ่านการติดต่อโดยตรง (Direct Communication)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  เมื่อท่านติดต่อเราผ่านทาง LINE (@468httmq), Facebook Messenger, Instagram, หรืออีเมล เช่น ชื่อ-นามสกุล, เบอร์โทรศัพท์, ข้อมูลการศึกษาของนักเรียน ข้อมูลเหล่านี้จะถูกใช้เพื่อการตอบคำถาม วางแผนหลักสูตร และประสานงานการเรียนเท่านั้น
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">
                  ข. ข้อมูลผลงานและความสำเร็จของนักเรียน (Hall of Fame & Projects)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  ชื่อเล่น, โรงเรียน, รางวัลการแข่งขัน, โปรเจกต์ที่พัฒนา และภาพถ่ายของนักเรียนที่ปรากฏบนเว็บไซต์ ได้รับความยินยอมจากน้อง ๆ ผู้เรียนและผู้ปกครองแล้ว โดยมีวัตถุประสงค์เพื่อยกย่องความสามารถของนักเรียนและเป็นตัวอย่างทางการศึกษาสำหรับผู้สนใจ
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">
                  ค. ข้อมูลเชิงเทคนิค (Technical Log Data)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  เช่น ประเภทเบราว์เซอร์, อุปกรณ์, ภาษาที่ใช้งาน, และหน้าเว็บที่มีการเข้าชม เพื่อการปรับแต่งการแสดงผลให้เหมาะสมและตรวจสอบความปลอดภัยของระบบ
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="section-3" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 font-lineSansTH_XB flex items-center gap-2">
              <span className="text-[#e57192]">3.</span>
              <span>การทำงานของแบบฟอร์มปรึกษาการเรียน (Zero-Storage Policy)</span>
            </h2>
            <div className="p-4 rounded-xl bg-pink-50/60 border border-pink-100 mb-4">
              <p className="text-xs sm:text-sm text-pink-900 font-medium">
                💡 เว็บไซต์ DevCommu ออกแบบด้วยแนวคิด <strong>Privacy-First Architecture</strong> แบบฟอร์มขอคำปรึกษาไม่มีการเชื่อมต่อกับฐานข้อมูลส่วนกลางใด ๆ
              </p>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#e57192] font-bold">✓</span>
                <span>
                  <strong>การประมวลผลในเครื่อง (In-Browser Only):</strong> ข้อความที่ท่านกรอกในแบบฟอร์มจะถูกประมวลผลอยู่ภายในหน่วยความจำเบราว์เซอร์ของท่านเท่านั้น
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#e57192] font-bold">✓</span>
                <span>
                  <strong>การคัดลอกข้อความ:</strong> เมื่อท่านกด "คัดลอกข้อความ" ระบบจะคัดลอกไปยัง Clipboard ของอุปกรณ์ เพื่อให้ท่านนำไปส่งต่อในห้องแชท LINE @468httmq ด้วยความสมัครใจของท่านเอง
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#e57192] font-bold">✓</span>
                <span>
                  <strong>ไม่คงค้างข้อมูล:</strong> เมื่อท่านปิดแท็บหรือรีเฟรชหน้าเว็บ ข้อมูลทั้งหมดในฟอร์มจะหายไปทันทีโดยไม่มีการบันทึกตกค้างบนเซิร์ฟเวอร์
                </span>
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="section-4" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 font-lineSansTH_XB flex items-center gap-2">
              <span className="text-[#e57192]">4.</span>
              <span>คุกกี้และบริการของบุคคลที่สาม (Third-Party Services)</span>
            </h2>
            <p className="mb-4">
              เว็บไซต์อาจมีการเชื่อมโยงหรือใช้งานบริการจากผู้ให้บริการภายนอก เพื่ออำนวยความสะดวกและยกระดับคุณภาพบริการ ดังนี้:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                <h4 className="font-bold text-slate-900 text-sm mb-1">YouTube Embed</h4>
                <p className="text-xs text-slate-600">
                  ใช้สำหรับแสดงวิดีโอแนะนำค่ายและบรรยากาศการเรียน การเล่นวิดีโออาจมีการส่งคุกกี้ตามนโยบายของ Google/YouTube
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                <h4 className="font-bold text-slate-900 text-sm mb-1">Google Analytics & Meta Pixel</h4>
                <p className="text-xs text-slate-600">
                  ใช้วิเคราะห์จำนวนผู้เข้าชมและประสิทธิภาพของหน้าเว็บแบบไม่ระบุตัวตน (Anonymized) เพื่อนำมาปรับปรุงเนื้อหาให้ตรงความต้องการของผู้เรียน
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="section-5" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 font-lineSansTH_XB flex items-center gap-2">
              <span className="text-[#e57192]">5.</span>
              <span>สิทธิของท่านตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล (PDPA)</span>
            </h2>
            <p className="mb-4">
              ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 ท่านในฐานะเจ้าของข้อมูลส่วนบุคคลมีสิทธิตามกฎหมายดังต่อไปนี้:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="block text-slate-900 font-semibold mb-1">1. สิทธิขอเข้าถึงและรับสำเนา</strong>
                <span className="text-slate-600">สามารถขอรับข้อมูลส่วนบุคคลของท่านที่อยู่ในความรับผิดชอบของเรา</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="block text-slate-900 font-semibold mb-1">2. สิทธิขอให้แก้ไขข้อมูล</strong>
                <span className="text-slate-600">ขอให้แก้ไขข้อมูลที่ไม่ถูกต้อง ไม่สมบูรณ์ หรือไม่เป็นปัจจุบัน</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="block text-slate-900 font-semibold mb-1">3. สิทธิขอให้ลบหรือทำลาย</strong>
                <span className="text-slate-600">ขอให้ลบหรือทำลายข้อมูลส่วนบุคคลของท่านเมื่อหมดความจำเป็น</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="block text-slate-900 font-semibold mb-1">4. สิทธิในการเพิกถอนความยินยอม</strong>
                <span className="text-slate-600">ท่านสามารถเพิกถอนความยินยอมที่เคยให้ไว้กับเราได้ตลอดเวลา</span>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="section-6" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 font-lineSansTH_XB flex items-center gap-2">
              <span className="text-[#e57192]">6.</span>
              <span>การตั้งค่าความเป็นส่วนตัวและคุกกี้ (Privacy Preferences)</span>
            </h2>
            <p className="mb-4">
              ท่านสามารถตรวจสอบและปรับแต่งสถานะความยินยอมการเก็บข้อมูลวัดผลของเว็บไซต์นี้ได้ด้วยตนเอง:
            </p>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 block uppercase font-semibold">
                    สถานะการวัดผลปัจจุบันบนเบราว์เซอร์นี้
                  </span>
                  <span className="text-base font-bold text-slate-900 mt-0.5 inline-block">
                    {analyticsStatus}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleOptOut}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-300 transition-colors shadow-sm"
                  >
                    ปิดการวัดผล (Opt-out)
                  </button>
                  <button
                    type="button"
                    onClick={handleResetSettings}
                    className="px-4 py-2 rounded-xl bg-[#e57192] hover:bg-[#d65f82] text-white font-semibold text-xs transition-colors shadow-sm"
                  >
                    รีเซ็ตการตั้งค่าคุกกี้ทั้งหมด
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                * การรีเซ็ตจะล้างค่าความยินยอมที่บันทึกไว้ใน LocalStorage และโหลดหน้าเว็บใหม่เพื่อให้การตั้งค่ามีผลทันที
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section id="section-7" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white font-lineSansTH_XB flex items-center gap-2">
              <span>📬</span>
              <span>7. ช่องทางการติดต่อเจ้าหน้าที่คุ้มครองข้อมูล</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              หากท่านมีคำถาม ข้อเสนอแนะ หรือต้องการใช้สิทธิของเจ้าของข้อมูลส่วนบุคคลตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA) ท่านสามารถติดต่อทีมงาน DevCommu ได้ตามช่องทางต่อไปนี้:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <span className="text-slate-400 block text-xs">LINE Official Account</span>
                <a
                  href="https://line.me/R/ti/p/@468httmq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#06C755] hover:underline text-sm sm:text-base mt-1 inline-block"
                >
                  @468httmq
                </a>
              </div>
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <span className="text-slate-400 block text-xs">Facebook Messenger</span>
                <a
                  href="https://m.me/DevCommu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-400 hover:underline text-sm sm:text-base mt-1 inline-block"
                >
                  m.me/DevCommu
                </a>
              </div>
            </div>
            <p className="text-xs text-slate-400 pt-2">
              ทีมงานจะดำเนินการตรวจสอบและตอบกลับคำร้องของท่านภายใน 30 วันตามที่กฎหมายกำหนด
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
