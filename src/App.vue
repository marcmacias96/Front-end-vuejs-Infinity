<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark  bg-dark shadow-sm">navbar 
      <div class="container">
        <router-link to="/index"> <strong>Red Social</strong></router-link> 
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
         
          <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >User</a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <router-link to="/login" class="dropdown-item">Entrar</router-link>  
                  <router-link to="/login" class="dropdown-item">Registrarse</router-link> 
                <div class="dropdown-divider"></div>
                 <router-link to="/login" class="dropdown-item">Salir</router-link> 
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div id="nav"></div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
