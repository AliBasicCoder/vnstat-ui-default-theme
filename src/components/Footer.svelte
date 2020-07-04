<style>
  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: #f5f5f5;
  }

  span {
    color: #6c757d;
  }

  footer.black {
    background-color: #6d6d6d;
  }

  span.black {
    color: white;
  }
</style>

<script>
  import { store } from "../stores/store.js";

  $: black = $store.config.black;
</script>

<footer class:black>
  <div class="container">
    <span class:black>Copyright (C) 2020 AliBasicCoder</span>
  </div>
</footer>
