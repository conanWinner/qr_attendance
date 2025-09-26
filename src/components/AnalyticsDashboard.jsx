import React, { useMemo } from 'react'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js'
import { TrendingUp, Users, Clock, Award, Calendar, Activity } from 'lucide-react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
)

const AnalyticsDashboard = ({ records }) => {
  const analytics = useMemo(() => {
    if (!records.length) return null

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Basic stats
    const totalScans = records.length
    const uniqueStudents = new Set(records.map(r => r.mssv)).size
    const todayScans = records.filter(r => new Date(r.timestamp) >= today).length
    const weekScans = records.filter(r => new Date(r.timestamp) >= weekAgo).length

    // Daily breakdown
    const dailyData = {}
    records.forEach(record => {
      const date = new Date(record.timestamp).toDateString()
      dailyData[date] = (dailyData[date] || 0) + 1
    })

    // Top students
    const studentCounts = {}
    records.forEach(record => {
      studentCounts[record.mssv] = (studentCounts[record.mssv] || 0) + 1
    })
    const topStudents = Object.entries(studentCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)

    // Hourly distribution
    const hourlyData = Array(24).fill(0)
    records.forEach(record => {
      const hour = new Date(record.timestamp).getHours()
      hourlyData[hour]++
    })

    return {
      totalScans,
      uniqueStudents,
      todayScans,
      weekScans,
      dailyData,
      topStudents,
      hourlyData
    }
  }, [records])

  if (!analytics) {
    return (
      <div className="analytics-empty">
        <Activity size={48} className="empty-icon" />
        <h3>Chưa có dữ liệu</h3>
        <p>Quét QR code để xem thống kê</p>
      </div>
    )
  }

  const dailyChartData = {
    labels: Object.keys(analytics.dailyData).slice(-7),
    datasets: [{
      label: 'Lần điểm danh',
      data: Object.values(analytics.dailyData).slice(-7),
      backgroundColor: 'rgba(102, 126, 234, 0.8)',
      borderColor: 'rgba(102, 126, 234, 1)',
      borderWidth: 2,
      borderRadius: 8,
      borderSkipped: false,
    }]
  }

  const hourlyChartData = {
    labels: Array.from({length: 24}, (_, i) => `${i}:00`),
    datasets: [{
      label: 'Điểm danh theo giờ',
      data: analytics.hourlyData,
      borderColor: 'rgba(118, 75, 162, 1)',
      backgroundColor: 'rgba(118, 75, 162, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
    }]
  }

  const topStudentsData = {
    labels: analytics.topStudents.map(([mssv]) => mssv),
    datasets: [{
      data: analytics.topStudents.map(([, count]) => count),
      backgroundColor: [
        '#667eea',
        '#764ba2',
        '#f093fb',
        '#f5576c',
        '#4facfe'
      ],
      borderWidth: 0,
    }]
  }

  return (
    <div className="analytics-dashboard">
      <div className="dashboard-header">
        <h2>📊 Analytics Dashboard</h2>
        <p>Thống kê chi tiết hệ thống điểm danh</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Activity size={24} />
          </div>
          <div className="stat-content">
            <h3>{analytics.totalScans}</h3>
            <p>Tổng lần quét</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>{analytics.uniqueStudents}</h3>
            <p>Sinh viên duy nhất</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <h3>{analytics.todayScans}</h3>
            <p>Hôm nay</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>{analytics.weekScans}</h3>
            <p>Tuần này</p>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>📈 Xu hướng 7 ngày gần đây</h3>
          <div className="chart-container">
            <Bar 
              data={dailyChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: 'white',
                    bodyColor: 'white'
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    ticks: { color: 'white' }
                  },
                  x: {
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    ticks: { color: 'white' }
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="chart-card">
          <h3>⏰ Phân bố theo giờ</h3>
          <div className="chart-container">
            <Line 
              data={hourlyChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: 'white',
                    bodyColor: 'white'
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    ticks: { color: 'white' }
                  },
                  x: {
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    ticks: { color: 'white' }
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="chart-card">
          <h3>🏆 Top sinh viên</h3>
          <div className="chart-container">
            <Doughnut 
              data={topStudentsData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: { color: 'white' }
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: 'white',
                    bodyColor: 'white'
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard
