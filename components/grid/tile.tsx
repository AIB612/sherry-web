import clsx from "clsx";
import Label from "../label";

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  src,
  alt,
}: {
  isInteractive?: boolean;
  active?: boolean;
  src?: string;
  alt?: string;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: "bottom" | "center";
    originalAmount?: string;
    discount?: number;
    badge?: string;
    billingCycle?: string;
  };
}) {
  return (
    <div
      className={clsx(
        "group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-[var(--color-airbnb-red)] dark:bg-black",
        {
          relative: label,
          "border-2 border-[var(--color-airbnb-red)]": active,
          "border-neutral-200 dark:border-neutral-800": !active,
        },
      )}
    >
      {src ? (
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <img
            src={src}
            alt={alt || ""}
            style={{ maxWidth: '100px', maxHeight: '100px', width: 'auto', height: 'auto' }}
            className={clsx("object-contain", {
              "transition duration-300 ease-in-out group-hover:scale-110":
                isInteractive,
            })}
          />
        </div>
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
          originalAmount={label.originalAmount}
          discount={label.discount}
          badge={label.badge}
          billingCycle={label.billingCycle}
        />
      ) : null}
    </div>
  );
}
