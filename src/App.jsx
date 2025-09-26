import React, { useState, useEffect } from 'react'
import QRScanner from './components/QRScanner'
import AttendanceList from './components/AttendanceList'
import QRGenerator from './components/QRGenerator'
import AnalyticsDashboard from './components/AnalyticsDashboard'
import { getAttendanceHistory, saveAttendanceRecord } from './utils/storage'
import { QrCode, BarChart3, History, Settings } from 'lucide-react'

function App() {
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [currentView, setCurrentView] = useState('scanner') // 'scanner', 'history', 'generator', 'analytics'

  useEffect(() => {
    loadAttendanceHistory()
  }, [])

  const loadAttendanceHistory = async () => {
    try {
      const history = await getAttendanceHistory()
      setAttendanceRecords(history)
    } catch (error) {
      console.error('Error loading attendance history:', error)
    }
  }

  const handleQRScan = async (mssv) => {
    try {
      const record = {
        mssv,
        timestamp: new Date().toISOString(),
        id: Date.now().toString()
      }
      
      await saveAttendanceRecord(record)
      await loadAttendanceHistory()
      
      // Show success feedback
      alert(`Điểm danh thành công cho MSSV: ${mssv}`)
    } catch (error) {
      console.error('Error saving attendance:', error)
      alert('Lỗi khi lưu điểm danh')
    }
  }

  const exportToCSV = () => {
    if (attendanceRecords.length === 0) {
      alert('Không có dữ liệu để xuất')
      return
    }

    const csvContent = [
      'MSSV,Thời gian,Trạng thái',
      ...attendanceRecords.map(record => 
        `${record.mssv},${new Date(record.timestamp).toLocaleString('vi-VN')},Thành công`
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `attendance_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const resetAttendanceList = () => {
    if (confirm('Bạn có chắc muốn xóa tất cả lịch sử điểm danh?')) {
      localStorage.removeItem('attendance_records')
      setAttendanceRecords([])
      alert('Đã xóa tất cả lịch sử điểm danh')
    }
  }

  return (
    <div className="app">
      <div className="header">
        <h1>QR Attendance</h1>
        <p>Hệ thống điểm danh bằng QR Code</p>
      </div>

      <div className="controls">
        <button 
          className={`btn ${currentView === 'scanner' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setCurrentView('scanner')}
        >
          <QrCode size={18} />
          Quét QR
        </button>
        <button 
          className={`btn ${currentView === 'generator' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setCurrentView('generator')}
        >
          <Settings size={18} />
          Tạo QR
        </button>
        <button 
          className={`btn ${currentView === 'history' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setCurrentView('history')}
        >
          <History size={18} />
          Lịch sử ({attendanceRecords.length})
        </button>
        <button 
          className={`btn ${currentView === 'analytics' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setCurrentView('analytics')}
        >
          <BarChart3 size={18} />
          Analytics
        </button>
      </div>

      {currentView === 'scanner' && (
        <QRScanner onQRScan={handleQRScan} />
      )}
      
      {currentView === 'generator' && (
        <QRGenerator />
      )}
      
      {currentView === 'history' && (
        <AttendanceList 
          records={attendanceRecords}
          onExport={exportToCSV}
          onReset={resetAttendanceList}
        />
      )}
      
      {currentView === 'analytics' && (
        <AnalyticsDashboard records={attendanceRecords} />
      )}
    </div>
  )
}

export default App
