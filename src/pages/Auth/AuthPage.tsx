import { recoverPassword, signUp } from "@/api/authApi";
import ArrowBackIcon from "@/assets/icons/arrow-back.svg";
import SignUpBackground from "@/assets/img/sign-up-background.webp";
import { CustomMarquee } from "@/components/CustomMarquee";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { validation } from "@/utils/validation";
import { useCallback, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";

type AuthMode = "registration" | "login";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  company: string;
  specialization: string;
}

interface ErrorState {
  show: boolean;
  message: string;
}

interface TimerState {
  active: boolean;
  seconds: number;
}

interface ValidationErrors {
  fullName?: string;
  email?: string;
  company?: string;
  specialization?: string;
}

export function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, login } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated)
      navigate("/dashboard", { replace: true });
  }, [isAuthenticated, isLoading, navigate]);

  const getAuthModeFromUrl = (): AuthMode =>
    location.pathname === "/login" ? "login" : "registration";

  const [authMode, setAuthMode] = useState<AuthMode>(getAuthModeFromUrl());
  const [currentStep, setCurrentStep] = useState(1);
  const [stepHistory, setStepHistory] = useState<number[]>([1]);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    company: "",
    specialization: "",
  });
  const [error, setError] = useState<ErrorState>({ show: false, message: "" });
  const [timer, setTimer] = useState<TimerState>({ active: false, seconds: 0 });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {},
  );
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [passwordRecovery, setPasswordRecovery] = useState(false);

  const totalSteps = authMode === "registration" ? 3 : 2;

  useEffect(() => {
    const newMode = getAuthModeFromUrl();
    if (newMode !== authMode) {
      setAuthMode(newMode);
      setCurrentStep(1);
      setStepHistory([1]);
      setError({ show: false, message: "" });
      setPasswordRecovery(false);
      setTimer({ active: false, seconds: 0 });
      setValidationErrors({});
      setFormData({
        fullName: "",
        email: "",
        password: "",
        company: "",
        specialization: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (timer.active && timer.seconds > 0) {
      interval = setInterval(
        () => setTimer((p) => ({ ...p, seconds: p.seconds - 1 })),
        1000,
      );
    } else if (timer.seconds === 0 && timer.active) {
      setTimer({ active: false, seconds: 0 });
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer.active, timer.seconds]);

  const startTimer = () => setTimer({ active: true, seconds: 60 });

  const handleNextStep = () => {
    if (!validateCurrentStep()) return;
    const next = currentStep + 1;
    if (next <= totalSteps) {
      setCurrentStep(next);
      setStepHistory((h) => [...h, next]);
      setError({ show: false, message: "" });
      setValidationErrors({});
    }
  };

  const handleBackStep = () => {
    if (stepHistory.length > 1) {
      const newHistory = stepHistory.slice(0, -1);
      setStepHistory(newHistory);
      setCurrentStep(newHistory[newHistory.length - 1]);
    } else {
      navigate("/", { viewTransition: true });
    }
  };

  const handleInputChange = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData((p) => ({ ...p, [field]: value }));

      setValidationErrors((prev) => {
        if (field in prev) {
          const next = { ...prev };
          delete next[field as keyof ValidationErrors];
          return next;
        }

        return prev;
      });
    },
    [],
  );

  const onFullNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      handleInputChange("fullName", e.target.value),
    [handleInputChange],
  );
  const onEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      handleInputChange("email", e.target.value),
    [handleInputChange],
  );
  const onPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      handleInputChange("password", e.target.value),
    [handleInputChange],
  );
  const onCompanyChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      handleInputChange("company", e.target.value),
    [handleInputChange],
  );
  const onSpecializationChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      handleInputChange("specialization", e.target.value),
    [handleInputChange],
  );

  const validateCurrentStep = (): boolean => {
    const errors: ValidationErrors = {};
    switch (currentStep) {
      case 1:
        if (!validation.email(formData.email))
          errors.email = "Введите корректный email";
        if (authMode === "registration" && !formData.fullName.trim())
          errors.fullName = "Введите имя и фамилию";
        break;
      case 2:
        if (authMode === "registration") {
          if (!validation.company(formData.company))
            errors.company = "Введите название компании";
          if (!validation.specialization(formData.specialization))
            errors.specialization = "Введите должность";
        }
        break;
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getBackendMessage = (err: any, fallback = "Произошла ошибка") =>
    err?.response?.data?.message || err?.message || fallback;

  const handleLogin = async () => {
    setIsFormLoading(true);
    setError({ show: false, message: "" });

    try {
      await login(formData.email, formData.password);
      navigate("/dashboard", { viewTransition: true });
    } catch (err: any) {
      setError({
        show: true,
        message: getBackendMessage(err, "Произошла ошибка при входе"),
      });
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleRegistration = async () => {
    setIsFormLoading(true);
    setError({ show: false, message: "" });

    try {
      const response = await signUp({
        fullName: formData.fullName,
        email: formData.email,
        specializationTitle: formData.specialization,
        companyName: formData.company,
      } as any);

      if (response?.user?.email) {
        setFormData((p) => ({ ...p, email: response.user.email || p.email }));
      }

      handleNextStep();
    } catch (err: any) {
      setError({
        show: true,
        message: getBackendMessage(err, "Произошла ошибка при регистрации"),
      });
    } finally {
      setIsFormLoading(false);
    }
  };

  const handlePasswordVerification = async () => {
    setIsFormLoading(true);
    setError({ show: false, message: "" });

    try {
      await login(formData.email, formData.password);
      navigate("/dashboard", { viewTransition: true });
    } catch (err: any) {
      setError({
        show: true,
        message: getBackendMessage(err, "Произошла ошибка при проверке пароля"),
      });
    } finally {
      setIsFormLoading(false);
    }
  };

  const handlePasswordRecovery = async () => {
    setIsFormLoading(true);
    setError({ show: false, message: "" });

    try {
      if (!validation.email(formData.email)) {
        setValidationErrors({ email: "Введите корректный email" });
        setIsFormLoading(false);
        return;
      }

      await recoverPassword({ email: formData.email } as any);
      setPasswordRecovery(true);
      startTimer();
    } catch (err: any) {
      setError({
        show: true,
        message: getBackendMessage(
          err,
          "Не удалось отправить письмо восстановления",
        ),
      });
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleAuthModeToggle = (mode: AuthMode) =>
    navigate(mode === "login" ? "/login" : "/registration");

  if (isLoading || isAuthenticated)
    return <div className="bg-surface-1 h-screen" />;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        if (authMode === "registration")
          return (
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Input
                  shape="round"
                  value={formData.fullName}
                  onChange={onFullNameChange}
                  placeholder="Имя Фамилия"
                  intent={validationErrors.fullName ? "error" : "normal"}
                />
                {validationErrors.fullName && (
                  <p className="text-sm text-red-500">
                    {validationErrors.fullName}
                  </p>
                )}

                <Input
                  shape="round"
                  value={formData.email}
                  onChange={onEmailChange}
                  placeholder="----------@mail.ru корпоративный"
                  intent={validationErrors.email ? "error" : "normal"}
                  type="email"
                />
                {validationErrors.email && (
                  <p className="text-sm text-red-500">
                    {validationErrors.email}
                  </p>
                )}

                <label
                  htmlFor="data-collection"
                  className="bg-surface-2 rounded-primary inline-flex w-full justify-between px-4 py-3 text-base text-black md:px-8 md:text-lg"
                >
                  <span>Я даю согласие на обработку персональных данных</span>
                  <input
                    type="checkbox"
                    className="w-6"
                    id="data-collection"
                    required
                  />
                </label>
              </div>
            </div>
          );

        return (
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Input
                shape="round"
                value={formData.email}
                onChange={onEmailChange}
                placeholder="----------@mail.ru корпоративный"
                intent={validationErrors.email ? "error" : "normal"}
                type="email"
              />
              {validationErrors.email && (
                <p className="text-sm text-red-500">{validationErrors.email}</p>
              )}

              <Input
                shape="round"
                value={formData.password}
                onChange={onPasswordChange}
                placeholder="Введите пароль"
                type="password"
              />

              {passwordRecovery && (
                <p className="text-center text-white/80">
                  На почту Вам пришел новый пароль. Введите его и используйте
                  при следующих входах.
                </p>
              )}

              <button
                onClick={handlePasswordRecovery}
                disabled={timer.active}
                className={`bg-transparent text-white disabled:opacity-50 ${timer.active ? "" : "hover:cursor-pointer hover:underline"}`}
              >
                {timer.active
                  ? `Отправить еще раз через ${timer.seconds} сек`
                  : "Восстановить пароль"}
              </button>

              {error.show && (
                <p className="text-center text-red-500">{error.message}</p>
              )}
            </div>
          </div>
        );

      case 2:
        if (authMode === "registration")
          return (
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Input
                  shape="round"
                  value={formData.company}
                  onChange={onCompanyChange}
                  placeholder="Компания"
                  intent={validationErrors.company ? "error" : "normal"}
                />
                {validationErrors.company && (
                  <p className="text-sm text-red-500">
                    {validationErrors.company}
                  </p>
                )}

                <Input
                  shape="round"
                  value={formData.specialization}
                  onChange={onSpecializationChange}
                  placeholder="Должность в компании"
                  intent={validationErrors.specialization ? "error" : "normal"}
                />
                {validationErrors.specialization && (
                  <p className="text-sm text-red-500">
                    {validationErrors.specialization}
                  </p>
                )}
              </div>
              {error.show && (
                <p className="text-center text-red-500">{error.message}</p>
              )}
            </div>
          );

        return (
          <div className="space-y-4 text-center">
            <p className="text-xl text-white">Вы успешно вошли в систему!</p>
            <p className="text-lg text-white/80">
              Нажмите "Продолжить" для перехода в личный кабинет
            </p>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-center text-white">
                Сейчас на указанную почту прийдет Ваш пароль для входа. Введите
                его ниже и используйте при повторном входе.
              </p>

              <Input
                shape="round"
                value={formData.password}
                onChange={onPasswordChange}
                placeholder="Введите пароль"
                type="password"
              />

              {error.show && (
                <p className="text-center text-red-500">{error.message}</p>
              )}

              <button
                onClick={startTimer}
                disabled={timer.active}
                className={`bg-transparent text-white disabled:opacity-50 ${timer.active ? "" : "hover:cursor-pointer hover:underline"}`}
              >
                {timer.active
                  ? `Отправить еще раз через ${timer.seconds} сек`
                  : "Отправить еще раз"}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleMainButtonClick = () => {
    if (authMode === "registration") {
      if (currentStep === totalSteps) handlePasswordVerification();
      else if (currentStep === 2) handleRegistration();
      else handleNextStep();
    } else {
      if (currentStep === 1) handleLogin();
      else handleNextStep();
    }
  };

  return (
    <div className="bg-surface-1">
      <div
        className="relative min-h-screen overflow-hidden bg-cover text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${SignUpBackground})`,
        }}
      >
        <div className="relative mb-8 flex items-center justify-between px-4 py-6 md:px-8">
          <div className="flex items-center">
            <button
              onClick={handleBackStep}
              className="flex items-center gap-2 text-white hover:underline"
            >
              <img src={ArrowBackIcon} alt="Назад" className="h-6 w-6" />
              {currentStep === 1 ? "На главную" : "Назад"}
            </button>
          </div>

          <NavLink
            to="/"
            className="top-4 left-1/2 text-center font-[Abhaya_Libre] text-[50px] leading-none font-extrabold hover:underline md:absolute md:-translate-x-1/2"
            viewTransition
          >
            S&H
          </NavLink>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="rounded-primary flex bg-white/5 text-xl font-semibold">
            <button
              onClick={() => handleAuthModeToggle("registration")}
              className={`rounded-[inherit] px-10 py-3 hover:cursor-pointer ${authMode === "registration" ? "bg-accent-1/50" : ""}`}
            >
              Регистрация
            </button>
            <button
              onClick={() => handleAuthModeToggle("login")}
              className={`rounded-[inherit] px-10 py-3 hover:cursor-pointer ${authMode === "login" ? "bg-accent-1/50" : ""}`}
            >
              Вход
            </button>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 pb-20">
          <div className="w-full max-w-xl">
            <div className="mb-8">{renderStepContent()}</div>

            <Button
              shape="round"
              onClick={handleMainButtonClick}
              disabled={
                isFormLoading ||
                (authMode === "login" &&
                  currentStep === 1 &&
                  !formData.password) ||
                (authMode === "registration" &&
                  currentStep === 3 &&
                  !formData.password)
              }
              className="bg-surface-1 text-surface-1-foreground hover:bg-accent-1 rounded-primary w-full flex-1 px-6 py-3 font-semibold transition-colors disabled:opacity-50"
            >
              {isFormLoading
                ? "Загрузка..."
                : authMode === "registration"
                  ? currentStep === 3
                    ? "Войти"
                    : currentStep === totalSteps
                      ? "Завершить"
                      : "Продолжить"
                  : "Продолжить"}
            </Button>
          </div>
        </div>

        <CustomMarquee className="absolute! bottom-0" />
      </div>

      <div className="pt-16">
        <Footer />
      </div>
    </div>
  );
}
