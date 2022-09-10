export const availableLangs = [
  {
    id: 'en',
    label: 'English',
  },
  {
    id: 'fa',
    label: 'فارسی',
  },
];

export const scopeLoader = (importer: any, root = 'i18n') => {
  return availableLangs.reduce((acc: any, lang) => {
    acc[lang.id] = () => importer(lang.id, root);
    return acc;
  }, {});
};
