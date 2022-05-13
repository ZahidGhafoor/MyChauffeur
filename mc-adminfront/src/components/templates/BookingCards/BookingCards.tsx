import "./BookingCards.css";

export default function BookingCards({ heading, children, ...rest }: any) {
  return (
    <div className="booking-card" {...rest}>
      <h3 className="card-heading">{heading}</h3>
      {children}
    </div>
  );
}
