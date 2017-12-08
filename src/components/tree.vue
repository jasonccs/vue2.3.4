<template>
  <div>

    <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
    <!--<div style="margin: 15px 0;"></div>-->
    <!--<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">-->
      <!--<el-checkbox v-for="city in cities" :label="city.display_name" :key="city.id">{{city.display_name}}</el-checkbox>-->
    <!--</el-checkbox-group>-->


    <button @click="send">发送消息</button>


    <div class="panel-body panel-body-nopadding">

              <template  v-for="(value, key) in cities"  >

                  <div class="top-permission col-md-12" >

                  <!---->
                    <!--<a href="javascript:;" class="display-sub-permission-toggle"><span class="glyphicon glyphicon-minus"></span></a>-->
                    <!--<input type="checkbox" name="permissions[]" :value="value" class="top-permission-checkbox fa fa-bars" :checked="$options.filters.findElem(checkedCities,'permission_id',value.id)">-->
                    <!--<label><h5>{{value.display_name}}</h5></label>-->

                    <label role="checkbox" class="el-checkbox">
                              <span aria-checked="mixed" v-bind:class="['el-checkbox__input',{'is-checked':$options.filters.findElem(checkedCities,'permission_id',value.id)}]">
                              <span class="el-checkbox__inner"></span>
                              <input type="checkbox" class="el-checkbox__original" name="permissions[]" :value="value.id" ></span>
                      <span class="el-checkbox__label">{{value.display_name}}{{key}}</span>
                    </label>

                  </div>

                  <div class="sub-permissions col-md-11 col-md-offset-1">
                      <template v-for="(value2, key2) in value.sub_permission" >
                        <div class="col-sm-3">
                          <!--   <label v-bind:class="[{sqs_checkbox:$options.filters.findElem(checkedCities,'permission_id',value2.id)}]"><input type="checkbox" name="permissions[]" :value="value2.id" :checked="$options.filters.findElem(checkedCities,'permission_id',value2.id)">
                                  {{value2.display_name}}
                            </label>
 -->
                            <label role="checkbox" class="el-checkbox" @change="checkedChange($event,key2)">
                              <span aria-checked="mixed" :class="['el-checkbox__input',{'is-checked':$options.filters.findElem(checkedCities,'permission_id',value2.id) || key2==index ?!checked:checked}]">
                              <span class="el-checkbox__inner"></span>
                              <input type="checkbox" class="el-checkbox__original" name="permissions[]" :value="value2.id"  ref="children"  :checked="$options.filters.findElem(checkedCities,'permission_id',value2.id)"></span>
                              <span class="el-checkbox__label">{{value2.display_name}}{{key2}}</span>
                            </label>

                        </div>
                      </template>
                  </div>
              </template>

    </div>

  </div>
</template>
<!-- 引入样式 -->
<script>

  import axios from 'axios';
//  import io from 'socket.io';

  export default {
    data(){
      return {
        msg:'message',
        checkAll: false,
        checkedCities:[],
        cities: [],
        isIndeterminate: true,
        isActive: true,
        checked:false,
        index:null,
        id:null
      }
    },
    props: {
      message:  {
        type:Number,
        default:666,
//    required: true,
      },
      type:{
        type:String,
      }
    },
    filters:{
      isInArray(arr,value){
        for(let i = 0; i < arr.length; i++){
          if(value === arr[i]){
            return true;
          }
        }
        return false;
      },
      findElem(arrayToSearch,attr,val){
        for (let i=0;i<arrayToSearch.length;i++){
          if(arrayToSearch[i][attr]==val){
            return true;
          }
        }
        return false;
      }
    },
    computed:{
      alertClasses:function () {
        return {
          'Alert--Success':this.type==='success',
          'Alert--Waring':this.type==='waring',
          'none':this.type==='none'
        }
      },

    },
    watch:{



    },
    sockets:{
      connect: function(){  //这里是监听connect事件
        console.log('链接上了')
        this.id=this.$socket.id
      },
      c_hi: function(val){
        console.log(val)
      }
    },
    mounted(){
      this.id=this.$socket.id
    },
    created(){
      this.getList();
//      var socket = io.connect('http://127.0.0.1:3000');
//      io.sockets.on('connection',function(socket){
//        socket.emit('message',{text:'你上线了'});
//      });
    },
    methods:{

      getList(){

        axios.get('http://www.new_silvapi.dev/cms/role/permission-menus').then(response => {

          let data =response.data.data;

          this.cities=data;


        }, response => {
          // error callback
        });


        axios.get('http://www.new_silvapi.dev/cms/role/has-role-permission?role_id=10').then(response => {

          let data =response.data.data;

           this.checkedCities=data;


        }, response => {

        });

      },
      checkedChange(e,index){//切换是否勾选

//        this.checked=!this.checked;

        this.index=index;
        this.checked=!this.checked;
//        console.log(e.target);
        console.log(this.checked,index,this.index);

      },

      send(){
        this.$socket.emit('hi', 'hello-hello');
      },
      handleCheckAllChange() {
        this.checkedCities = this.checkAll ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
    }


  }
</script>
<style scope>

  .Alert--Waring{
    color: red;
  }
  .Alert--Success{
    color: green;
  }
  .none{
    display: none;
  }
  .panel-body{
    width: 1200px;
    margin: 0 auto;
  }
  .col-sm-3 label{
    font-weight: normal;
    float: left;
  }
  .fa{
    display: inline-block;
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
  }
  .sqs_checkbox{
   color: rgb(64, 158, 255);
  }
</style>
