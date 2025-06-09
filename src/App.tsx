import React, { useState } from 'react';
import { User, ArrowRight, CheckCircle, AlertCircle, ArrowLeft, Cross } from 'lucide-react';

type Screen = 'input' | 'result';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('input');
  const [cpf, setCpf] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');

  // Format CPF as user types
  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  // Validate CPF format (basic validation)
  const validateCPF = (cpf: string) => {
    const numbers = cpf.replace(/\D/g, '');
    return numbers.length === 11;
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCPF(cpf)) {
      setError('Por favor, insira um CPF válido com 11 dígitos');
      return;
    }

    setIsValidating(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsValidating(false);
      setCurrentScreen('result');
    }, 1500);
  };

  const handleReset = () => {
    setCpf('');
    setError('');
    setCurrentScreen('input');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {currentScreen === 'input' ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:shadow-2xl">
            {/* Header with Resort Name and SUS Logo */}
            <div className="text-center mb-8 border-b border-gray-100 pb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-red-100 rounded-full p-3 mr-4">
                  <Cross className="w-8 h-8 text-red-600" />
                </div>
                <div className="text-left">
                  <h2 className="text-lg font-bold text-gray-900">Village Resort</h2>
                  <p className="text-sm text-gray-600">Sistema Único de Saúde</p>
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Registro de Participante
              </h1>
              <p className="text-gray-600">
                Digite o CPF para consultar os dados do participante
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-2">
                  CPF do Participante
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="cpf"
                    value={cpf}
                    onChange={handleCPFChange}
                    placeholder="000.000.000-00"
                    maxLength={14}
                    className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      error 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-200 hover:border-gray-300 focus:border-blue-500'
                    }`}
                    disabled={isValidating}
                  />
                  {error && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                  )}
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!cpf || isValidating}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center group"
              >
                {isValidating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Validando CPF...
                  </>
                ) : (
                  <>
                    Consultar Participante
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                Os dados serão consultados de forma segura e confidencial
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500 animate-fade-in">
            {/* Header with Resort Name and SUS Logo */}
            <div className="text-center mb-8 border-b border-gray-100 pb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-red-100 rounded-full p-3 mr-4">
                  <Cross className="w-8 h-8 text-red-600" />
                </div>
                <div className="text-left">
                  <h2 className="text-lg font-bold text-gray-900">Village Resort</h2>
                  <p className="text-sm text-gray-600">Sistema Único de Saúde</p>
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Participante Registrado
              </h1>
              <p className="text-gray-600">
                O participante foi encontrado com sucesso
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border border-green-200">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-green-600" />
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Participante Encontrado
                </h3>
                <p className="text-green-600 font-medium mb-4">
                  Status: Registrado e Ativo
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-green-700">
                    Situação Regular
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-200 flex items-center justify-center group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Consultar Outro CPF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;