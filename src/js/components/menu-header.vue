<template>
  <nav class="header-options">
    <div :key="index" class="header-options-item" v-for="index in 4">
      <MenuHeaderBadge :index="index - 1"></MenuHeaderBadge>
      <MenuHeaderDropdown :index="index - 1"></MenuHeaderDropdown>
    </div>
  </nav>
</template>

<script>
export default {
	components : {
		MenuHeaderBadge: () => import('./menu-header-badge.vue'),
		MenuHeaderDropdown: () => import('./menu-header-dropdown.vue')
	},
}
</script>

<style lang="sass">
	
</style>