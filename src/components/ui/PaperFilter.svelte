<script lang="ts">
  import type { Paper } from '../../data/papers';

  interface Props {
    papers: Paper[];
    allTags: string[];
  }

  let { papers, allTags }: Props = $props();

  let activeTag = $state<string | null>(null);

  let filteredPapers = $derived(
    activeTag ? papers.filter(p => p.tags.includes(activeTag!)) : papers
  );

  function toggleTag(tag: string) {
    activeTag = activeTag === tag ? null : tag;
  }
</script>

<div class="filter-bar">
  <button
    class="filter-tag"
    class:active={activeTag === null}
    onclick={() => activeTag = null}
  >
    All
  </button>
  {#each allTags as tag}
    <button
      class="filter-tag"
      class:active={activeTag === tag}
      onclick={() => toggleTag(tag)}
    >
      {tag}
    </button>
  {/each}
</div>

<div class="papers-grid">
  {#each filteredPapers as paper (paper.slug)}
    <article class="paper-card card">
      <div class="paper-card__header">
        <span class="label">{paper.status}</span>
        {#if paper.has_scrollytelling}
          <span class="paper-card__badge">Interactive</span>
        {/if}
      </div>
      <h3 class="paper-card__title">
        <a href={`/research/${paper.slug}`}>{paper.title}</a>
      </h3>
      <p class="paper-card__authors">{paper.authors.join(', ')}</p>
      <p class="paper-card__abstract">{paper.abstract}</p>
      <div class="paper-card__tags">
        {#each paper.tags as tag}
          <span class="tag">{tag}</span>
        {/each}
      </div>
    </article>
  {/each}
</div>

<style>
  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2.5rem;
  }

  .filter-tag {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 6px 16px;
    border: none;
    border-radius: 9999px;
    background: rgba(91, 130, 168, 0.1);
    color: var(--color-text-muted);
    cursor: pointer;
    transition: all 200ms ease;
  }

  .filter-tag:hover {
    background: rgba(91, 130, 168, 0.18);
    color: var(--color-accent);
  }

  .filter-tag.active {
    background: var(--color-accent);
    color: white;
  }

  .papers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  .card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(30, 58, 74, 0.08);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(30, 58, 74, 0.08);
    padding: 2rem;
    transition: transform 350ms ease, box-shadow 350ms ease;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 40px rgba(30, 58, 74, 0.10);
  }

  .paper-card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-accent);
    font-weight: 500;
  }

  .paper-card__badge {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    background: linear-gradient(135deg, rgba(91, 130, 168, 0.1), rgba(91, 130, 168, 0.2));
    padding: 3px 10px;
    border-radius: 9999px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 600;
    color: var(--color-accent);
  }

  .paper-card__title {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    margin-top: 0.25rem;
    font-weight: 600;
  }

  .paper-card__title a {
    text-decoration: none;
    color: var(--color-text);
    transition: color 200ms ease;
  }

  .paper-card__title a:hover {
    color: var(--color-accent);
  }

  .paper-card__authors {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    font-style: italic;
  }

  .paper-card__abstract {
    font-size: 0.875rem;
    line-height: 1.65;
    color: var(--color-text-muted);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .paper-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    margin-top: auto;
    padding-top: 0.5rem;
  }

  .tag {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 3px 10px;
    border-radius: 9999px;
    background: rgba(91, 130, 168, 0.1);
    color: var(--color-accent);
    white-space: nowrap;
  }
</style>
