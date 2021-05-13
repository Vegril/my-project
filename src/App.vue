<template>
  <div id="app">
    <div id="nav">
      <router-link to="/node">Node</router-link>|
      <router-link to="/subtitle">Subtitle</router-link>|
      <router-link to="/Ae">Ae动画</router-link>|
      <router-link to="/three">three.js</router-link>|
      <router-link to="/overlay">叠图动画</router-link>|
      <router-link to="/channel">声道分离合并</router-link>|
      <router-link to="/matting">抠图</router-link>|
      <router-link to="/pendant">挂件运动</router-link>|
      <router-link to="/filter">滤镜</router-link>|
      <router-link to="/transition">转场</router-link>|
      <router-link to="/fault">故障</router-link>|
      <router-link to="/glTransition">glTransition</router-link>|
      <router-link to="/Webgl">Webgl</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  outline: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
