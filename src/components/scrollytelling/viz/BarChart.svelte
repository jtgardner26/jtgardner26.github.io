<script lang="ts">
  import { scaleLinear, scaleBand } from 'd3-scale';

  interface Props {
    data: {
      title: string;
      categories: string[];
      values: number[];
      label: string;
    };
    offset: number;
  }

  let { data, offset }: Props = $props();

  const width = 460;
  const height = 320;
  const margin = { top: 40, right: 20, bottom: 60, left: 50 };

  let innerWidth = width - margin.left - margin.right;
  let innerHeight = height - margin.top - margin.bottom;

  let hasNegative = $derived(data.values.some(v => v < 0));

  let yScale = $derived(
    scaleLinear()
      .domain([
        hasNegative ? Math.min(...data.values, 0) * 1.1 : 0,
        Math.max(...data.values) * 1.1
      ])
      .range([innerHeight, 0])
  );

  let xScale = $derived(
    scaleBand()
      .domain(data.categories)
      .range([0, innerWidth])
      .padding(0.3)
  );

  const barColors = ['#5B82A8', '#D08B6E', '#8B7BAD', '#E2B08A', '#5B82A8'];

  function getBarColor(i: number): string {
    return barColors[i % barColors.length];
  }
</script>

<div class="bar-chart">
  <h4 class="bar-chart__title">{data.title}</h4>
  <svg viewBox="0 0 {width} {height}" role="img" aria-label={data.title}>
    <g transform="translate({margin.left}, {margin.top})">
      <!-- Grid lines -->
      {#each yScale.ticks(4) as tick}
        <line
          x1="0" y1={yScale(tick)}
          x2={innerWidth} y2={yScale(tick)}
          stroke="rgba(30, 58, 74, 0.06)"
          stroke-width="1"
        />
      {/each}

      <!-- Y axis -->
      <line x1="0" y1="0" x2="0" y2={innerHeight} stroke="rgba(30, 58, 74, 0.15)" stroke-width="1" />

      {#if hasNegative}
        <line
          x1="0" y1={yScale(0)}
          x2={innerWidth} y2={yScale(0)}
          stroke="rgba(30, 58, 74, 0.2)"
          stroke-width="1"
          stroke-dasharray="4,4"
        />
      {/if}

      <!-- Bars -->
      {#each data.values as value, i}
        {@const barHeight = Math.abs(yScale(0) - yScale(value))}
        {@const barY = value >= 0 ? yScale(value) : yScale(0)}
        <rect
          x={xScale(data.categories[i])}
          y={barY}
          width={xScale.bandwidth()}
          height={barHeight * Math.min(offset * 3, 1)}
          fill={getBarColor(i)}
          rx="4"
          opacity="0.85"
        />
        <text
          x={(xScale(data.categories[i]) ?? 0) + xScale.bandwidth() / 2}
          y={value >= 0 ? barY - 8 : barY + barHeight + 16}
          text-anchor="middle"
          font-family="IBM Plex Mono, monospace"
          font-size="11"
          fill="#1E3A4A"
          opacity="0.7"
        >
          {value.toFixed(2)}
        </text>
      {/each}

      <!-- X axis labels -->
      {#each data.categories as cat, i}
        <text
          x={(xScale(cat) ?? 0) + xScale.bandwidth() / 2}
          y={innerHeight + 16}
          text-anchor="middle"
          font-family="IBM Plex Mono, monospace"
          font-size="9"
          fill="#6B8B9E"
          transform="rotate(-20, {(xScale(cat) ?? 0) + xScale.bandwidth() / 2}, {innerHeight + 16})"
        >
          {cat}
        </text>
      {/each}
    </g>
  </svg>
  <p class="bar-chart__label">{data.label}</p>
</div>

<style>
  .bar-chart {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(30, 58, 74, 0.08);
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(30, 58, 74, 0.08);
    padding: 1.25rem;
  }

  .bar-chart__title {
    font-family: var(--font-heading, system-ui);
    font-size: 0.9rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 0.5rem;
    color: var(--color-text, #1E3A4A);
  }

  svg {
    width: 100%;
    height: auto;
  }

  .bar-chart__label {
    font-family: var(--font-mono, monospace);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-text-muted, #6B8B9E);
    text-align: center;
    margin-top: 0.5rem;
  }
</style>
