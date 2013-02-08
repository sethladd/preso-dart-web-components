title: Demo

<p class="centered">
  <code class="prettyprint">&lt;x-gangnam-style>&lt;/x-gangnam-style></code>
</p>

<style>
/*Need to define these globally. Don't work in the component.
See https://bugs.webkit.org/show_bug.cgi?id=72462 */
@-webkit-keyframes psydroid-dance {
  0% { top: 0; }
  20% { top: 4px; }
  30% { top: 0; }
  50% { top: 4px; }
  60% { top: 0; }
  80% { top: 4px; }
  90% { top: 0; }
  100% { top: 0; }
}
@-webkit-keyframes psydroid-leg-l {
  0% { top: 116px; }
  10% { top: 116px; }
  15% { top: 116px; }
  25% { top: 116px; }
  30% { top: 110px; }
  40% { top: 116px; }
  45% { top: 120px; }
  55% { top: 116px; }
  60% { top: 120px; }
  70% { top: 116px; }
  75% { top: 110px; }
  85% { top: 116px; }
  100% { top: 116px; }
}
@-webkit-keyframes psydroid-leg-r {
  0% { top: 116px; }
  10% { top: 120px; }
  15% { top: 110px; }
  25% { top: 116px; }
  30% { top: 120px; }
  40% { top: 116px; }
  45% { top: 110px; }
  55% { top: 116px; }
  60% { top: 110px; }
  70% { top: 116px; }
  75% { top: 120px; }
  85% { top: 116px; }
  100% { top: 116px; }
}
@-webkit-keyframes psydroid-arm-l {
  0% { -moz-transform: rotate(0deg); -webkit-transform: rotate(0deg); transform: rotate(0deg); }
  10% { -moz-transform: rotate(-60deg); -webkit-transform: rotate(-60deg); transform: rotate(-60deg); }
  20% { -moz-transform: rotate(-65deg); -webkit-transform: rotate(-65deg); transform: rotate(-65deg); }
  25% { -moz-transform: rotate(-55deg); -webkit-transform: rotate(-55deg); transform: rotate(-55deg); }
  40% { -moz-transform: rotate(-65deg); -webkit-transform: rotate(-75deg); transform: rotate(-75deg); }
  50% { -moz-transform: rotate(-60deg); -webkit-transform: rotate(-60deg); transform: rotate(-60deg); }
  55% { -moz-transform: rotate(-65deg); -webkit-transform: rotate(-80deg); transform: rotate(-80deg); }
  65% { -moz-transform: rotate(-55deg); -webkit-transform: rotate(-55deg); transform: rotate(-55deg); }
  80% { -moz-transform: rotate(-65deg); -webkit-transform: rotate(-65deg); transform: rotate(-65deg); }
  90% { -moz-transform: rotate(0deg); -webkit-transform: rotate(0deg); transform: rotate(0deg); }
  100% { -moz-transform: rotate(0deg); -webkit-transform: rotate(0deg); transform: rotate(0deg); }
}
@-webkit-keyframes psydroid-arm-r {
  0% { -moz-transform: rotate(0deg); -webkit-transform: rotate(0deg); transform: rotate(0deg); }
  10% { -moz-transform: rotate(60deg); -webkit-transform: rotate(60deg); transform: rotate(60deg); }
  20% { -moz-transform: rotate(65deg); -webkit-transform: rotate(65deg); transform: rotate(65deg); }
  25% { -moz-transform: rotate(55deg); -webkit-transform: rotate(55deg); transform: rotate(55deg); }
  40% { -moz-transform: rotate(65deg); -webkit-transform: rotate(75deg); transform: rotate(75deg); }
  50% { -moz-transform: rotate(60deg); -webkit-transform: rotate(60deg); transform: rotate(60deg); }
  55% { -moz-transform: rotate(65deg); -webkit-transform: rotate(80deg); transform: rotate(80deg); }
  65% { -moz-transform: rotate(55deg); -webkit-transform: rotate(55deg); transform: rotate(55deg); }
  80% { -moz-transform: rotate(65deg); -webkit-transform: rotate(65deg); transform: rotate(65deg); }
  90% { -moz-transform: rotate(0deg); -webkit-transform: rotate(0deg); transform: rotate(0deg); }
  100% { -moz-transform: rotate(0deg); -webkit-transform: rotate(0deg); transform: rotate(0deg); }
}
</style>

