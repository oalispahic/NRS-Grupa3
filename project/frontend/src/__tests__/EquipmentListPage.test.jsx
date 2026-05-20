import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import EquipmentListPage from '../pages/EquipmentListPage';

describe('EquipmentListPage', () => {
  test('renders equipment from API', async () => {
    global.fetch = vi.fn((url) => {
      if (url === '/api/equipment') {
        return Promise.resolve({
          json: () => Promise.resolve([
            { id: 1, name: 'Microscope A', status: 'available' },
          ]),
        });
      }
      if (url === '/api/tags') {
        return Promise.resolve({
          json: () => Promise.resolve([]),
        });
      }
      return Promise.resolve({ json: () => Promise.resolve([]) });
    });

    render(
      <MemoryRouter>
        <EquipmentListPage />
      </MemoryRouter>
    );

    expect(await screen.findByText('Microscope A')).toBeInTheDocument();
  });

  test('filters equipment by tag', async () => {
    global.fetch = vi.fn((url) => {
      if (url === '/api/equipment') {
        return Promise.resolve({
          json: () => Promise.resolve([
            { id: 1, name: 'Microscope A', status: 'available', tags: [{ id: 1, name: 'PCR', color: '#f97316' }] },
            { id: 2, name: 'Analyzer B', status: 'available', tags: [{ id: 2, name: 'Hematologija', color: '#10b981' }] },
          ]),
        });
      }
      if (url === '/api/tags') {
        return Promise.resolve({
          json: () => Promise.resolve([
            { id: 1, name: 'PCR', color: '#f97316' },
            { id: 2, name: 'Hematologija', color: '#10b981' },
          ]),
        });
      }
      return Promise.resolve({ json: () => Promise.resolve([]) });
    });

    render(
      <MemoryRouter>
        <EquipmentListPage />
      </MemoryRouter>
    );

    expect(await screen.findByText('Microscope A')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'PCR' }));

    expect(screen.getByText('Microscope A')).toBeInTheDocument();
    expect(screen.queryByText('Analyzer B')).not.toBeInTheDocument();
  });
});
