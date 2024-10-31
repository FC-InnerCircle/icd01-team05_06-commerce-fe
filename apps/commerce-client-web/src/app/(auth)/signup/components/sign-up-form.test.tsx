import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SignUpForm from './sign-up-form';
import { SignupFormData } from '@/stores/use-auth-store';
import { Path, UseFormRegister } from 'react-hook-form';

const mockSetSignupData = vi.fn();
const mockOnSubmit = vi.fn();
const mockOnValidChange = vi.fn();

vi.mock('@/stores/use-auth-store', () => ({
  useAuthStore: vi.fn(() => ({
    signupData: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      postalCode: '',
      streetAddress: '',
      detailAddress: '',
    },
    setSignupData: mockSetSignupData,
  })),
}));

// Mock InputField with accurate types for UseFormRegister
vi.mock('@/components/InputField', () => ({
  __esModule: true,
  default: <T extends SignupFormData>({
    name,
    register,
    id,
    label,
    ...rest
  }: {
    name: Path<T>;
    register: UseFormRegister<T>;
    id: string;
    label: string;
  }) => (
    <>
      <label htmlFor={id}>{label}</label>
      <input {...register(name)} data-testid={id} aria-label={label} {...rest} />
    </>
  ),
}));

// Mock PostAddressModal to simulate setting address data
vi.mock('@/components/PostAddressModal', () => ({
  __esModule: true,
  default: ({
    isOpen,
    onComplete,
    onClose,
  }: {
    isOpen: boolean;
    onComplete: (data: { zonecode: string; address: string }) => void;
    onClose: () => void;
  }) =>
    isOpen ? (
      <div>
        <button onClick={() => onComplete({ zonecode: '12345', address: 'Seoul, Korea' })}>
          Set Address
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null,
}));

describe('SignUpForm Component', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnValidChange.mockClear();
  });

  it('renders all input fields with appropriate data-testid attributes', () => {
    render(<SignUpForm onSubmit={mockOnSubmit} onValidChange={mockOnValidChange} />);

    // Check if all inputs are rendered by data-testid
    const fields = [
      'name',
      'email',
      'password',
      'confirmPassword',
      'phone',
      'postalCode',
      'streetAddress',
      'detailAddress',
    ];
    fields.forEach((testId) => expect(screen.getByTestId(testId)).toBeInTheDocument());
  });

  it('calls onValidChange with false for invalid inputs', async () => {
    render(<SignUpForm onSubmit={mockOnSubmit} onValidChange={mockOnValidChange} />);

    // Fill out invalid form data
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: '123' } });
    fireEvent.change(screen.getByTestId('confirmPassword'), { target: { value: '321' } });
    fireEvent.change(screen.getByTestId('phone'), { target: { value: 'invalid-phone' } });

    await waitFor(() => {
      // Expect validation messages to appear
      expect(screen.getByText('유효한 이메일 주소를 입력해 주세요.')).toBeInTheDocument();
      expect(screen.getByText('비밀번호는 최소 6자 이상이어야 합니다.')).toBeInTheDocument();
      expect(screen.getByText('비밀번호가 일치하지 않습니다.')).toBeInTheDocument();
      expect(screen.getByText('유효한 전화번호를 입력해 주세요.')).toBeInTheDocument();
    });

    // onValidChange should have been called with `false` indicating invalid form state
    expect(mockOnValidChange).toHaveBeenCalledWith(false);
  });

  it('calls onValidChange with true when form becomes valid', async () => {
    render(<SignUpForm onSubmit={mockOnSubmit} onValidChange={mockOnValidChange} />);

    // Fill out valid form data
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByTestId('confirmPassword'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByTestId('phone'), { target: { value: '01012345678' } });
    fireEvent.change(screen.getByTestId('postalCode'), { target: { value: '12345' } });
    fireEvent.change(screen.getByTestId('streetAddress'), { target: { value: 'Seoul, Korea' } });
    fireEvent.change(screen.getByTestId('detailAddress'), {
      target: { value: 'Detail Address' },
    });

    await waitFor(() => {
      // Check if onValidChange has been called with `true` for valid form state
      expect(mockOnValidChange).toHaveBeenCalledWith(true);
    });
  });

  it('opens post address modal and sets postal code and address fields', async () => {
    render(<SignUpForm onSubmit={mockOnSubmit} onValidChange={mockOnValidChange} />);

    // Click on the button to open the modal
    fireEvent.click(screen.getByText('조회'));

    // Simulate modal completion
    const setAddressButton = await screen.findByText('Set Address');
    fireEvent.click(setAddressButton);

    // Wait for the postal code and address fields to be updated
    await waitFor(() => {
      expect(screen.getByTestId('postalCode')).toHaveValue('12345');
      expect(screen.getByTestId('streetAddress')).toHaveValue('Seoul, Korea');
    });
  });
});