<p class="centered topmargin">
  <x-gangnam-style></x-gangnam-style>
</p>

---

title: Demo

<p class="centered">
  <code class="prettyprint">&lt;x-megabutton>Mega button&lt;/x-megabutton></code>
</p>

<p class="centered topmargin">
  <x-megabutton>Mega button</x-megabutton>
</p>

---

title: Defining Web Components
subtitle: key players
build_lists: true

- `&lt;template>`- *Scaffold/Blueprint*
    - inert chunks of clonable DOM. Can be activated for later use (e.g MDV)
- Shadow DOM - *Mortar/glue*
    - building blocks for encapsulation &amp; boundaries inside of DOM
- `&lt;element>` (custom elements) - *Toolbelt*
    - create new HTML elements - expand HTML's existing vocabulary.
    - extend existing DOM objects with new imperative APIs

---

title: Defining Web Components
subtitle: supporting cast
build_lists: true

- Style encapsulation
- Knowledge into app's state
    - DOM changes: `MutationObserver`
    - Model changes: `Object.observer()`
- CSS variables, `calc()`

<p class="centered topmargin build">
  <span><em>A collection new capabilities in the browser</em></span>
</p>

---

id: template-segue
title: Templates
subtitle: scaffold / blueprint
class: segue nobackground highlight fill
image: images/bgs/drinksblueprint.jpg

---

title: Templates...
subtitle: not<br> a new concept
class: nobackground funnyimage notnewconcept
image: images/animated/shock.gif

---

title: Oldschool templates
build_lists: true

*Method #1*: "offscreen" DOM using `[hidden]` or `display:none`

<pre class="prettyprint" data-lang="html">
&lt;div id="mytemplate" hidden>
  &lt;img src="logo.png">
  &lt;div class="comment">&lt;/div>
&lt;/div>
</pre>

1. <label class="good"></label> We're working directly w/ DOM. 
- <label class="bad"></label> Resources are still loaded (e.g. that `<img>`)
- <label class="bad"></label> Other side-effects like URLs not being fully composed yet.
- <label class="bad"></label> Style and theming is painful.
    - embedding page must scope all its CSS to `#mytemplate`.
    - no guarantees on future naming collisions.

---

title: Oldschool templates

*Method #2*: manipulating markup as string. Overload `<script>`:

<pre class="prettyprint" data-lang="js">
&lt;script id="mytemplate" <b>type="text/x-handlebars-template"</b>>
  &lt;img src="logo.png">
  &lt;div class="comment">&lt;/div>
&lt;/script>
</pre>

1. <label class="bad"></label> encourages run-time string parsing (via `.innerHTML`)
    - may include user-supplied data &rarr; XSS attacks.

<p class="topmargin"></p>

