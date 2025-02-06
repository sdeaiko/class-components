import { Component, ErrorInfo, ReactNode } from 'react';
import cat from "./assets/pixel-cat.gif" 

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <img src={cat} alt="cat"/>
          <p>Wait... Something wrong :(</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;