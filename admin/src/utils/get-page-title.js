import defaultSettings from '@/settings';

const title = defaultSettings.title || '寰宇科技';

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${title} - ${pageTitle}`;
  }
  return `${title}`;
}