Examples: [handlebars.js](http://handlebarsjs.com/), John Resig's [micro-template script](http://ejohn.org/blog/javascript-micro-templating/)


---

title: Proper templating
subtitle:  <code>&lt;template&gt;</code>
spec_link: http://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/templates/index.html
#bug_link: https://bugs.webkit.org/show_bug.cgi?id=86031

Contains inert markup intended to be used later:

<pre class="prettyprint" data-lang="html">
&lt;template id="mytemplate">
  &lt;img src="">
  &lt;div class="comment">&lt;/div>
&lt;/template>
</pre>

1. <label class="good"></label> We're working directly w/ DOM again. 
- <label class="good"></label> Parsed, not rendered
    - `<script>`s don't run, images aren't loaded, media doesn't play, etc.

---

title: <code>&lt;template&gt;</code>

- Appending inert DOM to a node makes it go "live":

<pre class="prettyprint" data-lang="js">
var t = document.querySelector('#mytemplate');
t.content.querySelector('img').src = 'http://...';
document.body.appendChild(<b>t.content.cloneNode(true)</b>);
</pre>

<div class="build">

<div>
<code>.content</code> provides access to the <code>&lt;template&gt;</code>'s guts:</p>

<pre class="prettyprint" data-lang="interface">
interface HTMLTemplateElement : HTMLElement {
  attribute DocumentFragment content;
}
</pre>
</div>
</div>

---

title: End game: Model Driven Views (MDV)
spec_link: http://mdv.googlecode.com/git/docs/design_intro.html

<pre class="prettyprint" data-lang="html">
&lt;div id="example">
&lt;ul>
  <b>&lt;template iterate>
    &lt;li>{{ name }}
      &lt;ul>&lt;template iterate="skills">&lt;li>...&lt;/li>&lt;/template>&lt;/ul>
    &lt;/li>
  &lt;/template></b>
&lt;/ul>
&lt;/div>
&lt;script>
document.querySelector('#example')<b>.model</b> = [
  {name: 'Sally', skills: ['carpentry']}, 
  {name: 'Helen', skills: ['weaving', 'omnipotence']}
];
&lt;/script>
</pre>

---

content_class: flexbox vcenter centered

<h2 class="auto-fadein"><code>&lt;template&gt;</code></h2>
<h3 class="auto-fadein">baked into the web platform...</h3>

---

subtitle: $$$
class: nobackground dirty-sexy funnyimage
image: images/animated/dirty-sexy-money.gif


---

id: shadow-dom-segue
title: Shadow DOM
subtitle: mortar / glue
class: segue nobackground highlight fill
image: images/bgs/blocks.jpg

---

title: Turns out...
build_lists: true

<p class="centered build" style="font-size:40px;"><span>Browser vendor's have been holding out on us!</span></p>

- DOM nodes can already "host" hidden DOM.
- It can't be accessed traversing the DOM.

<div class="build shadowvideo">
<video controls height="300" src="http://www.ioncannon.net/examples/vp8-webm/big_buck_bunny_480p.webm"></video>
<p style="float:left;margin-left: 1em;">
<input type="date" style="zoom:2"><br>
<input type="time" style="zoom:2">
</p>
</div>

---

content_class: flexbox vcenter centered defintion

<h2 class="auto-fadein">Shadow DOM</h2>
<h3 class="auto-fadein">gives us encapsulation in the DOM and from JS</h3>

---

title: Encapsulation...
subtitle: not<br> a new concept
class: nobackground funnyimage notnewconcept
image: images/animated/shock.gif

---

id: shadow-dom-host
title: Attaching Shadow DOM to a host
spec_link: http://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html
content_class: flexbox vcenter centered

<img src="images/shadow/shadow-trees.svg" style="height: 100%;">

---

id: shadow-dom-render
title: Shadow tree is rendered instead
spec_link: http://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html
content_class: flexbox vcenter centered

<img src="images/shadow/shadow-rendering.svg" style="height:100%;">

<div class="devtools" title="click me" alt="click me"></div>

---

id: shadow-dom-creating
title: Creating Shadow DOM
spec_link: http://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#extensions-to-element

<aside class="note">
  <section>
    <img src="images/shadow/shadow-rendering.svg" style="width: 100%;">
  </section>
</aside>

<pre class="prettyprint" data-lang="html">
&lt;div id="host">
  &lt;h1>My Title&lt;/h1>
  &lt;h2>My Subtitle&lt;/h2>
  &lt;div>...other content...&lt;/div>
&lt;/div>
</pre>

<pre class="prettyprint" data-lang="js">
var host = document.querySelector('#host');
<b>var shadow = host.<a data-tooltip-property="createShadowRoot" data-tooltip-support='["webkit"]' data-tooltip-js>createShadowRoot</a>();</b>
<b>shadow.innerHTML = '&lt;h2>Yo, you got replaced!&lt;/h2>' +
                   '&lt;div>by my awesome content&lt;/div>';</b>
// <b>host.<a data-tooltip-property="shadowRoot" data-tooltip-support='["webkit"]' data-tooltip-js data-tooltip-js-property>shadowRoot</a>;</b>
</pre>

<div class="host">
  <h1>My Title</h1>
  <h2>My Subtitle</h2>
  <div>...other content...</div>
</div>

<script>
(function() {
var shadow = document.querySelector('#shadow-dom-creating .host').createShadowRoot();
shadow.innerHTML = '<h2>Yo, you got replaced!</h2>' +
                   '<div>by my awesome content</div>';
})();
</script>

---

content_class: flexbox vcenter centered unstyled

<h2 class="auto-fadein">Unstyled markup != sexy</h2>

---

id: shadow-dom-style-encapsulation
title: Style encapsulation

<aside class="note">
  <section>
    <img src="images/shadow/shadow-rendering.svg" style="width: 100%;">
  </section>
</aside>

<code>&lt;style></code>s defined in `ShadowRoot` are scoped.

<pre class="prettyprint" data-lang="js">
var shadow = document.querySelector('#host').<a data-tooltip-property="createShadowRoot" data-tooltip-support='["webkit"]' data-tooltip-js>createShadowRoot</a>();
shadow.innerHTML = '<b>&lt;style>h2 { color: red; }&lt;/style></b>' + 
                   '&lt;h2>Yo, you got replaced!&lt;/h2>' + 
                   '&lt;div>by my awesome content&lt;/div>';
</pre>

<div class="host">
  <h1>My Title</h1>
  <h2>My Subtitle</h2>
  <div>...other content...</div>
</div>

<script>
(function() {
var shadow = document.querySelector('#shadow-dom-style-encapsulation .host').createShadowRoot();
shadow.innerHTML = '<style>h2 { color: red;}</style>' + 
                   '<h2>Yo, you got replaced!</h2>' + 
                   '<div>by my awesome content</div>';

})();
</script>

---

id: shadow-style-control
title: Protection from the outside world

<aside class="note">
  <section>
    <img src="images/shadow/shadow-rendering.svg" style="width: 100%;">
  </section>
</aside>

Author's styles don't cross shadow boundary by default.

<pre class="prettyprint" data-lang="js">
var shadow = document.querySelector('#host').<a data-tooltip-property="createShadowRoot" data-tooltip-support='["webkit"]' data-tooltip-js>createShadowRoot</a>();
shadow.innerHTML = '&lt;style>h2 { color: red; }&lt;/style>&lt;h2>Yo, you got replaced!&lt;/h2>' +
                   '&lt;div>by my awesome content&lt;/div>';
<b data-action-resetstyleinheritance title="click me">// shadow.resetStyleInheritance = true;</b> // click me
<b data-action-applyauthorstyles title="click me">// shadow.applyAuthorStyles = true;</b> // click me
</pre>

<div class="host" style="margin-bottom:1em;">
  <h1>My Title</h1>
  <h2>My Subtitle</h2>
  <div>...other content...</div>
</div>

<script>
(function() {
var shadow = document.querySelector('#shadow-style-control .host').createShadowRoot();
// See crbug.com/162517 - !important needed for some reason.
shadow.innerHTML = '<style>h2 { color: red !important;}</style>' + 
                   '<h2>Yo, you got replaced!</h2>' + 
                   '<div>by my awesome content</div>';

var resetStyles = document.querySelector('#shadow-style-control [data-action-resetstyleinheritance]');
resetStyles.addEventListener('click', function(e) {
  shadow.resetStyleInheritance = !shadow.resetStyleInheritance;
  this.textContent = 'shadow.resetStyleInheritance = ' + shadow.resetStyleInheritance.toString() + ';';
});
var applyAuthorStyles = document.querySelector('#shadow-style-control [data-action-applyauthorstyles]');
applyAuthorStyles.addEventListener('click', function(e) {
  shadow.applyAuthorStyles = !shadow.applyAuthorStyles;
  this.textContent = 'shadow.applyAuthorStyles = ' + shadow.applyAuthorStyles.toString() + ';';
});

})();
</script>

---

id: shadow-host-at
title: Styling the host element
spec_link: http://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#host-at-rule

- Allows reacting to different states:

<pre class="prettyprint" data-lang="css">
&lt;style>
<b>@host</b> {
  /* Gotcha: higher specificity than any selector, lower than &lt;style&gt; attribute. */
  * {
    opacity: 0.2; <a data-tooltip-property="transition" data-tooltip-support='["webkit", "moz", "ms", "o", "unprefixed"]'>transition</a>: opacity 400ms ease-in-out;
  }
  *:hover { opacity: 1; }
}
&lt;/style>
</pre>

<div class="host">
  <h1>My Title</h1>
  <h2>My Subtitle</h2>
  <div>...other content...</div>
</div>

<script>
(function() {
var shadow = document.querySelector('#shadow-host-at .host').createShadowRoot();
shadow.innerHTML = '<style>h2 { color: red;}' +
'@host {\
  * {\
    opacity: 0.2;\
    -webkit-transition: opacity 400ms ease-in-out;\
  }\
  *:hover {\
    opacity: 1;\
  }\
}</style>' + 
'<h2>Yo, you got replaced!</h2>' + 
'<div>by my awesome content</div>';

})();
</script>

---

id: pseduo-element-styling
title: Custom pseudo elements
spec_link: https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#custom-pseudo-elements

<aside class="note notnewconcept funnyimage">
  <section>
    <h2>Custom pseudo elements...</h3>
    <img src="images/animated/shock.gif" style="width: 100%;">
    <h3>Not<br>a new concept</h3>
  </section>
</aside>

<p class="input-list centered">
<input type="range">
</p>

<div class="build">
<pre class="prettyprint" data-lang="css">
input[type=range].custom {
  -webkit-appearance: none;
  background-color: red;
}
input[type=range].custom<b>::-webkit-slider-thumb</b> {
  -webkit-appearance: none;
  background-color: blue;
  width: 10px;
  height: 40px;
}
</pre>
 
<p class="build input-list centered">
<span><input type="range" class="custom"></span>
<span><input type="range" class="custom bling"></span>
</p>
</div>

List of pseudo elements: [WebKit](http://trac.webkit.org/browser/trunk/Source/WebCore/css/html.css?format=txt), [FF](https://developer.mozilla.org/en-US/docs/CSS/CSS_Reference/Mozilla_Extensions#Pseudo-elements_and_pseudo-classes)

---

title: Style hooks: custom pseudo elements

Author allow certain elements to be styled by outsiders.

<pre class="prettyprint" data-lang="html">
&lt;style>
  #host<b>::x-slider-thumb</b> {
    background-color: blue;
  }
&lt;/style>
&lt;div id="host">&lt;/div>
&lt;script>
document.querySelector('#host').createShadowRoot().innerHTML = '&lt;div>' +
  '&lt;div <b>pseudo="x-slider-thumb"</b>>&lt;/div>' + 
'&lt;/div>';
&lt;/script>
</pre>

- Name needs to be prefixed with "`x-`"
- Can't access from outside JS, but can style them!

---

title: Style hooks: CSS Variables
subtitle: theming
spec_link: http://dev.w3.org/csswg/css-variables/

**Author** includes variable placeholders:

<pre class="prettyprint" data-lang="shadow dom css">
button {
  color: <a data-tooltip-property="var" data-tooltip-support='["webkit", "unprefixed"]'>var</a>(button-text-color);
  font: <a data-tooltip-property="var" data-tooltip-support='["webkit", "unprefixed"]'>var</a>(button-font);
}
</pre>

**Embedder** applies styles to the element:

<pre class="prettyprint" data-lang="css">
#host {
  <b><a data-tooltip-property="var" data-tooltip-support='["webkit", "unprefixed"]'>var</a>-button-text-color</b>: green;
  <b><a data-tooltip-property="var" data-tooltip-support='["webkit", "unprefixed"]'>var</a>-button-font</b>: "Comic Sans MS", "Comic Sans", cursive;
}
</pre>

