<template>
  <div class="home">
    <div class="listCard_container">
      <div class="listCard_header">
        <h3>TO DO</h3>
        <button class="listCard_add" @click="addingList ? addingList = false : addingList = true">Add List</button>
      </div>
      <div class="listCard_list">
        <div v-if="addingList" class="listCard">
          <input @blur="addingList = false" ref="addingListinput" @keyup.enter="postList({ title: listTitle })" placeholder="New list name" class="addtask_input" type="text" name="title" id="listTitle"  v-model="listTitle"> 
        </div>
        <div @click="getListID(list.id)" class="listCard" v-for="(list, index) in lists" :key="index">
          <p class="listCard_title">{{ list.title }}</p>
          <i class="fa-solid fa-angles-right"></i>
        </div>
      </div>
    </div>
    <div class="listInfo_container">
      <div class="listInfo" v-if="listInfo">
        <div class="listInfo_wrapper">
            <div class="listInfo_info">
              <h4>{{ listInfo.title }}</h4>
              <i @click="listmenu ? listmenu = false : listmenu = true" class="fa-solid fa-ellipsis-vertical listInfo_info-menu">
                <div v-if="listmenu" class="listInfo_info-menu-wrapper">
                  <ul>
                    <li><button class="listInfo_info-delete" @click="deleteList(listInfo.id)">Delete List</button></li>
                  </ul>
                </div>
              </i>
            </div>
            <div class="listInfo_tasks-container">
              <div v-for="(task, index) in listInfo.tasks" :key="index">
                <div class="listInfo_tasks">
                  <div class="listInfo_tasks-wrapper" @click="taskMoreInfo ? taskMoreInfo = null : taskMoreInfo = task.id">
                    <p class="listInfo_tasks-title">{{ task.title }}</p>
                    <div class="listInfo_tasks-icons">
                      <i class="fa-solid fa-angle-down listInfo_tasks-more"></i>  
                      <i @click="deleteTask(task.id)" class="fa-solid fa-trash-can listInfo_tasks-delete"></i>
                    </div>
                  </div>
                  <div v-if="taskMoreInfo == task.id" class="listInfo_tasks-moreinfo ">
                    <div> <!-- no PUT or PATCH Request was asked for the technical test but it would be possible to put it here to update the done property on the back-end -->
                      <input class="listInfo_tasks-done" :value="task.done" type="checkbox" :name="task.title" :id="task.id">
                      <label :for="task.id">Done !</label>
                    </div>
                    <div>
                      <p class="listInfo_tasks-moreinfo-titles">Description</p>
                      <p>{{ task.description }}</p>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          <div class="addtask_container" v-if="addingTask">
            <div class="addtask_input-wrapper">
              <label for="tasktitle">Task title</label>
              <input class="addtask_input" ref="addingTaskinput" type="text" name="title" id="tasktitle"  v-model="taskTitle"> 
            </div>
            <div class="addtask_input-wrapper">
              <label for="taskdescription">Task description</label>
              <textarea class="addtask_input" name="description" id="taskdescription" rows="2"  v-model="taskDescription"></textarea>
            </div>
            <button class="addtask_button" type="submit" @click.prevent="postTask({title: taskTitle, description: taskDescription, listID: listInfo.id})">Add Task</button>
          </div>
        </div>
        <button class="listInfo_info-add" @click="addingTask ? addingTask = false : addingTask = true">{{ addingTask ? "Cancel" : "Add Task" }}</button>
      </div>
      <div v-else>
        <h3>Click on a List to se more information about it</h3>
      </div>
      
    </div>
    
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "HomeTasks",
  
  data() {
    return {
      listInfo: null,
      addingList: false,
      listTitle: "",
      listmenu: false,
      taskMoreInfo: null,
      addingTask: false,
      taskTitle: "",
      taskDescription: "",
    };
  },
  mounted() {
    this.getTasks();
    this.getLists();
  },
  computed: {
    ...mapState("tasks", ["tasks"]),
    ...mapState("lists", ["lists"]),

  },
  watch: {
    addingList () {
      if (this.addingList) {
        this.$nextTick(() => {
          return this.$refs.addingListinput.focus()
        })
      }
    },
    addingTask () {
      if (this.addingList) {
        this.$nextTick(() => {
          return this.$refs.addingTaskinput.focus()
        })
      }
    },
    tasks () {
      return this.tasks;
    },
  },
  methods: {
    ...mapActions("tasks", ["getTasks", "postTask", "deleteTask"]),
    ...mapActions("lists", ["getLists", "postList", "deleteList"]),

    getListID(id){
      this.addingList = false
      this.listInfo = this.lists[id]
    }
  },
};
</script>

