<template>
    <div class="max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center mb-4 text-gray-800">Онлайн Чат</h2>

        <div ref="chatContainer" class="h-80 overflow-y-auto mb-4 p-3 bg-white rounded-md shadow-inner">
            <div v-for="(msg, index) in messages" :key="index" class="mb-3 p-2 rounded-md"
                :class="msg.sender === username ? 'bg-blue-100 text-right ml-10' : 'bg-gray-100 mr-10'">
                <strong class="text-gray-700">{{ msg.sender }}:</strong>
                <p class="text-gray-800">{{ msg.text }}</p>
                <span class="text-xs text-gray-500 block mt-1">
                    {{ msg.timestamp }}
                </span>
            </div>
        </div>

        <div class="flex gap-2 mb-4">
            <input v-model="messageInput" @keyup.enter="sendMessage" placeholder="Введите сообщение..."
                class="flex-1 text-black p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button @click="sendMessage"
                class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Отправить
            </button>
        </div>

        <div>
            <input v-model="username" placeholder="Ваше имя"
                class="text-black w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { io } from 'socket.io-client'

// Состояние компонента
const messages = ref([])
const messageInput = ref('')
const username = ref('Аноним')
const chatContainer = ref(null)
const socket = io('http://localhost:3000')

const sendMessage = () => {
    if (!messageInput.value.trim()) return

    const messageData = {
        sender: username.value,
        text: messageInput.value,
        timestamp: new Date().toLocaleTimeString()
    }

    socket.emit('message', messageData)
    messageInput.value = ''
}

const scrollToBottom = () => {
    nextTick(() => {
        if (chatContainer.value) {
            chatContainer.value.scrollTop = chatContainer.value.scrollHeight
        }
    })
}

onMounted(() => {
    socket.on('message', (data) => {
        messages.value.push(data)
        scrollToBottom()
    })
})

onUnmounted(() => {
    socket.disconnect()
})
</script>