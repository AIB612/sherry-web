export default async function Footer() {
  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400 py-8">
      <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          Swisspro.it © 2024. All rights are reserved.
        </div>
        <div className="text-center">
          Contact: Software@dropking.ch
        </div>
      </div>
    </footer>
  );
}
