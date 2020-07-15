<style>
  div.outer {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    z-index: 1020;
  }

  div.inner {
    transform: translate(-50%, -50%);
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  div.notActive {
    display: none;
  }
</style>

<script>
  export let active = true;
  export let backgroundColor = "#aeaeae8a";
  export let text;
</script>

<div
  class="outer"
  class:notActive="{!active}"
  style="{`background-color: ${backgroundColor};`}"
>
  <div class="inner">
    {@html text.replace(/\n/g, '<br />')}
  </div>
</div>
