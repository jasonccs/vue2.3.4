<template>
  <div>

    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
    </el-checkbox-group>

  </div>
</template>
<!-- 引入样式 -->
<script>
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    data(){
      return {
        msg:'message',
        checkAll: false,
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        isIndeterminate: true
      }
    },
    props: {
      message:  {
        type:Number,
        default:666,
//				required: true,
      },
      type:{
        type:String,
      }
    },
    computed:{
      alertClasses:function () {
        return {
          'Alert--Success':this.type==='success',
          'Alert--Waring':this.type==='waring',
          'none':this.type==='none'
        }
      }
    },
    methods:{
      emita:function () {
        this.$emit('emitData','hi');
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
</style>
