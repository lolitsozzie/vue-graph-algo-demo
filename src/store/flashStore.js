import { reactive } from 'vue';


export const flashStore = reactive({
  messages: [],

  addMessage(message, type = 'info', duration = 30000) {
    const id = Date.now();
    this.messages.push({ id, message, type, visible: true });

    if (duration > 0) {
      setTimeout(() => {
        this.removeMessage(id);
      }, duration);
    }
  },

  removeMessage(id) {
    const index = this.messages.findIndex((msg) => msg.id === id);
    if (index !== -1) {
      this.messages.splice(index, 1);
    }
  },
});
