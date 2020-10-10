<template>
    <div class="bg-white overflow-y-hidden">
        <div 
            @click="open=!open" 
            :class="colorClass"
            class="relative rounded-lg w-full z-20 cursor-pointer"
        >
            <div class="text-white float-right pt-10 pr-8 mt-1">
                <svg 
                    :class="open ? 'rotate-180': 'rotate-0'"
                    class="w-5 transition transform duration-500 ease-in-out" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            <div class="text-white font-medium p-10 text-center">
                Select Color
            </div>
        </div>
        <transition
            enter-active-class="transition-all duration-300 ease-linear"
            leave-active-class="transition-all duration-300 ease-linear"
            enter-class="h-0 opacity-0"
            enter-to-class="h-64 opacity-100"
            leave-class="h-64 opacity-100"
            leave-to-class="h-0 opacity-0"
        >
            <div
                v-if="open" 
                class="relative rounded-lg w-full mt-4"
            >
                <slot></slot>
                <div 
                    @click="select(0)"
                    class="flex rounded-lg w-full cursor-pointer bg-orange-400 h-24 mt-6"
                >
                    <div v-if="value==0" class="text-white m-auto">
                        <svg 
                            class="w-8" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                <div
                    @click="select(1)" 
                    class="flex rounded-lg w-full cursor-pointer bg-red-500 h-24 mt-4"
                >
                    <div v-if="value==1" class="text-white m-auto">
                        <svg 
                            class="w-8" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                <div 
                    @click="select(2)" 
                    class="flex rounded-lg w-full cursor-pointer bg-teal-500 h-24 mt-4"
                >
                    <div v-if="value==2" class="text-white m-auto">
                        <svg 
                            class="w-8" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                <div 
                    @click="select(3)" 
                    class="flex rounded-lg w-full cursor-pointer bg-gray-500 h-24 mt-4"
                >
                    <div v-if="value==3" class="text-white m-auto">
                        <svg 
                            class="w-8" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                <div
                    @click="select(4)" 
                    class="flex rounded-lg w-full cursor-pointer bg-gray-800 h-24 mt-4"
                >
                    <div v-if="value==4" class="text-white m-auto">
                        <svg 
                            class="w-8" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    props:{
        value: Number
    },
    data: function(){
        return {
            open: false
        }
    },
    methods: {
        select (op) {
            this.value = op
            this.$emit('input', op)
            this.open = !this.open
        }
    },
    computed: {
        colorClass: function () {
            switch (this.value){
                case 0: return 'bg-orange-400'
                case 1: return 'bg-red-500'
                case 2: return 'bg-teal-500'
                case 3: return 'bg-gray-500'
                case 4: return 'bg-gray-800'
            }
        }
    }
}
</script>