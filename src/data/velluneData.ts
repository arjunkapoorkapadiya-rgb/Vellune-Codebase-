export type NavSection =
  | 'home'
  | 'about'
  | 'journal'
  | 'annotator'
  | 'reading-room'
  | 'conversations'
  | 'initiatives'
  | 'community'
  | 'get-involved'
  | 'contact'
  | 'member-desk';

export const IMAGES = {
  heroStudy: '/src/assets/images/hero_literary_study_1794979153051.jpg',
  comparativeLit: '/src/assets/images/article_comparative_literature_1794979154356.jpg',
  marginalia: '/src/assets/images/article_annotators_marginalia_1794979155428.jpg',
  readingCircle: '/src/assets/images/event_reading_circle_1794979156793.jpg',
  anthologyEdition: '/src/assets/images/anthology_cover_edition_1794979156247.jpg',
};

export interface EditorialSeriesInfo {
  id: string;
  number: string;
  title: string;
  description: string;
}

export const EDITORIAL_SERIES: EditorialSeriesInfo[] = [
  { id: 'annotators-guide', number: '01', title: "The Annotator's Guide", description: 'Close-reading methodologies, marginalia studies, and structural dissection of literary texts.' },
  { id: 'second-reading', number: '02', title: 'The Second Reading', description: 'Rigorous literary book reviews re-evaluating contemporary and neglected works.' },
  { id: 'one-page', number: '03', title: 'One Page, Many Perspectives', description: 'Multi-critic collaborative analyses of a single pivotal passage or extract.' },
  { id: 'literary-question', number: '04', title: 'Literary Question', description: 'Critical essays investigating foundational questions of aesthetics, ethics, and form.' },
  { id: 'behind-the-text', number: '05', title: 'Behind the Text', description: 'Archival, historical, and cultural contexts shaping literary production.' },
  { id: 'critical-reader', number: '06', title: 'Critical Reader', description: 'Long-form literary criticism and sustained theoretical inquiry.' },
  { id: 'reading-list', number: '07', title: 'Reading List', description: 'Thematically curated reading recommendations with critical apparatus.' },
  { id: 'vellune-voices', number: '08', title: 'Vellune Voices', description: 'Debut critical essays and dispatches from emerging young writers.' },
  { id: 'reading-room-series', number: '09', title: 'Reading Room', description: 'Seminar-style reader discussions, dialectics, and collective interpretations.' },
  { id: 'author-conversations', number: '10', title: 'Author Conversations', description: 'In-depth dialogues with novelists, poets, translators, and critics.' },
  { id: 'literary-debates', number: '11', title: 'Literary Debates', description: 'Competing interpretations and structured adversarial arguments on contested texts.' },
  { id: 'comparative-essay', number: '12', title: 'The Comparative Essay', description: 'Cross-linguistic and cross-era comparative literary analysis.' },
  { id: 'literary-canon', number: '13', title: 'The Literary Canon', description: 'Re-examinations of canonical literature, syllabus formation, and counter-canons.' },
  { id: 'translations', number: '14', title: 'Translations & World Literature', description: 'Criticism on the art of translation, untranslatability, and global letters.' },
  { id: 'reviewers-desk', number: '15', title: "The Reviewer's Desk", description: 'Craft essays and methodological guides to writing serious literary criticism.' },
  { id: 'letters', number: '16', title: 'Letters to Vellune', description: 'Selected reader correspondence, rejoinders, and critical counterpoints.' },
  { id: 'quarterly-essay', number: '17', title: 'The Quarterly Essay', description: 'Extended commissioned monographs published at the turn of each season.' },
  { id: 'poetry-desk', number: '18', title: 'The Poetry Desk', description: 'Prosodic analysis, scansion studies, and criticism of modern and classical verse.' },
];

export interface MarginaliaNote {
  paragraphIndex: number;
  refNumber: string;
  anchorPhrase: string;
  commentary: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  publicationDate: string;
  issueVolume: string;
  seriesId: string;
  seriesTitle: string;
  readingTime: string;
  featured?: boolean;
  isReview?: boolean;
  reviewedWork?: {
    bookTitle: string;
    bookAuthor: string;
    publisher: string;
    year: string;
  };
  image: string;
  imageCaption: string;
  excerpt: string;
  pullQuote: string;
  paragraphs: string[];
  marginalia: MarginaliaNote[];
  relatedArticleIds: string[];
}

