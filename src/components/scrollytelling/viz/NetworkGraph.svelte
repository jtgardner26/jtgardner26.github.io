<script lang="ts">
  import { onMount } from 'svelte';
  import { forceSimulation, forceLink, forceManyBody, forceCenter, forceCollide } from 'd3-force';
  import type { SimulationNodeDatum, SimulationLinkDatum } from 'd3-force';

  interface Props {
    data: {
      nodes: number;
      groups: number;
      groupLabels: string[];
      homophily: number;
    };
    offset: number;
  }

  let { data, offset }: Props = $props();

  const width = 460;
  const height = 400;
  const groupColors = ['#5B82A8', '#8B7BAD', '#D08B6E', '#E2B08A'];

  interface Node extends SimulationNodeDatum {
    id: number;
    group: number;
  }

  interface Link extends SimulationLinkDatum<Node> {
    source: number | Node;
    target: number | Node;
  }

  let nodes = $state<Node[]>([]);
  let links = $state<Link[]>([]);

  function generateNetwork() {
    const n = data.nodes;
    const g = data.groups;
    const h = data.homophily;

    const newNodes: Node[] = Array.from({ length: n }, (_, i) => ({
      id: i,
      group: Math.floor(Math.random() * g),
      x: width / 2 + (Math.random() - 0.5) * 200,
      y: height / 2 + (Math.random() - 0.5) * 200,
    }));

    const newLinks: Link[] = [];
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const sameGroup = newNodes[i].group === newNodes[j].group;
        const prob = sameGroup ? h * 0.4 : (1 - h) * 0.15;
        if (Math.random() < prob) {
          newLinks.push({ source: i, target: j });
        }
      }
    }

    nodes = newNodes;
    links = newLinks;

    const simulation = forceSimulation<Node>(nodes)
      .force('link', forceLink<Node, Link>(links).id(d => d.id).distance(60))
      .force('charge', forceManyBody().strength(-80))
      .force('center', forceCenter(width / 2, height / 2))
      .force('collide', forceCollide(12));

    for (let i = 0; i < 120; i++) simulation.tick();
    simulation.stop();
    nodes = [...nodes];
  }

  onMount(() => {
    generateNetwork();
  });

  function getSourceNode(link: Link): Node {
    return typeof link.source === 'number' ? nodes[link.source] : link.source as Node;
  }

  function getTargetNode(link: Link): Node {
    return typeof link.target === 'number' ? nodes[link.target] : link.target as Node;
  }
</script>

<div class="network">
  <svg viewBox="0 0 {width} {height}" role="img" aria-label="Network graph showing political homophily in organizational communication">
    <!-- Links -->
    {#each links as link}
      {@const s = getSourceNode(link)}
      {@const t = getTargetNode(link)}
      {#if s.x != null && s.y != null && t.x != null && t.y != null}
        <line
          x1={s.x} y1={s.y}
          x2={t.x} y2={t.y}
          stroke="rgba(30, 58, 74, 0.12)"
          stroke-width="1"
        />
      {/if}
    {/each}

    <!-- Nodes -->
    {#each nodes as node}
      {#if node.x != null && node.y != null}
        <circle
          cx={node.x} cy={node.y}
          r="7"
          fill={groupColors[node.group % groupColors.length]}
          opacity="0.85"
        />
        <circle
          cx={node.x} cy={node.y}
          r="7"
          fill="none"
          stroke="white"
          stroke-width="2"
        />
      {/if}
    {/each}
  </svg>

  <div class="network__legend">
    {#each data.groupLabels as label, i}
      <span class="network__legend-item">
        <span class="network__legend-dot" style="background: {groupColors[i % groupColors.length]}"></span>
        {label}
      </span>
    {/each}
  </div>
</div>

<style>
  .network {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(30, 58, 74, 0.08);
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(30, 58, 74, 0.08);
    padding: 1rem;
  }

  svg {
    width: 100%;
    height: auto;
  }

  .network__legend {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid rgba(30, 58, 74, 0.06);
  }

  .network__legend-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--font-mono, monospace);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-text-muted, #6B8B9E);
  }

  .network__legend-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
</style>
