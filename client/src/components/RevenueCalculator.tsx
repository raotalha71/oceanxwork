import { useMemo, useState } from "react";

type RevenueCalculatorProps = {
  isOpen?: boolean;
  onClose?: () => void;
  inline?: boolean;
  defaultCurrency?: string;
};

function formatMoney(value: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${Math.round(value)}`;
  }
}

export default function RevenueCalculator({
  isOpen = true,
  onClose,
  inline = false,
  defaultCurrency = "GBP",
}: RevenueCalculatorProps) {
  const [dailyRate, setDailyRate] = useState(1200);
  const [activationsPerDay, setActivationsPerDay] = useState(2);
  const [units, setUnits] = useState(1);

  const dailyRevenue = useMemo(
    () => dailyRate * activationsPerDay * units,
    [dailyRate, activationsPerDay, units]
  );
  const monthlyRevenue = dailyRevenue * 30;
  const annualRevenue = monthlyRevenue * 12;

  if (!inline && !isOpen) return null;

  return (
    <div style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", padding: "1.25rem", background: "rgba(255,255,255,0.03)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h3 style={{ margin: 0 }}>Revenue Calculator</h3>
        {!inline && onClose ? (
          <button onClick={onClose} style={{ cursor: "pointer" }}>
            Close
          </button>
        ) : null}
      </div>

      <div style={{ display: "grid", gap: "0.75rem", marginBottom: "1rem" }}>
        <label>
          Daily activation rate
          <input type="number" min={0} value={dailyRate} onChange={e => setDailyRate(Number(e.target.value) || 0)} style={{ width: "100%" }} />
        </label>
        <label>
          Activations per day
          <input type="number" min={0} value={activationsPerDay} onChange={e => setActivationsPerDay(Number(e.target.value) || 0)} style={{ width: "100%" }} />
        </label>
        <label>
          Number of units
          <input type="number" min={1} value={units} onChange={e => setUnits(Number(e.target.value) || 1)} style={{ width: "100%" }} />
        </label>
      </div>

      <div style={{ display: "grid", gap: "0.5rem" }}>
        <strong>Daily: {formatMoney(dailyRevenue, defaultCurrency)}</strong>
        <strong>Monthly: {formatMoney(monthlyRevenue, defaultCurrency)}</strong>
        <strong>Annual: {formatMoney(annualRevenue, defaultCurrency)}</strong>
      </div>
    </div>
  );
}
