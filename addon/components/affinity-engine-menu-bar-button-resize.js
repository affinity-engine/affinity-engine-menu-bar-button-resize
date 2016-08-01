import Ember from 'ember';
import layout from '../templates/components/affinity-engine-menu-bar-button-resize';
import { configurable } from 'affinity-engine';
import { ModalToggleMixin } from 'affinity-engine-menu-bar';
import multiton from 'ember-multiton-service';

const {
  Component,
  computed,
  get
} = Ember;

const configurationTiers = [
  'config.attrs.component.menuBar.button.resize',
  'config.attrs.component.menuBar',
  'config.attrs'
];

export default Component.extend(ModalToggleMixin, {
  layout,
  componentName: 'affinity-engine-menu-bar-button-resize-menu',
  hook: 'affinity_engine_menu_bar_resize',

  config: multiton('affinity-engine/config', 'engineId'),

  icon: configurable(configurationTiers, 'icon'),
  iconFamily: configurable(configurationTiers, 'iconFamily'),

  _engineElement: computed({
    get() {
      return this.$().parents('.affinity-engine').get(0);
    }
  }).readOnly(),

  _isEngineFullScreen() {
    const _engineElement = get(this, '_engineElement');

    if (document.fullscreenElement) {
      return _engineElement === document.fullscreenElement;
    } else if (document.webkitFullscreenElement) {
      return _engineElement === document.webkitFullscreenElement;
    } else if (document.mozFullScreenElement) {
      return _engineElement === document.mozFullScreenElement;
    } else if (document.msFullScreenElement) {
      return _engineElement === document.msFullScreenElement;
    }
  },

  _openModal() {
    if (this._isEngineFullScreen()) {
      this._shrink();
    } else {
      this._expand();
    }
  },

  _expand() {
    const _engineElement = get(this, '_engineElement');

    if (_engineElement.requestFullscreen) {
      _engineElement.requestFullscreen();
    } else if (_engineElement.webkitRequestFullscreen) {
      _engineElement.webkitRequestFullscreen();
    } else if (_engineElement.mozRequestFullScreen) {
      _engineElement.mozRequestFullScreen();
    } else if (_engineElement.msRequestFullscreen) {
      _engineElement.msRequestFullscreen();
    }
  },

  _shrink() {
    const _engineElement = get(this, '_engineElement');

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
});
