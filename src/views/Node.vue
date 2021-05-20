<template>
  <div class="node">
    <span>用户表</span>
    <span class="add" @click="showUserInfo">新增用户</span>
    <table>
      <tr>
        <td>ID</td>
        <td>姓名</td>
        <td>年龄</td>
        <td>性别</td>
        <td>操作</td>
      </tr>
      <tr v-for="item in userList" :key="item.id">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.age}}</td>
        <td>{{item.gender}}</td>
        <td>
          <span @click="deleUser(item.id)">删除</span>
          <span>编辑</span>
        </td>
      </tr>
    </table>
    <div class="addWin" v-show="showAddWin">
      <div class="box">
        <h3>用户信息</h3>
        <p>
          <span class="txt">姓名:</span>
          <input v-model="userInfo.name" type="text">
        </p>
        <p>
          <span class="txt">年龄:</span>
          <input v-model="userInfo.age" type="num">
        </p>
        <p>
          <span class="txt">性别:</span>
          <el-select v-model="userInfo.gender" placeholder="请选择">
            <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </p>
        <p class="btn">
          <el-button round @click="showAddWin=false">取消</el-button>
          <el-button type="primary" round @click="addUser">确定</el-button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      userList:[],
      userInfo:{
        name:'请输入姓名',
        age:0,
        gender:0
      },
      genderOptions:[{value:0,label:'女'},{value:1,label:'男'}],
      showAddWin:false
    }
  },
  created:function(){
    this.getAllUserInfo();
  },
  methods:{
    getAllUserInfo:function(){
      this.$axios.get('http://192.168.180.41:8081/user/findAll').then(res=>{
        if(res.status==200){
          this.userList=res.data;
          this.userList.map(item=>{
            item.gender=item.gender==0?'女':'男'
          })
        }
      })
    },
    deleUser:function(id){
      this.$axios.get('http://192.168.180.41:8081/user/deleteById',{
        params:{
          id
        }
      }).then(res=>{
        if(res.status==200){
          let index=this.userList.findIndex(item=>{
            return item.id==id;
          })
          this.userList.splice(index,1)
        }
      })
    },
    addUser:function(){
      if(this.userInfo.id){

      }else{
        this.$axios.post('http://192.168.180.41:8081/user/saveOrUpdate',this.userInfo).then(res=>{
          if(res.status==200){
            this.getAllUserInfo();
          }
        })
      }
    },
    showUserInfo:function(){
      this.userInfo={
        name:'请输入姓名',
        age:0,
        gender:0
      }
      this.showAddWin=true
    }
  }
}
</script>
<style lang="less" scoped>
.add{
  float: right;
  width: 86px;
  height: 20px;
  line-height: 20px;
  border: 1px solid #000;
  border-radius: 10px;
  cursor: pointer;
  &:hover{
    background-color: skyblue;
  }
}
table{
  width: 100%;
  margin: auto;
  tr{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
    border: 1px solid #000;
    td{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 100%;
      border-right: 1px solid #000;
      &:nth-of-type(5){
        border-right: none;
      }
      span{
        display: block;
        width: 86px;
        height: 20px;
        line-height: 20px;
        border: 1px solid #000;
        border-radius: 10px;
        cursor: pointer;
        &:hover{
          background-color: skyblue;
        }
      }
    }
  }
}
.node{
  position: relative;
  .addWin{
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(43,43,43,0.5);
    .box{
      padding: 20px;
      width: 500px;
      height: 250px;
      background-color: pink;
      border-radius: 6px;
      p{
        display: flex;
        align-items: center;
        margin: auto;
        width: 80%;
        height: 50px;
        line-height: 50px;
        .txt{
          width: 100px;
          float: left;
        }
        input{
          width: 217px;
          height: 40px;
          line-height: 40px;
          border: none;
          text-indent: 15px;
          color: #606266;
          border-radius: 4px;
        }
      }
      .btn{
        justify-content: space-around;
      }
    }
  }
}
</style>
