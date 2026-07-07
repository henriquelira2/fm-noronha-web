type LiveBadgeProps = {
  label: string;
  dotColor: string;
};

export function LiveBadge({ label, dotColor }: LiveBadgeProps) {
  return (
    <span className="live-badge">
      <span className="live-badge__dot" style={{ backgroundColor: dotColor }} />
      {label}
    </span>
  );
}
