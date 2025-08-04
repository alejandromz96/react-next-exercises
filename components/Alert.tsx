"use client";
import { useMemo, type FC, type PropsWithChildren } from "react";

type AlertType = "success" | "error" | "info";
type AlertProps = PropsWithChildren<{
  type: AlertType;
  className?: string;
}>;

const getStyleByType: Record<AlertType, string> = {
  success: "bg-green-100 border border-green-400 text-green-700",
  info: "bg-slate-100 border border-slate-400 text-slate-700",
  error: "bg-red-100 border border-red-400 text-red-700",
};

const Alert = ({ children, type, className }: AlertProps) => {
  const colorStyles = getStyleByType[type];
  return <div role="alert" className={`${colorStyles} rounded-xl p-4 ${className ?? ""}`}>{children}</div>;
};

export default Alert;
