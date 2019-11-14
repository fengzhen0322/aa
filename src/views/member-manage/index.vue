<template>
  <div class="className">
    <el-card class="anoCard">
      <div slot="header">
        <span>会员管理</span>
      </div>
      <div class="searchDiv">
        <el-input
                type="text"
                placeholder="请输入手机号"
                class="width1"
                v-model="sch_order"
        ></el-input>
        <el-select
                v-model="sch_status"
                clearable
                class="width1"
                placeholde="请选择状态"
        >
          <el-option
                  v-for="item in options"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value"
          ></el-option>
        </el-select>
        <el-date-picker
                class="width1"
                v-model="sch_date"
                type="daterange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="searchTab()"
        >搜索</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="excelDow"
        >导出</el-button>
        <el-button
          type="primary"
          @click="allDisabled(tableChecked)"
        >批量禁言</el-button>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="正常用户" name="first">

          <el-table :data="tableData" @selection-change="handleSelectionChange" border stripe>
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="id" label="手机号" width="150"></el-table-column>
            <el-table-column prop="order" label="姓名" width="100"></el-table-column>
            <el-table-column prop="time" label="注册时间"></el-table-column>
            <el-table-column prop="time" label="最后一次活跃时间"></el-table-column>
            <el-table-column prop="address" label="好友数量" width="100"></el-table-column>
            <el-table-column prop="phone" label="团队人数" width="100"></el-table-column>
            <el-table-column prop="name" label="团队实名人数" width="120"></el-table-column>
            <el-table-column prop="name" label="团队未实名人数" width="120"></el-table-column>
            <el-table-column prop="name" label="群聊数量" width="120"></el-table-column>
            <el-table-column prop="status" label="状态" width="90">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status | tagClass">{{
                  scope.row.status | statusText
                  }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="230">
              <template slot-scope="scope">
                <el-button type="primary" @click="editDetail(scope.$index, scope.row)">查看</el-button>
                <el-button type="primary" @click="editTable(scope.$index, scope.row)">编辑</el-button>
                <el-button type="primary" @click="editDisabled(scope.$index, scope.row)">禁言</el-button>
                <!--<el-button-->
                <!--type="warning"-->
                <!--@click="toConfirm(scope.row)"-->
                <!--:disabled="scope.row.status === 1 ? false : true"-->
                <!--&gt;审核</el-button-->
                <!--&gt;-->
                <!--<el-button-->
                <!--type="success"-->
                <!--@click="toSuccess(scope.row)"-->
                <!--:disabled="scope.row.status === 2 ? false : true"-->
                <!--&gt;完成</el-button-->
                <!--&gt;-->
                <!--<el-button-->
                <!--type="danger"-->
                <!--@click="toDelete(scope.row)"-->
                <!--:disabled="scope.row.status !== 3 ? false : true"-->
                <!--&gt;取消</el-button-->
                <!--&gt;-->
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
                  background
                  layout="total, sizes, prev, pager, next"
                  :page-sizes="pageSizes"
                  :page-size="pageSize"
                  :current-page="currentPage"
                  :total="total"
                  class="fyDiv"
                  @size-change="handleSize"
                  @current-change="handlePage"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="黑名单" name="second">黑名单</el-tab-pane>
      </el-tabs>


    </el-card>
    <el-dialog title="订单修改" :visible.sync="diaIsShow" class="diaForm">
      <el-form
        ref="diaForm"
        :model="formData"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item label="订单号">
          <el-input
            type="text"
            v-model="formData.order"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="订单时间" prop="time">
          <el-date-picker
            v-model="formData.time"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="配送地址" prop="address">
          <el-input
            type="text"
            placeholder="请输入地址"
            v-model="formData.address"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input
            type="text"
            placeholder="请输入电话"
            v-model="formData.phone"
          ></el-input>
        </el-form-item>
        <el-form-item label="配送员" prop="name">
          <el-input
            type="text"
            placeholder="请输入姓名"
            v-model="formData.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formData.status" placeholde="请选择状态">
            <el-option
              v-for="item in options"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeTab('diaForm', editType)"
            >确认</el-button
          >
          <el-button @click="diaIsShow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getPageTab2 } from '@/api/table'
