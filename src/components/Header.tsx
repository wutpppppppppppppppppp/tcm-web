import { LocaleSwitcher } from './LocaleSwitcher';

export const Header = async () => {
  return (
    <div className="flex items-center justify-between bg-gray-300 px-4 py-2">
      <div className="text-gray-700">Thai Chemical Marketing Co.,LTD</div>
      <div className="flex items-center gap-4">
        <LocaleSwitcher />
      </div>
    </div>
  );
};
