<template>
  <div>
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      editable
      @edit="handleTabsEdit"
      :before-leave="beforeLeave"
    >
      <el-tab-pane
        :key="item.name"
        v-for="(item, index) in editableTabs"
        :label="item.title"
        :name="item.name"
      >
        <my-table :ref="'child' + item.name"></my-table>
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
        },
        {
          title: "Tab 2",
          name: "2",
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
        if (
          eval("this.$refs.child" + targetName)[0].forms.tableData.length > 0
        ) {
          this.$notify({
            title: "警告",
            message: "这是一条警告的提示消息",
            type: "warning",
          });
        } else {
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

          console.log(this.editableTabsValue);
        }
      }
    },
    beforeLeave(newTab, oldTab) {},
  },
};
</script>
<style scoped></style>