<p class="centered">
<a href="demos/page.html" class="demo">DEMO</a>
</p>

---

title: Remember our host node

<pre class="prettyprint" data-lang="html">
&lt;div id="host">
  &lt;h1>My Title&lt;/h1>
  &lt;h2>My Subtitle&lt;/h2>
  &lt;div>...other content...&lt;/div>
&lt;/div>
</pre>

that guy rendered as:

<pre class="prettyprint" data-lang="html">
&lt;div id="host">
  <span style="opacity:0.5">#document-fragment</span>
    &lt;style>h2 {color: red;}&lt;/style>
    &lt;h2>Yo, you got replaced!&lt;/h2>
    &lt;div>by my awesome content&lt;/div>
&lt;/div>
</pre>

...everything was replaced when we attached the shadow DOM <label class="bad"></label>

---

id: insertion-points2
title: Insertion points
subtitle: funnels for host's children
content_class: flexbox vcenter centered build
build_lists: true

<div class="auto-fadein"></div>

---

id: shadow-dom-insertion-pts-example
title: Insertion points


- `content.getDistributedNodes()`: list of elements distributed in the insertion point.

<div class="columns-2">
<pre class="prettyprint" data-lang="host">
&lt;div id="host"&gt;
  &lt;h1&gt;My Title&lt;/h1&gt;
  &lt;h2&gt;My Subtitle&lt;/h2&gt;
  &lt;div&gt;...other content...&lt;/div&gt;
