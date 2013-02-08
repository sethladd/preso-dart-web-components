// Copyright 2013 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

(function() {
  'use strict';

  function getEventForInputType(element) {
    switch (element.type) {
      case 'checkbox':
        return 'click';
      case 'radio':
      case 'select-multiple':
      case 'select-one':
        return 'change';
      default:
        return 'input';
    }
  }

  var TWO_WAY = DelegatedValueBinding.Type.TWO_WAY;

  function InputBinding(element, path) {
    this.element_ = element;
    this.path_ = path;
    this.lastValue_ = undefined;
    this.binding_ = new DelegatedValueBinding(element.model,
                                              element.modelDelegate,
                                              path, TWO_WAY, this);
    this.boundUpdateBinding_ = this.updateBinding.bind(this);
    this.element_.addEventListener(getEventForInputType(this.element_),
                                   this.boundUpdateBinding_, true);
  }

  InputBinding.prototype = {
    unbind: function() {
      this.binding_.unbind();
      this.element_.removeEventListener(getEventForInputType(this.element_),
                                        this.boundUpdateBinding_, true);
    },

    setModel: function(newModel) {
      if (this.binding_.setModel(newModel))
        this.valueChanged(this.binding_);
    },

    setDelegate: function(model, newDelegate) {
      if (this.binding_.setDelegate(model, newDelegate))
        this.valueChanged(this.binding_);
    }
  };

  function ValueBinding(element, path) {
    InputBinding.call(this, element, path);
    this.valueChanged(this.binding_);
  }

  ValueBinding.prototype = createObject({
    __proto__: InputBinding.prototype,

    valueChanged: function(binding) {
      var newValue = binding.value;
      var stringValue = '';
      if (newValue != null)
        stringValue = String(newValue);

      if (stringValue === this.lastValue_)
        return;

      this.lastValue_ = stringValue;
      this.element_.value = stringValue;
    },

    updateBinding: function() {
      var value = this.element_.value;
      if (value !== this.lastValue_)
        this.binding_.value = value;
    }
  });

  function isNodeInDocument(node) {
    return node.ownerDocument.contains(node);
  }

  var filter = Array.prototype.filter.call.bind(Array.prototype.filter);

  // |element| is assumed to be an HTMLInputElement with |type| == 'radio'.
  // Returns an array containing all radio buttons other than |element| that
  // have the same |name|, either in the form that |element| belongs to or,
  // if no form, in the document tree to which |element| belongs.
  //
  // This implementation is based upon the HTML spec definition of a
  // "radio button group":
  //   http://www.whatwg.org/specs/web-apps/current-work/multipage/number-state.html#radio-button-group
  //
  function getAssociatedRadioButtons(element) {
    if (!isNodeInDocument(element))
      return [];
    if (element.form) {
      return filter(element.form.elements, function(el) {
        return el != element &&
            el.tagName == 'INPUT' &&
            el.type == 'radio' &&
            el.name == element.name;
      });
    } else {
      var radios = element.ownerDocument.querySelectorAll(
          'input[type="radio"][name="' + element.name + '"]');
      return filter(radios, function(el) {
        return el != element && !el.form;
      });
    }
  }

  function CheckedBinding(element, path) {
    InputBinding.call(this, element, path);
    this.valueChanged(this.binding_);
  }

  CheckedBinding.prototype = createObject({
    __proto__: InputBinding.prototype,

    valueChanged: function(binding) {
      var newValue = binding.value;
      var boolValue = Boolean(newValue);
      if (boolValue === this.lastValue_)
        return;

      this.lastValue_ = boolValue;
      this.element_.checked = boolValue;
    },

    updateBinding: function() {
      var value = this.element_.checked;
      if (value !== this.lastValue_) {
        this.binding_.value = value;

        // Only the radio button that is getting checked gets an event. We
        // therefore find all the associated radio buttons and update their
        // CheckedBinding manually.
        if (this.element_.tagName === 'INPUT' &&
            this.element_.type === 'radio') {
          getAssociatedRadioButtons(this.element_).forEach(function(r) {
            if (r.checkedBinding_) {
              // Set the value directly to avoid an infinite call stack.
              r.checkedBinding_.binding_.value = false;
            }
          });
        }
      }
    }
  });

  HTMLInputElement.prototype.addValueBinding = function(path) {
    this.removeValueBinding();
    this.valueBinding_ = new ValueBinding(this, path);
  };

  HTMLInputElement.prototype.removeValueBinding = function() {
    if (this.valueBinding_) {
      this.valueBinding_.unbind();
      this.valueBinding_ = null;
    }
  };

  HTMLInputElement.prototype.addCheckedBinding = function(path) {
    this.removeCheckedBinding();
    this.checkedBinding_ = new CheckedBinding(this, path);
  };

  HTMLInputElement.prototype.removeCheckedBinding = function() {
    if (this.checkedBinding_) {
      this.checkedBinding_.unbind();
      this.checkedBinding_ = null;
    }
  };

  HTMLInputElement.prototype.lazyModelChanged = function() {
    if (this.valueBinding_)
      this.valueBinding_.setModel(this.model);
    if (this.checkedBinding_)
      this.checkedBinding_.setModel(this.model);
  };

  HTMLInputElement.prototype.lazyModelDelegateChanged = function() {
    if (this.valueBinding_)
      this.valueBinding_.setDelegate(this.model, this.modelDelegate);
    if (this.checkedBinding_)
      this.checkedBinding_.setDelegate(this.model, this.modelDelegate);
  };

  HTMLInputElement.prototype.modelChanged = function() {
    Element.prototype.modelChanged.call(this);
    if (this.valueBinding_ || this.checkedBinding_)
      Model.enqueue(this.lazyModelChanged.bind(this));
  };

  HTMLInputElement.prototype.modelDelegateChanged = function() {
    Element.prototype.modelDelegateChanged.call(this);
    if (this.valueBinding_ || this.checkedBinding_)
      Model.enqueue(this.lazyModelDelegateChanged.bind(this));
  };

})();