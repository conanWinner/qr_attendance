import React, { useState, useRef } from 'react'
import QRCode from 'qrcode'
import { Download, Share2, Copy, QrCode } from 'lucide-react'

const QRGenerator = () => {
  const [mssv, setMssv] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const canvasRef = useRef(null)

  const generateQR = async () => {
    if (!mssv.trim()) {
      alert('Vui lòng nhập MSSV')
      return
    }

    setIsGenerating(true)
    try {
      const qrText = `ATTEND:${mssv.trim()}`
      const url = await QRCode.toDataURL(qrText, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
      setQrCodeUrl(url)
    } catch (error) {
      console.error('Error generating QR:', error)
      alert('Lỗi khi tạo QR code')
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadQR = () => {
    if (!qrCodeUrl) return
    
    const link = document.createElement('a')
    link.download = `qr-attendance-${mssv}.png`
    link.href = qrCodeUrl
    link.click()
  }

  const copyQRText = () => {
    const qrText = `ATTEND:${mssv}`
    navigator.clipboard.writeText(qrText)
    alert('Đã copy text QR code!')
  }

  const shareQR = async () => {
    if (!qrCodeUrl) return
    
    if (navigator.share) {
      try {
        const response = await fetch(qrCodeUrl)
        const blob = await response.blob()
        const file = new File([blob], `qr-${mssv}.png`, { type: blob.type })
        
        await navigator.share({
          title: `QR Code điểm danh - ${mssv}`,
          text: `Mã QR điểm danh cho MSSV: ${mssv}`,
          files: [file]
        })
      } catch (error) {
        console.error('Error sharing:', error)
        downloadQR()
      }
    } else {
      downloadQR()
    }
  }

  return (
    <div className="qr-generator-container">
      <div className="generator-card">
        <div className="card-header">
          <QrCode className="icon" />
          <h2>QR Code Generator</h2>
          <p>Tạo mã QR cho điểm danh</p>
        </div>

        <div className="generator-form">
          <div className="input-group">
            <label htmlFor="mssv">MSSV</label>
            <input
              id="mssv"
              type="text"
              value={mssv}
              onChange={(e) => setMssv(e.target.value)}
              placeholder="Nhập MSSV (ví dụ: 20123456)"
              className="mssv-input"
            />
          </div>

          <button 
            className="generate-btn"
            onClick={generateQR}
            disabled={isGenerating || !mssv.trim()}
          >
            {isGenerating ? (
              <div className="spinner"></div>
            ) : (
              <>
                <QrCode size={20} />
                Tạo QR Code
              </>
            )}
          </button>
        </div>

        {qrCodeUrl && (
          <div className="qr-result">
            <div className="qr-display">
              <img src={qrCodeUrl} alt="QR Code" />
              <div className="qr-overlay">
                <div className="qr-text">ATTEND:{mssv}</div>
              </div>
            </div>

            <div className="qr-actions">
              <button className="action-btn primary" onClick={downloadQR}>
                <Download size={18} />
                Tải xuống
              </button>
              <button className="action-btn secondary" onClick={copyQRText}>
                <Copy size={18} />
                Copy Text
              </button>
              <button className="action-btn tertiary" onClick={shareQR}>
                <Share2 size={18} />
                Chia sẻ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default QRGenerator
