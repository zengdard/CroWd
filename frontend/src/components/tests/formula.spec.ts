import { setActivePinia, createPinia } from 'pinia';
import { useFormulaStore } from '@/stores/formula';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');

describe('Formula Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('fetches formulas successfully', async () => {
    const store = useFormulaStore();
    const mockFormulas = [
      { id: '1', title: 'Test 1', latex: '\\alpha' },
      { id: '2', title: 'Test 2', latex: '\\beta' },
    ];

    (axios.get as any).mockResolvedValueOnce({ data: { formulas: mockFormulas } });

    await store.fetchFormulas();

    expect(store.formulas).toEqual(mockFormulas);
    expect(store.loading).toBe(false);
    expect(store.error).toBe(null);
  });

  it('handles fetch error correctly', async () => {
    const store = useFormulaStore();
    const errorMessage = 'Network Error';

    (axios.get as any).mockRejectedValueOnce(new Error(errorMessage));

    await store.fetchFormulas();

    expect(store.formulas).toEqual([]);
    expect(store.loading).toBe(false);
    expect(store.error).toBe(errorMessage);
  });

  it('creates formula successfully', async () => {
    const store = useFormulaStore();
    const newFormula = {
      title: 'New Formula',
      latex: '\\gamma',
      tags: ['math'],
      isPublic: true,
    };

    const mockResponse = { ...newFormula, id: '3' };
    (axios.post as any).mockResolvedValueOnce({ data: mockResponse });

    const result = await store.createFormula(newFormula);

    expect(result).toEqual(mockResponse);
    expect(store.formulas[0]).toEqual(mockResponse);
  });

  it('updates formula successfully', async () => {
    const store = useFormulaStore();
    const updateData = {
      title: 'Updated Formula',
      latex: '\\delta',
    };

    const mockResponse = { id: '1', ...updateData };
    (axios.put as any).mockResolvedValueOnce({ data: mockResponse });

    const result = await store.updateFormula('1', updateData);

    expect(result).toEqual(mockResponse);
  });
});