<script lang="ts">
  import type { ScrollyStepData } from './ScrollyContainer.svelte';
  import StatCallout from './viz/StatCallout.svelte';
  import BarChart from './viz/BarChart.svelte';
  import NetworkGraph from './viz/NetworkGraph.svelte';
  import QuoteBlock from './viz/QuoteBlock.svelte';

  interface Props {
    step: ScrollyStepData;
    offset: number;
  }

  let { step, offset }: Props = $props();
</script>

<div class="graphic" data-transition={step.transition || 'fade'}>
  {#key step.id}
    <div class="graphic__content" class:fade={step.transition === 'fade' || !step.transition} class:slide={step.transition === 'slide'}>
      {#if step.viz === 'stat'}
        <StatCallout data={step.data} {offset} />
      {:else if step.viz === 'bar'}
        <BarChart data={step.data} {offset} />
      {:else if step.viz === 'network'}
        <NetworkGraph data={step.data} {offset} />
      {:else if step.viz === 'quote'}
        <QuoteBlock data={step.data} {offset} />
      {:else}
        <div class="graphic__placeholder">
          <span class="graphic__placeholder-label">{step.viz}</span>
        </div>
      {/if}
    </div>
  {/key}
</div>

<style>
  .graphic {
    width: 100%;
    max-width: 500px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .graphic__content {
    width: 100%;
  }

  .graphic__content.fade {
    animation: fadeIn 400ms ease forwards;
  }

  .graphic__content.slide {
    animation: slideIn 400ms ease forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .graphic__placeholder {
    width: 100%;
    height: 300px;
    border: 2px dashed var(--color-text-muted, #6B6B6B);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }

  .graphic__placeholder-label {
    font-family: var(--font-mono, monospace);
    font-size: 0.875rem;
    color: var(--color-text-muted, #6B6B6B);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
</style>
