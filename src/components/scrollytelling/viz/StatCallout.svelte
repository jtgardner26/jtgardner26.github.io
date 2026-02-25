<script lang="ts">
  interface Props {
    data: {
      value: string;
      label: string;
    };
    offset: number;
  }

  let { data, offset }: Props = $props();
</script>

<div class="stat">
  <span class="stat__value">{data.value}</span>
  <span class="stat__label">{data.label}</span>
</div>

<style>
  .stat {
    text-align: center;
    padding: 3rem 2rem;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(30, 58, 74, 0.08);
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(30, 58, 74, 0.08);
  }

  .stat__value {
    display: block;
    font-family: var(--font-heading, system-ui);
    font-size: 5rem;
    font-weight: 600;
    background: linear-gradient(135deg, #5B82A8, #D08B6E);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    margin-bottom: 1rem;
  }

  .stat__label {
    display: block;
    font-family: var(--font-mono, monospace);
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-text-muted, #6B8B9E);
    max-width: 20rem;
    margin: 0 auto;
  }
</style>