export const ARTICLES: Article[] = [
  {
    id: 'architecture-of-digression',
    title: 'The Architecture of Digression: Time, Syntax, and Memory in W. G. Sebald',
    subtitle: 'How the hypotactic sentence becomes an ethical instrument against historical amnesia in late European prose.',
    authorId: 'clara-vance',
    authorName: 'Clara Vance',
    authorRole: 'Editor-in-Chief · Oxford & Edinburgh',
    publicationDate: 'Autumn Issue · November 2026',
    issueVolume: 'Vol. IV, No. 3',
    seriesId: 'quarterly-essay',
    seriesTitle: 'The Quarterly Essay',
    readingTime: '14 min read',
    featured: true,
    image: IMAGES.heroStudy,
    imageCaption: 'Fig. 1 — Annotated folio leaves and manuscript notes from the Autumn Critical Seminar, Edinburgh.',
    excerpt: 'When prose refuses the straight line of chronicle, it does not merely delay arrival; it constructs a chamber in which the forgotten dead may speak without being hurried toward a conclusion.',
    pullQuote: 'Digression is not a departure from the subject; in the hands of the careful prose stylist, digression is the only form honest enough to register how memory actually inhabits a room.',
    paragraphs: [
      'Every sentence makes a quiet wager with time. The short, declarative clause insists that the world can be apprehended in discrete, sequential units—that event follows cause as neatly as a ledger entry balances a debt. Yet when we turn to the long, labyrinthine paragraphs of W. G. Sebald, or before him Thomas Bernhard and Marcel Proust, syntax itself rebels against the tyranny of the calendar. A sentence begins on a wet platform in East Anglia, drifts through a nineteenth-century treatise on sericulture, pauses over an uncaptioned photograph in a provincial archive, and concludes inside a childhood kitchen in the Allgäu.',
      'Young critics are frequently instructed to prune their prose of subordinate clauses, as though clarity were synonymous with speed. What this pedagogical prejudice overlooks is that certain moral and aesthetic truths cannot be stated rapidly without being falsified. In Austerlitz, the narrator mediates another man’s testimony through nested layers of reported speech—"said Austerlitz, so he told me, remarked Vera"—creating an acoustic gallery where no single voice claims sovereign ownership over the past.',
      'To read such prose with pencil in hand is to discover that hypotaxis—the grammatical subordination of one clause to another—functions as an architecture of shelter. Where historical trauma has shattered linear biography, the winding period gathers fragments without forcing them into a premature synthesis. The comma splice and the dash become hinges rather than barriers, allowing the nineteenth century and the twentieth to occupy the same syntactic breath.',
      'When we annotate a page of Sebald, our marginalia inevitably begins to resemble a cartographer’s triangulation. We mark the recurring motifs of dust, railway timetables, star-shaped fortresses, and moths not as decorative symbols, but as structural load-bearing columns. The critic’s task is therefore neither to summarize the plot nor to extract a portable moral, but to trace the cadence by which syntax transforms loss into attention.'
    ],
    marginalia: [
      {
        paragraphIndex: 0,
        refNumber: 'I',
        anchorPhrase: 'syntax itself rebels against the tyranny of the calendar',
        commentary: 'Cf. Gérard Genette’s distinction between récit and histoire in Narrative Discourse (1972): temporal anachrony at the micro-syntactic level.'
      },
      {
        paragraphIndex: 1,
        refNumber: 'II',
        anchorPhrase: 'nested layers of reported speech',
        commentary: 'Notice how indirect discourse distances the reader from voyeurism while intensifying ethical proximity.'
      },
      {
        paragraphIndex: 2,
        refNumber: 'III',
        anchorPhrase: 'hypotaxis—the grammatical subordination',
        commentary: 'Contrast with Erich Auerbach’s famous analysis of parataxis vs. hypotaxis in Mimesis, Chapter 1 ("Odysseus’ Scar").'
      }
    ],
    relatedArticleIds: ['ethics-of-translation', 'marginalia-as-method', 'second-reading-brennan']
  },
  {
    id: 'ethics-of-translation',
    title: 'Untranslatable Silences: On Reading Classical Russian and French Realism in Multiple Englishes',
    subtitle: 'Why comparing rival translations reveals the hidden ideological assumptions of the target language.',
    authorId: 'julian-mercer',
    authorName: 'Julian Mercer',
    authorRole: 'Senior Comparative Critic · Dublin',
    publicationDate: 'November 2026',
    issueVolume: 'Vol. IV, No. 3',
    seriesId: 'translations',
    seriesTitle: 'Translations & World Literature',
    readingTime: '11 min read',
    featured: true,
    image: IMAGES.comparativeLit,
    imageCaption: 'Fig. 2 — Comparative editions of Dostoevsky, Tolstoy, Flaubert, and Cervantes assembled for the Translation Desk.',
    excerpt: 'To read a translated novel in only one version is to mistake the translator’s windowpane for the sky itself; to place three translations side by side is to begin genuine comparative criticism.',
    pullQuote: 'Every translation is an act of critical interpretation disguised as an act of hospitality; what a translator smooths away tells us as much about our own literary anxieties as the original text.',
    paragraphs: [
      'For over a century, anglophone readers encountered Fyodor Dostoevsky through the Victorian cadence of Constance Garnett. Where Dostoevsky wrote nervous, repetitive, intentionally awkward Russian prose that mirrored the fevered consciousness of his underground speakers, Garnett frequently smoothed the rough timber into polite Edwardian drawing-room English. Later translators—Richard Pevear and Larissa Volokhonsky, Oliver Ready, Michael Katz—have waged fierce stylistic debates over how much syntactic friction the English sentence ought to endure.',
      'In Vellune’s comparative workshops, we ask young critics to lay three translations of the opening page of Madame Bovary or Crime and Punishment across a single table, even before consulting the French or Russian original. The divergences are immediately instructive. Where one translator renders Flaubert’s imparfait as habitual nostalgia, another renders it as suffocating provincial monotony.',
      'Translation criticism should never be reduced to a ledger of lexical "errors." Rather, it is the sharpest laboratory available for close reading. When Lydia Davis preserves Flaubert’s exact punctuation and clause order, she forces the English reader to hear the dry, ironic click of French syntax beneath the English words. The translated page ceases to be a transparent substitute and becomes a palimpsest where two literary traditions interrogate one another.'
    ],
    marginalia: [
      {
        paragraphIndex: 0,
        refNumber: 'I',
        anchorPhrase: 'nervous, repetitive, intentionally awkward Russian prose',
        commentary: 'See Joseph Frank, Dostoevsky: The Stir of Liberation, on polyphony and colloquial urgency.'
      },
      {
        paragraphIndex: 2,
        refNumber: 'II',
        anchorPhrase: 'palimpsest where two literary traditions interrogate one another',
        commentary: 'Echoes Walter Benjamin’s "The Task of the Translator" (1923): pure language emerging between original and translation.'
      }
    ],
    relatedArticleIds: ['architecture-of-digression', 'one-page-woolf', 'poetry-desk-celan']
  },
  {
    id: 'marginalia-as-method',
    title: 'In Praise of the Pencil Stub: Marginalia as the First Form of Literary Criticism',
    subtitle: 'Recovering the active, disputatious art of writing in the margins of printed books.',
    authorId: 'amara-osei',
    authorName: 'Amara Osei',
    authorRole: 'Director of The Annotator’s Guide · London',
    publicationDate: 'October 2026',
    issueVolume: 'Vol. IV, No. 2',
    seriesId: 'annotators-guide',
    seriesTitle: "The Annotator's Guide",
    readingTime: '9 min read',
    featured: true,
    image: IMAGES.marginalia,
    imageCaption: 'Fig. 3 — Archival study of nineteenth-century poetic marginalia and cross-references.',
    excerpt: 'An unannotated book remains a monologue; the moment a reader sets lead to margin—questioning a metaphor, cross-referencing a stanza, contesting a premise—literature becomes a conversation.',
    pullQuote: 'The white margin of a printed page was never designed as a sacred boundary; it was proportioned by Renaissance printers as a seminar table for the solitary reader.',
    paragraphs: [
      'There exists a peculiar superstition among timid readers that a book ought to be returned to the shelf as pristine as the day it left the bindery. Yet when we examine the personal libraries of Samuel Taylor Coleridge, John Keats, or Virginia Woolf, we find pages crowded with graphite arguments, exclamation marks of sudden recognition, and scrawled cross-references linking a line of Milton to a passage of Dante.',
      'Coleridge himself coined the term marginalia when publishing his notes written in the margins of borrowed books—books whose owners valued them twice as highly upon their return. Why? Because annotation records the exact temperature of a mind encountering a text in real time, before the polish of the formal essay conceals the moments of productive bewilderment.',
      'In Vellune’s curriculum, we teach three tiers of annotation: first, structural and prosodic marking (shifts in tense, focalization, or meter); second, intertextual indexing (tracing allusions across the back flyleaf); and third, dialectical questioning (challenging the text’s unexamined premises). When a young writer learns to converse with the margin, the blank page of their own critical essay loses its terror.'
    ],
    marginalia: [
      {
        paragraphIndex: 1,
        refNumber: 'I',
        anchorPhrase: 'Coleridge himself coined the term marginalia',
        commentary: 'First used in Blackwood’s Magazine (November 1819); see H. J. Jackson’s Marginalia: Readers Writing in Books.'
      }
    ],
    relatedArticleIds: ['architecture-of-digression', 'one-page-woolf', 'reviewers-desk-precision']
  },
  {
    id: 'second-reading-brennan',
    title: 'The Quiet Rigor of the Provincial Letter: On Maeve Brennan’s Dublin & New Yorker Essays',
    subtitle: 'A reconsideration of a master stylist whose miniature domestic observations carry the weight of tragedy.',
    authorId: 'sora-takahashi',
    authorName: 'Sora Takahashi',
    authorRole: 'Book Reviews Editor · Kyoto & Toronto',
    publicationDate: 'November 2026',
    issueVolume: 'Vol. IV, No. 3',
    seriesId: 'second-reading',
    seriesTitle: 'The Second Reading',
    readingTime: '10 min read',
    isReview: true,
    reviewedWork: {
      bookTitle: 'The Long-Winded Lady & Collected Dublin Stories',
      bookAuthor: 'Maeve Brennan',
      publisher: 'Fitzcarraldo / Counterpoint Archival Reissue',
      year: '2026'
    },
    image: IMAGES.anthologyEdition,
    imageCaption: 'Fig. 4 — Archival linen edition reviewed for The Second Reading desk.',
    excerpt: 'Long overshadowed by her noisier mid-century contemporaries, Maeve Brennan constructed an oeuvre of crystalline restraint in which the angle of a dining-room curtain discloses an entire marital history.',
    pullQuote: 'Brennan never raises her voice; instead, she tightens the rhythm of the sentence until silence itself becomes audible between two polite remarks.',
    paragraphs: [
      'Literary history has an unfortunate habit of confusing scale with ambition. The sprawling encyclopedic novel is routinely granted the title of masterpiece, while the short story and the observational feuilleton are treated as minor chamber music. The newly reissued dual edition of Maeve Brennan’s Dublin fiction and her "Long-Winded Lady" dispatches demolishes that hierarchy on every page.',
      'In stories such as "The Springs of Affection" and "The Anachronism," set in a modest terraced house in Ranelagh, Brennan writes with a merciless, surgical tenderness. Her sentences appear simple—almost austere in their refusal of ornate metaphor—yet their cadence is calibrated with the precision of a watchmaker. A character repeats a single adjective three times across two pages, and by the third occurrence the reader realizes that the word is a life raft to which a drowning ego clings.',
      'To read Brennan alongside her contemporaries is to recognize that true critical and artistic authority requires no theatricality. For young writers tempted by maximalist pyrotechnics, The Second Reading offers Brennan as an enduring corrective: look closer at the ordinary room until its walls become transparent.'
    ],
    marginalia: [],
    relatedArticleIds: ['architecture-of-digression', 'reviewers-desk-precision']
  },
  {
    id: 'one-page-woolf',
    title: 'The Parenthesis of Mortality: Three Critics Read Chapter VI of "Time Passes" in To the Lighthouse',
    subtitle: 'Three emerging critics dissect the square brackets in which Virginia Woolf announces Mrs. Ramsay’s death.',
    authorId: 'clara-vance',
    authorName: 'Clara Vance, Dev Patel & Elena Rostova',
    authorRole: 'Vellune Critical Colloquium',
    publicationDate: 'October 2026',
    issueVolume: 'Vol. IV, No. 2',
    seriesId: 'one-page',
    seriesTitle: 'One Page, Many Perspectives',
    readingTime: '12 min read',
    image: IMAGES.heroStudy,
    imageCaption: 'Fig. 5 — Seminar table notes from the "One Page, Many Perspectives" symposium on modernist punctuation.',
    excerpt: '[Mr. Ramsay, stumbling along a passage one dark morning, stretched his arms out, but Mrs. Ramsay having died rather suddenly the night before, his arms, though stretched out, remained empty.]',
    pullQuote: 'By enclosing the central catastrophe of the novel inside square brackets, Woolf dethrones human melodrama and places mortality on the same syntactic plane as the wind crossing the floorboards.',
    paragraphs: [
      'PERSPECTIVE I (Clara Vance — Punctuation as Ontology): In traditional Victorian narrative, the death of the maternal center of a novel demands a chapter of bedside vigil. Woolf instead banishes Mrs. Ramsay’s death to a subordinate participial phrase locked inside typographic brackets. The brackets act as a typographic coffin, yet paradoxically they make the shock infinitely sharper: we stumble over the clause just as Mr. Ramsay stumbles down the dark corridor.',
      'PERSPECTIVE II (Dev Patel — Non-Human Focalization): Throughout "Time Passes," the house itself—along with the creeping salt air, the swallows, and the falling plaster—becomes the primary sentient register. Human births, marriages, and shell explosions in France arrive only as parenthetical telegrams interrupting the vast, indifferent weather of the Hebrides.',
      'PERSPECTIVE III (Elena Rostova — The Syntax of Grief): Notice the repetition in "stretched his arms out... his arms, though stretched out, remained empty." The sentence physically enacts the gesture it describes, reaching across the participial interruption ("Mrs. Ramsay having died rather suddenly the night before") only to close upon a grammatical void.'
    ],
    marginalia: [],
    relatedArticleIds: ['marginalia-as-method', 'architecture-of-digression']
  },
  {
    id: 'poetry-desk-celan',
    title: 'The Breath-Turn (Atemwende): Caesura and Compound Coinage in Paul Celan’s Late Lyrics',
    subtitle: 'How post-war lyric poetry fractured German compound nouns to rebuild a habitable poetic speech.',
    authorId: 'lukas-lindqvist',
    authorName: 'Lukas Lindqvist',
    authorRole: 'Poetry Desk Editor · Stockholm',
    publicationDate: 'September 2026',
    issueVolume: 'Vol. IV, No. 1',
    seriesId: 'poetry-desk',
    seriesTitle: 'The Poetry Desk',
    readingTime: '8 min read',
    image: IMAGES.marginalia,
    imageCaption: 'Fig. 6 — Scansion and compound-noun breakdown from The Poetry Desk.',
    excerpt: 'Where lyric fluency had become suspect, Celan turned the line break and the hyphen into instruments of moral truthfulness.',
    pullQuote: 'In Celan, silence is not what surrounds the poem after the last line; silence is the mortar pressed between every syllable.',
    paragraphs: [
      'When Paul Celan spoke in his Meridian address of poetry as an Atemwende—a turn of breath—he offered prosody a new ethical foundation. The inherited romantic lyric relied upon musical continuity, carrying the reader smoothly across stanzaic boundaries. Celan broke that continuity from within.',
      'By forging compound neologisms and then splitting them across enjambed lines, Celan forces the voice to hesitate at the precise seam where two concepts meet. The white space at the right margin of the page ceases to be decorative emptiness and becomes an active prosodic measure.'
    ],
    marginalia: [],
    relatedArticleIds: ['ethics-of-translation', 'marginalia-as-method']
  },
  {
    id: 'reviewers-desk-precision',
    title: 'Against Adjective Inflation: A Charter for Young Literary Reviewers',
    subtitle: 'Why critical authority stems from demonstrable textual evidence rather than blurb-ready superlatives.',
    authorId: 'amara-osei',
    authorName: 'Amara Osei',
    authorRole: 'Director of The Annotator’s Guide · London',
    publicationDate: 'September 2026',
    issueVolume: 'Vol. IV, No. 1',
    seriesId: 'reviewers-desk',
    seriesTitle: "The Reviewer's Desk",
    readingTime: '7 min read',
    isReview: true,
    reviewedWork: {
      bookTitle: 'Practical Criticism & The Common Reader (Centenary Apparatus)',
      bookAuthor: 'I. A. Richards & Virginia Woolf',
      publisher: 'Cambridge / Vellune Critical Press',
      year: '2026'
    },
    image: IMAGES.comparativeLit,
    imageCaption: 'Fig. 7 — Reference editions at The Reviewer’s Desk.',
    excerpt: 'When every debut novel is hailed as "visceral," "luminous," and "devastating," language loses its power to distinguish the enduring from the merely loud.',
    pullQuote: 'Never call a book "haunting" when you can quote the three lines of syntax that explain why the ghost refuses to leave the page.',
    paragraphs: [
      'Open the weekend book supplement of almost any major newspaper and you will encounter a predictable lexicon of exhausted praise: "luminous," "tour de force," "unputdownable," "quietly devastating." These adjectives do not describe literature; they perform the work of marketing.',
      'At Vellune, we ask our reviewers to take a vow of critical abstinence: banish every evaluative adjective that is not immediately earned by a quotation and a close grammatical or structural analysis. Praise is meaningful only when the critic shows the reader how the clockwork of the sentence actually turns.'
    ],
    marginalia: [],
    relatedArticleIds: ['second-reading-brennan', 'marginalia-as-method']
  },
  {
    id: 'literary-debate-canon',
    title: 'Disputatio: Should the Introductory Literature Syllabus Be Organized Chronologically or by Formal Problem?',
    subtitle: 'Two critics debate whether historical sequence or trans-historical formal inquiry better serves emerging readers.',
    authorId: 'julian-mercer',
    authorName: 'Julian Mercer vs. Priya Nandakumar',
    authorRole: 'Vellune Literary Debates',
    publicationDate: 'October 2026',
    issueVolume: 'Vol. IV, No. 2',
    seriesId: 'literary-debates',
    seriesTitle: 'Literary Debates',
    readingTime: '13 min read',
    image: IMAGES.readingCircle,
    imageCaption: 'Fig. 8 — Autumn Disputatio session at the Vellune Reading Circle.',
    excerpt: 'Does reading Joyce without first reading Homer and Dante leave the student unmoored, or does strict chronology turn living literature into a museum corridor?',
    pullQuote: 'Tradition is not a queue in which authors wait their chronological turn; it is a simultaneous chamber in which every new work rearranges the furniture of the past.',
    paragraphs: [
      'THESIS (Julian Mercer — In Defense of Historical Sequence): Allusion is the bloodstream of literature. When a reader encounters Derek Walcott’s Omeros or James Joyce’s Ulysses after spending a term with Homer and Dante, they hear the counter-melody against the ground bass. Without chronological architecture, literary study fragments into presentist impressionism.',
      'ANTITHESIS (Priya Nandakumar — For the Problem-Centered Seminar): Chronological survey courses routinely exhaust their students in the seventeenth century and treat non-European traditions as belated appendices. When we organize a seminar around a formal question—such as "The Unreliable Confessor" pairing Augustine, Machado de Assis, Kazuo Ishiguro, and Ryūnosuke Akutagawa—students discover form as an active global conversation.'
    ],
    marginalia: [],
    relatedArticleIds: ['ethics-of-translation', 'one-page-woolf']
  }
];

