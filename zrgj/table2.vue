<!--  -->
<template>
  <div id="app">
    <el-button type="primary" @click="handleClickParent">添加</el-button>
    <el-table :data="tableData" row-key="idx" border default-expand-all>
      <el-table-column prop="idx" width="100" label="" align="center">
      </el-table-column>
      <el-table-column prop="id" label="序号" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.id"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="环节" width="180">
        <template slot-scope="scope">
          <span v-show="!scope.row.editable">{{ scope.row.date }}</span>
          <el-input
            v-show="scope.row.editable"
            v-model="scope.row.date"
          ></el-input>
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
            @click.native.prevent="handleClickUpdate(scope.row)"
            type="primary"
            icon="el-icon-edit"
            circle
            size="small"
          ></el-button>
          <el-button
            @click.native.prevent="handleDelete(scope.$index)"
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

    <el-divider></el-divider>
    <div class="formData">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="key" label="键" min-width="180">
          <template slot-scope="{ row }">
            <div v-if="!row.isModified">
              {{ row.key }}
            </div>
            <el-form
              v-else
              :ref="'keyForm' + row.id"
              label-width="0px"
              :class="row.isKeyValid || row.isValueValid ? 'demo-ruleForm' : ''"
              :model="row"
            >
              <el-form-item
                prop="key"
                :rules="[
                  {
                    validator: validateKey,
                    trigger: ['blur', 'change'],
                    id: row.id,
                  },
                ]"
              >
                <el-input v-model="row.key" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="value" label="值" min-width="180">
          <template slot-scope="{ row }">
            <div v-if="!row.isModified">
              {{ row.value }}
            </div>
            <el-form
              :ref="'valueForm' + row.id"
              label-width="0px"
              :class="row.isKeyValid || row.isValueValid ? 'demo-ruleForm' : ''"
              v-else
              :model="row"
            >
              <el-form-item
                prop="value"
                :rules="[
                  {
                    validator: validateValue,
                    trigger: ['blur', 'change'],
                    id: row.id,
                  },
                ]"
              >
                <el-input
                  v-model="row.value"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="{ row }">
            <div v-if="!row.isModified">
              <el-button type="text" size="small" @click="deleteKey(row.id)"
                >删除</el-button
              >
              <el-button type="text" size="small" @click="editKey(row.id)"
                >编辑</el-button
              >
              <el-button type="text" size="small" @click="addKey"
                >增加</el-button
              >
            </div>
            <div v-else>
              <el-button type="text" size="small" @click="confirm(row.id)"
                >确认</el-button
              >
              <el-button type="text" size="small" @click="cancel(row.id)"
                >取消</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click="addKey">增加</el-button>
    </div>
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
      list: [
        {
          key: "vue",
          value: "2.21",
          isModified: false,
          isKeyValid: false,
          isValueValid: false,
          id: 0,
        },
        {
          key: "react",
          value: "16.2",
          isModified: false,
          isKeyValid: false,
          isValueValid: false,
          id: 1,
        },
      ],
    };
  },
  methods: {
    getInitInfo(idx) {
      return {
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
      this.tableData.push(this.getInitInfo(this.tableData.length + 1));
    },
    handleClickRow(row) {
      let idx = 1;
      if (!row.children) {
        row.children = new Array();
      } else {
        idx = row.children.length + 1;
      }
      row.children.push(his.getInitInfo(row.idx + "." + idx));
    },
    handleClickUpdate(row) {
      row.editable = !row.editable;
    },
    handleDelete(index) {},
    getList() {
      this.tableData = [];
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
    deleteKey(index) {
      this.list.splice(index, 1);
    },
    editKey(index) {
      this.list[index].isModified = true;
    },
    addKey() {
      this.list.push({
        key: "",
        value: "",
        isModified: true, //切换编辑状态的标志位
        isKeyValid: false, //判断Key的校验结果
        isValueValid: false, //判断value的校验结果
        id: this.list.length,
      });
    },
    promiseValidate(key) {
      return new Promise((resolve, reject) => {
        try {
          this.$refs[key].validate((isValid) => {
            resolve(isValid);
          });
        } catch (err) {
          reject(err);
        }
      });
    },
    async confirm(index) {
      const validates = await Promise.all([
        this.promiseValidate("keyForm" + index),
        this.promiseValidate("valueForm" + index),
      ]);
      if (validates.every((item) => item)) {
        this.list[index].isModified = false;
      }
    },
    validateKey(rule, value, callback) {
      if (value === "") {
        this.list[rule.id].isKeyValid = true;
        callback(new Error("请输入Key"));
      } else {
        callback();
      }
    },
    validateValue(rule, value, callback) {
      if (value === "") {
        this.list[rule.id].isValueValid = true;
        callback(new Error("请输入Value"));
      } else if (this.existValues.includes(value)) {
        this.list[rule.id].isValueValid = true;
        callback(new Error("value的值已经重复"));
      } else {
        callback();
      }
    },
  },
  computed: {
    existKeys() {
      //过滤出已经存在的key
      return this.list
        .filter((item) => !item.isModified)
        .map((item) => item.key);
    },
    existValues() {
      //过滤出已经存在的value
      return this.list
        .filter((item) => !item.isModified)
        .map((item) => item.value);
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
