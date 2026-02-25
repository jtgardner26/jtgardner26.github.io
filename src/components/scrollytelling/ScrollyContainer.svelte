<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import ScrollyStep from './ScrollyStep.svelte';
  import ScrollyGraphic from './ScrollyGraphic.svelte';

  export interface ScrollyStepData {
    id: string;
    text: string;
    viz: 'network' | 'bar' | 'line' | 'stat' | 'quote' | 'table' | 'none';
    data: Record<string, any>;
    transition?: 'fade' | 'slide' | 'morph';
  }

  interface Props {
    steps: ScrollyStepData[];
  }

  let { steps }: Props = $props();

  let index = $state(0);
  let offset = $state(0);
  let stepsContainer: HTMLElement;

  let currentStep = $derived(steps[index] || steps[0]);

  let observer: IntersectionObserver | null = null;

  onMount(() => {
    // Use IntersectionObserver to detect which step is active
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            const stepIndex = Number(entry.target.getAttribute('data-step-index'));
            if (!isNaN(stepIndex)) {
              index = stepIndex;
            }
          }
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    // Observe all step elements
    if (stepsContainer) {
      const stepEls = stepsContainer.querySelectorAll('[data-step-index]');
      stepEls.forEach((el) => observer!.observe(el));
    }

    // Also track scroll offset for smooth animations
    const handleScroll = () => {
      if (!stepsContainer) return;
      const rect = stepsContainer.getBoundingClientRect();
      const total = rect.height;
      const scrolled = -rect.top;
      offset = Math.max(0, Math.min(1, scrolled / total));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  onDestroy(() => {
    observer?.disconnect();
  });
</script>

<div class="scrolly">
  <div class="scrolly__graphic">
    <ScrollyGraphic step={currentStep} {offset} />
  </div>

  <div class="scrolly__steps" bind:this={stepsContainer}>
    {#each steps as step, i (step.id)}
      <div data-step-index={i}>
        <ScrollyStep
          text={step.text}
          active={i === index}
          stepNumber={i + 1}
          totalSteps={steps.length}
        />
      </div>
    {/each}
  </div>
</div>

<style>
  .scrolly {
    position: relative;
    margin: 3rem 0;
  }

  .scrolly__graphic {
    position: sticky;
    top: 10vh;
    width: 100%;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .scrolly__steps {
    position: relative;
    z-index: 2;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    .scrolly__graphic {
      height: 50vh;
      top: 5vh;
    }
  }
</style>
