"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import AppLayout from "@/components/AppLayout";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <AppLayout>{children}</AppLayout>
    </Provider>
  );
}

// Update src/app/layout.js to use ClientLayout or similar if needed.
// Actually, I'll just put the provider directly in a client component that wraps AppLayout in layout.js.