export default {
  data() {
    return {
      tableData: [],
      allList: [],
      schArr: [],
      sch_order: '',
      sch_status: null,
      sch_date: null,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 20, 30, 40],
      diaIsShow: false,
      formData: {},
      editType: '',
      options: [
        { label: '待审核', value: 1 },
        { label: '配送中', value: 2 },
        { label: '已完成', value: 0 },
        { label: '已取消', value: 3 }
      ],
      rowIndex: 0,
      rules: {
        // order: [{ required: true, message: '请输入订单号', trigger: 'blur' }],
        time: [
          {
            // type: 'datetime',
            required: true,
            message: '请输入时间',
            trigger: 'change'
          }
        ],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        status: [
          { required: true, message: '请选择订单状态', trigger: 'change' }
        ]
      },
      multipleSelection: '',
      activeName: 'first',
      ids: [], //批量禁用所传的参数
      tableChecked: [],//所有选中的数据
      filename: '会员管理', //导出的参数
      autoWidth: true,
      bookType: 'xlsx',
    }
  },
  created() {
    this._getPageTab2()
  },
  filters: {
    statusText(val) {
      if (val === undefined) return
      if (val === 0) {
        return '已完成'
      } else if (val === 1) {
        return '待审核'
      } else if (val === 2) {
        return '配送中'
      } else {
        return '已取消'
      }
    },
    tagClass(val) {
      if (val === undefined) return
      if (val === 0) {
        return 'success'
      } else if (val === 1) {
        return 'info'
      } else if (val === 2) {
        return 'warning'
      } else {
        return 'danger'
      }
    }
  },
  methods: {
    //导出
    excelDow() {
      import('@/vendor/Export2Excel.js').then(moudle => {
          const tHeader = ['手机号', '姓名', '注册时间', '最后一次活跃时间', '好友数量', '团队人数', '团队实名人数', '团队未实名人数', '群聊数量', '状态']
          const filterVal = ['tel', 'name', 'date', 'sex', 'position', 'num']
          const list = this.allList
          const data = this.formatJson(filterVal, list)
          moudle.export_json_to_excel({
              header: tHeader,
              data,
              filename: this.filename === '' ? 'filename' : this.filename,
              autoWidth: this.autoWidth,
              bookType: this.bookType
          })
      })
    },
    formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSelectionChange(val) {
      console.log('选中的值', val)
      this.tableChecked = val;
    },
    handleSize(val) {
      this.pageSize = val;
      this.getPageData()
    },
    handlePage(val) {
      this.currentPage = val;
      this.getPageData()
    },
    _getPageTab2() {
      getPageTab2()
        .then(res => {
          this.allList = res.data.tableList
          this.schArr = this.allList
          this.getPageData()
          this.total = res.data.total
        })
        .catch(error => {
          this.$message.error(error.message)
        })
    },
    getPageData() {
      let start = (this.currentPage - 1) * this.pageSize
      let end = start + this.pageSize
      this.tableData = this.schArr.slice(start, end)
    },
    // 查找
    searchTab() {
      let arrList = []
      for (let item of this.allList) {
        if (
          this.sch_order.trim() === '' &&
          this.sch_status === null &&
          this.sch_date === null
        ) {
          arrList = this.allList
          break
        } else if (
          item.order.startsWith(this.sch_order) &&
          (this.sch_status !== null ? item.status === this.sch_status : true) &&
          (this.sch_date !== null ? item.time.startsWith(this.sch_date) : true)
        ) {
          let obj = Object.assign({}, item)
          arrList.push(obj)
        }
      }
      this.schArr = arrList
      this.total = arrList.length
      this.currentPage = 1
      this.pageSize = 10
      this.getPageData()
    },
    // add
    addTab() {
      this.formData = {}
      this.diaIsShow = true
      this.formData.order = (Math.random() * 10e18).toString()
      this.formData.id = this.allList.length + 1
      this.editType = 'add'
      this.$nextTick(() => {
        this.$refs.diaForm.clearValidate()
      })
    },
    // 审核
    toConfirm(row) {
      row.status = 2
      this.$notify({
        title: '成功',
        message: '审核提交成功',
        type: 'success'
      })
    },
    // 完成
    toSuccess(row) {
      row.status = 0
      this.$notify({
        title: '成功',
        message: '该订单已完成配送',
        type: 'success'
      })
    },
    // 取消
    toDelete(row) {
      row.status = 3
      this.$notify({
        title: '成功',
        message: '已取消该订单',
        type: 'success'
      })
    },
    //查看
    editDetail(index, row) {
       console.log('信息详情', index, row)
       this.$router.push({
           path: '/memberDetail'
       })
    },
    // 编辑
    editTable(index, row) {
      this.formData = Object.assign({}, row)
      this.editType = 'update'
      this.diaIsShow = true
      this.$nextTick(() => {
        this.$refs.diaForm.clearValidate()
      })
      this.rowIndex = index
    },
    //单个禁言
    editDisabled(index, row) {
        this.$prompt('请输入禁言理由', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(({ value }) => {
            console.log('禁言理由', value)
            this.$message({
                type: 'success',
                message: '禁言成功'
            });
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '取消禁言'
            });
        });
    },
    //批量禁言
    allDisabled(rows) {
        if(this.tableChecked.length) {
            var _this = this;
            _this.$prompt('请输入禁言理由', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(({ value }) => {
                rows.forEach(item => {
                    _this.ids.push(item.id)
                })
                console.log('禁言理由', value)
                console.log('禁言id', _this.ids)
                this.$message({
                    type: 'success',
                    message: '禁言成功'
                });
                _this.ids = []
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消禁言'
                });
            });
        }else {
            this.$message({
                type: 'warning',
                message: '未选中会员'
            });
        }
    },
    changeTab(form, type) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (type === 'update') {
            // 改变整个表格数据
            let start = (this.currentPage - 1) * this.pageSize
            this.allList[start + this.rowIndex] = Object.assign(
              {},
              this.formData
            )
            // 解决数组不能通过索引响应数据变化
            this.$set(
              this.tableData,
              this.rowIndex,
              Object.assign({}, this.formData)
            )
            this.$notify({
              title: '成功',
              message: '订单已修改成功',
              type: 'success'
            })
          } else {
            this.tableData.unshift(Object.assign({}, this.formData))
            this.allList.push(Object.assign({}, this.formData))
          }
          this.diaIsShow = false
        } else {
          return
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.fyDiv {
  float: right;
  margin-top: 30px;
  padding-bottom: 20px;
}
.anoCard .el-table .el-button {
  padding: 8px 18px;
  font-size: 12px;
}
.searchDiv {
  margin-bottom: 20px;
  .el-button {
    padding: 11px 20px;
  }
}
.width1 {
  width: 25%;
  margin-right: 10px;
}
.diaForm {
  .el-input {
    width: 350px;
  }
}
</style>
<style lang="scss">
.anoCard {
  .el-card__body:after {
    content: '';
    clear: both;
    width: 0;
    height: 0;
    visibility: hidden;
    display: block;
  }
}
.diaForm .el-form-item__label {
  padding-right: 20px;
}
.searchDiv [class^='el-icon'] {
  color: #fff;
}
</style>
