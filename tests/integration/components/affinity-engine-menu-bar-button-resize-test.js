import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { deepStub } from 'affinity-engine';

const {
  getProperties,
  setProperties
} = Ember;

moduleForComponent('affinity-engine-menu-bar-button-resize', 'Integration | Component | affinity engine menu bar button resize', {
  integration: true
});

const configurationTiers = [
  'config.attrs.component.menuBar.button.resize',
  'config.attrs.component.menuBar',
  'config.attrs.global'
];

configurationTiers.forEach((priority) => {
  test(`icon and iconFamily are assigned by priority ${priority}`, function(assert) {
    assert.expect(1);

    const stub = deepStub(priority, { iconFamily: 'fa-icon', icon: 'cloud-upload' });

    setProperties(this, getProperties(stub, 'config'));

    this.render(hbs`{{affinity-engine-menu-bar-button-resize config=config}}`);

    assert.ok(this.$('i').hasClass('fa-cloud-upload'), 'icon correct');
  });
});
