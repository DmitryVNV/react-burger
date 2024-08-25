import { memo, FC } from "react";

const getDaysCount = (days: number): string => {
  if (days === 0) return "Сегодня";
  if (days === 1) return "Вчера";

  const lastDigit = days % 10;
  const isTeens = days % 100 >= 11 && days % 100 <= 14;

  if (isTeens) return `${days} дней назад`;

  switch (lastDigit) {
    case 1:
      return `${days} день назад`;
    case 2:
    case 3:
    case 4:
      return `${days} дня назад`;
    default:
      return `${days} дней назад`;
  }
};

export const formattedDate = (date: Date): string => {
  const created = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.ceil((today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));

  const hours = created.getHours().toString().padStart(2, "0");
  const minutes = created.getMinutes().toString().padStart(2, "0");

  const timezoneOffset = `i-GMT${created.getTimezoneOffset() > 0 ? "-" : "+"}${Math.abs(created.getTimezoneOffset() / 60)}`;

  return `${getDaysCount(diffDays)}, ${hours}:${minutes} ${timezoneOffset}`;
};

type TDateTitleProps = {
  date: Date;
};

const DateTitle: FC<TDateTitleProps> = ({ date }) => {
  const dateFormatted = formattedDate(date);
  return <span className="text text_type_main-default text_color_inactive">{dateFormatted}</span>;
};

export default memo(DateTitle);