export interface AnnotatorChapter {
  id: string;
  chapterNumber: string;
  title: string;
  subtitle: string;
  summary: string;
  subsections: {
    code: string;
    heading: string;
    explanation: string;
    keyChecklist: string[];
  }[];
  literarySpecimen: {
    workTitle: string;
    author: string;
    year: string;
    passage: string;
    annotations: {
      tag: string;
      phrase: string;
      analysis: string;
    }[];
  };
  downloadableTitle: string;
  downloadableFilename: string;
}

export const ANNOTATOR_CHAPTERS: AnnotatorChapter[] = [
  {
    id: 'ch-1-syntax-cadence',
    chapterNumber: 'Chapter I',
    title: 'The Anatomy of the Sentence: Parataxis, Hypotaxis & Rhythmic Cadence',
    subtitle: 'Reading grammar not as mechanical rule, but as the primary register of narrative consciousness.',
    summary: 'Before examining symbol or theme, the close reader must attend to how a sentence distributes weight across clauses, pauses, and conjunctions.',
    subsections: [
      {
        code: '§ 1.1',
        heading: 'Parataxis vs. Hypotaxis',
        explanation: 'Parataxis places clauses side by side without subordination ("And the rain descended, and the floods came"), creating immediacy, stoic restraint, or biblical gravity. Hypotaxis nests clauses within subordinate hierarchies ("Although... because... which..."), registering analytical reflection, temporal layering, or psychological hesitation.',
        keyChecklist: [
          'Count the ratio of coordinating conjunctions (and, but, nor) to subordinating conjunctions (although, whereas, since).',
          'Mark where the grammatical main verb arrives: early (loose/cumulative sentence) or at the very end (periodic sentence).',
          'Note any abrupt shift from long hypotactic periods to a short 4-word paratactic sentence.'
        ]
      },
      {
        code: '§ 1.2',
        heading: 'Punctuation as Acoustic Score',
        explanation: 'Treat colons, semicolons, em-dashes, and parentheses as musical rests. The semicolon balances two independent thoughts on a fulcrum of ironized equivalence; the dash interrupts thought mid-flight.',
        keyChecklist: [
          'Circle every semicolon and ask what unspoken conjunction it replaces.',
          'Bracket parenthetical insertions to test how the sentence reads in their absence.'
        ]
      }
    ],
    literarySpecimen: {
      workTitle: 'Mrs. Dalloway (Opening Folio)',
      author: 'Virginia Woolf',
      year: '1925',
      passage: 'What a lark! What a plunge! For so it had always seemed to her, when, with a little squeak of the hinges, which she could hear now, she had burst open the French windows and plunged at Bourton into the open air.',
      annotations: [
        {
          tag: 'Exclamatory Anacrusis',
          phrase: 'What a lark! What a plunge!',
          analysis: 'Two twin verbless exclamations launch the consciousness in medias res before the narrative past perfect ("had always seemed") anchors the memory.'
        },
        {
          tag: 'Temporal Fold',
          phrase: 'which she could hear now',
          analysis: 'The relative clause collapses thirty years: the 52-year-old Clarissa in Westminster physically hears the 18-year-old hinge at Bourton.'
        },
        {
          tag: 'Delayed Adverbial Landing',
          phrase: 'plunged at Bourton into the open air',
          analysis: 'Placing the locative "at Bourton" between the verb ("plunged") and its prepositional completion ("into the open air") suspends the motion mid-leap.'
        }
      ]
    },
    downloadableTitle: 'Vellune Worksheet I: Syntactic & Clause Mapping Grid',
    downloadableFilename: 'vellune-ch1-syntactic-mapping-guide.txt'
  },
  {
    id: 'ch-2-focalization',
    chapterNumber: 'Chapter II',
    title: 'Point of View, Focalization & Free Indirect Discourse',
    subtitle: 'Distinguishing who speaks from who perceives, and tracing the seamless slippage between narrator and character.',
    summary: 'First-person and third-person are blunt categories. Serious criticism asks whose perceptual lens colors the diction of each clause.',
    subsections: [
      {
        code: '§ 2.1',
        heading: 'The Mechanics of Free Indirect Style',
        explanation: 'Pioneered to perfection by Jane Austen and Gustave Flaubert, free indirect discourse retains third-person pronouns ("she") and past tense ("thought") while adopting the intimate vocabulary, idioms, and blind spots of the character’s internal monologue without quotation marks.',
        keyChecklist: [
          'Underline evaluative adjectives and ask: does this judgment belong to an objective narrator or to the character’s self-deception?',
          'Identify deictic markers of immediacy ("now", "here", "tomorrow", "alas") embedded inside third-person past-tense narration.'
        ]
      },
      {
        code: '§ 2.2',
        heading: 'Psychonarration vs. Quoted Monologue',
        explanation: 'Drawing on Dorrit Cohn’s Transparent Minds, distinguish when a narrator diagnoses a mind from above (psychonarration) versus when the narrative voice dissolves into the character’s unmediated idiom.',
        keyChecklist: [
          'Mark the exact boundary word where external description pivots into internal focalization.',
          'Track ironic distance between what the character believes and what the surrounding paragraph implies.'
        ]
      }
    ],
    literarySpecimen: {
      workTitle: 'Emma (Volume I, Chapter 4)',
      author: 'Jane Austen',
      year: '1815',
      passage: ' Emma was Charitable, and she had no doubt that Harriet was really the daughter of a Gentleman; for how else could she possess such pretty manners and be so ready to admire everything at Hartfield?',
      annotations: [
        {
          tag: 'Ironic Attribution',
          phrase: 'she had no doubt',
          analysis: 'Signals the transition from omniscient report into Emma’s self-confident rationalizations.'
        },
        {
          tag: 'Free Indirect Question',
          phrase: 'for how else could she possess such pretty manners',
          analysis: 'Third-person syntax adopts Emma’s snobbish syllogism; the final clause ("so ready to admire everything at Hartfield") exposes Emma’s vanity without the narrator needing to condemn her.'
        }
      ]
    },
    downloadableTitle: 'Vellune Worksheet II: Focalization & Free Indirect Style Audit',
    downloadableFilename: 'vellune-ch2-focalization-audit.txt'
  },
  {
    id: 'ch-3-prosody-scansion',
    chapterNumber: 'Chapter III',
    title: 'Prosody, Meter & the Acoustic Life of Verse',
    subtitle: 'How metrical substitution, caesura, and enjambment create semantic tension against the expected pattern.',
    summary: 'Meter is never a metronome; the meaning of a line of verse lives in the friction between the abstract metrical grid and the natural speech stress of the words.',
    subsections: [
      {
        code: '§ 3.1',
        heading: 'Substitutions in Iambic Pentameter',
        explanation: 'When a poet substitutes a trochee (DUM-da) or a spondee (DUM-DUM) into an iambic line (da-DUM), the ear registers a physical jolt. A trochaic inversion in the first foot often enacts sudden command, falling weight, or abrupt awakening.',
        keyChecklist: [
          'Mark natural speech stresses first before imposing a five-foot grid.',
          'Locate the caesura (medial pause) in each line and trace whether it moves leftward or rightward across a stanza.'
        ]
      },
      {
        code: '§ 3.2',
        heading: 'Enjambment as Epistemological Suspense',
        explanation: 'End-stopped lines offer aphoristic closure; enjambed lines create a cliff-edge where the sense promised at the line’s end is overturned at the start of the next.',
        keyChecklist: [
          'Cover the following line with a card and note what grammatical expectation the line-ending word creates.',
          'Compare syntactic units (clauses) against prosodic units (lines and stanzas).'
        ]
      }
    ],
    literarySpecimen: {
      workTitle: 'Paradise Lost (Book I, Lines 1–6)',
      author: 'John Milton',
      year: '1667',
      passage: 'Of Mans First Disobedience, and the Fruit / Of that Forbidden Tree, whose mortal tast / Brought Death into the World, and all our woe, / With loss of Eden, till one greater Man / Restore us, and regain the blissful Seat, / Sing Heav’nly Muse...',
      annotations: [
        {
          tag: 'Radical Enjambment',
          phrase: 'and the Fruit / Of that Forbidden Tree',
          analysis: 'Suspending "the Fruit" at the line break makes it hang momentarily in innocence before the genitive "Of that Forbidden Tree" names the transgression.'
        },
        {
          tag: 'Spondaic Gravity',
          phrase: 'Brought Death',
          analysis: 'Two consecutive heavy monosyllabic stresses ("Brought Death") arrest the iambic flow at the exact moment mortality enters the poem.'
        },
        {
          tag: 'Delayed Imperative Verb',
          phrase: 'Sing Heav’nly Muse',
          analysis: 'The main verb ("Sing") is withheld for five full lines of subordinate theological history, enacting the vastness of the epic argument.'
        }
      ]
    },
    downloadableTitle: 'Vellune Worksheet III: Scansion & Prosodic Notation Manual',
    downloadableFilename: 'vellune-ch3-prosody-scansion-manual.txt'
  },
  {
    id: 'ch-4-intertextuality-archive',
    chapterNumber: 'Chapter IV',
    title: 'Allusion, Intertextuality & Historical Context',
    subtitle: 'Tracing how texts converse with predecessors and negotiate the historical conditions of their composition.',
    summary: 'No work of literature arrives ex nihilo. Close reading reaches its maturity when formal analysis meets philological and historical awareness.',
    subsections: [
      {
        code: '§ 4.1',
        heading: 'Echo, Revision, and Counter-Text',
        explanation: 'An allusion is not a decorative password for erudite readers; it brings the entire context of the earlier work into collision with the new scene—often to ironize, grieve, or contest the precursor.',
        keyChecklist: [
          'When locating an allusion, inspect the surrounding ten lines of the source text—what has been omitted is often the point.',
          'Trace etymological roots of recurring keywords across the work’s historical moment.'
        ]
      },
      {
        code: '§ 4.2',
        heading: 'The Flyleaf Index System',
        explanation: 'Maintain a personal index on the rear blank flyleaves of every physical book you read: list page numbers grouped by motif, formal device, and unanswered critical questions.',
        keyChecklist: [
          'Reserve the front flyleaf for biographical/historical chronology and the rear flyleaf for thematic page clusters.',
          'Convert your richest flyleaf cluster into the thesis of your critical essay.'
        ]
      }
    ],
    literarySpecimen: {
      workTitle: 'The Waste Land ("The Burial of the Dead")',
      author: 'T. S. Eliot',
      year: '1922',
      passage: 'Unreal City, / Under the brown fog of a winter dawn, / A crowd flowed over London Bridge, so many, / I had not thought death had undone so many.',
      annotations: [
        {
          tag: 'Baudelairean Palimpsest',
          phrase: 'Unreal City',
          analysis: 'Translates Charles Baudelaire’s "Fourmillante cité, cité pleine de rêves" from Les Fleurs du mal, superimposing nineteenth-century Paris onto post-WWI financial London.'
        },
        {
          tag: 'Dantean Counterpoint',
          phrase: 'I had not thought death had undone so many',
          analysis: 'Direct translation of Inferno III.55–57 ("ch’i’ non averei creduto / che morte tanta n’avesse disfatta"), casting morning commuters in the City of London as the lukewarm souls in the vestibule of Hell.'
        }
      ]
    },
    downloadableTitle: 'Vellune Worksheet IV: Flyleaf Indexing & Archival Citation Template',
    downloadableFilename: 'vellune-ch4-flyleaf-indexing-template.txt'
  }
];

