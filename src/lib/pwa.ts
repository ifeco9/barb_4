// Browser API type check
const isClient = typeof window !== 'undefined'

export const registerSW = async () => {
  if (!isClient || !('serviceWorker' in navigator)) {
    console.log('Service Worker not supported')
    return
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none'
    })

    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New update available
            console.log('New app version available. Please refresh.')
            if (confirm('New app version available. Refresh now?')) {
              window.location.reload()
            }
          }
        })
      }
    })

    console.log('Service Worker registered successfully')
    return registration
  } catch (error) {
    console.error('Service Worker registration failed:', error)
  }
}

export const unregisterSW = async () => {
  if (!isClient || !('serviceWorker' in navigator)) {
    return
  }

  try {
    const registration = await navigator.serviceWorker.ready
    await registration.unregister()
    console.log('Service Worker unregistered')
  } catch (error) {
    console.error('Service Worker unregistration failed:', error)
  }
}

// Push notification helpers
export const requestNotificationPermission = async () => {
  if (!isClient || !('Notification' in window)) {
    console.log('Notifications not supported')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission === 'denied') {
    return false
  }

  const permission = await Notification.requestPermission()
  return permission === 'granted'
}

export const subscribeToPushNotifications = async () => {
  if (!isClient || !('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.log('Push notifications not supported')
    return null
  }

  try {
    const registration = await navigator.serviceWorker.ready
    const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY

    if (!vapidPublicKey) {
      console.error('VAPID public key not configured')
      return null
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapidPublicKey
    })

    console.log('Push subscription successful')
    return subscription
  } catch (error) {
    console.error('Push subscription failed:', error)
    return null
  }
}

export const checkForUpdates = async () => {
  if (!isClient || !('serviceWorker' in navigator)) {
    return
  }

  try {
    const registration = await navigator.serviceWorker.ready
    await registration.update()
  } catch (error) {
    console.error('Update check failed:', error)
  }
}

// Install prompt helper
export const installPrompt = {
  deferredPrompt: null as any,
  
  initialize() {
    if (!isClient) return

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      this.deferredPrompt = e
      console.log('Install prompt available')
    })

    window.addEventListener('appinstalled', () => {
      console.log('App installed successfully')
      this.deferredPrompt = null
    })
  },

  async show() {
    if (!this.deferredPrompt) {
      console.log('Install prompt not available')
      return false
    }

    try {
      this.deferredPrompt.prompt()
      const { outcome } = await this.deferredPrompt.userChoice
      console.log('Install prompt outcome:', outcome)
      this.deferredPrompt = null
      return outcome === 'accepted'
    } catch (error) {
      console.error('Install prompt failed:', error)
      return false
    }
  },

  isAvailable() {
    return !!this.deferredPrompt
  }
}