'use server'

import webpush, { PushSubscription } from 'web-push'

webpush.setVapidDetails(
  'mailto:numdar.r2@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

// Store all subscriptions in an array (for demo; use a DB in production)
let subscriptions: PushSubscription[] = []

export async function subscribeUser(sub: PushSubscription) {
  // Avoid duplicate subscriptions
  if (!subscriptions.find(s => JSON.stringify(s) === JSON.stringify(sub))) {
    subscriptions.push(sub)
  }
  return { success: true }
}

export async function unsubscribeUser(sub?: PushSubscription) {
  if (sub) {
    subscriptions = subscriptions.filter(
      s => JSON.stringify(s) !== JSON.stringify(sub)
    )
  } else {
    subscriptions = []
  }
  return { success: true }
}

export async function sendNotification(message: string) {
  if (subscriptions.length === 0) {
    throw new Error('No subscriptions available')
  }

  const payload = JSON.stringify({
    title: 'Test Notification',
    body: message,
    icon: '/img/logo/erm.png',
  })

  // Send notification to all subscribers
  await Promise.all(
    subscriptions.map(sub =>
      webpush.sendNotification(sub, payload).catch(err => {
        // Optionally remove invalid subscriptions
        console.error('Push error:', err)
      })
    )
  )

  return { success: true }
}