<template>
  <div>
      <Category />
  </div>
</template>

<script>
export default {
auth: false,
 components: {
    Category: () => import('~/components/Category.vue'),
  },
}
</script>

<style>

</style>