&lt;/div&gt;
</pre>

<pre class="prettyprint" data-lang="Shadow DOM" style="-webkit-column-break-before: always;">
&lt;style>
  h2 {color: red;}
&lt;/style>
&lt;hgroup>
  <b>&lt;content select="h2">&lt;/content&gt;</b>
  &lt;div&gt;You got enhanced&lt;/div&gt;
  <b>&lt;content select="h1:first-child">&lt;/content&gt;</b>
&lt;/hgroup>
<b>&lt;content select="*">&lt;/content&gt;</b>
</pre>
</div>

<div class="host">
  <h1>My Title</h1>
  <h2>My Subtitle</h2>
  <div>...other content...</div>
</div>

<script>
(function() {
var shadow = document.querySelector('#shadow-dom-insertion-pts-example .host').createShadowRoot();
shadow.innerHTML = '<style>\
h2 { color: red;}\
</style>\
<hgroup>\
  <content select="h2"></content>\
  <div>You got enhanced</div>\
  <content select="h1:first-child"></content>\
</hgroup>\
<content select="*"></content>';
})();
</script>

---

content_class: flexbox vcenter centered defintion

<h2 class="auto-fadein"><code>&lt;content&gt;</code></h2>
<h3 class="auto-fadein">insertion points allow us to define a declarative API</h3>

