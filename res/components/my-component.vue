<template>
  <article class="hello">
    <h3>{{title}}</h3>
    <hr/>
    <p>
      <span class="info-big">Your Fingerprint:</span>
      <span class="fp-big">{{ retFp('uid') }}</span>
    </p>
    <br/><hr/><br/>
<p v-for="item in fprints" :key="item.fpref">
  <span class="info">{{item.label}}:</span>
  <span class="fp">- {{ retFp(item.fpref) }}</span>
</p>
  </article>
</template>

<script>
function swFingerprint(condition){
  switch (condition) {
  case 'uid':
    return uid
    break;
  case 'browser':
    return fingerprint_browser()
    break;
  case 'flash':
    return fingerprint_flash()
    break;
  case 'canvas':
    return fingerprint_canvas()
    break;
  case 'connection':
    return fingerprint_connection()
    break;
  case 'cookie':
    return fingerprint_cookie()
    break;
  case 'display':
    return fingerprint_display()
    break;
  case 'fontsmoothing':
    return fingerprint_fontsmoothing()
    break;
  case 'fonts':
    return fingerprint_fonts()
    break;
  case 'formfields':
    return fingerprint_formfields()
    break;
  case 'java':
    return fingerprint_java()
    break;
  case 'language':
    return fingerprint_language()
    break;
  case 'silverlight':
    return fingerprint_silverlight()
    break;
  case 'os':
    return fingerprint_os()
    break;
  case 'timezone':
    return fingerprint_timezone()
    break;
  case 'touch':
    return fingerprint_touch()
    break;
  case 'plugins':
    return fingerprint_plugins()
    break;
  case 'useragent':
    return fingerprint_useragent()
    break;
  case 'truebrowser':
    return fingerprint_truebrowser()
    break;
  default:
    return uid
  }
}
  module.exports = {
    data: () => ({
      title: 'my component',
      fprints: [
        { label: 'browser', fpref: 'browser'},
        { label: 'flash', fpref: 'flash'},
        { label: 'canvas', fpref: 'canvas'},
        { label: 'connection', fpref: 'connection'},
        { label: 'cookie', fpref: 'cookie'},
        { label: 'display', fpref: 'display'},
        { label: 'fontsmoothing', fpref: 'fontsmoothing'},
        { label: 'fonts', fpref: 'fonts'},
        { label: 'formfields', fpref: 'formfields'},
        { label: 'java', fpref: 'java'},
        { label: 'language', fpref: 'language'},
        { label: 'silverlight', fpref: 'silverlight'},
        { label: 'os', fpref: 'os'},
        { label: 'timezone', fpref: 'timezone'},
        { label: 'touch', fpref: 'touch'},
        { label: 'plugins', fpref: 'plugins'},
        { label: 'useragent', fpref: 'useragent'},
        { label: 'truebrowser', fpref: 'truebrowser'}
      ]
    }),
    methods: {
      retFp(ctx){
        // return `retFp: ${ctx}`
        return swFingerprint(ctx)
      }
    }
  }
</script>

<style>
.hello {
    background-color: #ddd;
}
.hello p:after {
  clear: both;
}
</style>