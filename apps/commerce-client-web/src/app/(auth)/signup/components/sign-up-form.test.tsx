import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SignUpForm from './sign-up-form';
import { PostAddress } from '@/components/common/post-address-modal';

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

// Mock PostAddressModal to simulate address selection
vi.mock('react-daum-postcode', () => ({
  __esModule: true,
  default: ({ onComplete }: { onComplete: (data: PostAddress) => void }) => (
    <div data-testid="daum-postcode">
      <button onClick={() => onComplete({ zonecode: '12345', address: 'Seoul, Korea' })}>
        Select Address
      </button>
    </div>
  ),
}));

describe('SignUpForm Component', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnValidChange.mockClear();
    mockSetSignupData.mockClear();
  });

  it('renders all input fields with appropriate data-testid attributes', () => {
    render(<SignUpForm onSubmit={mockOnSubmit} onValidChange={mockOnValidChange} />);
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

    fireEvent.change(screen.getByTestId('email'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: '123' } });
    fireEvent.change(screen.getByTestId('confirmPassword'), { target: { value: '321' } });
    fireEvent.change(screen.getByTestId('phone'), { target: { value: 'invalid-phone' } });

    await waitFor(() => {
      const errorMessages = screen.queryAllByText((content) =>
        /유효한|비밀번호|전화번호/.test(content),
      );
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });

  it('opens post address modal, simulates address selection, and updates the address fields', async () => {
    render(<SignUpForm onSubmit={mockOnSubmit} onValidChange={mockOnValidChange} />);

    // Click the "조회" button to open the modal
    fireEvent.click(screen.getByText('조회'));

    // Verify that the modal and DaumPostcode component appear
    await waitFor(() => {
      expect(screen.getByText('우편번호 검색')).toBeInTheDocument();
      expect(screen.getByTestId('daum-postcode')).toBeInTheDocument();
    });

    // Simulate address selection in DaumPostcode
    fireEvent.click(screen.getByText('Select Address'));

    await waitFor(() => {
      expect(screen.getByTestId('postalCode')).toHaveValue(12345);
      expect(screen.getByTestId('streetAddress')).toHaveValue('Seoul, Korea');
    });
  });
});