export interface ReadingRoomResource {
  id: string;
  category:
    | 'Curated Reading Lists'
    | 'Literary Terminology'
    | 'Literary Movements'
    | 'Literary Genres'
    | 'Analysis Guides'
    | 'Reading Challenges'
    | 'Discussion Questions'
    | 'Downloadable Materials';
  title: string;
  subtitle: string;
  metadata: string;
  summary: string;
  items: {
    label: string;
    detail: string;
  }[];
  discussionPrompts?: string[];
  downloadableContent?: string;
}

export const READING_ROOM_RESOURCES: ReadingRoomResource[] = [
  {
    id: 'rr-list-novella',
    category: 'Curated Reading Lists',
    title: 'The Art of the Novella: Twelve Masterworks Under 140 Pages',
    subtitle: 'A syllabus of compressed narrative architecture across six languages.',
    metadata: 'Curated by the Editorial Board · 12 Essential Works',
    summary: 'Neither an extended short story nor a truncated novel, the novella demands structural compression where every scene alters the moral equilibrium.',
    items: [
      { label: 'Heinrich von Kleist — Michael Kohlhaas (1810)', detail: 'Relentless hypotactic prose tracing how a demand for legal justice mutates into apocalyptic fanaticism.' },
      { label: 'Herman Melville — Benito Cereno (1855)', detail: 'A masterclass in epistemological blindness and limited third-person focalization aboard a becalmed ship.' },
      { label: 'Leo Tolstoy — Hadji Murad (1912)', detail: 'Late Tolstoy’s crystal-clear parataxis examining imperial violence from both court and mountain village.' },
      { label: 'Nella Larsen — Passing (1929)', detail: 'Psychological ambiguity and unreliable perception in Harlem’s social salons.' },
      { label: 'Juan Rulfo — Pedro Páramo (1955)', detail: 'Polyphonic ghostly fragments that transformed twentieth-century Latin American fiction.' },
      { label: 'Claire Keegan — Small Things Like These (2021)', detail: 'Moral courage rendered through winter stillness and spare Irish diction.' }
    ],
    discussionPrompts: [
      'Why does the 90-to-130-page length permit a sustained single mood that a multi-plot novel must interrupt?',
      'Compare how Melville and Larsen use a perceptive yet fatally limited central observer.'
    ]
  },
  {
    id: 'rr-lexicon-terms',
    category: 'Literary Terminology',
    title: 'A Critical Lexicon: Essential Rhetoric, Poetics & Narrative Terms',
    subtitle: 'Precise definitions with canonical textual exemplars for the practicing critic.',
    metadata: 'Reference Compendium · Updated Autumn 2026',
    summary: 'Critical precision begins with naming formal operations accurately rather than gesturing vaguely at "style" or "tone."',
    items: [
      { label: 'Apophasis (Paralipsis)', detail: 'Conspicuous mention of a subject by claiming not to mention it—revealing rhetorical bad faith or suppressed preoccupation.' },
      { label: 'Chiasmus', detail: 'Inverted parallelism (ABBA structure) that creates a closed mirror of fate, irony, or antithesis.' },
      { label: 'Diegesis vs. Mimesis', detail: 'The classical Platonic and Aristotelian distinction between telling (narrative summary) and showing (scenic enactment).' },
      { label: 'Ekphrasis', detail: 'A verbal representation of a visual work of art (from Homer’s Shield of Achilles to Auden’s "Musée des Beaux Arts").' },
      { label: 'Metalepsis', detail: 'A transgression of narrative levels in which an author or reader steps across the threshold of the fictional world.' },
      { label: 'Synecdoche & Metonymy', detail: 'Substitution by part-for-whole versus substitution by contiguous physical or historical association (central to realist prose).' }
    ]
  },
  {
    id: 'rr-movements-modernism',
    category: 'Literary Movements',
    title: 'Global Modernisms (1890–1945): From Paris and Dublin to Tokyo, São Paulo & Calcutta',
    subtitle: 'A comparative guide to formal experimentation beyond the single-capital narrative.',
    metadata: 'Movement Guide · Comparative Literature Series',
    summary: 'Modernism was not an isolated European phenomenon, but a polycentric crisis of representation across metropolitan and anticolonial capitals.',
    items: [
      { label: 'High Anglo-Irish & Continental Modernism', detail: 'Joyce, Woolf, Proust, Kafka, and Musil: interior monologue, temporal dilation, and crisis of the bourgeois subject.' },
      { label: 'Brazilian Antropofagia (Oswald de Andrade & Clarice Lispector)', detail: 'Cultural cannibalism and radical interiority transforming European avant-garde forms.' },
      { label: 'Japanese Shinkankakuha (New Sensationalist School)', detail: 'Yasunari Kawabata and Riichi Yokomitsu blending classical haikai ellipsis with cinematic montage.' },
      { label: 'The Harlem Renaissance & Negritude', detail: 'Jean Toomer’s Cane, Aimé Césaire, and Langston Hughes reinventing prosody through vernacular jazz and diasporic rhythm.' }
    ]
  },
  {
    id: 'rr-genres-tragedy',
    category: 'Literary Genres',
    title: 'Genre Monograph: The Mutations of Tragedy from Attic Drama to the Modern Novel',
    subtitle: 'Tracing hamartia, anagnorisis, and cosmic necessity across twenty-four centuries.',
    metadata: 'Genre Study · Classical & Modern',
    summary: 'When George Steiner asked whether tragedy had died in the modern secular age, novelists from Hardy to Morrison answered by reinventing tragic form.',
    items: [
      { label: 'Attic Civic Tragedy (Aeschylus, Sophocles, Euripides)', detail: 'The collision of irreconcilable ethical duties within the polis (e.g., Antigone’s kinship law vs. Creon’s civic decree).' },
      { label: 'Early Modern Revenge & Interior Tragedy', detail: 'Shakespearean soliloquy internalizing fate as psychological hesitation and linguistic self-interrogation.' },
      { label: 'Bourgeois & Post-Colonial Tragedy', detail: 'Ibsen, Thomas Hardy, Chinua Achebe’s Things Fall Apart, and Toni Morrison’s Beloved: historical rupture as tragic necessity.' }
    ]
  },
  {
    id: 'rr-challenge-autumn',
    category: 'Reading Challenges',
    title: 'The Vellune Four-Quarter Deep Reading Challenge',
    subtitle: 'Twelve deliberate reading practices designed to replace speed-reading with slow philological attention.',
    metadata: 'Annual Reader Initiative · Open to All Members',
    summary: 'We measure reading not by the height of a stack of finished books, but by the depth of attention paid to a single work.',
    items: [
      { label: 'Quarter I — The Twice-Read Book', detail: 'Read a novella in full on Monday; re-read it immediately on Friday with pencil in hand, noting structural foreshadowing.' },
      { label: 'Quarter II — The Tri-Translation Study', detail: 'Read a single canto of Dante or chapter of Chekhov in three distinct English translations.' },
      { label: 'Quarter III — The Complete Oeuvre in Miniature', detail: 'Read five works by a single author in strict chronological order of composition.' },
      { label: 'Quarter IV — The Unfamiliar Form', detail: 'Spend four weeks reading a verse epic, epistolary novel, or dramatic closet play aloud.' }
    ]
  },
  {
    id: 'rr-questions-seminar',
    category: 'Discussion Questions',
    title: 'Twenty Foundational Seminar Questions for Any Work of Fiction or Poetry',
    subtitle: 'Field-tested prompts for school chapters, reading circles, and independent critical essays.',
    metadata: 'Seminar Apparatus · Reading Room',
    summary: 'Great seminar questions never ask whether a character is "relatable"; they ask how the text’s formal choices compel our response.',
    items: [
      { label: '1. On Narrative Thresholds', detail: 'How does the very first sentence establish the contract of authority, time, and tone—and how does the final sentence fulfill or subvert it?' },
      { label: '2. On Structural Omission', detail: 'What major chronological event happens off-stage between chapters, and why did the author refuse to dramatize it directly?' },
      { label: '3. On Diction & Register', detail: 'Where does the prose suddenly shift from Latinate abstraction to Anglo-Saxon concrete monosyllables?' },
      { label: '4. On the Counter-Argument', detail: 'Which minor character voices the sharpest philosophical objection to the protagonist’s worldview?' }
    ],
    discussionPrompts: [
      'What would be lost if this third-person narrative were rewritten in the first person?',
      'Locate the single paragraph where the work’s title acquires its deepest ironic or metaphorical resonance.'
    ]
  },
  {
    id: 'rr-download-packets',
    category: 'Downloadable Materials',
    title: 'Vellune Seminar Syllabi & Close-Reading Folio Packets',
    subtitle: 'Ready-to-print guides for independent study, student chapters, and classroom workshops.',
    metadata: 'Open Educational Archive · Text & Markdown Packets',
    summary: 'Download complete study packets prepared by Vellune’s editorial board and academic collaborators.',
    items: [
      { label: 'Packet A: The Art of the Critical Essay (16-Page Rubric & Style Guide)', detail: 'Structuring an argument from micro-textual observation to macro-theoretical claim.' },
      { label: 'Packet B: Prosody & Scansion Field Reference Card', detail: 'Classical feet, stanzaic forms (Sapphic, Spenserian, Terza Rima, Sonnet), and rhetorical figures.' },
      { label: 'Packet C: Comparative Translation Seminar Workbook', detail: 'Parallel passages of Homer, Sappho, Du Fu, Baudelaire, and Rilke for student annotation.' }
    ]
  }
];

