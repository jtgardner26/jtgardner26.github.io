<script lang="ts">
  interface Props {
    data: {
      quote: string;
      attribution?: string;
    };
    offset: number;
  }

  let { data, offset }: Props = $props();
</script>

<blockquote class="quote">
  <p class="quote__text">"{data.quote}"</p>
  {#if data.attribution}
    <cite class="quote__cite">— {data.attribution}</cite>
  {/if}
</blockquote>

<style>
  .quote {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(30, 58, 74, 0.08);
    border-left: 4px solid var(--color-accent, #5B82A8);
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(30, 58, 74, 0.08);
    padding: 2rem;
  }

  .quote__text {
    font-family: var(--font-body, Georgia, serif);
    font-size: 1.25rem;
    font-style: italic;
    line-height: 1.65;
    color: var(--color-text, #1E3A4A);
  }

  .quote__cite {
    display: block;
    margin-top: 1rem;
    font-family: var(--font-mono, monospace);
    font-size: 0.8rem;
    font-style: normal;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-text-muted, #6B8B9E);
  }
</style>
