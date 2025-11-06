import ArrowBackIcon from "@/assets/icons/arrow-back.svg";
import SignUpBackground from "@/assets/img/sign-up-background.webp";
import { CustomMarquee } from "@/components/CustomMarquee";
import { useAuth } from "@/context/AuthContext";
import { FooterSection } from "@/sections/FooterSection";
import { authAPI, tokenStorage, validation } from "@/services/authService";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

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

  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const getAuthModeFromUrl = (): AuthMode => {
    if (location.pathname === "/login") return "login";
    return "registration";
  };

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
    }
  }, [location.pathname, authMode]);

  React.useEffect(() => {
    let interval: number;
    if (timer.active && timer.seconds > 0) {
      interval = setInterval(() => {
        setTimer((prev) => ({
          ...prev,
          seconds: prev.seconds - 1,
        }));
      }, 1000);
    } else if (timer.seconds === 0) {
      setTimer({ active: false, seconds: 0 });
    }
    return () => clearInterval(interval);
  }, [timer.active, timer.seconds]);

  const startTimer = () => {
    setTimer({ active: true, seconds: 60 });
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      const nextStep = currentStep + 1;
      if (nextStep <= totalSteps) {
        setCurrentStep(nextStep);
        setStepHistory([...stepHistory, nextStep]);
        setError({ show: false, message: "" });
        setValidationErrors({});
      } else {
        if (authMode === "login") {
          navigate("/dashboard");
        }
      }
    }
  };

  const handleBackStep = () => {
    if (stepHistory.length > 1) {
      const newHistory = stepHistory.slice(0, -1);
      setStepHistory(newHistory);
      setCurrentStep(newHistory[newHistory.length - 1]);
    } else {
      navigate("/");
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (validationErrors[field as keyof ValidationErrors]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof ValidationErrors];
        return newErrors;
      });
    }
  };

  const validateCurrentStep = (): boolean => {
    const errors: ValidationErrors = {};

    switch (currentStep) {
      case 1:
        if (!validation.email(formData.email)) {
          errors.email = "Введите корректный email";
        }
        if (authMode === "registration" && !formData.fullName.trim()) {
          errors.fullName = "Введите имя и фамилию";
        }
        break;
      case 2:
        if (authMode === "registration") {
          if (!validation.company(formData.company)) {
            errors.company = "Введите название компании";
          }
          if (!validation.specialization(formData.specialization)) {
            errors.specialization = "Введите должность";
          }
        }
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegistration = async () => {
    setIsFormLoading(true);
    setError({ show: false, message: "" });

    try {
      console.log("Sending registration request:", {
        full_name: formData.fullName,
        email: formData.email,
        specialization_title: formData.specialization,
        company_name: formData.company,
      });

      const response = await authAPI.signup({
        full_name: formData.fullName,
        email: formData.email,
        specialization_title: formData.specialization,
        company_name: formData.company,
      });

      console.log("Registration response:", response);

      handleNextStep();
    } catch (error: any) {
      console.error("Registration error:", error);
      if (error.code === 2000) {
        setError({
          show: true,
          message: "Пользователь с таким email уже существует",
        });
      } else if (error.code === 2001) {
        setError({ show: true, message: "Ошибка валидации данных" });
      } else {
        setError({
          show: true,
          message: error.message || "Произошла ошибка при регистрации",
        });
      }
    } finally {
      setIsFormLoading(false);
    }
  };

  const handlePasswordVerification = async () => {
    setIsFormLoading(true);
    setError({ show: false, message: "" });

    try {
      console.log("Sending password verification request:", {
        email: formData.email,
        password: formData.password,
      });

      const response = await authAPI.login({
        email: formData.email,
        password: formData.password,
      });

      console.log("Password verification response:", response);

      tokenStorage.setAccessToken(response.access_token);
      tokenStorage.setRefreshToken(response.refresh_token);

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Password verification error:", error);
      if (error.code === 3000) {
        setError({ show: true, message: "Неверный пароль" });
      } else {
        setError({
          show: true,
          message: error.message || "Произошла ошибка при входе",
        });
      }
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleLogin = async () => {
    setIsFormLoading(true);
    setError({ show: false, message: "" });

    try {
      console.log("Sending login request:", {
        email: formData.email,
        password: formData.password,
      });

      const response = await authAPI.login({
        email: formData.email,
        password: formData.password,
      });

      console.log("Login response:", response);

      tokenStorage.setAccessToken(response.access_token);
      tokenStorage.setRefreshToken(response.refresh_token);

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.code === 3000) {
        setError({ show: true, message: "Неверный пароль" });
      } else if (error.code === 3001) {
        setError({
          show: true,
          message: "Ваш аккаунт неактивен. Обратитесь в поддержку.",
        });
      } else {
        setError({
          show: true,
          message: error.message || "Произошла ошибка при входе",
        });
      }
    } finally {
      setIsFormLoading(false);
    }
  };

  const handlePasswordRecovery = () => {
    setPasswordRecovery(true);
    startTimer();
  };

  const handleAuthModeToggle = (mode: AuthMode) => {
    if (mode === "login") {
      navigate("/login");
    } else {
      navigate("/registration");
    }
  };

  if (isLoading || isAuthenticated) {
    return <div className="bg-background h-screen" />;
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        if (authMode === "registration") {
          return (
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <input
                  className={`bg-foreground rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg ${
                    validationErrors.fullName ? "border-2 border-red-500" : ""
                  }`}
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  placeholder="Имя Фамилия"
                />
                {validationErrors.fullName && (
                  <p className="text-sm text-red-500">
                    {validationErrors.fullName}
                  </p>
                )}

                <input
                  className={`bg-foreground rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg ${
                    validationErrors.email ? "border-2 border-red-500" : ""
                  }`}
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="----------@mail.ru корпоративный"
                />
                {validationErrors.email && (
                  <p className="text-sm text-red-500">
                    {validationErrors.email}
                  </p>
                )}

                <label
                  htmlFor="data-collection"
                  className="bg-foreground rounded-primary inline-flex w-full justify-between px-4 py-3 text-base text-black md:px-8 md:text-lg"
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
        } else {
          return (
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <input
                  className={`bg-foreground rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg ${
                    validationErrors.email ? "border-2 border-red-500" : ""
                  }`}
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="----------@mail.ru корпоративный"
                />
                {validationErrors.email && (
                  <p className="text-sm text-red-500">
                    {validationErrors.email}
                  </p>
                )}

                <input
                  className="bg-foreground rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  placeholder="Введите пароль"
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
                  className={`bg-transparent text-white disabled:opacity-50 ${
                    timer.active ? "" : "hover:cursor-pointer hover:underline"
                  }`}
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
        }

      case 2:
        if (authMode === "registration") {
          return (
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <input
                  className={`bg-foreground rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg ${
                    validationErrors.company ? "border-2 border-red-500" : ""
                  }`}
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Компания"
                />
                {validationErrors.company && (
                  <p className="text-sm text-red-500">
                    {validationErrors.company}
                  </p>
                )}

                <input
                  className={`bg-foreground rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg ${
                    validationErrors.specialization
                      ? "border-2 border-red-500"
                      : ""
                  }`}
                  type="text"
                  value={formData.specialization}
                  onChange={(e) =>
                    handleInputChange("specialization", e.target.value)
                  }
                  placeholder="Должность в компании"
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
        } else {
          return (
            <div className="space-y-4 text-center">
              <p className="text-xl text-white">Вы успешно вошли в систему!</p>
              <p className="text-lg text-white/80">
                Нажмите "Продолжить" для перехода в личный кабинет
              </p>
            </div>
          );
        }

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-center text-white">
                Сейчас на указанную почту прийдет Ваш пароль для входа. Введите
                его ниже и используйте при повторном входе.
              </p>

              <input
                className="bg-foreground rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Введите пароль"
              />

              {error.show && (
                <p className="text-center text-red-500">{error.message}</p>
              )}

              <button
                onClick={startTimer}
                disabled={timer.active}
                className={`bg-transparent text-white disabled:opacity-50 ${
                  timer.active ? "" : "hover:cursor-pointer hover:underline"
                }`}
              >
                {timer.active
                  ? `Отправить еще раз через ${timer.seconds} сек`
                  : "Отправить еще раз"}
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4 text-center">
            <p className="text-xl text-white">Регистрация завершена!</p>
            <p className="text-lg text-white/80">
              Нажмите "Завершить" для перехода в личный кабинет
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const handleMainButtonClick = () => {
    if (authMode === "registration") {
      if (currentStep === totalSteps) {
        handlePasswordVerification();
      } else if (currentStep === 2) {
        handleRegistration();
      } else {
        handleNextStep();
      }
    } else {
      if (currentStep === 1) {
        handleLogin();
      } else {
        handleNextStep();
      }
    }
  };

  return (
    <div className="bg-background">
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

          <a
            href="/"
            className="top-4 left-1/2 text-center font-[Abhaya_Libre] text-[50px] leading-none font-extrabold hover:underline md:absolute md:-translate-x-1/2"
          >
            S&H
          </a>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="rounded-primary flex bg-white/5 text-xl font-semibold">
            <button
              onClick={() => handleAuthModeToggle("registration")}
              className={`rounded-[inherit] px-10 py-3 hover:cursor-pointer ${
                authMode === "registration" ? "bg-accent/50" : ""
              }`}
            >
              Регистрация
            </button>
            <button
              onClick={() => handleAuthModeToggle("login")}
              className={`rounded-[inherit] px-10 py-3 hover:cursor-pointer ${
                authMode === "login" ? "bg-accent/50" : ""
              }`}
            >
              Вход
            </button>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 pb-20">
          <div className="w-full max-w-xl">
            <div className="mb-8">{renderStepContent()}</div>

            <button
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
              className="bg-background text-foreground hover:bg-accent rounded-primary w-full flex-1 px-6 py-3 font-semibold transition-colors disabled:opacity-50"
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
            </button>
          </div>
        </div>

        <CustomMarquee className="absolute! bottom-0" />
      </div>

      <div className="pt-16">
        <FooterSection />
      </div>
    </div>
  );
}
