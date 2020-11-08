<template>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
        <a-layout-sider v-model="collapsed" collapsible>
            <div class="logo" />
            <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
                <a-sub-menu key="sub1">
                    <span slot="title">
                        <a-icon type="user" /><span>User</span></span>
                    <a-menu-item key="3">
                        Tom
                    </a-menu-item>
                    <a-menu-item key="4">
                        Bill
                    </a-menu-item>
                    <a-menu-item key="5">
                        Alex
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub2">
                    <span slot="title">
                        <a-icon type="team" /><span>Team</span></span>
                    <a-menu-item key="6">
                        Team 1
                    </a-menu-item>
                    <a-menu-item key="8">
                        Team 2
                    </a-menu-item>
                </a-sub-menu>
                <a-menu-item key="9">
                    <a-icon type="file" />
                    <span>File</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0" />
            <a-layout-content style="margin: 0 16px">
                <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
                    <a-row :gutter="24">
                        <a-col v-for="formElement in formMeta['formElements']" :key="formElement['id']" :span="6">
                            <a-form-item v-if="formElement['type'] == 'INPUT'" :label="formElement['label']">
                                <a-input v-decorator="[formElement['id'], ]" placeholder="" />
                            </a-form-item>
                            <a-form-item v-else-if="formElement['type'] == 'SELECT'" :label="formElement['label']">
                                <a-select v-decorator="[formElement['id'], ]" mode="multiple" show-search
                                    :filter-option="filterOption" style="width: 100%" placeholder="Please select" :span="6"
                                    @change="handleChange">
                                    <a-select-option v-for="option in formElement['options']" :key="option['id']">
                                        {{ option['value'] }}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                            <!--      <a-form-item v-else-if="formElement['type'] == 'DATE'" :label="`时间`">
                                <a-date-picker format="YYYY-MM-DD HH:mm:ss" show-time />
                            </a-form-item> -->
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="24" :style="{ textAlign: 'right' }">
                            <a-button type="primary" html-type="submit">
                                搜索
                            </a-button>
                            <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                                重置
                            </a-button>
                        </a-col>
                    </a-row>
                </a-form>
                <div class="search-result-list">
                    <a-table :columns="formMeta['cols']" :data-source="tableData">
                    </a-table>
                </div>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                Slime page ©2020 Created by KTY power by Ant Design.
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script>
    export default {
        data() {
            return {
                expand: false,
                form: this.$form.createForm(this, {

                }),
                collapsed: false,
                backEndDomain: "http://localhost",
                success: "00000",
                menu: {},
                formMeta: {},
                tableData: [],
            };
        },
        created() {
            this.getFormMeta();
            this.getTableData(1, 10);
            this.getMenu();
        },
        computed: {
            count() {
                return this.expand ? 11 : 7;
            },
        },
        updated() {
            console.log('updated');
        },
        methods: {
            handleSearch(e) {
                e.preventDefault();
                this.form.validateFields((error, values) => {
                    console.log('error', error);
                    console.log('Received values of form: ', values);
                });
                this.getTableData(1, 10);
            },
            handleReset() {
                this.form.resetFields();
            },
            handleChange(value) {
                console.log(`selected ${value}`);
            },
            filterOption(input, option) {
                return (
                    option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
            },
            getFormMeta() {
                this.$http.post(this.backEndDomain + '/page/getSimplePage', {
                    'title': window.location.pathname
                }).then(function(response) {
                    if (response == null || response["status"] !== 200) {
                        console.log("错误");
                        return;
                    }
                    let resBody = response["body"];
                    if (resBody["code"] !== this.success) {
                        console.log(resBody["desc"]);
                        return;
                    }
                    this.formMeta = resBody["data"];
                });
            },
            getTableData(page, size) {
                this.$http.post(this.backEndDomain + '/page/getSimplePageData', {
                    'title': window.location.pathname,
                    'params': this.form.getFieldsValue(),
                    'page': page,
                    'size': size
                }).then(function(response) {
                    console.log(response);
                    if (response == null || response["status"] !== 200) {
                        console.log("错误");
                        return;
                    }
                    let resBody = response["body"];
                    if (resBody["code"] !== this.success || resBody["data"] == null) {
                        console.log(resBody["desc"]);
                        return;
                    }
                    
                    this.tableData = resBody["data"]["data"];
                });
            },
            getMenu() {
                this.$http.post(this.backEndDomain + '/page/getMenu', {
                }).then(function(response) {
                    console.log(response);
                    if (response == null || response["status"] !== 200) {
                        console.log("错误");
                        return;
                    }
                    let resBody = response["body"];
                    if (resBody["code"] !== this.success || resBody["data"] == null) {
                        console.log(resBody["desc"]);
                        return;
                    }
                    
                    this.menu = resBody["data"];
                });
            },
        },
    };
</script>
<style>
    .ant-advanced-search-form {
        padding: 24px;
        background: #fbfbfb;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
    }

    .ant-advanced-search-form .ant-form-item {
        display: flex;
    }

    .ant-advanced-search-form .ant-form-item-control-wrapper {
        flex: 1;
    }

    #components-layout-demo-side .ant-form {
        max-width: none;
    }

    #components-layout-demo-side .search-result-list {
        margin-top: 16px;
        border: 1px dashed #e9e9e9;
        border-radius: 6px;
        background-color: #fafafa;
        min-height: 200px;
        text-align: center;
        padding-top: 80px;
    }

    #components-layout-demo-side .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
    }
</style>
