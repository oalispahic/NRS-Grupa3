import { render, screen } from '@testing-library/react';
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
});
