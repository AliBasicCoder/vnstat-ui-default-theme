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

  div.top {
    position: absolute;
    top: 27%;
    left: 50%;
    transform: translate(-50%);
  }

  div.notActive {
    display: none;
  }

  @media only screen and (min-width: 1064px) {
    div.top {
      top: 33%;
    }
  }

  @media only screen and (max-width: 868px) {
    div.top {
      top: 24%;
    }
  }
</style>

<script>
  export let active = true;
  export let backgroundColor = "#aeaeae8a";
  export let text = [];
  $: top = text.split("\n")[0].slice(7);
  $: bottom = text.slice(text.indexOf("\n") + 1).replace(/\n/g, "<br />");
</script>

<div
  class="outer"
  class:notActive="{!active}"
  style="{`background-color: ${backgroundColor};`}"
>
  <div class="top">
    <h3>{top}</h3>
  </div>
  <div class="inner">
    {@html bottom}
  </div>
</div>
