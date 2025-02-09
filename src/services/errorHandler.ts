type ErrorCallback = (error: Error) => void;

export const errorHandler = {
  onError: null as ErrorCallback | null,

  setErrorHandler: (callback: ErrorCallback) => {
    errorHandler.onError = callback;
  },

  handleError: (error: Error) => {
    console.error('Error:', error);
    
    if (errorHandler.onError) {
      errorHandler.onError(error);
    }
  },

  isNetworkError: (error: Error): boolean => {
    return error.message.includes('network') || error.message.includes('Network');
  },

  formatErrorMessage: (error: Error): string => {
    if (errorHandler.isNetworkError(error)) {
      return 'Erro de conexão. Por favor, verifique sua internet.';
    }
    return 'Ocorreu um erro. Por favor, tente novamente.';
  }
}; 