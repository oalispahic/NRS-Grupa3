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

  test('filters equipment by location', async () => {
    global.fetch = vi.fn((url) => {
      if (url === '/api/equipment') {
        return Promise.resolve({
          json: () => Promise.resolve([
            { id: 1, name: 'Microscope A', status: 'available', location_id: 1, location_name: 'Lab A' },
            { id: 2, name: 'Analyzer B', status: 'available', location_id: 2, location_name: 'Lab B' },
          ]),
        });
      }
      if (url === '/api/tags') {
        return Promise.resolve({ json: () => Promise.resolve([]) });
      }
      if (url === '/api/locations') {
        return Promise.resolve({
          json: () => Promise.resolve([
            { id: 1, name: 'Lab A' },
            { id: 2, name: 'Lab B' },
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
    expect(screen.getByText('Analyzer B')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Lab A' }));

    expect(screen.getByText('Microscope A')).toBeInTheDocument();
    expect(screen.queryByText('Analyzer B')).not.toBeInTheDocument();
  });

  test('opens compare modal after selecting items', async () => {
    global.fetch = vi.fn((url) => {
      if (url === '/api/equipment') {
        return Promise.resolve({
          json: () => Promise.resolve([
            { id: 1, name: 'Microscope A', status: 'available' },
            { id: 2, name: 'Analyzer B', status: 'available' },
          ]),
        });
      }
      if (url === '/api/tags') {
        return Promise.resolve({ json: () => Promise.resolve([]) });
      }
      if (url === '/api/locations') {
        return Promise.resolve({ json: () => Promise.resolve([]) });
      }
      return Promise.resolve({ json: () => Promise.resolve([]) });
    });

    render(
      <MemoryRouter>
        <EquipmentListPage />
      </MemoryRouter>
    );

    expect(await screen.findByText('Microscope A')).toBeInTheDocument();

    const compareBtns = screen.getAllByTitle(/Dodaj u komparator/i);
    fireEvent.click(compareBtns[0]);
    fireEvent.click(compareBtns[1]);

    expect(await screen.findByText(/Odabrano 2/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Poredi/i }));

    expect(await screen.findByText(/Usporedba opreme/i)).toBeInTheDocument();
  });
});
