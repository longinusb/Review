<template>
  <div>
    <el-button type="primary" @click="handleAddParent">添加</el-button>
    <el-form :model="forms" ref="forms" :rules="tableRules">
      <el-table :data="forms.tableData" row-key="idx" default-expand-all>
        <el-table-column prop="idx" label="" align="center"> </el-table-column>
        <el-table-column prop="id" label="序号">
          <template slot-scope="{ row }">
            <span v-show="!row.editable">{{ row.id }}</span>
            <el-form-item
              v-show="row.editable"
              :prop="computedProps(row.idx, 'id')"
              :rules="tableRules.id"
            >
              <el-input v-model="row.id"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="环节">
          <template slot-scope="{ row }">
            <span v-show="!row.editable">{{ row.name }}</span>
            <el-form-item
              v-show="row.editable"
              :prop="computedProps(row.idx, 'name')"
              :rules="tableRules.name"
            >
              <el-input v-model="row.name"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="action" label="动作">
          <template slot-scope="{ row }">
            <span v-show="!row.editable">{{ row.action }}</span>
            <el-form-item
              v-show="row.editable"
              :prop="computedProps(row.idx, 'action')"
              :rules="tableRules.action"
            >
              <el-input v-model="row.action"></el-input>
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
import { getTreeData, bfs } from "../treeTransfer";
export default {
  props: {
    senNo: {
      type: String,
    },
  },
  data() {
    return {
      forms: {
        tableData: [],
      },
      tableRules: {
        id: [
          {
            required: true,
            message: "请输入序号",
            trigger: ["blur", "change"],
          },
        ],
        name: [
          {
            required: true,
            message: "请输入环节",
            trigger: ["blur", "change"],
          },
        ],
        action: [
          {
            required: true,
            message: "请输入动作",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  created() {
    this.getData();
    //初始化数据
    this.initData();
  },
  methods: {
    //获取表格数据
    getData() {
      console.log(this.senNo);
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
      this.forms.tableData = getTreeData(temp);
    },
    //初始化数据
    initData() {
      const getIndex = (data, index, parent) => {
        let num = index + 1;
        if (parent != "") {
          data.idx = parent + "." + num;
        } else {
          data.idx = num + "";
        }
        if (data.children) {
          data.children.map((item, idx) => getIndex(item, idx, data.idx));
        }
      };
      this.forms.tableData.map((item, index) => getIndex(item, index, 0));
    },
    //新一行数据
    newRowInfo(idx) {
      return {
        idx: idx + "",
        id: "",
        name: "",
        action: "",
        children: null,
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
      let idx = 1;
      if (!row.children) {
        row.children = new Array();
      } else {
        idx = row.children.length + 1;
      }
      row.children.push(this.newRowInfo(row.idx + "." + idx));
    },
    //编辑
    handleEdit(row) {
      row.editable = true;
    },
    //取消 TODO
    handleCancel(row) {},
    //删除 重置序号
    handleDel(row) {
      let indexs = row.idx.split(".");
      console.log(indexs);
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
      let idxStr = this.computedIndex(row.idx);
      let colIndex = [idxStr + "id", idxStr + "name", idxStr + "action"];
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
    computedProps(idx, str) {
      return this.computedIndex(idx) + str;
    },
    //获取当前行的数据路径
    computedIndex(idx) {
      let indexs = (idx + "").split(".");
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
