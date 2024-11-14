import axios from 'axios'

// Create an Axios instance
const expo_api = axios.create({
  baseURL: 'https://exp.host/--/api/v2/push',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer x5dq_rziHqvP_gO0RJG14Tp7fH5S4bROlSmsXNxK` // Replace YOUR_ACCESS_TOKEN with your actual access token
  }
})

async function sendPushNotification(body) {
  try {
    const response = await expo_api.post('/send', body)
    console.log('Push notification sent successfully:', response.data)
  } catch (error) {
    console.error('Error sending push notification:', error)
  }
}

export { expo_api, sendPushNotification }
