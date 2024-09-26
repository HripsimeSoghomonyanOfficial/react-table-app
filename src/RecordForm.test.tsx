import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RecordForm from './Components/RecordForm/RecordForm';


global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ id: 1, field1: 'test1' }),
  })
) as jest.Mock;

describe('RecordForm Component', () => {
  const mockAddEntry = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    mockAddEntry.mockClear();
    mockDispatch.mockClear();
  });

  test('renders all form fields', () => {
    render(<RecordForm addEntry={mockAddEntry} dispatch={mockDispatch} />);

    const field1 = screen.getByLabelText(/field1/i);
    const field2 = screen.getByLabelText(/field2/i);
    const field3 = screen.getByLabelText(/field3/i);
    const field4 = screen.getByLabelText(/field4/i);
    const field5 = screen.getByLabelText(/field5/i);
    const submitButton = screen.getByText(/submit/i);

    expect(field1).toBeInTheDocument();
    expect(field2).toBeInTheDocument();
    expect(field3).toBeInTheDocument();
    expect(field4).toBeInTheDocument();
    expect(field5).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('updates form state on input change', () => {
    render(<RecordForm addEntry={mockAddEntry} dispatch={mockDispatch} />);

    const field1 = screen.getByLabelText(/field1/i);
    fireEvent.change(field1, { target: { value: 'test1' } });

    expect(field1).toHaveValue('test1');
  });

  test('displays validation errors if required fields are empty', async () => {
    render(<RecordForm addEntry={mockAddEntry} dispatch={mockDispatch} />);

    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/field1 is required/i)).toBeInTheDocument();
    });
  });

  test('submits form and calls API on valid input', async () => {
    render(<RecordForm addEntry={mockAddEntry} dispatch={mockDispatch} />);

    fireEvent.change(screen.getByLabelText(/field1/i), {
      target: { value: 'test1' },
    });
    fireEvent.change(screen.getByLabelText(/field2/i), {
      target: { value: 'test2' },
    });
    fireEvent.change(screen.getByLabelText(/field3/i), {
      target: { value: 'test3' },
    });
    fireEvent.change(screen.getByLabelText(/field4/i), {
      target: { value: 'test4' },
    });
    fireEvent.change(screen.getByLabelText(/field5/i), {
      target: { value: 'test5' },
    });

    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_LOADING', payload: true });
      expect(mockAddEntry).toHaveBeenCalledWith({ id: 1, field1: 'test1' });
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_LOADING', payload: false });
    });
  });

  test('displays API error message on submission failure', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Submission failed' }),
      })
    );

    render(<RecordForm addEntry={mockAddEntry} dispatch={mockDispatch} />);

    fireEvent.change(screen.getByLabelText(/field1/i), {
      target: { value: 'test1' },
    });
    fireEvent.change(screen.getByLabelText(/field2/i), {
      target: { value: 'test2' },
    });
    fireEvent.change(screen.getByLabelText(/field3/i), {
      target: { value: 'test3' },
    });
    fireEvent.change(screen.getByLabelText(/field4/i), {
      target: { value: 'test4' },
    });
    fireEvent.change(screen.getByLabelText(/field5/i), {
      target: { value: 'test5' },
    });

    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/submission failed/i)).toBeInTheDocument();
    });
  });
});
