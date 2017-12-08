<template>
  <div>

    <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
    <!--<div style="margin: 15px 0;"></div>-->
    <!--<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">-->
      <!--<el-checkbox v-for="city in cities" :label="city.display_name" :key="city.id">{{city.display_name}}</el-checkbox>-->
    <!--</el-checkbox-group>-->





    <div class="panel-body panel-body-nopadding">

              <template  v-for="(value, key, index) in cities"  >

                  <div class="top-permission col-md-12" >
                    <a href="javascript:;" class="display-sub-permission-toggle"><span class="glyphicon glyphicon-minus"></span></a>
                    <input type="checkbox" name="permissions[]" :value="value" class="top-permission-checkbox fa fa-bars" :checked="$options.filters.findElem(checkedCities,'permission_id',value.id)">
                    <label><h5>{{value.display_name}}
</h5></label>
                  </div>

                  <div class="sub-permissions col-md-11 col-md-offset-1">
                      <template v-for="(value2, key2, index2) in value.sub_permission" >
                        <div class="col-sm-3">
                          <!--   <label v-bind:class="[{sqs_checkbox:$options.filters.findElem(checkedCities,'permission_id',value2.id)}]"><input type="checkbox" name="permissions[]" :value="value2.id" :checked="$options.filters.findElem(checkedCities,'permission_id',value2.id)">
                                  {{value2.display_name}}
                            </label>
 -->
                            <label role="checkbox" class="el-checkbox">
                              <span aria-checked="mixed" v-bind:class="['el-checkbox__input',{'is-checked':$options.filters.findElem(checkedCities,'permission_id',value2.id)}]">
                              <span class="el-checkbox__inner"></span>
                              <input type="checkbox" class="el-checkbox__original" name="permissions[]" :value="value2.id" ></span>
                              <span class="el-checkbox__label">{{value2.display_name}}</span>
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

  export default {
    data(){
      return {
        msg:'message',
        checkAll: false,
        checkedCities:[],
        cities: [],
        isIndeterminate: true,
         isActive: true,
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
    created(){
      this.getList();
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
