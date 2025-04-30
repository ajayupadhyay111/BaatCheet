import Notification from '../models/notification.js'

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id

    const notifications = await Notification.find({ recipient: userId })
      .populate('sender', 'username avatar') // Get sender details
      .populate('post', 'text image') // Get post details if any
      .sort({ createdAt: -1 }) // Newest notifications first

    res.status(200).json(notifications)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notifications', error: err.message })
  }
}
