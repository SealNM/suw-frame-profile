import React, { useState } from 'react';
import { 
  Share2, 
  Check, 
  HeartHandshake, 
  GraduationCap, 
  Users, 
  Sparkles 
} from 'lucide-react';
import { ThaiKanokDivider } from './ThaiIcons';

export const InvitationSection: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ผ้าป่าสามัคคีเพื่อการศึกษา โรงเรียนสุโขทัยวิทยาคม',
          text: 'ขอเชิญร่วมเป็นเจ้าภาพ สร้างโอกาสทางการศึกษา สร้างอนาคตที่ยั่งยืน โรงเรียนสุโขทัยวิทยาคม',
          url: window.location.href,
        });
      } catch {
        copyPageLink();
      }
    } else {
      copyPageLink();
    }
  };

  const copyPageLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section className="w-full flex flex-col gap-5 mt-2 select-none">
      {/* 1. Header of Invitation Section */}
      <div className="w-full text-center flex flex-col items-center gap-1.5 px-2">
        <div className="flex items-center justify-center gap-2">
          <ThaiKanokDivider className="w-24 sm:w-32 h-4 sm:h-5 text-amber-500" />
          <span className="text-xs sm:text-sm font-bold font-['Kanit'] text-[#4c1d95] uppercase tracking-wider flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-amber-500" />
            <span>ขอเชิญร่วมเป็นเจ้าภาพ</span>
          </span>
          <ThaiKanokDivider className="w-24 sm:w-32 h-4 sm:h-5 text-amber-500 rotate-180" />
        </div>

        <h3 className="text-lg sm:text-2xl font-bold font-['Kanit'] text-[#2b0c5e] tracking-tight">
          ผ้าป่าสามัคคีเพื่อการศึกษา
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
          สร้างโอกาสทางการศึกษา สร้างอนาคตที่ยั่งยืน • โรงเรียนสุโขทัยวิทยาคม
        </p>
      </div>

      {/* 2. Three Elegant Authentic Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {/* Card 1: สร้างโอกาสทางการศึกษา */}
        <div className="bg-white border border-purple-100 hover:border-purple-300 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-md group relative overflow-hidden">
          <div className="flex items-start gap-3.5 mb-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#4c1d95] flex items-center justify-center shrink-0 border border-purple-100 group-hover:scale-105 transition-transform overflow-hidden">
              <img
                src="/images/1000145905.webp"
                alt="การศึกษา"
                className="max-w-full max-h-full object-contain p-1"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-[#4c1d95] mb-1 font-['Kanit']">
                <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                <span>เพื่อการศึกษา</span>
              </div>
              <h4 className="text-sm font-bold font-['Kanit'] text-[#2b0c5e]">
                สร้างโอกาสทางการศึกษา
              </h4>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            ร่วมสมทบทุนเพื่อพัฒนาคุณภาพการเรียนรู้ สื่อการสอน และส่งเสริมการศึกษาของเยาวชน
          </p>
        </div>

        {/* Card 2: พลังแห่งความสามัคคี */}
        <div className="bg-white border border-purple-100 hover:border-purple-300 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-md group relative overflow-hidden">
          <div className="flex items-start gap-3.5 mb-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#4c1d95] flex items-center justify-center shrink-0 border border-purple-100 group-hover:scale-105 transition-transform overflow-hidden">
              <img
                src="/images/1000145906.webp"
                alt="ความสามัคคี"
                className="max-w-full max-h-full object-contain p-1"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 mb-1 font-['Kanit']">
                <Users className="w-2.5 h-2.5 text-amber-600" />
                <span>ร่วมแรงร่วมใจ</span>
              </div>
              <h4 className="text-sm font-bold font-['Kanit'] text-[#2b0c5e]">
                พลังแห่งความสามัคคี
              </h4>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            รวมพลังคณะครู บุคลากร ศิษย์เก่า ผู้ปกครอง และผู้มีจิตศรัทธาเพื่อพัฒนาโรงเรียน
          </p>
        </div>

        {/* Card 3: อนาคตที่ยั่งยืน */}
        <div className="bg-white border border-purple-100 hover:border-purple-300 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-md group relative overflow-hidden">
          <div className="flex items-start gap-3.5 mb-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#4c1d95] flex items-center justify-center shrink-0 border border-purple-100 group-hover:scale-105 transition-transform overflow-hidden">
              <img
                src="/images/1000145886-jukebox-bg-removed.webp"
                alt="สุโขทัยวิทยาคม"
                className="max-w-full max-h-full object-contain p-1"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-[#4c1d95] mb-1 font-['Kanit']">
                <GraduationCap className="w-2.5 h-2.5 text-[#4c1d95]" />
                <span>สุโขทัยวิทยาคม</span>
              </div>
              <h4 className="text-sm font-bold font-['Kanit'] text-[#2b0c5e]">
                สร้างอนาคตที่ยั่งยืน
              </h4>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            ร่วมส่งต่อโอกาสและแรงบันดาลใจ เพื่อสร้างรากฐานการศึกษาที่มั่นคงให้แก่เยาวชน
          </p>
        </div>
      </div>

      {/* 3. Action Button: Quick Share for Friends */}
      <div className="w-full flex items-center justify-center pt-1">
        <button
          onClick={handleShare}
          className="px-6 py-3 rounded-2xl bg-white hover:bg-purple-50 border border-purple-200 text-[#4c1d95] font-bold font-['Kanit'] text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs hover:shadow-sm"
        >
          {copiedLink ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700">คัดลอกลิงก์สำหรับแชร์แล้ว</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-amber-500" />
              <span>แชร์ให้เพื่อนร่วมใส่กรอบรูปและร่วมทำบุญ</span>
            </>
          )}
        </button>
      </div>

      {/* 4. Clean Footer Credit */}
      <div className="text-center pt-2 pb-4 text-slate-400 text-xs font-['Kanit']">
        โรงเรียนสุโขทัยวิทยาคม
      </div>
    </section>
  );
};
