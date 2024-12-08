// src/context/CurrencyContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

interface CurrencyDetails {
  symbol_native: string;
  rate: number; // Optional: Add conversion rates here if needed
}

interface CurrencyContextType {
  selectedCurrency: string | null;
  setSelectedCurrency: (currency: string) => void;
  currencies: Record<string, CurrencyDetails>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>("USD");

  const currencies: Record<string, { symbol_native: string; rate: number }> = {
    USD: { symbol_native: "$", rate: 1 },
    EUR: { symbol_native: "€", rate: 0.85 },
    JPY: { symbol_native: "￥", rate: 110.0 },
    BGN: { symbol_native: "лв.", rate: 1.96 },
    CZK: { symbol_native: "Kč", rate: 21.5 },
    AUD: { symbol_native: "$", rate: 1.34 },
    BRL: { symbol_native: "R$", rate: 5.0 },
    CAD: { symbol_native: "$", rate: 1.25 },
    CHF: { symbol_native: "CHF", rate: 0.92 },
    CNY: { symbol_native: "CN¥", rate: 6.45 },
    DKK: { symbol_native: "kr", rate: 6.36 },
    GBP: { symbol_native: "£", rate: 0.73 },
    EGP: { symbol_native: "E£", rate: 50.04 },
    HKD: { symbol_native: "$", rate: 7.8 },
    HRK: { symbol_native: "kn", rate: 6.63 },
    HUF: { symbol_native: "Ft", rate: 310.0 },
    IDR: { symbol_native: "Rp", rate: 14400 },
    ILS: { symbol_native: "₪", rate: 3.2 },
    INR: { symbol_native: "₹", rate: 74.0 },
    ISK: { symbol_native: "kr", rate: 129.0 },
    KRW: { symbol_native: "₩", rate: 1180.0 },
    MXN: { symbol_native: "$", rate: 20.0 },
    MYR: { symbol_native: "RM", rate: 4.2 },
    NOK: { symbol_native: "kr", rate: 8.6 },
    NZD: { symbol_native: "$", rate: 1.4 },
    PHP: { symbol_native: "₱", rate: 50.0 },
    PLN: { symbol_native: "zł", rate: 3.9 },
    RON: { symbol_native: "RON", rate: 4.1 },
    RUB: { symbol_native: "руб.", rate: 74.0 },
    SEK: { symbol_native: "kr", rate: 8.8 },
    SGD: { symbol_native: "$", rate: 1.35 },
    THB: { symbol_native: "฿", rate: 33.0 },
    TRY: { symbol_native: "TL", rate: 8.8 },
    ZAR: { symbol_native: "R", rate: 14.0 },
  };
  

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency, currencies }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
