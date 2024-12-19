<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <button class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#main-menu-navbar"
                title="Main Menu"
                aria-label="Main Menu toggle button">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div id="main-menu-navbar" class="collapse navbar-collapse">
          <ul class="navbar-nav mr-auto text-left">
            <li class="nav-item active">
              <a class="nav-link" href="/" aria-label="Mathificent Home">Home</a>
            </li>
          </ul>
        </div>

        <a class="navbar-brand" href="/" aria-label="Mathificent Home">Mathificent!</a>
      </div>
    </nav>
  </header>

  <h1>Mathificent!</h1>

  <footer class="navbar fixed-bottom">
    <div class="container-fluid">
      <div class="d-flex align-items-start text-light">
        Copyright &copy; {{ new Date().getFullYear()}}&nbsp;
        <a class="nav-link fst-italic text-decoration-underline"
           href="https://www.webucator.com"
           target="_blank"
           title="Go to the Webucator training platform">
          Webucator
        </a>
        &nbsp;&nbsp;&verbar;&nbsp;&nbsp;
        Website by&nbsp;
        <a class="nav-link fst-italic text-decoration-underline"
           href="https://github.com/heather-cunningham"
           aria-label="See my GitHub portfolio"
           title="See my GitHub portfolio"
           target="_blank">
          Heather I. Cunningham
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'App',
  components: {
    
  }
}
</script>


<style>
header, footer {
  background: steelblue;
}
</style>