<style lang="scss">
.home {
  display: flex;
  height: -webkit-calc(100% - 64px); /* google, safari */;
  
}
.listCard {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  border-radius: 0.5em;
  // border-bottom: 0.1em solid rgba($color: #000000, $alpha: 0.2);
  box-shadow: 0.1em 0.1em 0.1em rgba($color: #000000, $alpha: 0.2);
  padding: 0.8em;
  margin: 0.5em 0;
  transition: all 0.1s ease-in-out;
  &_container{
    min-width: 30%;
    padding: 0 2.5em 0 1.5em;
  }
  &_list {
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 0 2em 0 0;
    &::-webkit-scrollbar{
    width: 0.2em;
    }
    &::-webkit-scrollbar-thumb {
    background: #4c63d3;
    border-radius: 1em;
    }
  }
  &_header{
    display: flex;
    align-items: center;
    justify-content:  space-between;
  }
  &_add{
    cursor: pointer;
    background-color: #4c63d3;
    color: white;
    border-radius: 0.5em;
    border: 0;
    padding: 0.5em 1em;
  }
  &_wrapper{
    display: flex;
    align-items: center;
  }
  &_title{
    margin: 0;
  }
  &_check{
    accent-color: #4c63d3;
    margin: 0 0.5em;
  }
  
  &:active{
    transform: scale(1.01);
    box-shadow: 0.1em 0.1em 0.1em rgba($color: #000000, $alpha: 0);
    
  }
  
}
.listInfo {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  &_wrapper{
    display: flex;
    flex-direction: column;
    align-content: space-between ;
    max-height: 95%;
  }
  &_info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-menu{
      position: relative;
      width: 2em;
      text-align: center;
      &-wrapper{
        position: absolute;
        width: max-content;
        background-color: #fff;
        right: 0;
        border-radius: 0.25em;
        padding: 0.25em;
      }
    }
    &-delete{
      cursor: pointer;
      font-weight: bold;
      background-color: white;
      color: #D2042D;
      border: 0;
      border-radius: 0.25em;
      padding: 0.5em 1em;
      transition: all 0.1s ease-in-out;

      &:hover{
        background-color: #D2042D;
        color: white;
    }
    }
    &-add{
      cursor: pointer;
      background-color: #4c63d3;
      color: white;
      border-radius: 0.5em;
      border: 0;
      padding: 0.5em 1em;
    }
  }
  &_container{
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    background-color: #f1f1f1 ;
    padding: 1em 1.5em;
    
  }
  &_tasks{
    background-color: #fff;
    border-radius: 0.25em;
    margin: 0.5em 0;
    p{
      margin: 0;
    }
    &-container{
      overflow-x: hidden;
      overflow-y: scroll;
      &::-webkit-scrollbar{
        width: 0.2em;
      }
      &::-webkit-scrollbar-thumb {
        background: #4c63d3;
        border-radius: 1em;
      }
    }
    &-wrapper{
      cursor: pointer;  
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1em 1em;
    }
    &-icons{
      display: flex;
      align-items: center;
    }
    &-delete{
      cursor: pointer;
      width: 2em;
      text-align: center;
      color: #D2042D;
      margin: 0.5em;

    }
    &-more{
      text-align: center;
      margin: 0.5em;
    }
    &-done{
      accent-color: #4c63d3;
      margin: 0 0.5em 0 0;
    }
    &-moreinfo{
      background-color: #F8F8F8;
      padding: 0.5em 1em;
      &-titles{
        color: #4c63d3;
        margin: 0.5em 0 !important;
      }
    }
  }
  
}
.addtask{
  &_container{
    padding: 1em 0;
  }
  &_input{
    border: 0;
    border-radius: 0.25em;
    outline: 0.1em solid #4c63d3;
    &-wrapper{
      display: flex;
      flex-direction: column;
      margin: 1em 0;
    }
  }
  
  &_button{
    cursor: pointer;
    background-color: #4c63d3;
    color: white;
    border-radius: 0.5em;
    border: 0;
    padding: 0.5em 1em;
  }
}

@media (max-width: 750px) {
  .home {
  flex-direction: column;
  }
  .listCard {
    width: 15em;
    min-width: 15em;
    margin: 0.5em;
    margin-left: 0;
    &_container{
      width: auto;
      padding: 0 2.5em 1em 1.5em;
      
    }
    &_list {
      display: flex;
      overflow-x: scroll;
      overflow-y: hidden;
      &::-webkit-scrollbar{
      height: 0.2em;
    }
    }
  }
  .listInfo {
    &_container{
      padding: 1em 1.5em;
    }
    &_wrapper{
      display: flex;
      flex-direction: column;
      align-content: space-between ;
      max-height: 90%;
    }
  }
}

@media (max-width: 450px) {
  .listCard {
    min-width: 12em;
  }
}
</style>