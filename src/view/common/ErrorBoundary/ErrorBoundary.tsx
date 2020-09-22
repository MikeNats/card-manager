import React, { ErrorInfo} from 'react'
import { ErrorBoundaryProps, ErrorBoundaryState } from './types';

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError() {
      return { hasError: true };
    }
  
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      console.log(errorInfo)//
    }
  
    render() {
      if (this.state.hasError) {
        return <h3>Oops somthing went wrong</h3>
      }
  
      return this.props.children; 
    }
  }

export default ErrorBoundary