export interface VelluneEvent {
  id: string;
  format:
    | 'The Reading Circle'
    | 'Critical Writing Workshops'
    | 'Literary Debates'
    | 'Author Encounters'
    | 'Vellune Lecture Series'
    | 'Open Pages'
    | 'Online Reading Sessions'
    | 'Literary Symposiums'
    | 'Guest Speaker Sessions';
  title: string;
  subtitle: string;
  date: string;
  time: string;
  location: string;
  mode: 'In-Person & Livestream' | 'Online Seminar (Global)' | 'In-Person Salon';
  status: 'Upcoming' | 'Past Archive';
  chairSpeaker: string;
  seatsRemaining?: number;
  description: string;
  preparatoryReading: string;
  agenda: string[];
  announcementNote: string;
}

export const CONVERSATION_EVENTS: VelluneEvent[] = [
  {
    id: 'evt-reading-circle-nov',
    format: 'The Reading Circle',
    title: 'Close Reading Seminar: Kazuo Ishiguro’s The Remains of the Day & the Unreliable Butler',
    subtitle: 'Examining dignified restraint, syntactic evasion, and political complicity in first-person retrospection.',
    date: 'Saturday, 28 November 2026',
    time: '16:00 – 18:00 GMT',
    location: 'Online Seminar Room I & Senate House Reading Room, London',
    mode: 'In-Person & Livestream',
    status: 'Upcoming',
    chairSpeaker: 'Chaired by Clara Vance & Julian Mercer',
    seatsRemaining: 14,
    description: 'Participants will examine three selected two-page extracts from Day Three of Ishiguro’s novel. We will trace how Stevens uses impersonal pronouns ("one feels") and parenthetical digressions to shield himself from recognizing Lord Darlington’s moral collapse and his own unspoken grief.',
    preparatoryReading: 'Kazuo Ishiguro, The Remains of the Day (1989), pp. 103–118; circulated extract PDF sent upon registration.',
    agenda: [
      '16:00 — Opening Philological Framing (15 mins)',
      '16:15 — Line-by-Line Collaborative Annotation of the Bantering Passage',
      '17:10 — Open Colloquium & Counter-Interpretations',
      '17:45 — Closing Synthesis & Essay Prompt Circulation'
    ],
    announcementNote: 'Extract folios with numbered lines are distributed 48 hours prior to the session.'
  },
  {
    id: 'evt-writing-workshop-dec',
    format: 'Critical Writing Workshops',
    title: 'From Marginal Note to Critical Essay: Structuring the 3,000-Word Review-Essay',
    subtitle: 'A practical craft workshop on moving beyond the five-paragraph school template into genuine literary essayism.',
    date: 'Saturday, 5 December 2026',
    time: '15:00 – 17:30 GMT',
    location: 'Global Zoom Seminar Room (Interactive Draft Clinic)',
    mode: 'Online Seminar (Global)',
    status: 'Upcoming',
    chairSpeaker: 'Led by Amara Osei & Sora Takahashi',
    seatsRemaining: 22,
    description: 'How do critics in The London Review of Books, The Paris Review, or n+1 weave biographical context, historical tension, and micro-syntactic close reading into a single braided narrative? Attendees bring a 400-word draft opening for live editorial workshopping.',
    preparatoryReading: 'Elizabeth Hardwick, "Seduction and Betrayal" (excerpt); James Wood, How Fiction Works (Chapter 1).',
    agenda: [
      '15:00 — The Braided Architecture of the Review-Essay',
      '15:45 — Quoting Surgically: How to Unpack Rather Than Paraphrase',
      '16:30 — Live Editorial Clinic on Participant Openings'
    ],
    announcementNote: 'Open to emerging writers aged 15–25 worldwide.'
  },
  {
    id: 'evt-author-encounter-dec',
    format: 'Author Encounters',
    title: 'On the Art of Literary Translation: In Conversation with Dr. Elena Rostova',
    subtitle: 'Translating twentieth-century Central and Eastern European prose into contemporary English.',
    date: 'Thursday, 12 December 2026',
    time: '18:30 – 20:00 GMT',
    location: 'Taylor Institution Library Hall & Global Broadcast',
    mode: 'In-Person & Livestream',
    status: 'Upcoming',
    chairSpeaker: 'Guest: Dr. Elena Rostova · Moderator: Julian Mercer',
    seatsRemaining: 31,
    description: 'An evening dialogue exploring how translators negotiate rhythm, historical idiom, and cultural specificity without domesticating the foreignness of the source text.',
    preparatoryReading: 'Selected bilingual worksheets provided upon RSVP.',
    agenda: [
      '18:30 — Bilingual Reading of Draft & Final Galley Passages',
      '19:00 — Editorial Interview on Syntax and Voice',
      '19:35 — Audience Questions from Young Critics'
    ],
    announcementNote: 'Recording and annotated transcript will be published in The Journal (Series 10).'
  },
  {
    id: 'evt-symposium-jan',
    format: 'Literary Symposiums',
    title: 'The Winter Annual Symposium: "Memory, Archive, and the Counter-Canon"',
    subtitle: 'Full-day international gathering of youth critics, school chapters, and invited literary scholars.',
    date: 'Saturday, 18 January 2027',
    time: '10:00 – 17:30 GMT',
    location: 'Hybrid: Edinburgh, London, Toronto & Online Seminar Commons',
    mode: 'In-Person & Livestream',
    status: 'Upcoming',
    chairSpeaker: 'Vellune Editorial Board & Keynote Guests',
    seatsRemaining: 45,
    description: 'Featuring four thematic panels presented by fellows of the Vellune Young Critics Programme, a live Literary Debate ("Does the Digital Archive Threaten Slow Reading?"), and the announcement of the Vellune Essay Prize shortlist.',
    preparatoryReading: 'Symposium Reader Booklet (distributed to all registered attendees).',
    agenda: [
      '10:00 — Keynote Lecture (Vellune Lecture Series): "The Critic as Custodian"',
      '11:30 — Panel I: Epistolary Form and the Fragment',
      '14:00 — Live Disputatio (Literary Debates)',
      '16:00 — Open Pages: Emerging Critics Read New Work'
    ],
    announcementNote: 'Abstract submissions for the Open Pages panel close 20 December 2026.'
  },
  {
    id: 'evt-past-lecture-oct',
    format: 'Vellune Lecture Series',
    title: 'Annual Autumn Lecture: "Why Close Reading Is an Ethical Practice in an Age of Skimming"',
    subtitle: 'Archived keynote lecture and seminar discussion.',
    date: '14 October 2026',
    time: '18:00 GMT (Archived)',
    location: 'London & Online Archive',
    mode: 'Online Seminar (Global)',
    status: 'Past Archive',
    chairSpeaker: 'Prof. Alistair Finch (Academic Collaborator) & Clara Vance',
    description: 'An exploration of the history of practical criticism from I. A. Richards and William Empson to contemporary global comparative literature.',
    preparatoryReading: 'William Empson, Seven Types of Ambiguity (Chapter I).',
    agenda: [
      'Full transcript and seminar notes archived in The Reading Room.'
    ],
    announcementNote: 'Archive available: 184 participants across 19 countries attended.'
  },
  {
    id: 'evt-past-open-pages-sep',
    format: 'Open Pages',
    title: 'September Open Pages & Online Reading Session: Lyric Prosody Across Languages',
    subtitle: 'Archived workshop on sonnet forms from Petrarch and Shakespeare to Agha Shahid Ali.',
    date: '22 September 2026',
    time: '17:00 GMT (Archived)',
    location: 'Online Seminar Commons',
    mode: 'Online Seminar (Global)',
    status: 'Past Archive',
    chairSpeaker: 'Lukas Lindqvist (The Poetry Desk)',
    description: 'Twelve young critics presented 5-minute close readings of a single turn (volta) in a sonnet or ghazal of their choice.',
    preparatoryReading: 'Agha Shahid Ali, Call Me Ishmael Tonight.',
    agenda: [
      'Archived audio & annotated folios available to members.'
    ],
    announcementNote: 'Selected presentations published in Vellune Voices.'
  }
];

