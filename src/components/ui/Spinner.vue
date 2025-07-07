<script setup>
    import { faRotate } from '@fortawesome/pro-duotone-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>
<template>
    <div class="p-6">
        <FontAwesomeIcon :icon="faRotate" :spin="true" class="w-full h-full" />
    </div>
</template>