---

title: Cha-
subtitle: ching!
class: nobackground funnyimage
image: images/animated/irish-flick.gif

---

title: Custom Elements
subtitle: Putting it all together
class: segue nobackground highlight fill
image: images/bgs/istock-lasanga.jpg

<!-- <footer class="source black">http://www.flickr.com/photos/historyinanhour/4775644390/</footer> -->

---

title: Creating custom elements
spec_link: http://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/custom/index.html#declaring-custom-elements

Define a *declarative* "API" using insertion points:

<pre class="prettyprint" data-lang="x-tabs.html">
<b>&lt;element name="x-tabs"></b>
  &lt;template>
    &lt;style>...&lt;/style>
    &lt;content select="hgroup:first-child">&lt;/content>
  &lt;/template>
<b>&lt;/element></b>
</pre>

Include and use it:

<pre class="prettyprint" data-lang="yourapp.html">
&lt;link <b>rel="components"</b> href="x-tabs.html"&gt;
&lt;x-tabs>
  &lt;hgroup>
    &lt;h2>Title&lt;/h2>
    ...
  &lt;/hgroup>
&lt;/x-tabs>
</pre>

---

title: Define an imperative API
spec_link: http://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/custom/index.html#declaring-custom-elements

<pre class="prettyprint" data-lang="x-tabs.html">
&lt;element name="x-tabs" <b>constructor="TabsController"></b>
  &lt;template>...&lt;/template>
  <b>&lt;script&gt;
    TabsController.prototype = {
      doSomething: function() { ... }
    };
  &lt;/script&gt;</b>
