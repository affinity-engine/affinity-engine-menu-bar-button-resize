import { test } from 'qunit';
import moduleForAcceptance from '../../../tests/helpers/module-for-acceptance';
import { $hook, hook } from 'ember-hook';

moduleForAcceptance('Acceptance | menu bar/resize');

const isFullScreen = function isFullScreen(element) {
  if (document.fullscreenElement) {
    return element === document.fullscreenElement;
  } else if (document.webkitFullscreenElement) {
    return element === document.webkitFullscreenElement;
  } else if (document.mozFullScreenElement) {
    return element === document.mozFullScreenElement;
  } else if (document.msFullScreenElement) {
    return element === document.msFullScreenElement;
  }
}

// Can't get QUnit to enter full screen. Keep this here until we figure it out
test('Affinity Engine | Menu Bar | Buttons | Resize', function(assert) {
  // assert.expect(3);
  const done = assert.async();

  visit('/').then(() => {
    assert.ok(!isFullScreen($hook('affinity_engine').get(0)), 'starts not fullscreen');

    return click(hook('affinity_engine_menu_bar_resize'));
  }).then(() => {
  //   assert.ok(isFullScreen($hook('affinity_engine').get(0)), 'is fullscreen');
  //
  //   return click(hook('affinity_engine_menu_bar_resize'));
  // }).then(() => {
    assert.ok(!isFullScreen($hook('affinity_engine').get(0)), 'is shrunk');

    done();
  });
});
