import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error.message || 'An unexpected application error occurred.',
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('Vellune ErrorBoundary caught error:', error, info);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8F6F1] text-[#292725] flex items-center justify-center p-6">
          <div className="max-w-lg w-full p-8 bg-[#F5F0E6] border border-[#B8B3AA]">
            <div className="text-xs uppercase tracking-widest text-[#702F3B] mb-2">
              Vellune System Notice
            </div>
            <h1 className="font-display text-3xl text-[#292725] mb-3">
              A Session Interruption Occurred
            </h1>
            <p className="text-sm text-[#493A32] leading-relaxed mb-6">
              Please reload the page to restore your reading session. If this occurred while saving cloud data, ensure your account email is verified and your entries meet field length guidelines.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 text-xs uppercase tracking-widest bg-[#292725] text-[#F8F6F1] hover:bg-[#702F3B] transition-colors cursor-pointer"
            >
              Reload Vellune
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
