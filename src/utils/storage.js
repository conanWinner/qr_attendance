// Storage utilities for attendance records
const STORAGE_KEY = 'attendance_records'

export const getAttendanceHistory = async () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading attendance history:', error)
    return []
  }
}

export const saveAttendanceRecord = async (record) => {
  try {
    const existingRecords = await getAttendanceHistory()
    const updatedRecords = [record, ...existingRecords]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords))
    return record
  } catch (error) {
    console.error('Error saving attendance record:', error)
    throw error
  }
}

export const clearAttendanceHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing attendance history:', error)
    throw error
  }
}

export const exportAttendanceToCSV = (records) => {
  const csvContent = [
    'MSSV,Thời gian,Trạng thái',
    ...records.map(record => 
      `${record.mssv},${new Date(record.timestamp).toLocaleString('vi-VN')},Thành công`
    )
  ].join('\n')

  return csvContent
}
