import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full border border-rose-100 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-3xl mx-auto flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>
            
            <h2 className="text-xl font-black text-slate-900">
              Đã xảy ra sự cố hiển thị
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Hệ thống đã phát hiện sự cố hiển thị. Dữ liệu câu hỏi và kết quả của em vẫn an toàn. Hãy bấm nút dưới đây để làm mới ứng dụng nhé!
            </p>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Tải lại trang</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
