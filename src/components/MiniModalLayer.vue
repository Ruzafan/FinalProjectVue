<template>
    <div class="mini_modal">
        <div class="mini_modal__overlay"></div>
        <div class="mini_modal__content">
            <div class="mini_modal__header">
                <slot name="header"></slot>
                <button class="mini_modal__close" @click="$emit('close-modal')">
                    <img src="../assets/close-button.svg" alt="Close">
                </button>
            </div>
            <div class="mini_modal__body">
                <slot name="body"></slot>
            </div>
        </div>
    </div>
</template>
<style scoped>
.mini_modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
}

.mini_modal__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.mini_modal__content {
    position: absolute;
    top: 50%;
    left: 50%;
    width:50%;
    max-width: 500px;
    max-height: 300px;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 4px;
    padding: 30px;
}

.mini_modal__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    position: relative;
}

.mini_modal__close {
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
}

.mini_modal__close img {
    width: 20px;
}
</style>  