export interface Initiative {
  id: string;
  number: string;
  title: string;
  category: string;
  statusText: string;
  summary: string;
  objectives: string[];
  activities: string[];
  eligibility: string;
  participationTimeline: string;
}

export const INITIATIVES: Initiative[] = [
  {
    id: 'young-critics-programme',
    number: '01',
    title: 'The Vellune Young Critics Programme',
    category: 'Flagship Mentorship Cohort',
    statusText: 'Applications Open for Spring 2027 Cohort',
    summary: 'An intensive 12-week seminar and editorial mentorship pairing emerging writers (ages 15–23) with senior editors to research, draft, and publish a major piece of literary criticism.',
    objectives: [
      'Cultivate rigorous habits of textual analysis, philological care, and independent critical voice.',
      'Bridge the gap between secondary/undergraduate classroom essays and publishable cultural journalism.',
      'Publish each fellow’s completed 3,000-word essay in The Journal.'
    ],
    activities: [
      'Six bi-weekly seminars on close reading, comparative methodology, and prose style.',
      'Three rounds of one-on-one developmental line editing with a Vellune editor.',
      'Colloquium presentation at the seasonal Vellune Literary Symposium.'
    ],
    eligibility: 'Open to secondary school and university students worldwide (ages 15–23) at no cost.',
    participationTimeline: 'Cohort runs February – May and September – December annually.'
  },
  {
    id: 'annual-anthology',
    number: '02',
    title: 'Vellune Annual Anthology',
    category: 'Print & Digital Monograph Edition',
    statusText: 'Volume IV in Preparation',
    summary: 'Our flagship annual bound volume gathering the year’s finest essays, book reviews, comparative dialogues, and marginalia plates published across Vellune.',
    objectives: [
      'Preserve youth-led literary criticism in an enduring, archival print and digital book format.',
      'Distribute copies to school libraries, university reading rooms, and independent bookshops.'
    ],
    activities: [
      'Editorial selection of 24 essays and critical reviews from the preceding four quarterly cycles.',
      'Typesetting, commissioning of critical prefaces, and global print/digital release.'
    ],
    eligibility: 'All contributors published in The Journal during the calendar year are automatically considered.',
    participationTimeline: 'Published annually each December.'
  },
  {
    id: 'essay-prize',
    number: '03',
    title: 'The Vellune Essay Prize',
    category: 'International Critical Competition',
    statusText: '2026–2027 Cycle Open · Deadline 15 January 2027',
    summary: 'An annual international prize honoring an original, unpublished critical essay (2,500–4,000 words) addressing a foundational question in literature.',
    objectives: [
      'Recognize ambitious long-form literary criticism by writers under 24.',
      'Encourage bold, text-grounded arguments that challenge received critical consensus.'
    ],
    activities: [
      'Blind peer evaluation by the Editorial Board and Academic Collaborators.',
      'Publication of the winning essay and three runners-up in The Quarterly Essay series.',
      'Award of book grants and presentation at the Winter Literary Symposium.'
    ],
    eligibility: 'Emerging writers aged 14–24 in any country; no entry fee.',
    participationTimeline: 'Submissions close 15 January 2027; shortlist announced 1 February 2027.'
  },
  {
    id: 'editorial-fellowship',
    number: '04',
    title: 'Vellune Editorial Fellowship',
    category: 'Publishing & Editing Apprenticeship',
    statusText: 'Rolling Applications',
    summary: 'A six-month practical fellowship training emerging editors in commissioning, substantive editing, fact-checking, proof-reading, and literary journal production.',
    objectives: [
      'Demystify the editorial craft behind independent literary publications.',
      'Train the next generation of literary editors in collegial, rigorous text editing.'
    ],
    activities: [
      'Shadowing section editors across The Second Reading, The Comparative Essay, and The Poetry Desk.',
      'Drafting editorial letters and participating in weekly pitch evaluation meetings.'
    ],
    eligibility: 'Writers and students aged 17–25 with strong critical reading skills.',
    participationTimeline: 'Two six-month terms per year.'
  },
  {
    id: 'critical-reading-project',
    number: '05',
    title: 'The Critical Reading Project',
    category: 'Pedagogical Curriculum Initiative',
    statusText: 'Active in 28 Partner Schools',
    summary: 'Free, open-access close-reading workshops and seminar curricula delivered to secondary schools and community libraries.',
    objectives: [
      'Equip younger students with practical tools for annotating complex prose and poetry.',
      'Move literary education beyond exam formula toward genuine intellectual curiosity.'
    ],
    activities: [
      'Peer-led 90-minute annotation workshops using The Annotator’s Guide.',
      'Distribution of printed close-reading folios and lexicon cards.'
    ],
    eligibility: 'Any secondary school teacher, librarian, or student society may request a workshop.',
    participationTimeline: 'Year-round booking during academic terms.'
  },
  {
    id: 'reading-without-borders',
    number: '06',
    title: 'Reading Without Borders',
    category: 'World Literature & Translation Exchange',
    statusText: 'Active Global Seminars',
    summary: 'Cross-border reading circles pairing student chapters in different countries to read and discuss literature in translation together.',
    objectives: [
      'Foster cross-cultural literary dialogue across linguistic boundaries.',
      'Highlight underrepresented literary traditions and translation studies.'
    ],
    activities: [
      'Bi-monthly paired seminars between chapters (e.g., Dublin & Kyoto; London & São Paulo).',
      'Collaborative publication of "One Page, Many Perspectives" dispatches.'
    ],
    eligibility: 'Open to all individual members and school/international chapters.',
    participationTimeline: 'Monthly transnational reading pairings.'
  },
  {
    id: 'pages-for-all',
    number: '07',
    title: 'Pages for All',
    category: 'Book Access & Library Micro-Grants',
    statusText: 'Ongoing Distribution',
    summary: 'An access initiative supplying physical classic editions, literary journals, and critical reference books to under-resourced school reading rooms.',
    objectives: [
      'Ensure that financial barriers never prevent a young reader from owning and annotating classic texts.',
      'Build permanent physical "Vellune Shelves" in partner community libraries.'
    ],
    activities: [
      'Curated 30-book canonical and world-literature parcel shipments.',
      'Publisher partnerships and donor book drives.'
    ],
    eligibility: 'State schools, public youth libraries, and community reading groups.',
    participationTimeline: 'Quarterly distribution cycles.'
  },
  {
    id: 'the-shared-shelf',
    number: '08',
    title: 'The Shared Shelf',
    category: 'Annotated Book Exchange',
    statusText: 'Active Member Programme',
    summary: 'A traveling book-chain programme in which a physical volume is read and annotated in pencil by five consecutive critics across different cities.',
    objectives: [
      'Revive the material culture of shared marginalia and physical book stewardship.',
      'Publish archival scans of the most illuminating multi-reader margins.'
    ],
    activities: [
      'Each participant keeps the book for three weeks, annotates in pencil with their initials, and posts it to the next reader.',
      'Final volume enters the Vellune Physical Archive.'
    ],
    eligibility: 'Registered Vellune community members and chapter leads.',
    participationTimeline: 'New five-reader chains launched every two months.'
  },
  {
    id: 'school-chapters',
    number: '09',
    title: 'Vellune School Chapters',
    category: 'Secondary & Sixth-Form Network',
    statusText: '34 Active Chapters',
    summary: 'Student-led literary criticism societies established within secondary schools and sixth-form colleges, using Vellune’s monthly seminar packets.',
    objectives: [
      'Create self-sustaining spaces for serious literary conversation inside schools.',
      'Give student critics a direct pipeline to publish in Vellune Voices.'
    ],
    activities: [
      'Fortnightly lunchtime or after-school close-reading circles.',
      'Annual inter-school Literary Debate tournament.'
    ],
    eligibility: 'Any group of 5+ students with a faculty advisor may charter a chapter.',
    participationTimeline: 'Charter applications reviewed within 14 days.'
  },
  {
    id: 'international-chapters',
    number: '10',
    title: 'Vellune International Chapters',
    category: 'Regional & University Hubs',
    statusText: '12 City & University Hubs',
    summary: 'Regional editorial and seminar hubs across Europe, North America, Asia, and Africa coordinating local salons and translation desks.',
    objectives: [
      'Decentralize literary criticism across global linguistic and cultural centers.',
      'Host local in-person Reading Circles and Author Encounters.'
    ],
    activities: [
      'Seasonal in-person reading salons and symposium watch-parties.',
      'Regional commissioning of essays in World Literature.'
    ],
    eligibility: 'University students and regional youth coordinators.',
    participationTimeline: 'Year-round regional programming.'
  },
  {
    id: 'research-initiative',
    number: '11',
    title: 'Vellune Research Initiative',
    category: 'Collaborative Literary Scholarship',
    statusText: '2026 Topic: The Periodical Press (1900–1960)',
    summary: 'Structured research groups where emerging critics collaborate with academic advisors on archival and bibliographic projects.',
    objectives: [
      'Introduce young writers to primary archival research, manuscript history, and periodical studies.',
      'Produce open-access digital bibliographies and context essays for "Behind the Text".'
    ],
    activities: [
      'Archival research training sessions and bibliographic indexing.',
      'Co-authored research monographs.'
    ],
    eligibility: 'Advanced Young Critics fellows and undergraduate contributors.',
    participationTimeline: 'Annual 9-month research cycle.'
  },
  {
    id: 'literary-outreach',
    number: '12',
    title: 'Vellune Literary Outreach Programme',
    category: 'Public Humanities & Youth Engagement',
    statusText: 'Open for Partnerships',
    summary: 'Partnerships with literary festivals, independent bookshops, and cultural institutes to bring youth voices into public literary discourse.',
    objectives: [
      'Represent young literary critics on festival panels, book prize shadow-juries, and cultural broadcasts.',
      'Demolish the assumption that serious criticism belongs only to the academy.'
    ],
    activities: [
      'Youth shadow-juries for major translation and fiction prizes.',
      'Public bookshop conversations led by Vellune editors.'
    ],
    eligibility: 'Cultural institutions, festivals, bookshops, and student critics.',
    participationTimeline: 'Ongoing institutional partnerships.'
  }
];

