import { shallowMount, mount } from '@vue/test-utils';
import Download from '@/components/tools/Download';


describe('Download', () => {
  test('является экземпляром Vue', () => {
    const wrapper = mount(Download);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
