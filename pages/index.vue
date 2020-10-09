<template>
    <div class="container mx-auto">
      <div v-if='loaded' class="h-auto w-64 m-5">
          <office-card :addition="true"></office-card>
          <div v-for="k in Object.keys($store.state.listElements)" :key="k">
            <office-card v-if="$store.state.listElements[k].title" :content="$store.state.listElements[k]"></office-card>
          </div>
      </div>
    </div>
</template>

<script>
  import OfficeCard from '../components/officeCard.vue'

  export default {      
    components: {
        OfficeCard
    },
    data: function () {
      return {
        title: 'Offices',
        loaded: false
      }
    },
    head: function () {
      return {
        title: this.title,
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          {
            hid: 'description',
            name: 'description',
            content: 'My custom description'
          }
        ]
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.loaded = true
      })
    }
  }
</script>