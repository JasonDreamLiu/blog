<template>
  <Bookmarks />
</template>

<script>
const Bookmarks = () => import(/* webpackChunkName: "Bookmarks" */ '@/components/Bookmarks/Index');
export default {
  name: "Index",
  components: {
    Bookmarks
  }
}
</script>

<style scoped>

</style>