export function Dashboard() {
  return (
    <div className="bg-background text-foreground flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Dashboard</h1>
        <p className="text-lg">Добро пожаловать в личный кабинет!</p>
        <a href="/" className="mt-4 inline-block text-blue-500 underline">
          Вернуться на главную
        </a>
      </div>
    </div>
  );
}
