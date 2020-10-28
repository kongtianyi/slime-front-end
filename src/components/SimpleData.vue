<template>
    <div id="components-form-demo-advanced-search">
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
            <a-row :gutter="24">
                <a-col v-for="i in 6" :key="i" :span="6" :style="none">
                    <a-form-item :label="`Field ${i}`">
                        <a-input v-decorator="[
                `field-${i}`,
                {
                  rules: [
                    {
                      required: false,
                      message: '输入你的梦想',
                    },
                  ],
                },
              ]"
                            placeholder="你来了" />
                    </a-form-item>
                </a-col>
                <a-col :span="6" :style="none">
                    <a-form-item :label="`选择`">
                        <a-select mode="multiple" show-search :filter-option="filterOption" style="width: 100%"
                            placeholder="Please select" :span="6" @change="handleChange">
                            <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
                                {{ (i + 9).toString(36) + i }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6" :style="none">
                    <a-form-item :label="`时间`">
                        <a-date-picker format="YYYY-MM-DD HH:mm:ss" show-time />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="24" :style="{ textAlign: 'right' }">
                    <a-button type="primary" html-type="submit">
                        Search
                    </a-button>
                    <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                        Clear
                    </a-button>
                </a-col>
            </a-row>
        </a-form>
        <div class="search-result-list">
            <a-table :columns="columns" :data-source="data">
                <a slot="name" slot-scope="text">{{ text }}</a>
                <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
                <span slot="tags" slot-scope="tags">
                  <a-tag
                    v-for="tag in tags"
                    :key="tag"
                    :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
                  >
                    {{ tag.toUpperCase() }}
                  </a-tag>
                </span>
                <span slot="action" slot-scope="text, record">
                  <a>Invite 一 {{ record.name }}</a>
                  <a-divider type="vertical" />
                  <a>Delete</a>
                  <a-divider type="vertical" />
                  <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
                </span>
              </a-table>
        </div>
    </div>
</template>
<script>
    const columns = [
      {
        dataIndex: 'name',
        key: 'name',
        slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'name' },
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        scopedSlots: { customRender: 'tags' },
      },
      {
        title: 'Action',
        key: 'action',
        scopedSlots: { customRender: 'action' },
      },
    ];
    
    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      },
    ];
    
    export default {
        data() {
            return {
                expand: false,
                form: this.$form.createForm(this, {
                    name: 'advanced_search'
                }),
                data,
                columns,
            };
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

    #components-form-demo-advanced-search .ant-form {
        max-width: none;
    }

    #components-form-demo-advanced-search .search-result-list {
        margin-top: 16px;
        border: 1px dashed #e9e9e9;
        border-radius: 6px;
        background-color: #fafafa;
        min-height: 200px;
        text-align: center;
        padding-top: 80px;
    }
</style>
