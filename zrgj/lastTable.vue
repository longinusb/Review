<template>
  <div>
    <el-button type="primary" @click="handleAddParent">添加</el-button>
    <el-form :model="forms" ref="forms" :rules="tableRules">
      <el-table :data="forms.tableData" row-key="idx" default-expand-all>
        <el-table-column prop="idx" width="100" label="" align="center">
        </el-table-column>
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
        <el-table-column prop="date" label="环节">
          <template slot-scope="{ row }">
            <span v-show="!row.editable">{{ row.date }}</span>
            <el-form-item
              v-show="row.editable"
              :prop="computedProps(row.idx, 'date')"
              :rules="tableRules.date"
            >
              <el-input v-model="row.date"></el-input>
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
export default {
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
        date: [
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
    this.forms.tableData = [
      {
        id: "7364828349",
        date: "测试数据1",
        action: "123",
        children: null,
        editable: false,
        isAdd: false,
      },
    ];
    this.initData();
  },
  computed: {},
  methods: {
    //TODO 初始化数据，赋初始值idx、children、editable
    initData() {
      const getIndex = (data, index, parent) => {
        let num = index + 1;
        if (parent != 0) {
          data.idx = parent + "." + num;
        } else {
          data.idx = num + "";
        }
        if (data.children) {
          data.children.map((item, idx) => getIndex(item, idx, num));
        }
      };
      this.forms.tableData.map((item, index) => getIndex(item, index, 0));
    },
    //新一行数据
    newRowInfo(idx) {
      return {
        idx: idx + "",
        id: "",
        date: "",
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
      let colIndex = [idxStr + "id", idxStr + "date", idxStr + "action"];
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
  },
};
</script>

<style></style>
