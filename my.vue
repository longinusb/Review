<template>
  <div id="app">
    <el-button type="primary" @click="handleClickParent">添加</el-button>
    <el-table :data="tableData" row-key="idx" border>
      <el-table-column prop="idx" width="80" label="" align="center">
      </el-table-column>
      <el-table-column prop="id" label="序号" width="200">
        <template slot-scope="scope">
          <span v-show="!scope.row.editable">{{ scope.row.id }}</span>
          <el-input
            v-show="scope.row.editable"
            v-model="scope.row.id"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="处理流程">
        <template slot-scope="scope">
          <el-button
            @click="handleClickUpdate(scope.row)"
            type="primary"
            icon="el-icon-edit"
            circle
            size="small"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="small"
          ></el-button>
          <el-button
            @click="handleClickRow(scope.row)"
            type="success"
            icon="el-icon-plus"
            circle
            size="small"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
  created() {
    this.getList();
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    newobj(idx) {
      let obj = {
        idx: idx,
        id: "",
        date: "",
        name: "",
        address: "",
        children: null,
        editable: false,
      };
    },
    handleClickParent() {
      if (this.tableData == undefined) {
        this.tableData = new Array();
      }
      this.tableData.push(this.newobj(this.tableData.length + 1));
    },
    handleClickRow(row) {
      let idx = 1;
      if (!row.children) {
        row.children = new Array();
      } else {
        idx = row.children.length + 1;
      }
      row.children.push(this.newobj(row.idx + "." + idx));
    },
    handleClickUpdate(row) {
      row.editable = !row.editable;
    },
    getList() {
      this.tableData = [
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          editable: false,
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
              children: null,
              editable: false,
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
              children: null,
              editable: false,
            },
          ],
        },
      ];
      const getIndex = (data, index, parent) => {
        let num = index + 1;
        if (parent != 0) {
          data.idx = parent + "." + num;
        } else {
          data.idx = num;
        }
        data.editable = false;
        if (data.children) {
          data.children.map((item, idx) => getIndex(item, idx, num));
        }
      };
      this.tableData.map((item, index) => getIndex(item, index, 0));
    },
  },
};
</script>
<style scoped></style>
