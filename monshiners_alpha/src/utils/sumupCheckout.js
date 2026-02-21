function buildCheckoutPayload({ amount, currency, items, reference }) {
  return {
    amount,
    currency,
    checkout_reference: reference,
    description: `Monshiners Bestellung (${items.length} Positionen)`,
    merchant_code: process.env.VUE_APP_SUMUP_MERCHANT_CODE,
  }
}

async function requestCheckoutFromBackend(endpoint, payload) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('SumUp Checkout konnte über das Backend nicht erstellt werden.')
  }

  const data = await response.json()
  if (!data.checkoutId) {
    throw new Error('Backend-Antwort enthält keine checkoutId.')
  }

  return data.checkoutId
}

async function requestCheckoutDirectly(payload) {
  const accessToken = process.env.VUE_APP_SUMUP_ACCESS_TOKEN
  if (!accessToken) {
    throw new Error('VUE_APP_SUMUP_ACCESS_TOKEN fehlt für direkten SumUp API-Aufruf.')
  }

  const response = await fetch('https://api.sumup.com/v0.1/checkouts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Direkter SumUp API-Aufruf fehlgeschlagen.')
  }

  const data = await response.json()
  if (!data.id) {
    throw new Error('SumUp API-Antwort enthält keine Checkout-ID.')
  }

  return data.id
}

export async function createSumUpCheckout({ amount, currency, items }) {
  const checkoutIdFromEnv = process.env.VUE_APP_SUMUP_CHECKOUT_ID
  const endpoint = process.env.VUE_APP_SUMUP_CHECKOUT_ENDPOINT
  const reference = `order-${Date.now()}`

  if (checkoutIdFromEnv) {
    return checkoutIdFromEnv
  }

  const payload = buildCheckoutPayload({
    amount,
    currency,
    items,
    reference,
  })

  if (endpoint) {
    return requestCheckoutFromBackend(endpoint, {
      amount,
      currency,
      items,
      reference,
    })
  }

  return requestCheckoutDirectly(payload)
}
