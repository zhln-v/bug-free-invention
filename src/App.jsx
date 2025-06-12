import React, { useState } from "react";

const App = () => {
  // State management for different screens and form data
  const [activeScreen, setActiveScreen] = useState("form");
  const [formData, setFormData] = useState({
    description: "",
    date: "",
    location: "",
    photos: [],
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Mock data for search results
  const mockResults = [
    {
      id: 1,
      photo: "https://placehold.co/400x300",
      description: "Черный кошелек с документами, найден на станции Пушкинская",
      location: "Пушкинская",
      date: "2023-09-15",
    },
    {
      id: 2,
      photo: "https://placehold.co/400x300",
      description: "Синий зонт, найден на платформе Курская",
      location: "Курская",
      date: "2023-09-18",
    },
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle photo uploads
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const validPhotos = files.filter((file) => file.size <= 5 * 1024 * 1024); // 5MB limit

    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...validPhotos],
    }));
  };

  // Submit form data
  const submitForm = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setActiveScreen("success");
    }, 1500);
  };

  // Perform search
  const performSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      // Filter mock results based on search query
      const filteredResults = mockResults.filter(
        (item) =>
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults(filteredResults);
      setIsSearching(false);

      if (activeScreen !== "search-results") {
        setActiveScreen("search-results");
      }
    }, 1000);
  };

  // Render different screens based on activeScreen state
  const renderScreen = () => {
    switch (activeScreen) {
      case "landing":
        return (
          <LandingScreen
            onApplyNow={() => setActiveScreen("form")}
            onSearch={() => setActiveScreen("search")}
          />
        );
      case "form":
        return (
          <FormScreen
            formData={formData}
            onInputChange={handleInputChange}
            onPhotoUpload={handlePhotoUpload}
            onSubmit={submitForm}
            isSubmitting={isSubmitting}
            onBack={() => setActiveScreen("landing")}
          />
        );
      case "search":
        return (
          <SearchScreen
            searchQuery={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
            onSubmitSearch={performSearch}
            isSearching={isSearching}
          />
        );
      case "search-results":
        return (
          <SearchResultsScreen
            results={searchResults}
            onBack={() => setActiveScreen("landing")}
          />
        );
      case "success":
        return <SuccessScreen onBack={() => setActiveScreen("landing")} />;
      case "no-results":
        return <NoResultsScreen onBack={() => setActiveScreen("landing")} />;
      default:
        return (
          <LandingScreen
            onApplyNow={() => setActiveScreen("form")}
            onSearch={() => setActiveScreen("search")}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {renderScreen()}
      <Footer />
    </div>
  );
};

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-700 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="https://placehold.co/40x40" alt="Logo" className="mr-2" />
          <span className="text-xl font-bold">mos.ru</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a
            href="#how-it-works"
            className="hover:text-blue-200 transition duration-200"
          >
            Как это работает
          </a>
          <a
            href="#features"
            className="hover:text-blue-200 transition duration-200"
          >
            Возможности
          </a>
          <a
            href="#faq"
            className="hover:text-blue-200 transition duration-200"
          >
            FAQ
          </a>
          <a
            href="#contacts"
            className="hover:text-blue-200 transition duration-200"
          >
            Контакты
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-blue-800 mt-2 py-2">
          <a
            href="#how-it-works"
            className="block py-2 px-4 text-white hover:bg-blue-700"
            onClick={() => setIsMenuOpen(false)}
          >
            Как это работает
          </a>
          <a
            href="#features"
            className="block py-2 px-4 text-white hover:bg-blue-700"
            onClick={() => setIsMenuOpen(false)}
          >
            Возможности
          </a>
          <a
            href="#faq"
            className="block py-2 px-4 text-white hover:bg-blue-700"
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </a>
          <a
            href="#contacts"
            className="block py-2 px-4 text-white hover:bg-blue-700"
            onClick={() => setIsMenuOpen(false)}
          >
            Контакты
          </a>
        </nav>
      )}
    </header>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white py-8 px-6 mt-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Контакты</h3>
            <p>support@mos.ru</p>
            <p>+7 (495) 123-45-67</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Полезные ссылки</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-200 transition duration-200"
                >
                  Правила использования
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-200 transition duration-200"
                >
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-200 transition duration-200"
                >
                  Справочный центр
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Социальные сети</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-blue-200 transition duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="hover:text-blue-200 transition duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="#"
                className="hover:text-blue-200 transition duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-blue-600 text-center">
          <p>&copy; 2023 mos.ru. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

