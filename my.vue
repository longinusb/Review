<template>
  <div id="app">
    <el-button type="primary" @click="handleClickParent">添加</el-button>
    <el-table :data="tableData" row-key="idx" border>
      <el-table-column prop="idx" width="80" label="" align="center">
      </el-table-column>
      <el-table-column prop="id" label="序号" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.id"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="环节" width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.date"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="动作" width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="维度">
        <template slot-scope="scope">
          <el-input v-model="scope.row.address"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="备注">
        <template slot-scope="scope">
          <el-input v-model="scope.row.address"></el-input>
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
      indexList: [], //序号数组,
      tableData: [],
    };
  },
  methods: {
    handleClickParent() {
      if (this.tableData == undefined) {
        this.tableData = new Array();
      }
      let obj = {
        idx: this.tableData.length + 1,
        id: "",
        date: "",
        name: "",
        address: "",
      };

      this.tableData.push(obj);
    },
    handleClickRow(row) {
      let idx = 1;
      if (!row.children) {
        row.children = new Array();
      } else {
        idx = row.children.length + 1;
      }
      let obj = {
        idx: row.idx + "." + idx,
        id: "",
        date: "",
        name: "",
        address: "",
      };
      row.children.push(obj);
    },
    handleClickUpdate(row) {
      console.log(row.editable);
      row.editable = true;
    },
    getList() {
      this.tableData = [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          children: null,
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          children: null,
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
              children: null,
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
              children: null,
            },
          ],
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          children: null,
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
