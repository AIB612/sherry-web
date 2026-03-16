import clsx from "clsx";

const Prose = ({ html, className }: { html: string; className?: string }) => {
  return (
    <div
      className={clsx(
        "prose mx-auto max-w-6xl text-xs leading-relaxed text-black prose-headings:mt-3 prose-headings:mb-2 prose-headings:font-semibold prose-headings:text-black prose-h1:text-base prose-h2:text-sm prose-h3:text-sm prose-h4:text-xs prose-h5:text-xs prose-h6:text-xs prose-a:text-black prose-a:underline prose-a:hover:text-neutral-300 prose-strong:text-black prose-strong:font-semibold prose-ol:mt-2 prose-ol:mb-2 prose-ol:list-decimal prose-ol:pl-4 prose-ul:mt-2 prose-ul:mb-2 prose-ul:list-disc prose-ul:pl-4 prose-li:my-0.5 prose-p:my-1 dark:text-white dark:prose-headings:text-white dark:prose-a:text-white dark:prose-strong:text-white",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Prose;