&lt;/element>
</pre>

Declared `constructor` goes on global scope:

<pre class="prettyprint" data-lang="yourapp.html">
&lt;link rel="components" href="x-tabs.html"&gt;
&lt;script&gt;
<b>var tabs = new TabsController();</b> // or document.createElement('x-tabs')
tabs.addEventListener('click', function(e) { <b>e.target.doSomething();</b> });
document.body.appendChild(tabs);
&lt;/script&gt;
</pre>

---

title: Or, extend existing [custom] elements
#content_class: smaller

<pre class="prettyprint" data-lang="x-megabutton.html">
&lt;element name="x-megabutton" <b>extends="button"</b> <b>constructor="MegaButton"</b>>
  &lt;template>
    &lt;button>&lt;content>&lt;/content>&lt;/button>
  &lt;/template>
  &lt;script>
    MegaButton.prototype = {
      megaClick: function(e) {
        alert('BOOM!');
      }
    };
  &lt;/script>
&lt;/element>
</pre>

Use it:

<pre class="prettyprint" data-lang="yourapp.html">
&lt;link rel="components" href="x-megabutton.html">
&lt;x-megabutton>Mega button&lt;/x-megabutton>
</pre>

---

title: Demo

<p class="centered">
  <code class="prettyprint">&lt;x-gangnam-style>&lt;/x-gangnam-style></code>
</p>

<style>
/*Need to define these globally. Don't work in the component.
See https://bugs.webkit.org/show_bug.cgi?id=72462 */
@-webkit-keyframes psydroid-dance {
  0% { top: 0; }
  20% { top: 4px; }
  30% { top: 0; }
  50% { top: 4px; }
  60% { top: 0; }
  80% { top: 4px; }
  90% { top: 0; }
  100% { top: 0; }
}
@-webkit-keyframes psydroid-leg-l {
  0% { top: 116px; }
  10% { top: 116px; }
  15% { top: 116px; }
  25% { top: 116px; }
  30% { top: 110px; }
  40% { top: 116px; }
  45% { top: 120px; }
  55% { top: 116px; }
  60% { top: 120px; }
  70% { top: 116px; }
  75% { top: 110px; }
  85% { top: 116px; }
  100% { top: 116px; }
}
@-webkit-keyframes psydroid-leg-r {
  0% { top: 116px; }
  10% { top: 120px; }
  15% { top: 110px; }
  25% { top: 116px; }
  30% { top: 120px; }
  40% { top: 116px; }
  45% { top: 110px; }
  55% { top: 116px; }
  60% { top: 110px; }
  70% { top: 116px; }
  75% { top: 120px; }
  85% { top: 116px; }
  100% { top: 116px; }
}
@-webkit-keyframes psydroid-arm-l {
  0% { -moz-transform: rotate(0deg); -webkit-transform: rotate(0deg); transform: rotate(0deg); }
  10% { -moz-transform: rotate(-60deg); -webkit-transform: rotate(-60deg); transform: rotate(-60deg); }
  20% { -moz-transform: rotate(-65deg); -webkit-transform: rotate(-65deg); transform: rotate(-65deg); }
  25% { -moz-transform: rotate(-55deg); -webkit-transform: rotate(-55deg); transform: rotate(-55deg); }
  40% { -moz-transform: rotate(-65deg); -webkit-transform: rotate(-75deg); transform: rotate(-75deg); }
  50% { -moz-transform: rotate(-60deg); -webkit-transform: rotate(-60deg); transform: rotate(-60deg); }
  55% { -moz-transform: rotate(-65deg); -webkit-transform: rotate(-80deg); transform: rotate(-80deg); }
  65% { -moz-transform: rotate(-55deg); -webkit-transform: rotate(-55deg); transform: rotate(-55deg); }
  80% { -moz-transform: rotate(-65deg); -webkit-transform: rotate(-65deg); transform: rotate(-65deg); }
  90% { -moz-transform: rotate(0deg); -webkit-transform: rotate(0deg); transform: rotate(0deg); }
  100% { -moz-transform: rotate(0deg); -webkit-transform: rotate(0deg); transform: rotate(0deg); }
}
@-webkit-keyframes psydroid-arm-r {
  0% { -moz-transform: rotate(0deg); -webkit-transform: rotate(0deg); transform: rotate(0deg); }
  10% { -moz-transform: rotate(60deg); -webkit-transform: rotate(60deg); transform: rotate(60deg); }
  20% { -moz-transform: rotate(65deg); -webkit-transform: rotate(65deg); transform: rotate(65deg); }
  25% { -moz-transform: rotate(55deg); -webkit-transform: rotate(55deg); transform: rotate(55deg); }
  40% { -moz-transform: rotate(65deg); -webkit-transform: rotate(75deg); transform: rotate(75deg); }
  50% { -moz-transform: rotate(60deg); -webkit-transform: rotate(60deg); transform: rotate(60deg); }
  55% { -moz-transform: rotate(65deg); -webkit-transform: rotate(80deg); transform: rotate(80deg); }
  65% { -moz-transform: rotate(55deg); -webkit-transform: rotate(55deg); transform: rotate(55deg); }
  80% { -moz-transform: rotate(65deg); -webkit-transform: rotate(65deg); transform: rotate(65deg); }
  90% { -moz-transform: rotate(0deg); -webkit-transform: rotate(0deg); transform: rotate(0deg); }
  100% { -moz-transform: rotate(0deg); -webkit-transform: rotate(0deg); transform: rotate(0deg); }
}
</style>

