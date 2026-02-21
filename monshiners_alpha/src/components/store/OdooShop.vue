<template>
  <section class="odoo-shop">
    <v-alert
      v-if="error"
      border="left"
      colored-border
      type="warning"
      elevation="2"
      class="mb-4"
    >
      {{ error }}
    </v-alert>

    <div class="d-flex justify-center mb-4" v-if="isLoading">
      <v-progress-circular color="darkgreen" indeterminate size="42" />
    </div>

    <v-row v-if="products.length" dense>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="odoo-shop__card" outlined>
          <v-img
            v-if="product.image"
            :src="product.image"
            :alt="product.name"
            class="odoo-shop__image"
            height="220"
          />

          <v-card-title class="text-subtitle-1 font-weight-bold">
            {{ product.name }}
          </v-card-title>

          <v-card-subtitle v-if="product.price">
            {{ product.price }}
          </v-card-subtitle>

          <v-card-text
            v-if="product.description"
            class="odoo-shop__description"
            v-html="product.description"
          />

          <v-card-actions>
            <v-btn
              color="darkgreen"
              text
              :href="product.url || shopUrl"
              rel="noopener noreferrer"
              target="_blank"
            >
              Zum Produkt
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-4" v-if="!products.length && !isLoading">
      <v-btn
        color="darkgreen"
        dark
        elevation="0"
        :href="shopUrl"
        rel="noopener noreferrer"
        target="_blank"
      >
        Webshop öffnen
      </v-btn>
    </v-row>
  </section>
</template>

<script>
export default {
  name: 'OdooShop',
  props: {
    src: {
      type: String,
      default: 'https://www.monshiners.at/shop'
    },
    apiUrl: {
      type: String,
      default: ''
    },
    apiToken: {
      type: String,
      default: ''
    },
    maxProducts: {
      type: Number,
      default: 6
    }
  },
  data: () => ({
    isLoading: true,
    products: [],
    error: ''
  }),
  computed: {
    shopUrl() {
      return this.src
    },
    endpoint() {
      return this.apiUrl || process.env.VUE_APP_ODOO_API_URL || ''
    },
    token() {
      return this.apiToken || process.env.VUE_APP_ODOO_API_TOKEN || ''
    }
  },
  async created() {
    await this.loadProducts()
  },
  methods: {
    async loadProducts() {
      if (!this.endpoint) {
        this.isLoading = false
        this.error = 'Kein Odoo-API-Endpunkt konfiguriert. Bitte VUE_APP_ODOO_API_URL setzen.'
        return
      }

      try {
        const headers = {
          Accept: 'application/json'
        }

        if (this.token) {
          headers.Authorization = `Bearer ${this.token}`
        }

        const response = await fetch(this.endpoint, {headers})

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const payload = await response.json()
        this.products = this.normalizeProducts(payload).slice(0, this.maxProducts)
      } catch (e) {
        this.error = 'Produkte konnten nicht aus der Odoo API geladen werden.'
        this.products = []
        // eslint-disable-next-line no-console
        console.error(e)
      } finally {
        this.isLoading = false
      }
    },
    normalizeProducts(payload) {
      const collection = Array.isArray(payload)
        ? payload
        : payload.results || payload.data || []

      return collection.map(item => ({
        id: item.id,
        name: item.name || item.display_name || 'Produkt',
        price: item.price_formatted || item.list_price_formatted || item.price || '',
        description: item.description_sale || item.description || '',
        image: item.image_url || item.image || '',
        url: item.website_url
          ? `${this.shopUrl.replace(/\/$/, '')}${item.website_url}`
          : ''
      }))
    }
  }
}
</script>

<style scoped>
.odoo-shop {
  width: 100%;
}

.odoo-shop__card {
  height: 100%;
}

.odoo-shop__image {
  background: #f6f6f6;
}

.odoo-shop__description {
  max-height: 140px;
  overflow: auto;
}
</style>