export interface ContributorProfile {
  id: string;
  name: string;
  role: string;
  group:
    | 'Editorial Team'
    | 'Writers & Contributors'
    | 'Young Critics'
    | 'School Chapters'
    | 'International Contributors'
    | 'Guest Contributors'
    | 'Academic Collaborators';
  location: string;
  institutionOrChapter: string;
  specialties: string[];
  shortBio: string;
  fullBio: string;
  publishedArticleIds: string[];
}

export const COMMUNITY_PROFILES: ContributorProfile[] = [
  {
    id: 'clara-vance',
    name: 'Clara Vance',
    role: 'Co-Founder & Editor-in-Chief',
    group: 'Editorial Team',
    location: 'Edinburgh & Oxford, UK',
    institutionOrChapter: 'Central Editorial Board',
    specialties: ['20th-Century European Prose', 'Modernist Syntax', 'Memory Studies'],
    shortBio: 'Co-founder of Vellune. Writes on W. G. Sebald, Virginia Woolf, and the ethics of hypotactic prose.',
    fullBio: 'Clara Vance co-founded Vellune in 2023 with the conviction that young readers deserve a publication of genuine philological seriousness. Her critical essays focus on postwar European prose, syntax as temporal architecture, and modernist punctuation. She chairs the monthly Reading Circle and oversees The Quarterly Essay.',
    publishedArticleIds: ['architecture-of-digression', 'one-page-woolf']
  },
  {
    id: 'amara-osei',
    name: 'Amara Osei',
    role: "Director of The Annotator's Guide & Managing Editor",
    group: 'Editorial Team',
    location: 'London, UK',
    institutionOrChapter: 'Central Editorial Board',
    specialties: ['History of Marginalia', 'Practical Criticism', '19th-Century Poetics'],
    shortBio: 'Architect of Vellune’s four-chapter close-reading curriculum and editor of The Reviewer’s Desk.',
    fullBio: 'Amara Osei directs The Annotator’s Guide and leads the Critical Reading Project across partner schools. Her research explores Renaissance and Romantic marginalia practices and how physical annotation shapes analytical prose.',
    publishedArticleIds: ['marginalia-as-method', 'reviewers-desk-precision']
  },
  {
    id: 'julian-mercer',
    name: 'Julian Mercer',
    role: 'Senior Comparative & Translation Editor',
    group: 'Editorial Team',
    location: 'Dublin, Ireland',
    institutionOrChapter: 'Dublin Chapter & Translation Desk',
    specialties: ['Russian & French Realism', 'Translation Theory', 'Classical Epic'],
    shortBio: 'Directs the Translations & World Literature series and moderates Vellune’s Literary Debates.',
    fullBio: 'Julian Mercer edits the Comparative Essay and Translations desks at Vellune. He specializes in nineteenth-century French and Russian fiction and leads the tri-translation workshops in the Reading Room.',
    publishedArticleIds: ['ethics-of-translation', 'literary-debate-canon']
  },
  {
    id: 'sora-takahashi',
    name: 'Sora Takahashi',
    role: 'Editor of The Second Reading',
    group: 'International Contributors',
    location: 'Kyoto & Toronto',
    institutionOrChapter: 'Kyoto–Toronto Transnational Hub',
    specialties: ['Mid-Century Short Fiction', 'Japanese Modernism', 'The Novella'],
    shortBio: 'Commissions literary reviews of neglected editions and coordinates East Asian translation circles.',
    fullBio: 'Sora Takahashi oversees book reviews for The Second Reading and coordinates Reading Without Borders seminars between Japanese and North American student chapters.',
    publishedArticleIds: ['second-reading-brennan']
  },
  {
    id: 'lukas-lindqvist',
    name: 'Lukas Lindqvist',
    role: 'Editor of The Poetry Desk',
    group: 'Writers & Contributors',
    location: 'Stockholm, Sweden',
    institutionOrChapter: 'Nordic Chapter Hub',
    specialties: ['Prosody & Scansion', 'Postwar German & Nordic Lyric', 'Paul Celan'],
    shortBio: 'Poetics critic focusing on metrical substitution, caesura, and twentieth-century lyric form.',
    fullBio: 'Lukas Lindqvist leads The Poetry Desk at Vellune, conducting scansion workshops and commissioning essays on prosodic innovation from classical antiquity to the postwar lyric.',
    publishedArticleIds: ['poetry-desk-celan']
  },
  {
    id: 'dev-patel',
    name: 'Dev Patel',
    role: 'Senior Young Critics Fellow (2026 Cohort)',
    group: 'Young Critics',
    location: 'Manchester, UK',
    institutionOrChapter: 'Manchester Grammar & Northern Chapter',
    specialties: ['Eco-Criticism', 'British Modernism', 'Narrative Focalization'],
    shortBio: 'Fellow of the Vellune Young Critics Programme researching non-human focalization in modernist fiction.',
    fullBio: 'Dev Patel joined Vellune through a school chapter workshop in 2025 before completing the Young Critics Programme. He co-authored the autumn "One Page, Many Perspectives" symposium on Virginia Woolf.',
    publishedArticleIds: ['one-page-woolf']
  },
  {
    id: 'elena-rostova',
    name: 'Dr. Elena Rostova',
    role: 'Visiting Translator & Guest Critic',
    group: 'Guest Contributors',
    location: 'Prague & Vienna',
    institutionOrChapter: 'Visiting Fellow in Literary Translation',
    specialties: ['Central European Literature', 'Slavic Poetics', 'Archival Manuscripts'],
    shortBio: 'Literary translator and guest speaker for Vellune’s Author Encounters and Translation seminars.',
    fullBio: 'Dr. Elena Rostova has translated six volumes of Central European prose and poetry. She serves as a guest contributor and seminar respondent for Vellune’s international workshops.',
    publishedArticleIds: ['one-page-woolf']
  },
  {
    id: 'alistair-finch',
    name: 'Prof. Alistair Finch',
    role: 'Senior Academic Advisor',
    group: 'Academic Collaborators',
    location: 'Cambridge, UK',
    institutionOrChapter: 'Advisory Board · Comparative Philology',
    specialties: ['History of Criticism', 'Renaissance Rhetoric', 'Periodical Studies'],
    shortBio: 'Advises the Vellune Research Initiative and serves on the final jury of the Vellune Essay Prize.',
    fullBio: 'Prof. Alistair Finch supports Vellune’s editorial independence while providing archival guidance for the Vellune Research Initiative and annual Essay Prize evaluation.',
    publishedArticleIds: []
  },
  {
    id: 'st-pauls-chapter',
    name: 'London & Westminster Student Chapter',
    role: 'Chartered School Chapter #01',
    group: 'School Chapters',
    location: 'London, UK',
    institutionOrChapter: '28 Student Critics · Fortnightly Fridays',
    specialties: ['Close-Reading Colloquia', 'Inter-School Disputatio', 'Shared Shelf Chain'],
    shortBio: 'Our founding secondary-school chapter, hosting fortnightly close-reading sessions and annual debates.',
    fullBio: 'Founded in autumn 2023, the London & Westminster Student Chapter convenes 28 sixth-form critics every second Friday to dissect poems, novellas, and essays from The Annotator’s Guide.',
    publishedArticleIds: []
  }
];

