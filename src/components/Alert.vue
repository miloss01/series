<template>
  <div class="alert">
    <v-alert outline color="white" dismissible :value="true" @input="onClose">
      {{ text }}
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: ['text'],
  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}
</script>