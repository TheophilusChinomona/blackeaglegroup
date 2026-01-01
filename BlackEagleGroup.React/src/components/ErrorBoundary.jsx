/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 */

import { Component } from 'react'
import { Alert } from 'react-bootstrap'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console for debugging
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })
    
    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="container mt-5" role="alert" aria-live="assertive">
          <Alert variant="danger">
            <Alert.Heading>Something went wrong</Alert.Heading>
            <p>
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            {import.meta.env.MODE === 'development' && this.state.error && (
              <details className="mt-3">
                <summary>Error Details (Development Only)</summary>
                <pre className="mt-2" style={{ fontSize: '12px', overflow: 'auto' }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <div className="mt-3">
              <button
                className="btn btn-primary"
                onClick={this.handleReset}
                aria-label="Try again"
              >
                Try Again
              </button>
              <button
                className="btn btn-secondary ms-2"
                onClick={() => window.location.href = '/'}
                aria-label="Go to home page"
              >
                Go to Home
              </button>
            </div>
          </Alert>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

