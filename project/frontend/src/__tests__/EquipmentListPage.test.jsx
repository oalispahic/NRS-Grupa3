import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import EquipmentListPage from '../pages/EquipmentListPage';

describe('EquipmentListPage', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve([
        { id: 1, name: 'Microscope A', status: 'available' },
      ]),
    });
  });

  test('renders equipment from API', async () => {
    render(
      <MemoryRouter>
        <EquipmentListPage />
      </MemoryRouter>
    );

    expect(await screen.findByText('Microscope A')).toBeInTheDocument();
  });

  test('filters equipment by category and type', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve([
        { id: 1, name: 'Microscope A', status: 'available', category: 'Optika', type: 'Mikroskop' },
        { id: 2, name: 'Analyzer B', status: 'available', category: 'Hemija', type: 'Analizator' },
        { id: 3, name: 'Scope C', status: 'available', category: 'Optika', type: 'Spektar' },
      ]),
    });

    render(
      <MemoryRouter>
        <EquipmentListPage />
      </MemoryRouter>
    );

    expect(await screen.findByText('Microscope A')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Kategorija'), { target: { value: 'Optika' } });
    expect(screen.queryByText('Analyzer B')).not.toBeInTheDocument();
    expect(screen.getByText('Scope C')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Tip'), { target: { value: 'Mikroskop' } });
    expect(screen.getByText('Microscope A')).toBeInTheDocument();
    expect(screen.queryByText('Scope C')).not.toBeInTheDocument();
  });
});
