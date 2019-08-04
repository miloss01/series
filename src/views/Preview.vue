<template>
  <div class="preview">
    <ShowSeries />
    <ShowUsers />
    <ShowActors />
  </div>
</template>

<script>
import ShowUsers from '@/components/ShowUsers'
import ShowSeries from '@/components/ShowSeries'
import ShowActors from '@/components/ShowActors'

export default {
  name: 'Preview',
  components: {
    ShowUsers,
    ShowSeries,
    ShowActors
  },
  data () {
    return {
      
    }
  }
}
</script>

<style>

</style>