<p class="centered topmargin">
  <x-gangnam-style></x-gangnam-style>
</p>

---

title: Demo

<p class="centered">
  <code class="prettyprint">&lt;x-megabutton>Mega button&lt;/x-megabutton></code>
</p>

<p class="centered topmargin">
  <x-megabutton>Mega button</x-megabutton>
</p>

---

title: Demo

<pre class="prettyprint" data-lang="html">
&lt;x-meme src="images/beaches.jpg">
  &lt;h1 contenteditable>Stay classy&lt;/h1>
  &lt;h2 contenteditable>Web!&lt;/h2>
&lt;/x-meme>
</pre>

<p class="centered topmargin">
<a href="http://localhost:3000/toolkit/mystuff/meme.html" class="demo">DEMO</a>
</p>

---

id: tab-component-example
title: Demo

<div class="columns-2">
<h3>Web Components <img src="images/logos/webcomponents.png"></h3>
<pre class="prettyprint" data-lang="html">
&lt;x-tab&gt;
  &lt;h2&gt;One&lt;/h2&gt;
  &lt;section&gt;
    Code to instantiate this component:
    &lt;pre&gt;&lt;/pre&gt;
  &lt;/section&gt;
  &lt;h2&gt;Two is bigger than three&lt;/h2&gt;
  &lt;section&gt;
    Second panel hotness
  &lt;/section&gt;
&lt;/x-tab&gt;
</pre>

<h3 style="-webkit-column-break-before: always;"><img src="images/logos/angular.png"> AngularJS</h3>
<pre class="prettyprint" data-lang="html">
&lt;tabs ng-app=&quot;tabs&quot;&gt;
  &lt;pane title=&quot;One&quot;&gt;
    Code to instantiate this component:
    &lt;pre&gt;&lt;/pre&gt;
  &lt;/pane&gt;
  &lt;pane title=&quot;Two is bigger than three&quot;&gt;
    Second panel hotness.
  &lt;/pane&gt;
&lt;/tabs&gt;
</pre>
</div>

<p class="centered"><a href="demos/components/tabs/index.html" class="demo">DEMO</a></p>
