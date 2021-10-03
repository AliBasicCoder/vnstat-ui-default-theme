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

  div.note {
    position: absolute;
    bottom: 36%;
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

  button {
    position: absolute;
    top: -71px;
    right: -2.7rem;
    border: none;
    background: none;
    font-weight: bold;
    font-size: 25px;
  }
</style>

<script>
  export let active = false;
  export let backgroundColor = "#aeaeae8a";
  export let text = "";
  $: top = text.split("\n")[0].slice(7);
  $: bottom = text.slice(text.indexOf("\n") + 1).replace(/\n/g, "<br />");
</script>

<div
  class="outer"
  class:notActive="{!active}"
  style="{`background-color: ${backgroundColor};`}"
>
  <div class="top">
    <button on:click="{() => (active = false)}">X</button>
    <h3>{top}</h3>
  </div>
  <div class="inner">
    {@html bottom}
  </div>
  <div class="note">
    if you think this is an bug please post an issue on
    <a href="https://github.com/AliBasicCoder/vnstat-ui-default-theme/issues">
      our github
    </a>
  </div>
</div>
