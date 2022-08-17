<template>
  <div id="app">
    <el-row>
      <el-col :span="22"
        ><el-tabs
          v-model="editableTabsValue"
          type="card"
          @tab-remove="removeTab"
        >
          <el-tab-pane
            v-for="(item, index) in editableTabs"
            :key="item.name"
            :name="item.name"
            closable
          >
            <span slot="label" v-show="!isEdit">{{ item.title }}</span>
            <input
              slot="label"
              type="text"
              v-show="isEdit"
              v-model="editableTabs[index].title"
              :placeholder="item.title"
            />
            {{ item.title }}
          </el-tab-pane>
          <el-tab-pane
            ><span slot="label"
              ><i
                class="el-icon-circle-plus-outline"
                @click="addTab(editableTabsValue)"
              ></i></span
          ></el-tab-pane>
        </el-tabs>
      </el-col>

      <el-col :span="2">
        <div style="margin-bottom: 20px">
          <el-button size="small" @click="edit"> add tab </el-button>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editableTabsValue: "1",
      isEdit: false,
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
      input: "",
    };
  },
  methods: {
    edit() {
      this.isEdit = !this.isEdit;
      //保存
      // let _input = { title: this.input, name: this.input, content: 2 };
      // this.editableTabs.push(_input);
      //sessionstorage
      let _editableTabs = JSON.stringify(this.editableTabs);
      sessionStorage.setItem("editableTabs", _editableTabs);

      console.log("editableTabs", this.editableTabs);
      // console.log(_input);

      console.log(this.isEdit);
    },
    addTab(targetName) {
      let newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        title: "New Tab",
        name: newTabName,
        content: "New Tab content",
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
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
    },
  },
};
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
