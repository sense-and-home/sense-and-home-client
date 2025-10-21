import ArrowBackIcon from "@/assets/icons/arrow-back.svg";
import SignUpBackground from "@/assets/img/sign-up-background.webp";
import { CustomMarquee } from "@/components/CustomMarquee";
import { FooterSection } from "@/sections/FooterSection";
import React, { useState } from "react";
import { useNavigate } from "react-router";

type AuthMode = "registration" | "login";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  company: string;
  position: string;
  verificationCode: string;
}

interface ErrorState {
  show: boolean;
  message: string;
}

interface TimerState {
  active: boolean;
  seconds: number;
}

export function RegistrationPage() {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<AuthMode>("registration");
  const [currentStep, setCurrentStep] = useState(1);
  const [stepHistory, setStepHistory] = useState<number[]>([1]);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    position: "",
    verificationCode: "",
  });

  const [error, setError] = useState<ErrorState>({ show: false, message: "" });
  const [timer, setTimer] = useState<TimerState>({ active: false, seconds: 0 });
  const [passwordRecovery, setPasswordRecovery] = useState(false);

  const totalSteps = authMode === "registration" ? 4 : 2;

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
    const nextStep = currentStep + 1;
    if (nextStep <= totalSteps) {
      setCurrentStep(nextStep);
      setStepHistory([...stepHistory, nextStep]);
      setError({ show: false, message: "" });
    } else {
      if (authMode === "login") {
        navigate("/dashboard");
      } else {
        navigate("/");
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
  };

  const handleAuthModeToggle = (mode: AuthMode) => {
    setAuthMode(mode);
    setCurrentStep(1);
    setStepHistory([1]);
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      company: "",
      position: "",
      verificationCode: "",
    });
    setError({ show: false, message: "" });
    setPasswordRecovery(false);
    setTimer({ active: false, seconds: 0 });
  };

  const handlePasswordVerification = () => {
    if (formData.password === "123456") {
      handleNextStep();
    } else {
      setError({ show: true, message: "Неверный пароль" });
    }
  };

  const handleLogin = () => {
    if (formData.password === "123456") {
      navigate("/dashboard");
    } else {
      setError({ show: true, message: "Неверный пароль" });
    }
  };

  const handlePasswordRecovery = () => {
    setPasswordRecovery(true);
    startTimer();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        if (authMode === "registration") {
          return (
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <input
                  className="bg-foreground rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  placeholder="Имя Фамилия"
                />

                <input
                  className="bg-foreground rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="----------@mail.ru корпоративный"
                />

                <label
                  htmlFor="data-collection"
                  className="bg-foreground rounded-primary inline-flex w-full justify-between px-4 py-3 text-base text-black md:px-8 md:text-lg"
                >
                  <span>Я даю согласие на обработку персональных данных</span>
                  <input type="checkbox" className="w-6" id="data-collection" />
                </label>
              </div>
            </div>
          );
        } else {
          return (
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <input
                  className="bg-foreground rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="----------@mail.ru корпоративный"
                />

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
                  className="bg-transparent text-white underline hover:no-underline"
                >
                  Восстановить пароль
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
                <p className="text-center text-white">
                  Сейчас на указанную почту прийдет Ваш пароль для входа.
                  Введите его ниже и используйте при повторном входе.
                </p>

                <input
                  className="bg-foreground rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  placeholder="Введите пароль"
                />

                {error.show && (
                  <p className="text-center text-red-500">{error.message}</p>
                )}

                <button
                  onClick={handlePasswordVerification}
                  className="bg-background text-foreground hover:bg-accent rounded-primary w-full px-6 py-3 font-semibold transition-colors"
                >
                  Войти
                </button>

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
              <input
                className="bg-foreground rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg"
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="Компания"
              />

              <input
                className="bg-foreground rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg"
                type="text"
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                placeholder="Должность в компании"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4 text-center">
            <p className="text-xl text-white">Регистрация завершена!</p>
            <p className="text-lg text-white/80">
              Нажмите "Завершить" для перехода на главную страницу
            </p>
          </div>
        );

      default:
        return null;
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
              onClick={
                authMode === "login" && currentStep === 1
                  ? handleLogin
                  : handleNextStep
              }
              className="bg-background text-foreground hover:bg-accent rounded-primary w-full flex-1 px-6 py-3 font-semibold transition-colors"
            >
              {currentStep === totalSteps ? "Завершить" : "Продолжить"}
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
