export interface Paper {
  slug: string;
  title: string;
  authors: string[];
  status: 'Published' | 'Under Review' | 'Working Paper' | 'Preparing for Submission' | 'In Progress';
  abstract: string;
  tags: string[];
  has_scrollytelling: boolean;
  order: number;
}

export const papers: Paper[] = [
  {
    slug: 'organizational-political-stratification',
    title: 'Organizational Political Stratification: Extent, Causes, and Effects',
    authors: ['JT Gardner', 'Justin Frake', 'Rueben Hurst', 'Max Kagan'],
    status: 'Working Paper',
    abstract: 'This paper examines how political stratification emerges within organizations, exploring the extent, causes, and effects of political sorting among employees. Using novel survey data, we document systematic patterns of political clustering across organizational hierarchies and functions.',
    tags: ['Organizational Politics', 'Stratification', 'Survey Research'],
    has_scrollytelling: true,
    order: 1,
  },
  {
    slug: 'voice-climate-innovation',
    title: 'When Voice Matters More: Voice Climate, Psychological Safety, and Innovation in Technology-Intensive Industries',
    authors: ['JT Gardner', 'Taeya Howell', 'Jeff Dyer'],
    status: 'Preparing for Submission',
    abstract: 'We examine how voice climate and psychological safety interact to drive innovation outcomes in technology-intensive industries. Our findings suggest that the relationship between voice and innovation is moderated by industry technological intensity, with voice climate playing a more critical role in fast-moving technological environments.',
    tags: ['Voice Climate', 'Psychological Safety', 'Innovation'],
    has_scrollytelling: false,
    order: 2,
  },
  {
    slug: 'robust-actions-positioning',
    title: 'Robust Actions in Socio-Political Positioning',
    authors: ['JT Gardner', 'Haram Seo', 'Alessandro Piazza'],
    status: 'Working Paper',
    abstract: 'This paper develops a theory of robust action in the context of corporate socio-political positioning. We explore how firms navigate contested political landscapes by adopting positioning strategies that maintain flexibility across multiple audiences with divergent political preferences.',
    tags: ['Socio-Political Positioning', 'Corporate Political Activity', 'Robust Action'],
    has_scrollytelling: false,
    order: 3,
  },
  {
    slug: 'guns-or-galleries',
    title: 'Guns or Galleries: Robust Brokers and Structural Barriers',
    authors: ['JT Gardner'],
    status: 'In Progress',
    abstract: 'This paper investigates how network brokers navigate structural barriers in politically divided markets. Drawing on network theory, I examine the conditions under which brokers can bridge ideologically distant communities and the structural features that constrain or enable such brokerage.',
    tags: ['Network Theory', 'Brokerage', 'Structural Barriers'],
    has_scrollytelling: true,
    order: 4,
  },
  {
    slug: 'ai-mediated-communication',
    title: 'AI-Mediated Communication and Ethical Decision-Making',
    authors: ['JT Gardner'],
    status: 'In Progress',
    abstract: 'This paper explores how AI-mediated communication alters ethical decision-making in organizational contexts. I examine the mechanisms through which AI intermediaries reshape moral reasoning and the implications for organizational ethics and governance.',
    tags: ['AI', 'Ethics', 'Communication'],
    has_scrollytelling: false,
    order: 5,
  },
  {
    slug: 'dynamic-socio-political-positioning',
    title: 'A Dynamic Model of Socio-Political Positioning',
    authors: ['JT Gardner', 'Aseem Kaul'],
    status: 'In Progress',
    abstract: 'We develop a dynamic model of how firms adjust their socio-political positioning over time in response to shifting political landscapes. The model captures the tension between commitment to existing positions and the strategic value of repositioning as political contexts evolve.',
    tags: ['Socio-Political Positioning', 'Dynamic Strategy', 'Formal Modeling'],
    has_scrollytelling: false,
    order: 6,
  },
];
