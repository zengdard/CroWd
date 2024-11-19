import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import EditorPage from '@/pages/EditorPage.vue';
import { useFormulaStore } from '@/stores/formula';

describe('EditorPage', () => {
  let wrapper: any;
  let store: any;

  beforeEach(() => {
    wrapper = mount(EditorPage, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              formula: {
                currentFormula: null,
              },
            },
          }),
        ],
      },
    });
    store = useFormulaStore();
  });

  it('renders editor component', () => {
    expect(wrapper.find('.editor-page').exists()).toBe(true);
  });

  it('updates latex code when template is inserted', async () => {
    const template = '\\frac{}{}';
    await wrapper.vm.insertTemplate(template);
    expect(wrapper.vm.latexCode).toContain(template);
  });

  it('handles tag management correctly', async () => {
    const newTag = 'test-tag';
    wrapper.vm.newTag = newTag;
    await wrapper.vm.addTag();
    
    expect(wrapper.vm.tags).toContain(newTag);
    expect(wrapper.vm.newTag).toBe('');

    await wrapper.vm.removeTag(newTag);
    expect(wrapper.vm.tags).not.toContain(newTag);
  });

  it('saves formula correctly', async () => {
    wrapper.vm.formulaTitle = 'Test Formula';
    wrapper.vm.latexCode = '\\frac{1}{2}';
    wrapper.vm.tags = ['math'];
    
    await wrapper.vm.saveFormula();
    
    expect(store.createFormula).toHaveBeenCalledWith({
      title: 'Test Formula',
      latex: '\\frac{1}{2}',
      tags: ['math'],
      isPublic: false,
    });
  });

  it('shows error notification when saving without title', async () => {
    const showNotificationSpy = vi.spyOn(wrapper.vm, 'showNotification');
    
    wrapper.vm.formulaTitle = '';
    wrapper.vm.latexCode = '\\frac{1}{2}';
    
    await wrapper.vm.saveFormula();
    
    expect(showNotificationSpy).toHaveBeenCalledWith(
      'Please provide a title and LaTeX code',
      'error'
    );
  });
});