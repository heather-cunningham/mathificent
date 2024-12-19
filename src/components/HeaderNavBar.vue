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
</template>

<script>
export default {
  name: "HeaderNavBar",
}
</script>


<style scoped>
header {
  background: steelblue;
}
</style>