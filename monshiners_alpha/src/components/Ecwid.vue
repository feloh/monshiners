<template>
    <div :id="`my-store-${storeId}`"></div>
</template>

<script>
function injectEcwidScript(storeId, categoryId) {
  window.ec = window.ec || {};
  window.ec.config = window.ec.config || {};
  window.ec.config.baseUrl = '/store';
  window.ec.config.storefrontUrls = window.ec.config.storefrontUrls || {};
  window.ec.config.storefrontUrls.cleanUrls = true;

  const ecwidScript = document.createElement("script");
  ecwidScript.setAttribute("type", "text/javascript");
  ecwidScript.setAttribute("charset", "utf-8");
  ecwidScript.setAttribute("data-cfasync", "false");
  ecwidScript.setAttribute(
      "src",
      `https://app.ecwid.com/script.js?${storeId}&data_platform=code&data_date=2024-05-17`
  );
  ecwidScript.onload = () => {
    injectEcwidProductBrowser(storeId, categoryId);
  };

  document.head.appendChild(ecwidScript);
}
function injectEcwidProductBrowser(storeId) {
  window.xProductBrowser(
      "categoriesPerRow=3",
      "views=grid(20,3) list(60) table(60)",
      "categoryView=grid",
      "searchView=list",
      `id=my-store-${storeId}`
  );
}

export default {
  name: "Ecwid",
  props: {
    storeId: {
      type: Number,
      default: 74850001,
    },
    categoryId: {
      type: Number,
      default: 0,
    },
  },
  beforeRouteUpdate(to, from, next) {
    window.Ecwid.refreshConfig();
    const categoryId = parseInt(to.path.replace(/\/store\/\w+-c/, ''));
    if (!Number.isNaN(categoryId)) {
      window.Ecwid.openPage('category', { id: categoryId });
    } else {
      window.Ecwid.openPage('category', { id: 0 });
    }
    next();
  },
  mounted() {
    if (window.Ecwid === undefined) {
      injectEcwidScript(this.storeId, this.categoryId);
    }
  },
};
</script>

<style scoped>
</style>
