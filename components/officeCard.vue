<template>
  <div class="container mt-2">
    <transition
      enter-active-class="transition-all duration-300 ease-linear"
      leave-active-class="transition-all duration-300 ease-linear"
      enter-class="opacity-0 h-0"
      enter-to-class="opacity-100 h-64"
      leave-class="opacity-100 h-64"
      leave-to-class="opacity-0 h-0"
    >
      <div v-if="!addition && !edition">
        <slot></slot>
        <div 
          @click.prevent="open=!open" 
          :class="colorClass"
          class="relative overflow-y-hidden rounded-lg w-full p-6 z-20 cursor-pointer shadow-lg"
        >
          <div class="text-white float-right pt-4">
            <svg 
              :class="open ? 'rotate-180': 'rotate-0'" 
              class="w-5 transition transform duration-500 ease-in-out" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div class="text-white text-xl font-bold pb-1">
            {{title}}
          </div>
          <div class="text-white text-sm font-normal">
            {{address}}
          </div>
        </div>
        <transition
          enter-active-class="transition-all duration-300 ease-linear"
          leave-active-class="transition-all duration-300 ease-linear"
          enter-class="h-0 -mt-12 opacity-50"
          enter-to-class="h-48 -mt-3 opacity-100"
          leave-class="h-48 -mt-3 opacity-100"
          leave-to-class="h-0 -mt-12 opacity-50"
        >
          <div 
            v-if="open" 
            class="relative overflow-y-hidden rounded-lg w-full p-6 bg-white z-10 shadow-lg"
          >
            <slot></slot>
            <div class="text-lg font-semibold pt-2">
              {{name}}
            </div>
            <div class="text-sm pt-2">
              {{job}}
            </div>
            <div
              class="text-sm pt-2"
              :class="'text-red-500'">
                {{email}}
            </div>
            <div class="text-sm pt-2 pb-2">
            {{ phone | VMask('(###) ###-####') }}
            </div>
            <hr class="border-black-500"/>
            <div class="text-sm text-center uppercase pt-2 pb-4">
              <div 
                @click="setEdit" 
                class="inline-flex float-left"
              >
                <div class="inline-flex text-gray-500 cursor-pointer">
                  <svg class="w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <span class="pl-3">Edit</span>
                </div>
              </div>
              <div 
                @click="remove" 
                class="inline-flex float-right"
              >
                <div class="inline-flex text-red-500 cursor-pointer">
                  <svg class="w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span class="pl-3">Delete</span>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>

    <div>
      <transition
        enter-active-class="transition-all duration-300 ease-linear"
        leave-active-class="transition-all duration-300 ease-linear"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="!open && addition" 
          @click.prevent="setAdd" 
          class="flex flex-row rounded-lg w-full p-6 pt-2 pb-2 bg-red-500 cursor-pointer z-10 shadow-lg"
        >
          <slot></slot>
          <div class="text-white">
            Add new location
          </div>
          <div class="text-white pt-1 ml-auto">
            <svg class="w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>
      </transition>
      <transition
        enter-active-class="transition-all duration-300 ease-linear"
        leave-active-class="transition-all duration-300 ease-linear"
        enter-class="h-0 mt-10 opacity-0"
        enter-to-class="h-64 -mt-0 opacity-100"
        leave-class="h-64 -mt-0 opacity-100"
        leave-to-class="h-0 mt-10 opacity-0"
      >
        <div
          v-if="edition || additionInternal" 
          class="rounded-lg w-full p-6 pt-2 pb-2 bg-white z-20 shadow-lg overflow-y-hidden"
        >
            <slot></slot>
            <div class="flex flex-row pb-6">
              <div class="text-sm font-bold">
                {{edition == true ? 'Edit' : 'New' }} location
              </div>
              <div 
                @click="closeDecision(true)"
                class="ml-auto pt-1 cursor-pointer"
              >
                <svg class="w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            <div class="flex flex-row pb-6">
              <form v-on:submit.prevent="submit">
                <div class="mb-4">
                  <select-color v-model="color"></select-color>
                </div>
                <div class="mb-4">
                  <label class="block text-sm mb-1">Title *</label>
                  <t-input
                    v-model="title"
                    type="text"
                    v-on:error="setError"
                    :required="true" 
                    class="w-full"
                  />
                </div>
                <div class="mb-4">
                  <label class="block text-sm mb-1">Enter the address *</label>
                  <t-input
                    v-model="address"
                    type="text"
                    v-on:error="setError"
                    :required="true" 
                    class="w-full"
                  />
                </div>
                <div class="mb-4">
                  <label class="block uppercase text-sm text-teal-500 mb-1">contact information</label>
                  <hr class="border-black-500"/>
                </div>
                <div class="mb-4">
                  <label class="block text-sm mb-1">Full name *</label>
                  <t-input
                    v-model="name"
                    type="text"
                    v-on:error="setError"
                    :required="true" 
                    class="w-full"
                  />
                </div>
                <div class="mb-4">
                  <label class="block text-sm mb-1">Job Position *</label>
                  <t-input
                    v-model="job"
                    type="text"
                    v-on:error="setError"
                    :required="true" 
                    class="w-full"
                  />
                </div>
                <div class="mb-4">
                  <label class="block text-sm mb-1">Email address *</label>
                  <t-input
                    v-model="email"
                    type="email"
                    v-on:error="setError"
                    :required="true" 
                    class="w-full"
                  />
                </div>
                <div class="mb-4">
                  <label class="block text-sm mb-1">Phone *</label>
                  <t-input
                    v-model="phone"
                    type="phone"
                    v-on:error="setError"
                    :required="true" 
                    v-mask="'(###) ###-####'"
                    class="w-full"
                  />
                </div>
                <div class="mb-4">
                  <button 
                    :disabled="error > 0"
                    :class="error > 0 ? 'cursor-not-allowed bg-gray-400': 'bg-blue-500 hover:bg-blue-700'"
                    class="text-white py-2 px-4 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import { VueMaskDirective, VueMaskFilter } from 'v-mask'
  import SelectColor from "./selectColor"
  import TInput from "./tInput"
  export default {
    directives: {'mask': VueMaskDirective},
    filters: {'VMask': VueMaskFilter},
    components: {
      TInput,
      SelectColor
    },
    props: [
      'content', 'addition'
    ],
    data: function () {
      return {
        open: false,
        edition: false,
        additionInternal: false,
        index: '',
        color: 0,
        title: '', 
        address: '', 
        name: '', 
        job: '', 
        email: '', 
        phone: '',
        error: 0
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.get()
      })
    },
    computed: {
      colorClass: function () {
          switch (this.color){
              case 0: return 'bg-orange-400'
              case 1: return 'bg-red-500'
              case 2: return 'bg-teal-500'
              case 3: return 'bg-gray-500'
              case 4: return 'bg-gray-800'
          }
      }
    },
    methods: {
      setError (error) {
        error ? this.error++ : this.error--
      },
      setAdd () {
        this.open = !this.open
        this.additionInternal = true
      },
      setEdit () {
        this.edition = true
      },
      get () {
        if (this.content) {
          Object.keys(this.content).forEach(k => {
            this[k] = this.content[k]
          })
        }
      },
      submit () {
        if (this.error > 0) return
        if (this.edition) {
          this.$store.commit('edit', {
            'index': this.index,
            'color': this.color,
            'title': this.title,
            'address': this.address,
            'name': this.name,
            'job': this.job,
            'email': this.email,
            'phone': this.phone
          })
        } else {
          this.$store.commit('add', {
            'color': this.color,
            'title': this.title,
            'address': this.address,
            'name': this.name,
            'job': this.job,
            'email': this.email,
            'phone': this.phone
          })
        }
        this.closeDecision()
      },
      remove () {
        this.$store.commit('remove', this.index)
      },
      clear () {
        this.index = '',
        this.color = 0,
        this.title = '', 
        this.address = '', 
        this.name = '', 
        this.job = '', 
        this.email = '', 
        this.phone = '',
        this.error = 0
      },
      closeDecision (reset=false) {
        this.open = false
        this.additionInternal = false
        if (this.edition === true) {
          this.edition = false 
          reset ? this.get() : null;
        } else {
            this.clear()
        }
      }
    }
  }
</script>