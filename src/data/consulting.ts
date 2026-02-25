export interface Service {
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    title: 'Strategy Development',
    description: 'Rigorous analysis of competitive positioning, market dynamics, and growth opportunities grounded in academic research and practical experience.',
    icon: '01',
  },
  {
    title: 'AI Strategy & Implementation',
    description: 'Helping organizations identify high-impact AI opportunities, build adoption roadmaps, and implement AI tools that align with strategic goals — from LLM integration to workflow automation.',
    icon: '02',
  },
  {
    title: 'Organizational Design',
    description: 'Designing structures, processes, and incentive systems that align organizational capabilities with strategic objectives.',
    icon: '03',
  },
  {
    title: 'Political Risk Assessment',
    description: 'Evaluating how internal political dynamics and external political shifts create risks and opportunities for your organization.',
    icon: '04',
  },
  {
    title: 'Research Partnerships',
    description: 'Collaborative research engagements that pair academic rigor with your organization\'s data to generate actionable strategic insights.',
    icon: '05',
  },
];

export const approach = [
  'Evidence-based frameworks drawn from cutting-edge strategy research',
  'Quantitative analysis combined with qualitative organizational understanding',
  'AI-informed methods — leveraging modern tools to accelerate insight and implementation',
  'Actionable recommendations tailored to your specific context',
  'Ongoing engagement and iteration, not just a deliverable',
];