export interface GetInvolvedTrack {
  id: string;
  number: string;
  title: string;
  category: string;
  commitment: string;
  summary: string;
  requirements: string[];
  formPromptLabel: string;
  formPlaceholder: string;
}

export const GET_INVOLVED_TRACKS: GetInvolvedTrack[] = [
  {
    id: 'submit-article',
    number: '01',
    title: 'Submitting Articles & Literary Reviews',
    category: 'Editorial Submissions',
    commitment: 'Per Essay / Pitch (1,500 – 4,000 words)',
    summary: 'Pitch or submit a completed essay, book review, comparative study, or close reading for any of our 18 editorial series in The Journal.',
    requirements: [
      'A 250-word pitch or completed draft grounded in close textual analysis.',
      'Specify which of the 18 Vellune editorial series best fits your piece.',
      'Include a short 100-word critical sample demonstrating your prose style.'
    ],
    formPromptLabel: 'Proposed Title, Target Series & 250-Word Pitch / Abstract',
    formPlaceholder: 'Provide your working title, preferred editorial series (e.g., The Second Reading, Literary Question), the primary texts examined, and your core argument...'
  },
  {
    id: 'join-editorial',
    number: '02',
    title: 'Joining the Editorial Team',
    category: 'Editorial Board & Section Desk Roles',
    commitment: '4–6 hours / week · Remote Global',
    summary: 'Apply to serve as an Associate Editor, Copy Editor, Proofreader, or Series Assistant across our editorial desks.',
    requirements: [
      'Demonstrated ability to edit prose for syntactic clarity and argumentative rigor.',
      'Familiarity with at least two of Vellune’s editorial series.',
      'Sample diagnostic edit or critical writing sample.'
    ],
    formPromptLabel: 'Preferred Desk & Editorial Experience / Statement',
    formPlaceholder: 'Tell us which editorial desk interests you most and share how you approach editing a peer’s critical essay...'
  },
  {
    id: 'become-contributor',
    number: '03',
    title: 'Becoming a Regular Writer or Contributor',
    category: 'Staff Critic Roster',
    commitment: '1 commissioned essay or review per quarter',
    summary: 'Join Vellune’s roster of regular contributors to receive review copies, commissioned essay assignments, and symposium invitations.',
    requirements: [
      'Two short critical writing samples or one published/seminar essay.',
      'List of your primary literary periods, genres, and reading languages.'
    ],
    formPromptLabel: 'Literary Interests, Languages Read & Critical Background',
    formPlaceholder: 'Describe the periods, authors, or critical questions you are most eager to write about...'
  },
  {
    id: 'apply-young-critics',
    number: '04',
    title: 'Applying for the Young Critics Programme',
    category: '12-Week Mentorship Cohort',
    commitment: 'Bi-weekly seminars + 1 mentored long-form essay',
    summary: 'Apply for our flagship 12-week mentorship cohort pairing emerging writers (ages 15–23) with senior Vellune editors.',
    requirements: [
      'Open to students and emerging writers aged 15–23 worldwide.',
      'A 400-word close reading of a single paragraph or poem of your choice.'
    ],
    formPromptLabel: '400-Word Close-Reading Sample & Proposed Mentorship Topic',
    formPlaceholder: 'Paste a brief close reading of a passage of your choice and describe what you hope to explore during the 12-week cohort...'
  },
  {
    id: 'join-school-chapter',
    number: '05',
    title: 'Joining an Existing School Chapter',
    category: 'Student Society Membership',
    commitment: 'Fortnightly seminar meetings',
    summary: 'Connect with an active Vellune School or Regional Chapter in your city or join our global online chapter commons.',
    requirements: [
      'Current secondary school, sixth-form, or undergraduate student.',
      'Commitment to reading the monthly 10-page extract packet prior to meetings.'
    ],
    formPromptLabel: 'Your School / City & Literary Interests',
    formPlaceholder: 'Let us know your school, city, and whether you wish to join a local chapter or the Global Online Chapter Commons...'
  },
  {
    id: 'start-school-chapter',
    number: '06',
    title: 'Starting a New School Chapter',
    category: 'Chapter Charter Application',
    commitment: 'Chapter President / Coordinator Role',
    summary: 'Charter an official Vellune Chapter at your school or university. Receive our full starter kit, monthly seminar folios, and speaker support.',
    requirements: [
      'At least 5 founding student members and 1 supporting teacher or librarian advisor.',
      'Commitment to hosting at least two close-reading circles per term.'
    ],
    formPromptLabel: 'Institution Name, Founding Team & Proposed First Seminar Text',
    formPlaceholder: 'Share your school/university name, city, number of founding students, and the first text your chapter hopes to read together...'
  },
  {
    id: 'participate-events',
    number: '07',
    title: 'Participating in Events & Open Pages',
    category: 'Colloquia, Debates & Readings',
    commitment: 'Per Session / Seasonal Symposium',
    summary: 'Propose a 5-minute close reading for Open Pages, volunteer as a debater in Literary Debates, or register for upcoming seminars.',
    requirements: [
      'Open to all readers and students.',
      'For Open Pages or Debates, provide a 150-word abstract of your position.'
    ],
    formPromptLabel: 'Event Format of Interest & Proposed Contribution',
    formPlaceholder: 'Indicate which event series (Open Pages, Literary Debates, Reading Circle) you wish to participate in...'
  },
  {
    id: 'propose-collaboration',
    number: '08',
    title: 'Proposing Institutional Collaborations',
    category: 'Presses, Libraries, Schools & Festivals',
    commitment: 'Custom Partnership',
    summary: 'Partner with Vellune for joint essay prizes, translation workshops, library book grants, or festival panels.',
    requirements: [
      'Open to literary journals, independent publishers, school departments, and cultural organizations.'
    ],
    formPromptLabel: 'Organization Name & Collaboration Proposal',
    formPlaceholder: 'Outline your organization and how we might collaborate on events, publications, or educational outreach...'
  },
  {
    id: 'volunteering',
    number: '09',
    title: 'Volunteering & Archival Support',
    category: 'Community & Digital Archive',
    commitment: '2–3 hours / week · Flexible',
    summary: 'Assist with event moderation, transcript preparation, bibliographic indexing for the Reading Room, or Pages for All book distribution.',
    requirements: [
      'Careful attention to bibliographic detail and love of literary community.'
    ],
    formPromptLabel: 'Areas Where You Would Like to Volunteer',
    formPlaceholder: 'Tell us whether you are interested in archival transcription, bibliography curation, event hosting, or outreach...'
  }
];
