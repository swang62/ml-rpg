interface ProgressBarProps {
  value: number;
  max: number;
  color: string;
}

export default function ProgressBar(props: ProgressBarProps) {
  const pct = props.max > 0 ? Math.round((props.value / props.max) * 100) : 0;

  return (
    <div
      class="progress-bar"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        class="progress-bar__fill"
        style={{
          width: `${pct}%`,
          background: `var(${props.color})`,
        }}
      />
    </div>
  );
}
