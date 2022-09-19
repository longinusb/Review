<template>
  <div>
    <el-button type="primary" @click="handleAddParent">添加</el-button>
    <span>版本号：</span>
    <el-select v-model="value" placeholder="请选择" @change="selectVersion">
      <el-option
        v-for="item in versionData"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-form :model="forms" ref="forms" :rules="tableRules">
      <el-table :data="forms.tableData" row-key="businessNo" default-expand-all>
        <el-table-column prop="businessNo"> </el-table-column>
        <el-table-column prop="name" label="环节">
          <template slot-scope="{ row }">
            <span v-show="!row.editable">{{ row.name }}</span>
            <el-form-item
              v-show="row.editable"
              :prop="computedProps(row.businessNo, 'name')"
              :rules="tableRules.name"
            >
              <el-input v-model="row.name"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="处理流程">
          <template slot-scope="{ row, $index }">
            <div v-if="!row.editable">
              <el-button type="text" size="small" @click="handleDel(row)"
                >删除</el-button
              >
              <el-button type="text" size="small" @click="handleEdit(row)"
                >编辑</el-button
              >
              <el-button type="text" size="small" @click="handleAddChild(row)"
                >添加</el-button
              >
            </div>
            <div v-else>
              <el-button type="text" size="small" @click="handleConfirm(row)"
                >确认</el-button
              >
              <el-button
                v-show="row.isAdd"
                type="text"
                size="small"
                @click="handleDel(row)"
                >取消</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
import { getTreedata, bfs } from "../treeTransfer";
export default {
  props: {
    tab: {
      type: Object,
    },
  },
  watch: {
    tab: function (val) {
      // console.log(val);
      this.senNo = val.title;
      this.version = val.version;
      this.initTab();
    },
  },
  data() {
    return {
      forms: {
        tableData: [],
      },
      tableRules: {
        name: [
          {
            required: true,
            message: "请输入环节",
            trigger: ["blur", "change"],
          },
        ],
      },
      version1: [1, 2, 3],
      versionData: [],
      versionData2: [],
      value: "",
    };
  },
  created() {
    // console.log(this.tab);
    this.senNo = this.tab.title;
    this.version = this.tab.version;
    this.initTab();
  },
  methods: {
    initTab() {
      this.getData();
      //初始化数据
      this.initData();
      this.versionTransfer1(this.version1);
      this.versionTransfer2(this.version1);
    },
    selectVersion(val) {
      this.filterHandler(val);
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    versionTransfer1(ele) {
      let obj = {};
      for (let key in ele) {
        obj[key] = ele[key];
      }
      return (this.versionData = Object.keys(obj).map((val) => ({
        label: obj[val],
        value: obj[val],
      })));
    },
    versionTransfer2(ele) {
      let obj = {};
      for (let key in ele) {
        obj[key] = ele[key];
      }
      return (this.versionData2 = Object.keys(obj).map((val) => ({
        text: obj[val] + "",
        value: obj[val] + "",
      })));
    },
    //接口
    tableRequest() {
      if (this.senNo == "Tab 2") {
        return [
          { businessNo: "1.1.1", parentId: "1.1", name: "节点1-1-1" },
          { businessNo: "1", parentId: null, name: "节点1" },
          { businessNo: "1.1", parentId: "1", name: "节点1-1" },
          { businessNo: "2.2.1", parentId: "2.2", name: "节点2-2-1" },
          { businessNo: "2.2", parentId: "2", name: "节点2-2" },
          { businessNo: "2", parentId: null, name: "节点2" },
          { businessNo: "2.1", parentId: "2", name: "节点2-1" },
          { businessNo: "3", parentId: null, name: "节点3" },
          { businessNo: "4.1", parentId: null, name: "节点3" },
        ];
      } else {
        return [];
      }
    },
    //获取表格数据
    getData() {
      console.log("123");
      let temp = this.tableRequest();
      temp.map((item) => {
        item.children = [];
        item.editable = false;
        item.isAdd = false;
      });
      this.forms.tableData = getTreedata(temp);
    },
    //初始化数据
    initData() {
      const getIndex = (data, index, parent) => {
        let num = index + 1;
        if (parent !== "") {
          data.businessNo = parent + "." + num;
        } else {
          data.businessNo = num + "";
        }
        if (data.children) {
          data.children.map((item, idx) =>
            getIndex(item, idx, data.businessNo)
          );
        }
      };
      this.forms.tableData.map((item, index) => getIndex(item, index, ""));
    },
    //新一行数据
    newRowInfo(businessNo) {
      return {
        businessNo: businessNo + "",
        name: "",
        children: [],
        editable: true,
        isAdd: true,
      };
    },
    //新增父级
    handleAddParent() {
      this.forms.tableData.push(
        this.newRowInfo(this.forms.tableData.length + 1)
      );
    },
    //新增子级
    handleAddChild(row) {
      let businessNo = 1;
      if (!row.children) {
        row.children = new Array();
      } else {
        businessNo = row.children.length + 1;
      }
      row.children.push(this.newRowInfo(row.businessNo + "." + businessNo));
    },
    //编辑
    handleEdit(row) {
      row.editable = true;
    },
    //取消 TODO
    handleCancel(row) {},
    //删除 重置序号
    handleDel(row) {
      let indexs = row.businessNo.split(".");
      // console.log(indexs);
      if (indexs.length == 1) {
        this.forms.tableData.splice(parseInt(indexs[0]) - 1, 1);
      } else if (indexs.length > 1) {
        let children = this.forms.tableData;
        indexs.forEach((val, idx) => {
          if (idx == indexs.length - 1) {
            children.splice(parseInt(val) - 1, 1);
          } else {
            children = children[parseInt(val) - 1].children;
          }
        });
      }
      //   console.log(this.forms.tableData);
      this.initData();
    },
    //提交
    handleConfirm(row) {
      let errorMessage = false;
      let businessNoStr = this.computedIndex(row.businessNo);
      let colIndex = [businessNoStr + "id", businessNoStr + "name"];
      this.$refs["forms"].validateField(colIndex, (valid) => {
        if (valid != "") {
          errorMessage = true; //有一个验证不成功就不在继续执行
        }
      });
      if (!errorMessage) {
        row.editable = false;
        row.isAdd = false;
      }
    },
    //计算每个单元格的props
    computedProps(businessNo, str) {
      return this.computedIndex(businessNo) + str;
    },
    //获取当前行的数据路径
    computedIndex(businessNo) {
      let indexs = (businessNo + "").split(".");
      if (indexs.length == 1) {
        return "tableData[" + (indexs[0] - 1) + "].";
      } else if (indexs.length > 1) {
        let children = "tableData";
        indexs.forEach((val, idx) => {
          if (idx == indexs.length - 1) {
            children = children + "[" + (val - 1) + "].";
          } else {
            children = children + "[" + (val - 1) + "].children";
          }
        });
        return children;
      }
    },
    //当前页面编辑状态
    computedEditable() {
      let flag = true;
      for (let i = 0; i < this.forms.tableData.length; i++) {
        if (bfs(this.forms.tableData[i])) {
          flag = false;
          break;
        }
      }
      return flag;
    },
  },
};
</script>

<style></style>
