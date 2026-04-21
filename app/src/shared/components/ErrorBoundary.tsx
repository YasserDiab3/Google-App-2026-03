import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex items-center justify-center min-h-[200px] p-6">
            <div className="text-center max-w-md">
              <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-exclamation-triangle text-danger text-xl" />
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">Something went wrong</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                {this.state.error?.message}
              </p>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="mt-4 px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark transition"
              >
                Try again
              </button>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
