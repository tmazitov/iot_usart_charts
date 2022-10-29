<template>
    <div class="header">
        <div class="header__item"
        v-for="item,index in items"
        :key="`header_item_${index}`"
        @click="() => {goToPage(item.routeName)}"
        >
            {{item.title}}
        </div>
    </div>
</template>

<script>
import router from '../../router';

export default {
    name: 'Header',
    setup(){
        const items = [
            {
                title: "Moisture",
                routeName: 'moisture'
            }
        ]

        const goToPage = (routeName) => {
            router.push({name: routeName})
        } 

        return {items, goToPage}
    },
}
</script>

<style scoped>
.header {
    width: 100%;
    height: 70px;
    background: #3c6e71;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}

.header__item{
    cursor: pointer;
    height: 70px;
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.header__item:hover{
    background: #2b4e50;
}
</style>