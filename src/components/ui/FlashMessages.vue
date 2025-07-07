<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faExclamationTriangle, faCheckCircle, faTimesCircle, faInfoCircle, faX } from '@fortawesome/pro-regular-svg-icons';
import { flashStore } from '../../store/flashStore';


const messages = flashStore.messages;

function remove(id) {
  flashStore.removeMessage(id);
}

function typeClass(type) {
  switch (type) {
    case 'success':
      return 'bg-green-100';
    case 'error':
      return 'bg-red-100';
    case 'warning':
      return 'bg-yellow-100';
    default:
      return 'bg-blue-100';
  }
}

function textClass(type) {
  switch (type) {
    case 'success':
      return 'text-green-800';
    case 'error':
      return 'text-red-800';
    case 'warning':
      return 'text-yellow-800';
    default:
      return 'text-blue-800';
  }
}

function subTextClass(type) {
  switch (type) {
    case 'success':
      return 'text-green-700';
    case 'error':
      return 'text-red-700';
    case 'warning':
      return 'text-yellow-700';
    default:
      return 'text-blue-700';
  }
}
</script>
<template>
  <div class="flex flex-col space-y-2">
    <transition-group
      name="fade"
      tag="div"
      class="flex flex-col space-y-2"
      enter-active-class="transition-all duration-600 ease-in-out"
      leave-active-class="transition-all duration-600 ease-in-out"
    >
      <div
        v-for="msg in messages"
        :key="msg.id"
        :class="[
          'rounded-lg flex items-center space-x-3 overflow-hidden w-full pr-2',
          typeClass(msg.type)
        ]"
        class="fade"
      >
        <div class="ml-3">
          <FontAwesomeIcon
            v-if="msg.type === 'warning'"
            :icon="faExclamationTriangle"
            class="text-yellow-600"
            aria-hidden="true"
            size="lg"
          />
          <FontAwesomeIcon
            v-if="msg.type === 'success'"
            :icon="faCheckCircle"
            class="text-green-600"
            aria-hidden="true"
            size="lg"
          />
          <FontAwesomeIcon
            v-if="msg.type === 'error'"
            :icon="faTimesCircle"
            class="text-red-600"
            aria-hidden="true"
            size="lg"
          />
          <FontAwesomeIcon
            v-if="msg.type === 'info'"
            :icon="faInfoCircle"
            class="text-blue-600"
            aria-hidden="true"
            size="lg"
          />
        </div>
        <div class="w-full">
          <h3 class="text-md font-medium" :class="textClass(msg.type)">{{ msg.title }}</h3>
          <div class="my-2 text-md" :class="subTextClass(msg.type)">
            <p>{{ msg.message }}</p>
          </div>
        </div>
        <div 
          @click="remove(msg.id)"
          class="px-2.5 rounded-lg text-gray-800 hover:text-gray-900 focus:outline-none"
        >
        <FontAwesomeIcon
            :icon="faX"
            class="text-white-900"
            aria-hidden="true"
            size="sm"
          />
      </div>
      </div>
    </transition-group>
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  max-height: 0;
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  max-height: 100px;
  opacity: 1;
}
</style>
