import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './login-form';
import { LoginFormData } from '@/stores/use-auth-store';

// Mocking zustand stores and API actions
const mockSetLoginState = vi.fn();
const mockSetLoginData = vi.fn();
const mockSetSaveId = vi.fn();
const mockSetUserSession = vi.fn();
const mockRouterPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

vi.mock('@/stores/use-auth-store', () => ({
  useAuthStore: vi.fn(() => ({
    loginData: { email: '', password: '' },
    setLoginData: mockSetLoginData,
    setSaveId: mockSetSaveId,
    saveId: false,
    setLoginState: mockSetLoginState,
  })),
}));

vi.mock('@/stores/use-user-store', () => ({
  useUserStore: vi.fn(() => ({
    setUserSession: mockSetUserSession,
  })),
}));

vi.mock('@/app/actions/auth-action', () => ({
  login: vi.fn().mockImplementation(async (formData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (formData.email === 'test@example.com' && formData.password === 'password') {
          resolve({ success: true, data: { tokenInfo: { accessToken: 'mockAccessToken' } } });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  }),
  getUserInfo: vi.fn().mockResolvedValue({
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    phone: '123-456-7890',
    postalCode: '12345',
    streetAddress: '123 Test St',
    detailAddress: 'Apt 101',
  }),
}));

const fillLoginFormAndSubmit = async (loginData: LoginFormData) => {
  const emailInput = screen.getByPlaceholderText('아이디를 입력해 주세요.');
  const passwordInput = screen.getByPlaceholderText('비밀번호를 입력해 주세요.');
  const loginButton = screen.getByRole('button', { name: '로그인' });

  await userEvent.type(emailInput, loginData.email);
  await userEvent.type(passwordInput, loginData.password);
  await userEvent.click(loginButton);
};

describe('LoginForm', () => {
  beforeEach(() => {
    mockSetLoginState.mockClear();
    mockSetLoginData.mockClear();
    mockSetSaveId.mockClear();
    mockSetUserSession.mockClear();
    mockRouterPush.mockClear();
    localStorage.clear();
  });

  it('renders the login form correctly', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText('아이디를 입력해 주세요.')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호를 입력해 주세요.')).toBeInTheDocument();
  });

  it('updates the email field when typing', async () => {
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText('아이디를 입력해 주세요.');

    await userEvent.type(emailInput, 'test@example.com');

    expect(mockSetLoginData).toHaveBeenCalledWith({ email: 'test@example.com' });
  });

  it('displays loading state during login', async () => {
    render(<LoginForm />);

    const loginButton = screen.getByRole('button', { name: '로그인' });

    const loginData: LoginFormData = { email: 'test@example.com', password: 'password' };

    await fillLoginFormAndSubmit(loginData);

    expect(loginButton).toHaveTextContent('로그인 중...');
  });

  it('handles login success and redirects to the home page', async () => {
    render(<LoginForm />);

    const loginData: LoginFormData = { email: 'test@example.com', password: 'password' };

    await fillLoginFormAndSubmit(loginData);

    await waitFor(() => {
      expect(mockSetLoginState).toHaveBeenCalledWith(true);
      expect(mockRouterPush).toHaveBeenCalledWith('/');
    });
  });

  it('shows an alert dialog on login failure', async () => {
    render(<LoginForm />);
    const wrongLoginData: LoginFormData = { email: 'wrong@example.com', password: 'wrongpassword' };

    await fillLoginFormAndSubmit(wrongLoginData);

    await waitFor(() => {
      expect(screen.getByText('로그인 실패')).toBeInTheDocument();
      expect(
        screen.getByText('이메일 또는 비밀번호가 잘못되었습니다. 다시 시도해주세요.'),
      ).toBeInTheDocument();
    });
  });

  it('saves the email to local storage when saveId is checked', async () => {
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText('아이디를 입력해 주세요.');
    const checkbox = screen.getByLabelText('아이디 저장');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.click(checkbox);

    localStorage.setItem('savedEmail', 'test@example.com');

    expect(mockSetSaveId).toHaveBeenCalledWith(true);
    expect(localStorage.getItem('savedEmail')).toBe('test@example.com');
  });
});
