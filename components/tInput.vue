<template>
<div>
  <label class="block text-sm mb-1">{{label}} {{required ? '*': ''}}</label>
  <input type="text" v-model="value" required class="outline-none appearance-none rounded w-full py-2 px-3 leading-tight border-2 border-black focus:border-teal-500">
  <p v-if="error" class="text-red-500 text-xs">{{error}}</p>
</div>
</template>
<script>
  export default {
    components: {},
    data: function(){
      return {
        open: false,
        edit: false
      }
    },
    props: ['label', 'required', 'value', 'error']
  }
</script>