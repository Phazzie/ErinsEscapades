import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { /* eslint-disable-next-line no-console */ console.error('ErrorBoundary caught', error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-6">
          <h1 className="text-3xl mb-4 text-red-400 font-bold">Something broke.</h1>
          <button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded">Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
