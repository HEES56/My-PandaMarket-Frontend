import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AuthForm from "@/app/(auth)/_components/Authform";
import "@testing-library/jest-dom";

const mockLoginMutate = jest.fn();
const mockSignupMutate = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

jest.mock("@/api/auth/AuthHooks", () => ({
  useLogin: () => ({
    mutate: mockLoginMutate,
    isPending: false,
  }),
  useSignup: () => ({
    mutate: mockSignupMutate,
    isPending: false,
  }),
}));

jest.mock("@/app/(auth)/_components/EasyAuth", () => () => {
  const MockEasyAuth = () => <div data-testid="mock-easyauth" />;
  MockEasyAuth.displayName = "MockEasyAuth";
  return MockEasyAuth;
});

describe("AuthForm (로그인)", () => {
  it("이메일, 비밀번호 입력창과 버튼이 렌더링된다", () => {
    render(<AuthForm category="login" />);

    expect(
      screen.getByPlaceholderText("이메일을 입력해주세요")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("비밀번호를 입력해주세요")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "로그인" })).toBeInTheDocument();
  });

  it("이메일을 입력하지 않고 제출하면 에러 메시지가 나타난다", async () => {
    render(<AuthForm category="login" />);

    fireEvent.click(screen.getByRole("button", { name: "로그인" }));

    expect(
      await screen.findByText("이메일을 입력해주세요")
    ).toBeInTheDocument();
  });

  it("비밀번호를 입력하지 않고 제출하면 에러 메시지가 나타난다", async () => {
    render(<AuthForm category="login" />);

    fireEvent.change(screen.getByPlaceholderText("이메일을 입력해주세요"), {
      target: { value: "test@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: "로그인" }));

    expect(
      await screen.findByText("비밀번호를 입력해주세요")
    ).toBeInTheDocument();
  });

  it("올바른 로그인 정보 입력 시 로그인 함수가 호출된다", async () => {
    render(<AuthForm category="login" />);

    fireEvent.change(screen.getByPlaceholderText("이메일을 입력해주세요"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("비밀번호를 입력해주세요"), {
      target: { value: "12345678" },
    });
    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: "로그인" }));
    });

    expect(mockLoginMutate).toHaveBeenCalledWith(
      { email: "test@example.com", password: "12345678" },
      expect.any(Object)
    );
  });
});

describe("AuthForm (회원가입)", () => {
  it("닉네임, 비밀번호 확인 필드가 렌더링된다", () => {
    render(<AuthForm category="signup" />);

    expect(
      screen.getByPlaceholderText("닉네임을 입력해주세요")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("비밀번호를 한번 더 입력해주세요")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "회원가입" })
    ).toBeInTheDocument();
  });

  it("닉네임과 비밀번호 확인이 비어 있으면 에러 메시지가 나타난다", async () => {
    render(<AuthForm category="signup" />);

    fireEvent.click(screen.getByRole("button", { name: "회원가입" }));

    expect(
      await screen.findByText("이메일을 입력해주세요")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("닉네임을 입력해주세요")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("비밀번호를 입력해주세요")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("비밀번호를 다시 입력해주세요")
    ).toBeInTheDocument();
  });

  it("비밀번호와 비밀번호 확인이 일치하지 않으면 에러 메시지가 나타난다", async () => {
    render(<AuthForm category="signup" />);

    fireEvent.change(screen.getByPlaceholderText("이메일을 입력해주세요"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("닉네임을 입력해주세요"), {
      target: { value: "테스트유저" },
    });

    fireEvent.change(screen.getByPlaceholderText("비밀번호를 입력해주세요"), {
      target: { value: "password123" },
    });

    fireEvent.change(
      screen.getByPlaceholderText("비밀번호를 한번 더 입력해주세요"),
      {
        target: { value: "wrongpass" },
      }
    );

    fireEvent.click(screen.getByRole("button", { name: "회원가입" }));

    expect(
      await screen.findByText("비밀번호가 일치하지 않습니다")
    ).toBeInTheDocument();
  });

  it("회원가입 정보 입력 시 회원가입 함수가 호출된다", async () => {
    render(<AuthForm category="signup" />);

    fireEvent.change(screen.getByPlaceholderText("이메일을 입력해주세요"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("닉네임을 입력해주세요"), {
      target: { value: "테스터" },
    });

    fireEvent.change(screen.getByPlaceholderText("비밀번호를 입력해주세요"), {
      target: { value: "password123" },
    });

    fireEvent.change(
      screen.getByPlaceholderText("비밀번호를 한번 더 입력해주세요"),
      { target: { value: "password123" } }
    );
    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: "회원가입" }));
    });
    expect(mockSignupMutate).toHaveBeenCalledWith(
      {
        email: "test@example.com",
        nickname: "테스터",
        password: "password123",
      },
      expect.any(Object)
    );
  });
});
