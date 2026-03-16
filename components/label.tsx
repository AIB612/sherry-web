import clsx from "clsx";
import Price from "./price";

const Label = ({
  title,
  amount,
  currencyCode,
  position = "bottom",
  originalAmount,
  discount,
  badge,
  billingCycle,
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: "bottom" | "center";
  originalAmount?: string;
  discount?: number;
  badge?: string;
  billingCycle?: string;
}) => {
  const cycleLabel = billingCycle === 'monthly' ? '/mo' : billingCycle === 'yearly' ? '/yr' : '';
  
  // Convert to numbers for comparison
  const hasOriginalPrice = originalAmount && parseFloat(originalAmount) !== parseFloat(amount);
  
  return (
    <div
      className={clsx(
        "absolute bottom-0 right-0 flex w-full px-4 pb-4 @container/label pointer-events-none justify-end",
        {
          "lg:px-20 lg:pb-[35%] translate-y-[200px]": position === "center",
        },
      )}
    >
      <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:beutral-800 dark:bg-black/70 dark:text-white">
        <h3 className="mr-4 line-clamp-2 grow pl-2 leading-none tracking-tight">
          {title}
        </h3>
        <div className="flex items-center gap-1 pr-2">
          <div className="flex items-center gap-1 rounded-full bg-[var(--color-airbnb-red)] px-2 py-1 text-white">
            <span className="text-sm font-bold">
              {currencyCode} {parseFloat(amount).toFixed(2)}
            </span>
            {cycleLabel && <span className="text-xs opacity-80">{cycleLabel}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Label;
