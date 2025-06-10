import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

// Страницы
const PatientFormScreen = ({ formData, setFormData, nextStep }) => {
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleScan = (docType) => {
    setFormData((prev) => ({
      ...prev,
      [`${docType}Scan`]: `Scan_${docType}_${Date.now()}.pdf`,
    }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Регистрация пациента
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ФИО
          </label>
          <input
            type="text"
            name="fio"
            value={formData.fio}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Иванов Иван Иванович"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Пол
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Выберите пол</option>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Дата рождения
          </label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Контактный телефон
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="+7 (___) ___-__-__"
          />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Документы</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["passport", "oms", "snils"].map((doc) => (
            <div key={doc} className="border border-gray-300 rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-2">
                {doc === "passport"
                  ? "Паспорт"
                  : doc === "oms"
                  ? "ОМС"
                  : "СНИЛС"}
              </h3>
              {formData[`${doc}Scan`] ? (
                <div className="text-green-600 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Документ загружен
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleScan(doc)}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Сканировать
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center">
        <input
          type="checkbox"
          id="manualEntry"
          name="manualEntry"
          checked={formData.manualEntry}
          onChange={handleInputChange}
          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="manualEntry" className="ml-2 text-sm text-gray-700">
          Данные указаны со слов пациента
        </label>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={() => {
            setFormData((prev) => ({ ...prev, isUnknown: true }));
            navigate("/unknown-patient");
          }}
          className="py-3 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Регистрация неизвестного пациента
        </button>

        <button
          type="button"
          onClick={() => navigate("/document-scan")}
          disabled={!formData.fio && !formData.manualEntry}
          className={`py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
            !formData.fio && !formData.manualEntry
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Далее
        </button>
      </div>
    </div>
  );
};

const DocumentScanScreen = ({ formData, setFormData, nextStep, prevStep }) => {
  const navigate = useNavigate();
  const generateUIP = () => {
    const existingUIP =
      Math.random() > 0.5
        ? Math.floor(1000000000 + Math.random() * 9000000000).toString()
        : null;

    setFormData((prev) => ({
      ...prev,
      uip: existingUIP || "Новый идентификатор будет создан",
    }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Сканирование документов
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
          {formData.passportScan ? (
            <div className="text-gray-500">Предпросмотр документа</div>
          ) : (
            <div className="text-gray-400">Нет загруженного документа</div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[
            { label: "ФИО", value: formData.fio },
            {
              label: "Пол",
              value: formData.gender === "male" ? "Мужской" : "Женский",
            },
            { label: "Дата рождения", value: formData.birthDate },
            { label: "Серия и номер паспорта", value: "0000 000000" },
            { label: "Номер СНИЛС", value: "000-000-000 00" },
          ].map((field, i) => (
            <div key={i} className="flex">
              <span className="font-medium text-gray-600 w-1/3">
                {field.label}:
              </span>
              <span className="text-gray-800 ml-2">{field.value || "—"}</span>
            </div>
          ))}
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Пересканировать
          </button>
          <button
            onClick={() => {
              generateUIP();
              navigate("/confirmation");
            }}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Подтвердить данные
          </button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <h3 className="font-medium text-blue-800 mb-2">Подсказка</h3>
        <p className="text-blue-700 text-sm">
          Если документы отсутствуют, вы можете продолжить регистрацию с уже
          введенными данными
        </p>
      </div>
    </div>
  );
};

const ConfirmationScreen = ({ formData, setFormData, nextStep, prevStep }) => {
  const navigate = useNavigate();
  const generateUIP = () => {
    const existingUIP =
      Math.random() > 0.5
        ? Math.floor(1000000000 + Math.random() * 9000000000).toString()
        : null;

    setFormData((prev) => ({
      ...prev,
      uip: existingUIP || "Новый идентификатор будет создан",
    }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Подтверждение данных пациента
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Сводка данных
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[
            {
              label: "ФИО",
              value: formData.isUnknown ? "Неизвестный пациент" : formData.fio,
            },
            {
              label: "Пол",
              value:
                formData.gender === "male"
                  ? "Мужской"
                  : formData.gender === "female"
                  ? "Женский"
                  : "—",
            },
            { label: "Дата рождения", value: formData.birthDate || "—" },
            {
              label: "Документы",
              value: (
                <div className="space-y-1">
                  {formData.passportScan && (
                    <div className="text-green-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>{" "}
                      Паспорт загружен
                    </div>
                  )}
                  {formData.omsScan && (
                    <div className="text-green-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>{" "}
                      ОМС загружен
                    </div>
                  )}
                  {formData.snilsScan && (
                    <div className="text-green-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>{" "}
                      СНИЛС загружен
                    </div>
                  )}
                  {!formData.passportScan &&
                    !formData.omsScan &&
                    !formData.snilsScan && (
                      <span className="text-gray-500">
                        Документы отсутствуют
                      </span>
                    )}
                </div>
              ),
            },
            {
              label: "УИП",
              value: (
                <div>
                  {formData.uip ? (
                    <span className="font-mono">{formData.uip}</span>
                  ) : (
                    <div className="animate-pulse text-gray-500">
                      Проверка УИП...
                    </div>
                  )}
                </div>
              ),
            },
          ].map((field, i) => (
            <div key={i} className="flex">
              <span className="font-medium text-gray-600 w-1/3">
                {field.label}:
              </span>
              <span className="text-gray-800 ml-2">{field.value}</span>
            </div>
          ))}
        </div>

        {formData.isUnknown && (
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
            <div className="flex items-center text-yellow-800">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>
                Временная регистрация. Документы будут добавлены позже.
              </span>
            </div>
          </div>
        )}

        <div className="flex space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Редактировать
          </button>
          <button
            onClick={() => navigate("/registration-complete")}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Завершить регистрацию
          </button>
        </div>
      </div>

      {!formData.uip && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 mb-2">Внимание</h3>
          <p className="text-blue-700 text-sm">
            Уникальный идентификатор пациента не найден. Новый УИП будет создан
            автоматически.
          </p>
        </div>
      )}
    </div>
  );
};

const RegistrationCompleteScreen = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Регистрация завершена
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="text-center py-8">
          <svg
            className="w-16 h-16 mx-auto text-green-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Пациент успешно зарегистрирован!
          </h2>
          <p className="text-gray-600 mb-6">
            {formData.isUnknown
              ? "Временная карта создана. Данные требуют уточнения."
              : "Медицинская карта успешно создана."}
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 inline-block">
            <p className="text-sm text-gray-600">
              Уникальный идентификатор пациента:
            </p>
            <p className="font-mono text-lg font-bold text-gray-800 mt-1">
              {formData.uip || "1234567890"}
            </p>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Новый пациент
          </button>
          <button className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
            Распечатать квитанцию
          </button>
        </div>
      </div>
    </div>
  );
};

const UnknownPatientScreen = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Регистрация неизвестного пациента
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
          <div className="flex items-center text-yellow-800">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>
              Внимание: Регистрация временного пациента без документов
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[
            { label: "ФИО", value: "Неизвестный пациент" },
            { label: "Пол", value: "—" },
            { label: "Дата рождения", value: "—" },
            { label: "Документы", value: "Отсутствуют" },
          ].map((field, i) => (
            <div key={i} className="flex">
              <span className="font-medium text-gray-600 w-1/3">
                {field.label}:
              </span>
              <span className="text-gray-800 ml-2">{field.value}</span>
            </div>
          ))}
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Назад
          </button>
          <button
            onClick={() => navigate("/registration-complete")}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Завершить регистрацию
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [formData, setFormData] = useState({
    fio: "",
    gender: "",
    birthDate: "",
    address: "",
    phone: "",
    passportScan: null,
    omsScan: null,
    snilsScan: null,
    manualEntry: false,
    uip: "",
    isUnknown: false,
  });

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/b"
          element={
            <PatientFormScreen formData={formData} setFormData={setFormData} />
          }
        />
        <Route
          path="/"
          element={
            <DocumentScanScreen formData={formData} setFormData={setFormData} />
          }
        />
        <Route
          path="/confirmation"
          element={
            <ConfirmationScreen formData={formData} setFormData={setFormData} />
          }
        />
        <Route
          path="/registration-complete"
          element={
            <RegistrationCompleteScreen
              formData={formData}
              setFormData={setFormData}
            />
          }
        />
        <Route
          path="/unknown-patient"
          element={
            <UnknownPatientScreen
              formData={formData}
              setFormData={setFormData}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

// Header Component
function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg
              className="w-8 h-8 text-blue-600 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h1 className="text-xl font-bold text-gray-900">
              Система регистрации пациентов
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
