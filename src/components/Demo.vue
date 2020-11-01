<template>
  <div class="box">
    <div class="left">
      <div class="image_list">
        <el-image
          v-for="(url,index) in imageUrls"
          :key="url"
          :src="url"
          :class="{selected: url === selectdUrl}"
          lazy
          @click="changeImage(index)"
        ></el-image>
      </div>
    </div>
    <div class="middle">
      <drawboard :url="selectdUrl" @updateData="updateData" style="width:100%;height:100%" ref="myDrawBoard">
        <div slot="bottomBar" style="margin-top: 2px;text-align:center">
          <el-button type="primary" icon="el-icon-arrow-left" size="small" @click="prevImage()">上一张</el-button>
          <el-button type="primary" icon="el-icon-arrow-right" size="small" @click="nextImage()">下一张</el-button>
        </div>
      </drawboard>
      
    </div>
    <div class="right">
      <renderDataEle
        :labelData="labelData"
        @updateDataFromRight="updateDataFromRight"
        @selectedFigure="selectedFigure"
        @deleteFigure="deleteFigure"
      ></renderDataEle>
    </div>
  </div>
</template>

<script>
import renderDataEle from "./renderDataEle.vue";
export default {
  name: 'App',
  components:{renderDataEle},
  data() {
    return {
      selectdUrl:"",
      selectedIndex: 0,
      labelData:[],
      labelDataAdd:[],
      imageUrls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      ]
    }
  },
  created(){
    this.selectdUrl = this.imageUrls[0]
  },
  methods:{
    changeImage(index) {
      this.selectedIndex = index
      this.selectdUrl = this.imageUrls[index]
    },
    prevImage() {
      if (this.selectedIndex>0) {
        this.changeImage(this.selectedIndex-1)
      }
    },
    nextImage() {
      if (this.selectedIndex<this.imageUrls.length) {
        this.changeImage(this.selectedIndex+1)
      }
    },
    updateData(data){
      this.labelData = JSON.parse(JSON.stringify(data));
    },
    updateDataFromRight(data) {
      this.labelDataAdd = JSON.parse(JSON.stringify(data));
    },
    deleteFigure(index) {
      this.$refs.myDrawBoard.deleteFigure(index);
    },
    selectedFigure(index) {
      this.$refs.myDrawBoard.selectedFigure(index);
    },
  }
}
</script>

<style lang="scss" scoped>
.box {
  height: 610px;
  display: flex;
  flex-direction: row;
  // height: 100%;
  width: 100%;
  color: #bfcbd9;
}
.left{
  background-color: #282828;
  flex: 0 0 200px;
  border-right: 1px solid #171717;
  width: 300px;
  overflow:auto;
}
.middle{
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
}
.right{
  background-color: #282828;
  flex: 0 0 300px;
  border-left: 1px solid #171717;
  width: 300px;
  overflow:auto;
}
.selected{
  border: 2px solid yellow;
}
.image_list {
  padding: 4px;
}
.image_list::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #282828;
}
.image_list::-webkit-scrollbar-track {
  background-color: #d3dce6;
}
.image_list::-webkit-scrollbar-thumb {
  background-color: #99a9bf;
  border-radius: 20px;
}
</style>
