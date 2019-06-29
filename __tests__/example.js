import { shallowMount, mount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld';
import Frame from '@/components/Frame';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

describe('Frame.vue', () => {
  it('increments count when button is clicked', () => {
    const wrapper = shallowMount(Frame);
    wrapper.find('button').trigger('click');
    expect(wrapper.find('div').text()).toMatch('1');
  });
});

describe('Frame', () => {
  test('является экземпляром Vue', () => {
    const wrapper = mount(Frame);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
