<template>
  <div>
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      editable
      @edit="handleTabsEdit"
      :before-leave="beforeLeave"
      @tab-remove="tabRemove"
    >
      <el-tab-pane
        :key="item.name"
        v-for="(item, index) in editableTabs"
        :label="item.title"
        :name="item.name"
        :closable="clsBoolean"
      >
        <my-table ref="child"></my-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import myTable from "./components/my-table.vue";
export default {
  components: { myTable },
  name: "",
  computed: {},
  data() {
    return {
      editableTabsValue: "2",
      editableTabs: [
        {
          title: "Tab 1",
          name: "1",
          content: "Tab 1 content",
        },
        {
          title: "Tab 2",
          name: "2",
          content: "Tab 2 content",
        },
      ],
      tabIndex: 2,
    };
  },
  methods: {
    handleTabsEdit(targetName, action) {
      if (action === "add") {
        this.$prompt("请输入tab名称", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(({ value }) => {
            let newTabName = ++this.tabIndex + "";
            this.editableTabs.push({
              title: value,
              name: newTabName,
              content: "New Tab content",
            });
            this.editableTabsValue = newTabName;
            this.$message({
              type: "success",
              message: "创建成功",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消输入",
            });
          });
      }
      if (action === "remove") {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
      }
    },
    beforeLeave(newTab, oldTab) {
      if (this.$refs.child[0].forms.tableData.length > 0) {
        this.$notify({
          title: "警告",
          message: "这是一条警告的提示消息",
          type: "warning",
        });
      }
    },
    tabRemove() {
      if (this.$refs.child[0].forms.tableData.length > 0) {
        this.$notify({
          title: "警告",
          message: "这是一条警告的提示消息",
          type: "warning",
        });
      }
      // this.clickHandle();
    },
    clickHandle() {
      // 获取子组件的 state
      console.log(
        "this is child state: ",
        this.$refs.child[0].forms.tableData.length
      );
      // 获取子组件的方法
      // this.refs.child.say();
    },
    clsBoolean() {
      return !this.$refs.child[0].forms.tableData.length > 0;
    },
  },
};
</script>
<style scoped>
.formData {
  padding: 20px;
}
.el-form-item {
  margin-bottom: 0;
}
.demo-ruleForm {
  margin: 20px 0;
}
</style>
