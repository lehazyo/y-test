export const convertEnDateToRu = (rawDate: string): string => {
  const presumedYearMatch = rawDate.match(/\d\d\d\d/);
  const monthMatch = rawDate.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/);
  const presumedDayMatch = rawDate.match(/(?<!\d)\d(\d)?(?!\d)/);

  const yearBlock = (presumedYearMatch !== null) ? presumedYearMatch[0] : '';
  const dayBlock = (presumedDayMatch !== null) ? presumedDayMatch[0] : '';
  let monthBlock = '';
  if (monthMatch !== null) {
    switch (monthMatch[0]) {
      case 'Jan':
        monthBlock = (dayBlock === '') ? 'Январь' : 'января';
        break;
      case 'Feb':
        monthBlock = (dayBlock === '') ? 'Февраль' : 'февраля';
        break;
      case 'Mar':
        monthBlock = (dayBlock === '') ? 'Март' : 'марта';
        break;
      case 'Apr':
        monthBlock = (dayBlock === '') ? 'Апрель' : 'апреля';
        break;
      case 'May':
        monthBlock = (dayBlock === '') ? 'Май' : 'мая';
        break;
      case 'Jun':
        monthBlock = (dayBlock === '') ? 'Июнь' : 'июня';
        break;
      case 'Jul':
        monthBlock = (dayBlock === '') ? 'Июль' : 'июля';
        break;
      case 'Aug':
        monthBlock = (dayBlock === '') ? 'Август' : 'августа';
        break;
      case 'Sep':
        monthBlock = (dayBlock === '') ? 'Сентябрь' : 'сентября';
        break;
      case 'Oct':
        monthBlock = (dayBlock === '') ? 'Октябрь' : 'октября';
        break;
      case 'Nov':
        monthBlock = (dayBlock === '') ? 'Ноябрь' : 'ноября';
        break;
      case 'Dec':
        monthBlock = (dayBlock === '') ? 'Декабрь' : 'декабря';
        break;
      default:
        monthBlock = '';
    }
  }

  const convertedDate = [
    dayBlock,
    monthBlock,
    yearBlock,
  ].join(' ');

  return convertedDate;
}