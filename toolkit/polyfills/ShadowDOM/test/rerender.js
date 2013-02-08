/*
 * Copyright 2012 The Toolkitchen Authors. All rights reserved.
 * Use of this source code is goverened by a BSD-style
 * license that can be found in the LICENSE file.
 */

suite('Shadow DOM rerender', function() {

  function getVisualInnerHtml(el) {
    return HTMLElement_prototype.innerHTML.get.call(el);
  }

  test('No <content> nor <shadow>', function() {
    var host = document.createElement('div');
    host.innerHTML = '<a></a>';
    var a = host.firstChild;

    var shadowRoot = host.jsCreateShadowRoot();
    shadowRoot.textContent = 'text';
    var textNode = shadowRoot.firstChild;

    function testRender() {
      render(host);

      assert.strictEqual(getVisualInnerHtml(host), 'text');

      var wrapperHost = logical.getWrapper(host);
      var wrapperA = logical.getWrapper(a);
      var wrapperShadowRoot = logical.getWrapper(shadowRoot);
      var wrapperTextNode = logical.getWrapper(textNode);

      expectStructure(wrapperHost, {
        firstChild: wrapperA,
        lastChild: wrapperA
      });

      expectStructure(wrapperA, {
        parentNode: wrapperHost
      });

      expectStructure(wrapperShadowRoot, {
        firstChild: wrapperTextNode,
        lastChild: wrapperTextNode
      });

      expectStructure(wrapperTextNode, {
        parentNode: wrapperShadowRoot
      });
    }

    testRender();
    testRender();
  });

test('<content>', function() {
    var host = document.createElement('div');
    host.innerHTML = '<a></a>';
    var a = host.firstChild;

    var shadowRoot = host.jsCreateShadowRoot();
    shadowRoot.innerHTML = '<content></content>';
    var content = shadowRoot.firstChild;

    function testRender() {
      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<a></a>');

      var wrapperHost = logical.getWrapper(host);
      var wrapperA = logical.getWrapper(a);
      var wrapperShadowRoot = logical.getWrapper(shadowRoot);
      var wrapperContent = logical.getWrapper(content);

      expectStructure(wrapperHost, {
        firstChild: wrapperA,
        lastChild: wrapperA
      });

      expectStructure(wrapperA, {
        parentNode: wrapperHost
      });

      expectStructure(wrapperShadowRoot, {
        firstChild: wrapperContent,
        lastChild: wrapperContent
      });

      expectStructure(wrapperContent, {
        parentNode: wrapperShadowRoot
      });
    }

    testRender();
    testRender();
  });

  test('<content> with fallback', function() {
    var host = document.createElement('div');
    host.innerHTML = '<a></a>';
    var a = host.firstChild;

    var shadowRoot = host.jsCreateShadowRoot();
    shadowRoot.innerHTML = '<content select="b">fallback</content>';
    var content = shadowRoot.firstChild;
    var fallback = content.firstChild;

    function testRender() {
      render(host);
      assert.strictEqual(getVisualInnerHtml(host), 'fallback');

      var wrapperHost = logical.getWrapper(host);
      var wrapperA = logical.getWrapper(a);
      var wrapperShadowRoot = logical.getWrapper(shadowRoot);
      var wrapperContent = logical.getWrapper(content);
      var logicalFallbackWrapper = logical.getWrapper(fallback);

      expectStructure(wrapperHost, {
        firstChild: wrapperA,
        lastChild: wrapperA
      });

      expectStructure(wrapperA, {
        parentNode: wrapperHost
      });

      expectStructure(wrapperShadowRoot, {
        firstChild: wrapperContent,
        lastChild: wrapperContent
      });

      expectStructure(wrapperContent, {
        parentNode: wrapperShadowRoot,
        firstChild: logicalFallbackWrapper,
        lastChild: logicalFallbackWrapper
      });

      expectStructure(logicalFallbackWrapper, {
        parentNode: wrapperContent
      });
    }

    testRender();
    testRender();
  });

test('<shadow>', function() {
    var host = document.createElement('div');
    host.innerHTML = '<a></a>';
    var a = host.firstChild;

    var shadowRoot = host.jsCreateShadowRoot();
    shadowRoot.innerHTML = '<shadow></shadow>';
    var shadow = shadowRoot.firstChild;

    function testRender() {
      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '');

      var wrapperHost = logical.getWrapper(host);
      var wrapperA = logical.getWrapper(a);
      var wrapperShadowRoot = logical.getWrapper(shadowRoot);
      var logicalShadowWrapper = logical.getWrapper(shadow);

      expectStructure(wrapperHost, {
        firstChild: wrapperA,
        lastChild: wrapperA
      });

      expectStructure(wrapperA, {
        parentNode: wrapperHost
      });

      expectStructure(wrapperShadowRoot, {
        firstChild: logicalShadowWrapper,
        lastChild: logicalShadowWrapper
      });

      expectStructure(logicalShadowWrapper, {
        parentNode: wrapperShadowRoot
      });
    }

    testRender();
    testRender();
  });

  test('<shadow> with fallback', function() {
    var host = document.createElement('div');
    host.innerHTML = '<a></a>';
    var a = host.firstChild;

    var shadowRoot = host.jsCreateShadowRoot();
    shadowRoot.innerHTML = '<shadow>fallback</shadow>';
    var shadow = shadowRoot.firstChild;
    var fallback = shadow.firstChild;

    function testRender() {
      render(host);
      assert.strictEqual(getVisualInnerHtml(host), 'fallback');

      var wrapperHost = logical.getWrapper(host);
      var wrapperA = logical.getWrapper(a);
      var wrapperShadowRoot = logical.getWrapper(shadowRoot);
      var logicalShadowWrapper = logical.getWrapper(shadow);
      var logicalFallbackWrapper = logical.getWrapper(fallback);

      expectStructure(wrapperHost, {
        firstChild: wrapperA,
        lastChild: wrapperA
      });

      expectStructure(wrapperA, {
        parentNode: wrapperHost
      });

      expectStructure(wrapperShadowRoot, {
        firstChild: logicalShadowWrapper,
        lastChild: logicalShadowWrapper
      });

      expectStructure(logicalShadowWrapper, {
        parentNode: wrapperShadowRoot,
        firstChild: logicalFallbackWrapper,
        lastChild: logicalFallbackWrapper
      });

      expectStructure(logicalFallbackWrapper, {
        parentNode: logicalShadowWrapper
      });
    }

    testRender();
    testRender();
  });

  test('<shadow> with nested shadow roots', function() {
    var host = document.createElement('div');
    host.innerHTML = '<a></a>';
    var a = host.firstChild;

    var oldestShadowRoot = host.jsCreateShadowRoot();
    oldestShadowRoot.textContent = 'text';
    var textNode = oldestShadowRoot.firstChild;

    var youngestShadowRoot = host.jsCreateShadowRoot();
    youngestShadowRoot.innerHTML = '<shadow></shadow>';
    var shadow = youngestShadowRoot.firstChild;

    function testRender() {
      render(host);
      assert.strictEqual(getVisualInnerHtml(host), 'text');

      var wrapperHost = logical.getWrapper(host);
      var wrapperA = logical.getWrapper(a);
      var logicalOldestShadowRootWrapper = logical.getWrapper(oldestShadowRoot);
      var wrapperTextNode = logical.getWrapper(textNode);
      var logicalYoungestShadowRootWrapper =
          logical.getWrapper(youngestShadowRoot);
      var logicalShadowWrapper = logical.getWrapper(shadow);

      expectStructure(wrapperHost, {
        firstChild: wrapperA,
        lastChild: wrapperA
      });

      expectStructure(wrapperA, {
        parentNode: wrapperHost
      });

      expectStructure(logicalOldestShadowRootWrapper, {
        firstChild: wrapperTextNode,
        lastChild: wrapperTextNode
      });

      expectStructure(wrapperTextNode, {
        parentNode: logicalOldestShadowRootWrapper
      });

      expectStructure(logicalYoungestShadowRootWrapper, {
        firstChild: logicalShadowWrapper,
        lastChild: logicalShadowWrapper
      });

      expectStructure(logicalShadowWrapper, {
        parentNode: logicalYoungestShadowRootWrapper
      });
    }

    testRender();
    testRender();
  });

  suite('Mutate logical DOM', function() {
    test('removeAllChildNodes - mutate host', function() {
      var host = document.createElement('div');
      host.innerHTML = '<a>Hello</a>';

      var shadowRoot = host.jsCreateShadowRoot();
      shadowRoot.innerHTML = '<content>fallback</content>';

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<a>Hello</a>');

      var wrapperHost = logical.getWrapper(host);
      wrapperHost.firstChild.removeAllChildNodes();

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<a></a>');

      wrapperHost.removeAllChildNodes();
      render(host);
      assert.strictEqual(getVisualInnerHtml(host), 'fallback');
    });

    test('removeAllChildNodes - mutate shadow', function() {
      var host = document.createElement('div');
      host.innerHTML = '<a>Hello</a>';

      var shadowRoot = host.jsCreateShadowRoot();
      shadowRoot.innerHTML = '<content></content><b>after</b>';

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<a>Hello</a><b>after</b>');

      var wrapperShadowRoot = logical.getWrapper(shadowRoot);
      wrapperShadowRoot.lastChild.removeAllChildNodes();

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<a>Hello</a><b></b>');

      wrapperShadowRoot.removeAllChildNodes();
      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '');
    });

    test('removeAllChildNodes - mutate shadow fallback', function() {
      var host = document.createElement('div');
      host.innerHTML = '<a>Hello</a>';

      var shadowRoot = host.jsCreateShadowRoot();
      shadowRoot.innerHTML = '<content select="xxx"><b>fallback</b></content>';

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<b>fallback</b>');

      var wrapperShadowRoot = logical.getWrapper(shadowRoot);

      wrapperShadowRoot.firstChild.firstChild.removeAllChildNodes();

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<b></b>');

      wrapperShadowRoot.firstChild.removeAllChildNodes();

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '');

      wrapperShadowRoot.removeAllChildNodes();
      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '');
    });

    test('removeChild - mutate host', function() {
      var host = document.createElement('div');
      host.innerHTML = '<a>Hello</a>';

      var shadowRoot = host.jsCreateShadowRoot();
      shadowRoot.innerHTML = '<content>fallback</content>';

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<a>Hello</a>');

      var wrapperHost = logical.getWrapper(host);
      wrapperHost.firstChild.removeChild(wrapperHost.firstChild.firstChild);

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<a></a>');

      wrapperHost.removeChild(wrapperHost.firstChild);
      render(host);
      assert.strictEqual(getVisualInnerHtml(host), 'fallback');
    });

    test('removeChild - mutate host 2', function() {
      var host = document.createElement('div');
      host.innerHTML = '<a></a><b></b>';

      var shadowRoot = host.jsCreateShadowRoot();
      shadowRoot.innerHTML = '<content>fallback</content>';

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<a></a><b></b>');

      var wrapperHost = logical.getWrapper(host);
      wrapperHost.removeChild(wrapperHost.lastChild);

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<a></a>');

      wrapperHost.removeChild(wrapperHost.firstChild);
      render(host);
      assert.strictEqual(getVisualInnerHtml(host), 'fallback');
    });

    test('removeChild - mutate shadow', function() {
      var host = document.createElement('div');
      host.innerHTML = '<a>Hello</a>';

      var shadowRoot = host.jsCreateShadowRoot();
      shadowRoot.innerHTML = '<content></content><b>after</b>';

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<a>Hello</a><b>after</b>');

      var wrapperShadowRoot = logical.getWrapper(shadowRoot);

      wrapperShadowRoot.lastChild.removeChild(
          wrapperShadowRoot.lastChild.firstChild);

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<a>Hello</a><b></b>');

      wrapperShadowRoot.removeChild(wrapperShadowRoot.lastChild);
      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<a>Hello</a>');

      wrapperShadowRoot.removeChild(wrapperShadowRoot.firstChild);
      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '');
    });

    test('setAttribute select', function() {
      // TODO(arv): DOM bindings for select.
      var host = document.createElement('div');
      host.innerHTML = '<a>Hello</a><b>World</b>';

      var shadowRoot = host.jsCreateShadowRoot();
      shadowRoot.innerHTML = '<content select="b">fallback b</content>' +
                             '<content select="a">fallback a</content>';

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<b>World</b><a>Hello</a>');

      logical.getFirstChild(shadowRoot).setAttribute('select', 'xxx');

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), 'fallback b<a>Hello</a>');

      logical.getFirstChild(shadowRoot).setAttribute('select', '');

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<a>Hello</a><b>World</b>fallback a');
    });

    test('appendChild - mutate host', function() {
      var host = document.createElement('div');
      host.innerHTML = '<a>Hello</a>';

      var shadowRoot = host.jsCreateShadowRoot();
      shadowRoot.innerHTML = '<content></content>';

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<a>Hello</a>');

      var b = document.createElement('b');

      var wrapperHost = logical.getWrapper(host);
      var wrapperB = logical.getWrapper(b);
      wrapperHost.appendChild(wrapperB);

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<a>Hello</a><b></b>');
    });

    test('appendChild - mutate shadow', function() {
      var host = document.createElement('div');
      host.innerHTML = '<a>Hello</a>';

      var shadowRoot = host.jsCreateShadowRoot();
      shadowRoot.innerHTML = '<content></content>';

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<a>Hello</a>');

      var b = document.createElement('b');

      var wrapperShadowRoot = logical.getWrapper(shadowRoot);
      var wrapperB = logical.getWrapper(b);
      wrapperShadowRoot.appendChild(wrapperB);

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<a>Hello</a><b></b>');
    });

    test('insertBefore - mutate host', function() {
      var host = document.createElement('div');
      host.innerHTML = '<a>Hello</a>';
      var a = host.firstChild;

      var shadowRoot = host.jsCreateShadowRoot();
      shadowRoot.innerHTML = '<content></content>';

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<a>Hello</a>');

      var b = document.createElement('b');

      var wrapperHost = logical.getWrapper(host);
      var wrapperA = logical.getWrapper(a);
      var wrapperB = logical.getWrapper(b);

      wrapperHost.insertBefore(wrapperB, wrapperA);

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<b></b><a>Hello</a>');
    });

    test('insertBefore - mutate shadow', function() {
      var host = document.createElement('div');
      host.innerHTML = '<a>Hello</a>';

      var shadowRoot = host.jsCreateShadowRoot();
      shadowRoot.innerHTML = '<content></content>';
      var content = shadowRoot.firstChild;

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<a>Hello</a>');

      var b = document.createElement('b');

      var wrapperShadowRoot = logical.getWrapper(shadowRoot);
      var wrapperB = logical.getWrapper(b);
      var wrapperContent = logical.getWrapper(content);

      wrapperShadowRoot.insertBefore(wrapperB, wrapperContent);

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<b></b><a>Hello</a>');
    });

    test('replaceChild - mutate host', function() {
      var host = document.createElement('div');
      host.innerHTML = '<a>Hello</a>';
      var a = host.firstChild;

      var shadowRoot = host.jsCreateShadowRoot();
      shadowRoot.innerHTML = '<content></content>';

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<a>Hello</a>');

      var b = document.createElement('b');

      var wrapperHost = logical.getWrapper(host);
      var wrapperA = logical.getWrapper(a);
      var wrapperB = logical.getWrapper(b);

      wrapperHost.replaceChild(wrapperB, wrapperA);

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<b></b>');
    });

    test('replaceChild - mutate shadow', function() {
      var host = document.createElement('div');
      host.innerHTML = '<a>Hello</a>';

      var shadowRoot = host.jsCreateShadowRoot();
      shadowRoot.innerHTML = '<content></content>';
      var content = shadowRoot.firstChild;

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<a>Hello</a>');

      var b = document.createElement('b');

      var wrapperShadowRoot = logical.getWrapper(shadowRoot);
      var wrapperB = logical.getWrapper(b);
      var wrapperContent = logical.getWrapper(content);

      wrapperShadowRoot.replaceChild(wrapperB, wrapperContent);

      render(host);
      assert.strictEqual(getVisualInnerHtml(host), '<b></b>');
    });

  });
});