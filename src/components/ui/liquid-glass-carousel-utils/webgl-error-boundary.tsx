"use client";

import React, { Component, type ErrorInfo, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface WebGLFallbackProps {
  className?: string;
  message?: string;
}

export function WebGLFallback({
  className,
  message = "Esta galería requiere WebGL, que no está disponible en este navegador.",
}: WebGLFallbackProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center p-6 text-center text-sm text-white/70",
        className,
      )}
    >
      <p>{message}</p>
    </div>
  );
}

interface WebGLErrorBoundaryProps {
  fallback?: ReactNode;
  children: ReactNode;
}

interface WebGLErrorBoundaryState {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<
  WebGLErrorBoundaryProps,
  WebGLErrorBoundaryState
> {
  constructor(props: WebGLErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): WebGLErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    // WebGL initialization error handled gracefully by fallback
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <WebGLFallback />;
    }
    return this.props.children;
  }
}