// Landing Screen Component
const LandingScreen = ({ onApplyNow, onSearch }) => {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Найдите потерянную вещь в метро за 3 шага
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Заполните заявку, и наша система сопоставит данные с найденными
              предметами
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onApplyNow}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
              >
                Подать заявку
              </button>
              <button
                onClick={onSearch}
                className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-6 rounded-lg shadow-md transition duration-200"
              >
                Начать поиск
              </button>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src="https://placehold.co/600x400"
              alt="Lost Item Service"
              className="rounded-lg shadow-xl w-full"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Как это работает
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Опишите</h3>
            <p className="text-gray-600">Расскажите, что вы потеряли</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Добавьте фото</h3>
            <p className="text-gray-600">Загрузите изображение предмета</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Получите уведомление</h3>
            <p className="text-gray-600">Система найдет совпадения</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Возможности сервиса
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-blue-600 mb-3">
              Удобная подача заявки
            </h3>
            <p className="text-gray-600">
              Заполните простую форму с описанием, датой, местом и фотографией
              потерянного предмета.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-blue-600 mb-3">
              Интеллектуальный поиск
            </h3>
            <p className="text-gray-600">
              Система автоматически сопоставляет данные о потерянных и найденных
              предметах.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-blue-600 mb-3">
              Мгновенные уведомления
            </h3>
            <p className="text-gray-600">
              Получайте уведомления о найденных совпадениях по SMS или email.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-blue-600 mb-3">Геолокация</h3>
            <p className="text-gray-600">
              Точное определение местоположения с помощью интеграции с картами.
            </p>
          </div>
        </div>
      </section>

      {/* Example Screens Section */}
      <section id="examples" className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Примеры интерфейса
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://placehold.co/400x300"
              alt="Form Example"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Форма подачи заявки</h3>
              <p className="text-gray-600 text-sm">
                Простая форма для описания потерянного предмета
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://placehold.co/400x300"
              alt="Search Results"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Результаты поиска</h3>
              <p className="text-gray-600 text-sm">
                Список найденных совпадений с фотографиями
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://placehold.co/400x300"
              alt="No Results"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Нет результатов</h3>
              <p className="text-gray-600 text-sm">
                Экран, отображаемый при отсутствии совпадений
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// Form Screen Component
const FormScreen = ({
  formData,
  onInputChange,
  onPhotoUpload,
  onSubmit,
  isSubmitting,
  onBack,
}) => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <button
          onClick={onBack}
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Вернуться на главную
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Подача заявки о потере
        </h2>

        <form onSubmit={onSubmit}>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Что вы потеряли? <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={onInputChange}
              placeholder="Например: черный кошелек с документами"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Опишите предмет как можно подробнее
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Добавить фото{" "}
              <span className="text-gray-500">(максимум 3 шт., до 5 МБ)</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <svg
                className="w-12 h-12 mx-auto text-gray-400 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <p className="text-gray-500 mb-2">Перетащите сюда или</p>
              <label className="cursor-pointer inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                Выберите файл
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={onPhotoUpload}
                  className="hidden"
                />
              </label>
            </div>

            {formData.photos.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {Array.from(formData.photos).map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Preview ${index + 1}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date"
                className="block text-gray-700 font-medium mb-2"
              >
                Дата потери <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={onInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-gray-700 font-medium mb-2"
              >
                Станция метро <span className="text-red-500">*</span>
              </label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={onInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Выберите станцию</option>
                <option value="Пушкинская">Пушкинская</option>
                <option value="Краснопресненская">Краснопресненская</option>
                <option value="Курская">Курская</option>
                <option value="Тверская">Тверская</option>
                <option value="Сухаревская">Сухаревская</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">
                Я ознакомлен с правилами сервиса
              </span>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-105 flex items-center justify-center ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Отправка...
                </>
              ) : (
                "Отправить заявку"
              )}
            </button>

            <button
              type="button"
              onClick={onBack}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-md transition duration-200"
            >
              Назад
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

// Search Screen Component
const SearchScreen = ({
  searchQuery,
  onSearchChange,
  onSubmitSearch,
  isSearching,
}) => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <button
          onClick={() => window.history.back()}
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Вернуться на главную
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Поиск потерянных вещей
        </h2>

        <form onSubmit={onSubmitSearch} className="mb-8">
          <div className="mb-4">
            <label
              htmlFor="search"
              className="block text-gray-700 font-medium mb-2"
            >
              Поиск по описанию или станции метро
            </label>
            <div className="flex">
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={onSearchChange}
                placeholder="Введите описание или станцию..."
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={isSearching}
                className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-r-lg transition duration-200 flex items-center ${
                  isSearching ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSearching ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Искать"
                )}
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Например: "черный кошелек", "Пушкинская"
          </p>
        </form>
      </div>
    </main>
  );
};

// Search Results Screen Component
const SearchResultsScreen = ({ results, onBack }) => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
        <button
          onClick={onBack}
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Вернуться на главную
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {results.length > 0
            ? `Найдено совпадений: ${results.length}`
            : "Совпадений не найдено"}
        </h2>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition duration-200"
              >
                <img
                  src={item.photo}
                  alt={item.description}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{item.description}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span>
                      {new Date(item.date).toLocaleDateString("ru-RU")}
                    </span>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200">
                    Забрать вещь
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="w-20 h-20 mx-auto text-gray-400 mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Ничего не найдено
            </h3>
            <p className="text-gray-600 mb-6">
              Пока мы не нашли совпадений. Попробуйте уточнить параметры или
              проверьте заявку позже
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-200"
            >
              Изменить запрос
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

// Success Screen Component
const SuccessScreen = ({ onBack }) => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Заявка отправлена!
        </h2>
        <p className="text-gray-600 mb-8">
          Мы уведомим вас, если найдем совпадения
        </p>
        <button
          onClick={onBack}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200"
        >
          Вернуться на главную
        </button>
      </div>
    </main>
  );
};

export default App;
