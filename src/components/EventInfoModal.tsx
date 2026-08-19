import React from 'react';
import { X, Calendar, ShieldCheck, GraduationCap, Landmark, Sparkles, Phone, MapPin } from 'lucide-react';

interface EventInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EventInfoModal: React.FC<EventInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#14082c] border border-purple-800 rounded-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#180a33] border-b border-purple-900">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold font-['Kanit'] text-amber-400">
              รายละเอียดงานผ้าป่าสามัคคีเพื่อการศึกษา
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-purple-300 hover:text-white hover:bg-purple-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex flex-col gap-4 text-xs sm:text-sm text-purple-100/90 leading-relaxed">
          {/* Main Card */}
          <div className="p-4 rounded-xl bg-[#0f0622] border border-purple-900 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold font-['Kanit'] text-base">
              <Sparkles className="w-4 h-4" />
              <span>ขอเชิญร่วมเป็นเจ้าภาพทอดผ้าป่าสามัคคี</span>
            </div>
            <p className="text-xs text-purple-200">
              เพื่อพัฒนาคุณภาพการศึกษา จัดซื้ออุปกรณ์การเรียนการสอน และปรับปรุงอาคารสถานที่สำหรับเยาวชน โรงเรียนสุโขทัยวิทยาคม จังหวัดสุโขทัย
            </p>
          </div>

          {/* Date & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800 flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-amber-300 text-xs">กำหนดการจัดงาน</div>
                <div className="text-xs text-purple-200">วันพุธที่ 9 กันยายน พ.ศ. 2569</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-amber-300 text-xs">สถานที่จัดงาน</div>
                <div className="text-xs text-purple-200">โรงเรียนสุโขทัยวิทยาคม จ.สุโขทัย</div>
              </div>
            </div>
          </div>

          {/* Tax Deduction Benefit Card */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs sm:text-sm">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>สิทธิประโยชน์ลดหย่อนภาษีได้ 2 เท่า</span>
            </div>
            <p className="text-xs text-purple-200">
              เงินบริจาคเพื่อการศึกษาสามารถนำไปใช้สิทธิหักลดหย่อนภาษีเงินได้ตามที่กฎหมายกำหนดได้ 2 เท่า ผ่านระบบ e-Donation ของกรมสรรพากร พร้อมรับใบอนุโมทนาบัตรอิเล็กทรอนิกส์ได้ทันที
            </p>
          </div>

          {/* Contact */}
          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-900 flex items-center justify-between text-xs text-purple-300">
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-amber-400" />
              <span>ติดต่อสอบถามข้อมูล: สำนักงานอำนวยการ โรงเรียนสุโขทัยวิทยาคม</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#180a33] border-t border-purple-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
