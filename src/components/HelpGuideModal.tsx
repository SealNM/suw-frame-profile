import React from 'react';
import { X, Upload, Sliders, Download, CheckCircle2, HelpCircle } from 'lucide-react';

interface HelpGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpGuideModal: React.FC<HelpGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    {
      step: '1',
      title: 'อัปโหลดรูปภาพโปรไฟล์',
      desc: 'คลิกปุ่ม "เลือกรูปภาพ" เพื่อเลือกภาพถ่ายบุคคล หรือคลิก "ถ่ายรูป" เพื่อใช้กล้องจากสมาร์ตโฟนหรือคอมพิวเตอร์ของคุณ',
      icon: Upload,
    },
    {
      step: '2',
      title: 'ปรับแต่งและจัดตำแหน่ง',
      desc: 'ลากรูปภาพเพื่อจัดกึ่งกลาง ใช้แถบเลื่อนซูม/หมุนองศา ปรับความสว่าง และสามารถเลือกแบบกรอบรูปผ้าป่าที่ต้องการได้ตามใจชอบ',
      icon: Sliders,
    },
    {
      step: '3',
      title: 'ส่งออกรูปภาพความละเอียดสูง',
      desc: 'คลิกปุ่ม "ส่งออกรูป HD" เลือกขนาดความละเอียดที่ต้องการ (Full HD 1080p, 2K หรือ 4K) แล้วกดดาวน์โหลดเพื่อนำไปตั้งเป็นรูปโปรไฟล์ได้ทันที',
      icon: Download,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#14082c] border border-purple-800 rounded-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#180a33] border-b border-purple-900">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold font-['Kanit'] text-amber-400">
              ขั้นตอนการใช้งาน
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
        <div className="p-5 overflow-y-auto flex flex-col gap-4">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-4 rounded-xl bg-[#0f0622] border border-purple-900 flex items-start gap-3.5"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-900 border border-amber-500/60 flex items-center justify-center text-amber-400 shrink-0 font-bold font-['Kanit'] text-base">
                  {item.step}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-bold text-amber-300 flex items-center gap-2">
                    <Icon className="w-4 h-4 text-purple-300" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-purple-200/90 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}

          <div className="p-3.5 rounded-xl bg-purple-950/60 border border-purple-800 flex items-center gap-2.5 text-xs text-purple-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>ระบบประมวลผลบนเครื่องของคุณแบบเรียลไทม์ ไฟล์ภาพมีความเป็นส่วนตัวและปลอดภัย</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#180a33] border-t border-purple-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
          >
            เข้าใจแล้ว เริ่มสร้างรูปโปรไฟล์
          </button>
        </div>
      </div>
    </div>
  );
};
