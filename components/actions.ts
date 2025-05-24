'use server'

import webpush, { PushSubscription } from 'web-push'

webpush.setVapidDetails(
  'mailto:numdar.r2@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

// Store subscriptions by userId (for demo; use a DB in production)
let userSubscriptions: Record<string, PushSubscription[]> = {}

export async function subscribeUser(userId: string, sub: PushSubscription) {
  if (!userSubscriptions[userId]) {
    userSubscriptions[userId] = []
  }
  // Avoid duplicate subscriptions for the same user
  if (!userSubscriptions[userId].find(s => JSON.stringify(s) === JSON.stringify(sub))) {
    userSubscriptions[userId].push(sub)
  }
  return { success: true }
}

export async function unsubscribeUser(userId: string, sub?: PushSubscription) {
  if (userSubscriptions[userId]) {
    if (sub) {
      userSubscriptions[userId] = userSubscriptions[userId].filter(
        s => JSON.stringify(s) !== JSON.stringify(sub)
      )
    } else {
      userSubscriptions[userId] = []
    }
  }
  return { success: true }
}

// Send notification to a specific user
export async function sendNotificationToUser(userId: string, message: string) {
  const subs = userSubscriptions[userId] || []
  if (subs.length === 0) {
    throw new Error('No subscriptions available for this user')
  }

  const payload = JSON.stringify({
    title: 'Test Notification',
    body: message,
    icon: '/img/logo/erm.png',
  })

  await Promise.all(
    subs.map(sub =>
      webpush.sendNotification(sub, payload).catch(err => {
        console.error('Push error:', err)
      })
    )
  )

  return { success: true }
}