export const analytics = {
  trackEvent: (eventName: string, properties?: Record<string, any>) => {
    try {
      // Implementação do analytics aqui
      console.log('Event tracked:', eventName, properties);
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  },

  trackError: (error: Error) => {
    analytics.trackEvent('error', {
      message: error.message,
      stack: error.stack
    });
  },

  trackPageView: (pageName: string) => {
    analytics.trackEvent('page_view', { page: pageName });
  }
}; 