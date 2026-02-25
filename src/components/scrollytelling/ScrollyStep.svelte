<script lang="ts">
  interface Props {
    text: string;
    active: boolean;
    stepNumber: number;
    totalSteps: number;
  }

  let { text, active, stepNumber, totalSteps }: Props = $props();
</script>

<div class="step" class:active>
  <div class="step__inner">
    <span class="step__counter">{stepNumber}/{totalSteps}</span>
    <p class="step__text">{text}</p>
  </div>
</div>

<style>
  .step {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 2rem;
    pointer-events: auto;
  }

  .step__inner {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(30, 58, 74, 0.08);
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(30, 58, 74, 0.08);
    padding: 1.5rem;
    max-width: 22rem;
    opacity: 0.25;
    transition: opacity 500ms ease, transform 500ms ease;
    transform: translateY(8px);
  }

  .active .step__inner {
    opacity: 1;
    transform: translateY(0);
  }

  .step__counter {
    font-family: var(--font-mono, monospace);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-accent, #5B82A8);
    display: block;
    margin-bottom: 0.5rem;
  }

  .step__text {
    font-family: var(--font-body, Georgia, serif);
    font-size: 1rem;
    line-height: 1.65;
    color: var(--color-text, #1E3A4A);
  }

  @media (max-width: 768px) {
    .step {
      justify-content: center;
    }

    .step__inner {
      max-width: 100%;
    }
  }
</style>
