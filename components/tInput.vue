<template>
  <div>
    <input 
      v-bind:type="type"
      v-bind:value="value"
      @input="$emit('input', $event.target.value)"
      @blur="validate"
      class="outline-none appearance-none rounded w-full py-2 px-3 leading-tight border-2 border-black focus:border-teal-500"
    >
    <p v-if="error == 1" class="text-red-500 text-xs">This field cannot be empty.</p>
    <p v-if="error == 2" class="text-red-500 text-xs">Invalid email!</p>
    <p v-if="error == 3" class="text-red-500 text-xs">Invalid phone!</p>
  </div>
</template>
<script>
  export default {
    data: function(){
      return {
        first: true,
        error: 0
      }
    },
    props:{
        type: {
          type: String,
          required: true,
          validator: (v) => ['text', 'number', 'email', 'phone'].indexOf(v) !== -1
        },
        value: String,
        required: Boolean
    },
    methods: {
      emitError (v){
        if(this.first){
          this.$emit('error', false)
          this.first = false
        }
        if (this.error > 0) {
          this.$emit('error', false)
        } else {
          this.$emit('error', true)
        }
        if (v > 0) {
            this.$emit('error', true)
        } else {
            this.$emit('error', false)
        }
        this.error = v
      },
      validate () {
        const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const validPhone = /^\([2-9]\d\d\) [2-9]\d\d-\d{4}$/
        if(this.value.length==0) {
          this.emitError(1)
        } else if(this.type == "email" && !validEmail.test(this.value.toLowerCase())){
          this.emitError(2)
        } else if(this.type == "phone" && !validPhone.test(this.value.toLowerCase())){
          this.emitError(3)
        }else{
          this.emitError(0)
        }
      }
    },
    mounted: function () {
      this.$emit('error', true)
    }
  }
</script>