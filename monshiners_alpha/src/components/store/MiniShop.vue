<template>
  <div class="mini-shop">
    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        md="4"
      >
        <v-card class="fill-height" outlined>
          <v-img
            :src="product.image"
            :alt="product.name"
            height="180"
            class="grey lighten-3"
          />
          <v-card-title class="text-body-1 font-weight-bold">{{ product.name }}</v-card-title>
          <v-card-text>
            <div class="text-body-2 mb-3">{{ product.description }}</div>
            <div class="text-h6">{{ formatPrice(product.priceCents) }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="addToCart(product)">
              In den Warenkorb
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="my-6" />

    <div class="d-flex justify-space-between align-center mb-3">
      <h3 class="text-h5 mb-0">Warenkorb</h3>
      <v-btn text color="error" :disabled="!cartItems.length" @click="clearCart">Leeren</v-btn>
    </div>

    <v-simple-table v-if="cartItems.length">
      <thead>
        <tr>
          <th>Produkt</th>
          <th class="text-right">Menge</th>
          <th class="text-right">Preis</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartItems" :key="item.id">
          <td>{{ item.name }}</td>
          <td class="text-right">
            <v-btn icon x-small @click="decreaseItem(item)"><v-icon small>mdi-minus</v-icon></v-btn>
            <span class="mx-1">{{ item.quantity }}</span>
            <v-btn icon x-small @click="addToCart(item)"><v-icon small>mdi-plus</v-icon></v-btn>
          </td>
          <td class="text-right">{{ formatPrice(item.priceCents * item.quantity) }}</td>
        </tr>
      </tbody>
    </v-simple-table>

    <v-alert v-else dense text type="info" class="mb-0">
      Dein Warenkorb ist leer.
    </v-alert>

    <div class="d-flex justify-end text-h6 mt-4 mb-6">
      Gesamt: {{ formatPrice(totalCents) }}
    </div>

    <v-card outlined>
      <v-card-title>Zahlung</v-card-title>
      <v-card-text>
        <v-radio-group v-model="paymentMethod" row>
          <v-radio label="SumUp" value="sumup" />
          <v-radio label="PayPal" value="paypal" />
        </v-radio-group>

        <v-alert v-if="errorMessage" dense type="error" class="mb-4">
          {{ errorMessage }}
        </v-alert>

        <div v-show="paymentMethod === 'sumup'">
          <v-btn
            color="primary"
            :disabled="!cartItems.length || loading"
            :loading="loading"
            class="mb-4"
            @click="startSumUpCheckout"
          >
            Mit SumUp bezahlen
          </v-btn>
          <div ref="sumupContainer"></div>
        </div>

        <div v-show="paymentMethod === 'paypal'">
          <div ref="paypalButtons"></div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {createSumUpCheckout} from '@/utils/sumupCheckout'

const SUMUP_SDK = 'https://gateway.sumup.com/gateway/ecom/card/v2/sdk.js'
const PAYPAL_SDK_BASE = 'https://www.paypal.com/sdk/js'

function loadScript(src, id) {
  return new Promise((resolve, reject) => {
    if (id && document.getElementById(id)) {
      resolve()
      return
    }

    const script = document.createElement('script')
    if (id) script.id = id
    script.src = src
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Script konnte nicht geladen werden: ${src}`))
    document.head.appendChild(script)
  })
}

export default {
  name: 'MiniShop',
  props: {
    catalog: {
      type: Array,
      default: () => ([
        {
          id: 'apfelbrand',
          name: 'Monshiners Apfelbrand',
          description: 'Fruchtig, mild und in Kleinserie hergestellt.',
          image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
          priceCents: 1890,
        },
        {
          id: 'birnenbrand',
          name: 'Monshiners Birnenbrand',
          description: 'Kräftiger Charakter mit klarer Birnennote.',
          image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80',
          priceCents: 1990,
        },
        {
          id: 'probierpaket',
          name: 'Probierpaket (3x200ml)',
          description: 'Drei Sorten im Set – ideal zum Verschenken.',
          image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&q=80',
          priceCents: 2990,
        },
      ]),
    },
  },
  data: () => ({
    paymentMethod: 'sumup',
    loading: false,
    errorMessage: '',
    cart: {},
    paypalRendered: false,
  }),
  computed: {
    products() {
      return this.catalog
    },
    cartItems() {
      return this.products
        .filter((product) => this.cart[product.id])
        .map((product) => ({ ...product, quantity: this.cart[product.id] }))
    },
    totalCents() {
      return this.cartItems.reduce((total, item) => total + item.priceCents * item.quantity, 0)
    },
    paypalClientId() {
      return process.env.VUE_APP_PAYPAL_CLIENT_ID
    },
    paypalCurrency() {
      return process.env.VUE_APP_PAYPAL_CURRENCY || 'EUR'
    },
  },
  watch: {
    paymentMethod(value) {
      if (value === 'paypal') {
        this.renderPayPalButtons()
      }
    },
  },
  mounted() {
    if (this.paymentMethod === 'paypal') {
      this.renderPayPalButtons()
    }
  },
  methods: {
    formatPrice(cents) {
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }).format(cents / 100)
    },
    addToCart(product) {
      this.$set(this.cart, product.id, (this.cart[product.id] || 0) + 1)
      this.errorMessage = ''
    },
    decreaseItem(product) {
      const next = (this.cart[product.id] || 0) - 1
      if (next <= 0) {
        this.$delete(this.cart, product.id)
        return
      }
      this.$set(this.cart, product.id, next)
    },
    clearCart() {
      this.cart = {}
      this.errorMessage = ''
    },
    async startSumUpCheckout() {
      if (!this.cartItems.length) return
      this.loading = true
      this.errorMessage = ''

      try {
        await loadScript(SUMUP_SDK, 'sumup-sdk')

        const checkoutId = await createSumUpCheckout({
          amount: this.totalCents / 100,
          currency: 'EUR',
          items: this.cartItems,
        })
        if (!window.SumUpCard || !checkoutId) {
          throw new Error('SumUp Checkout konnte nicht vorbereitet werden.')
        }

        this.$refs.sumupContainer.innerHTML = '<div id="sumup-card"></div>'
        window.SumUpCard.mount({
          id: 'sumup-card',
          checkoutId,
          showInstallments: false,
          onResponse: (type, body) => {
            if (type === 'success') {
              this.clearCart()
              this.$emit('payment-success', { provider: 'sumup', body })
            }
          },
        })
      } catch (error) {
        this.errorMessage = error.message || 'Fehler bei der SumUp-Zahlung.'
      } finally {
        this.loading = false
      }
    },
    async renderPayPalButtons() {
      if (this.paypalRendered) return
      if (!this.paypalClientId) {
        this.errorMessage = 'Bitte VUE_APP_PAYPAL_CLIENT_ID setzen, um PayPal zu aktivieren.'
        return
      }

      try {
        await loadScript(
          `${PAYPAL_SDK_BASE}?client-id=${this.paypalClientId}&currency=${this.paypalCurrency}&intent=capture`,
          'paypal-sdk'
        )

        if (!window.paypal || !this.$refs.paypalButtons) return

        window.paypal.Buttons({
          createOrder: async () => {
            const endpoint = process.env.VUE_APP_PAYPAL_CREATE_ORDER_ENDPOINT
            if (!endpoint) {
              throw new Error('Bitte VUE_APP_PAYPAL_CREATE_ORDER_ENDPOINT setzen.')
            }

            const response = await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                amount: this.totalCents / 100,
                currency: this.paypalCurrency,
                items: this.cartItems,
              }),
            })

            const payload = await response.json()
            return payload.orderId
          },
          onApprove: async (data) => {
            const endpoint = process.env.VUE_APP_PAYPAL_CAPTURE_ORDER_ENDPOINT
            if (!endpoint) {
              throw new Error('Bitte VUE_APP_PAYPAL_CAPTURE_ORDER_ENDPOINT setzen.')
            }

            await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ orderId: data.orderID }),
            })

            this.clearCart()
            this.$emit('payment-success', { provider: 'paypal', orderId: data.orderID })
          },
          onError: () => {
            this.errorMessage = 'PayPal-Zahlung fehlgeschlagen.'
          },
        }).render(this.$refs.paypalButtons)

        this.paypalRendered = true
      } catch (error) {
        this.errorMessage = error.message || 'PayPal konnte nicht initialisiert werden.'
      }
    },
  },
}
</script>

<style scoped>
.mini-shop {
  width: 100%;
}
</style>
