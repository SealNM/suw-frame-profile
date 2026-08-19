export interface SamplePhoto {
  id: string;
  name: string;
  url: string;
  description: string;
}

export const SAMPLE_PHOTOS: SamplePhoto[] = [
  {
    id: 'sample-1',
    name: 'ตัวอย่าง 1 (อาจารย์/ผู้บริหาร)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    description: 'ภาพถ่ายบุคคลทางการ สุภาพ',
  },
  {
    id: 'sample-2',
    name: 'ตัวอย่าง 2 (ศิษย์เก่า/สุภาพบุรุษ)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    description: 'ภาพถ่ายบุคคล สุภาพบุรุษ',
  },
  {
    id: 'sample-3',
    name: 'ตัวอย่าง 3 (นักเรียน/เยาวชน)',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80',
    description: 'ภาพถ่ายบุคคล ยิ้มแย้มสดใส',
  },
  {
    id: 'sample-4',
    name: 'ตัวอย่าง 4 (ผู้ร่วมทำบุญ)',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
    description: 'ภาพถ่ายบุคคล โทนอบอุ่น',
  },
];
