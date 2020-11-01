<template>
  <div class="labelData">
    <div class="text">标注结果</div>
      <el-collapse v-model="activeIndexInList" accordion @change="handleChange">
        <el-collapse-item
          :name="index"
          v-for="(figure, index) in labelDataAdd"
          :key="index"
        >
          <template slot="title">
            <el-popconfirm
              confirmButtonText="确定"
              cancelButtonText="取消"
              icon="el-icon-info"
              iconColor="red"
              @confirm="deleteElement(index)"
              title="确定删除元素？"
            >
              <i
                class="el-icon-circle-close"
                slot="reference"
                style="margin:0 10px 0 0"
              ></i>
            </el-popconfirm>
            <span style="margin-right:10px">{{ index + 1 }}</span>
          </template>
          <div>
            <ul>
              <li v-for="(point, index) in figure.points" :key="index">
                点：({{ point.x }},{{ point.y }})
              </li>
            </ul>
          </div>
        </el-collapse-item>
      </el-collapse>
  </div>
</template>

<script>

export default {
  name:'render-data-ele',
  props:{
    labelData:{
      type: Array,
      default:() => []
    }
  },
  data() {
    return {
      activeIndexInList: -1
    }
  },
  computed: {
    labelDataAdd() {
      let newArray = []
      this.labelData.forEach((element,i) => {
        let newElement = JSON.parse(JSON.stringify(element))
        newArray.push(newElement)
      });
      this.$emit("updateDataFromRight",newArray)
      return newArray;
    }
  },
  methods:{
    handleChange(val) {
      if(val === ""){
        this.activeIndexInList = -1
      }else {
        this.activeIndexInList = val
        this.$emit('selectedFigure',this.activeIndexInList)
      }
    },
    deleteElement(index) {
      this.$emit('deleteFigure',index)
    }
  }
}
</script>

<style scoped>
.text{
  height: 41px;
  text-align: center;
  line-height: 41px;
}
.labelData{
  color: white;
}
>>>.el-collapse{
  border: none;
  /* border-color: blue; */
}
>>>.el-collapse-item__header{
  padding: 0 8px;
  color: white;
  background-color: #4c4c4c;
  /* border-color: blue; */
}
>>>.el-collapse-item__wrap{
  color: white;
  background-color: #4c4c4c;
}
>>>.el-collapse-item__content{
  color: white;
  background-color: #4c4c4c;
}
>>>.el-input__inner{
  color: white;
  background-color: #282828;
  border: none;
}
</style>