import React from 'react'

const AttendanceList = ({ records, onExport, onReset }) => {
  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const getTimeAgo = (timestamp) => {
    const now = new Date()
    const recordTime = new Date(timestamp)
    const diffMs = now - recordTime
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffDays > 0) return `${diffDays} ngày trước`
    if (diffHours > 0) return `${diffHours} giờ trước`
    if (diffMins > 0) return `${diffMins} phút trước`
    return 'Vừa xong'
  }

  return (
    <div className="attendance-list">
      <h2>Lịch sử điểm danh</h2>
      
      {records.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
          <p>Chưa có lịch sử điểm danh nào</p>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            Quét QR code để bắt đầu điểm danh
          </p>
        </div>
      ) : (
        <>
          <div className="export-controls">
            <button className="btn btn-primary" onClick={onExport}>
              Xuất CSV
            </button>
            <button className="btn btn-secondary" onClick={onReset}>
              Xóa tất cả
            </button>
          </div>

          <div style={{ marginTop: '1rem' }}>
            {records
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              .map((record) => (
                <div key={record.id} className="attendance-item">
                  <div className="attendance-info">
                    <h3>MSSV: {record.mssv}</h3>
                    <p>Thời gian: {formatDateTime(record.timestamp)}</p>
                    <p style={{ fontSize: '0.8rem', color: '#666' }}>
                      {getTimeAgo(record.timestamp)}
                    </p>
                  </div>
                  <div className="status status-success">
                    Thành công
                  </div>
                </div>
              ))}
          </div>

          <div style={{ 
            marginTop: '2rem', 
            padding: '1rem', 
            background: '#1a1a1a', 
            borderRadius: '8px',
            fontSize: '0.9rem',
            color: '#888'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#646cff' }}>Thống kê:</h4>
            <p style={{ margin: '0.25rem 0' }}>
              Tổng số lần điểm danh: <strong>{records.length}</strong>
            </p>
            <p style={{ margin: '0.25rem 0' }}>
              MSSV duy nhất: <strong>{new Set(records.map(r => r.mssv)).size}</strong>
            </p>
            <p style={{ margin: '0.25rem 0' }}>
              Lần cuối: <strong>{records.length > 0 ? getTimeAgo(records[0].timestamp) : 'Chưa có'}</strong>
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default AttendanceList
