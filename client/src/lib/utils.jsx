const DateFormatter = ({ date }) => {
  const formatter = new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return <>{formatter.format(new Date(date))}</>;
};

export default DateFormatter;
