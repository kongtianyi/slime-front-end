<template>
    <a-config-provider :locale="locale">
        <div id="app">
            <simple-data></simple-data>
        </div>
    </a-config-provider>

</template>

<script>
    import SimpleData from './components/SimpleData.vue'
    import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';

    export default {
        name: 'App',
        components: {
            SimpleData
        },
        data() {
            return {
                locale: zh_CN,
            };
        },
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
