import React, { useEffect, useRef, useState } from 'react'
import { BrowserMultiFormatReader } from '@zxing/library'

const QRScanner = ({ onQRScan }) => {
  const videoRef = useRef(null)
  const readerRef = useRef(null)
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    initializeScanner()
    return () => {
      stopScanning()
    }
  }, [])

  const initializeScanner = async () => {
    try {
      const reader = new BrowserMultiFormatReader()
      readerRef.current = reader
    } catch (err) {
      setError('Không thể khởi tạo QR scanner')
      console.error('Scanner initialization error:', err)
    }
  }

  const startScanning = async () => {
    if (!readerRef.current) {
      setError('Scanner chưa được khởi tạo')
      return
    }

    try {
      setIsScanning(true)
      setError(null)

      const result = await readerRef.current.decodeFromVideoDevice(
        undefined,
        videoRef.current,
        (result, error) => {
          if (result) {
            const text = result.getText()
            console.log('QR Code detected:', text)
            
            // Check if QR code format is correct (ATTEND:<MSSV>)
            if (text.startsWith('ATTEND:')) {
              const mssv = text.replace('ATTEND:', '')
              if (mssv.trim()) {
                onQRScan(mssv.trim())
                stopScanning()
              } else {
                setError('MSSV không hợp lệ')
              }
            } else {
              setError('QR Code không đúng định dạng. Vui lòng quét mã ATTEND:<MSSV>')
            }
          }
          if (error && error.name !== 'NotFoundException') {
            console.error('Scanning error:', error)
            setError('Lỗi khi quét QR code')
          }
        }
      )
    } catch (err) {
      console.error('Error starting scanner:', err)
      setError('Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập.')
      setIsScanning(false)
    }
  }

  const stopScanning = () => {
    if (readerRef.current) {
      readerRef.current.reset()
    }
    setIsScanning(false)
  }

  const handleStartStop = () => {
    if (isScanning) {
      stopScanning()
    } else {
      startScanning()
    }
  }

  return (
    <div className="scanner-container">
      <div className="scanner">
        <video 
          ref={videoRef}
          style={{ display: isScanning ? 'block' : 'none' }}
          autoPlay
          playsInline
          muted
        />
        {!isScanning && (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '100%',
            color: '#888'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
            <p>Nhấn "Bắt đầu quét" để bắt đầu</p>
          </div>
        )}
        {isScanning && (
          <div className="scanner-overlay"></div>
        )}
      </div>

      {error && (
        <div style={{ 
          color: '#ef4444', 
          textAlign: 'center', 
          margin: '1rem 0',
          padding: '0.5rem',
          background: '#1a1a1a',
          borderRadius: '4px',
          border: '1px solid #ef4444'
        }}>
          {error}
        </div>
      )}

      <div className="controls">
        <button 
          className={`btn ${isScanning ? 'btn-secondary' : 'btn-primary'}`}
          onClick={handleStartStop}
        >
          {isScanning ? 'Dừng quét' : 'Bắt đầu quét'}
        </button>
      </div>

      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        background: '#1a1a1a', 
        borderRadius: '8px',
        fontSize: '0.9rem',
        color: '#888'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#646cff' }}>Hướng dẫn:</h4>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', textAlign: 'left' }}>
          <li>QR Code phải có định dạng: <code>ATTEND:MSSV</code></li>
          <li>Ví dụ: <code>ATTEND:20123456</code></li>
          <li>Đảm bảo camera có quyền truy cập</li>
          <li>Giữ ổn định khi quét</li>
        </ul>
      </div>
    </div>
  )
}

export default QRScanner
