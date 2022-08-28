<template>
  <div>
    <el-button @click="dialogFormVisible = true">编辑</el-button>
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
        <my-table-test
          :ref="'child' + item.name"
          :tableData1="tableData"
        ></my-table-test>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="editableTabs[editableTabsValue - 1]">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input
            v-model="editableTabs[editableTabsValue - 1].title"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MyTableTest from "./components/my-tableTest.vue";
import myTable from "./components/my-tableTest.vue";
import { getTreeData } from "./treeTransfer";
export default {
  components: { MyTableTest },
  name: "",
  computed: {},
  data() {
    return {
      formLabelWidth: "120px",
      dialogFormVisible: false,
      tableData: [],
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
  created() {
    this.getData();
  },
  methods: {
    //获取表格数据
    getData() {
      let temp = [
        { id: "1", parentId: null, name: "节点1" },
        { id: "1.1", parentId: "1", name: "节点1-1" },
        { id: "1.1.1", parentId: "1.1", name: "节点1-1-1" },
        { id: "2", parentId: null, name: "节点2" },
        { id: "2.1", parentId: "2", name: "节点2-1" },
        { id: "2.2", parentId: "2", name: "节点2-2" },
        { id: "2.2.1", parentId: "2.2", name: "节点2-2-1" },
        { id: "3", parentId: null, name: "节点3" },
      ];
      temp.map((item) => {
        item.children = null;
        item.editable = false;
        item.isAdd = false;
      });
      this.tableData = getTreeData(temp);
    },
    //编辑Tab
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
            message: "当前页面表格存在数据无法删除tab！",
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
        }
      }
    },
    beforeLeave(newTab, oldTab) {
      if (eval("this.$refs.child" + oldTab)[0].computedEditable()) {
        return true;
      } else {
        this.$notify({
          title: "错误",
          message: "当前页面存在未保存字段，请先保存后切换！",
          type: "error",
        });
        return false;
      }
    },
  },
};
</script>
<style scoped></style>
