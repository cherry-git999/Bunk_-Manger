export interface AttendanceRecord {
  id: number;
  date: string;
  studentName: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  deficit: number;
  requiredClasses: number;
}