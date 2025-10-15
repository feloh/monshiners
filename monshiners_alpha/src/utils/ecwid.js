const isBrowser = typeof window !== 'undefined'

const loadEcwidScript = storeId => {
  if (!isBrowser) {
    return Promise.resolve()
  }

  if (window.Ecwid) {
    return Promise.resolve(window.Ecwid)
  }

  const existingScript = document.querySelector(`script[data-ecwid-store="${storeId}"]`)
  if (existingScript) {
    return new Promise(resolve => {
      existingScript.addEventListener('load', () => resolve(window.Ecwid))
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `https://app.ecwid.com/script.js?${storeId}`
    script.async = true
    script.defer = true
    script.dataset.ecwidStore = String(storeId)
    script.onload = () => resolve(window.Ecwid)
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export default class Ecommerce {
  constructor({ storeId, storeLocationPath }) {
    this.storeId = storeId
    this.storeLocationPath = storeLocationPath || '/'
    this.ready = loadEcwidScript(storeId).catch(() => undefined)
  }

  cart = {
    get: async () => {
      if (!isBrowser) {
        return { productsQuantity: 0 }
      }

      const ecwid = await this.ready
      if (ecwid && ecwid.Cart && typeof ecwid.Cart.get === 'function') {
        return new Promise(resolve => {
          try {
            ecwid.Cart.get(cart => {
              if (!cart) {
                resolve({ productsQuantity: 0 })
                return
              }
              resolve({ productsQuantity: cart.itemsQuantity ?? 0 })
            })
          } catch (error) {
            resolve({ productsQuantity: 0 })
          }
        })
      }

      return { productsQuantity: 0 }
    },
    goToCheckout: () => {
      if (isBrowser) {
        if (window.Ecwid && window.Ecwid.openPage) {
          window.Ecwid.openPage('cart')
          return
        }

        window.location.href = this.storeLocationPath
      }
    }
  }
}
