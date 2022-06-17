<template>
  <nav class="nav"> 
    <p class="nav_title">Fiters TODO</p>
    <div class="nav_links">
      <ul class="nav_links-list">
        <li class="nav_singlelink">Lists</li> 
        <li class="nav_singlelink">Help</li>
      </ul>
      <div class="nav_photo"></div>
      <i class="fa-solid fa-ellipsis-vertical nav_links-menu"></i>
    </div>
  </nav>
  <router-view />
</template>

<style lang="scss">
body {
  margin: 0;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
#app {
  height: 100vh;
  font-family: 'Raleway', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.nav {
  display: flex;
  justify-content: space-between;
  background-color: #4c63d3;
  color: white;
  padding: 0.2em 3em;
  &_title {
    font-weight: bold;
    font-size: 18px;
  } 
  &_links  {
    display: flex;
    align-items: center;
    &-list {
      display: flex;
    } 
    &-menu {
      display: none;
    } 
  }
  &_singlelink{
    margin: 0 0.5em;
  }

  &_photo {
    width: 2em;
    height: 2em;
    background-color: white;
    border-radius: 50%;
  }
  a {
    color: #2c3e50;
  }
}
@media (max-width: 450px) {
  .nav{
    padding: 0.2em 1em;
    &_links{
      &-list{
        display: none;
      }
      &-menu{
        display: flex;
        justify-content: center;
        width: 2em;
      }
    }
  }
}
</style>
