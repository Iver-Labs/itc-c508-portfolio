<!--
  HOW TO EDIT THIS FILE
  =====================
  This is the ONE file you edit to update your name, photos/screenshots, and
  report titles/content across the whole site.

  Rules:
  - Don't rename anything before the colon (e.g. "Name:", "Title:") — the
    site's code looks for those exact labels.
  - Don't rename the "## prelims-01" style headings — they must keep matching
    the report filenames in the reports/ folder.
  - Write your value right after the colon. Long values (Description,
    Reflection) can continue on the next line(s) as long as those lines are
    indented — just keep typing, a blank line ends the value.
  - For every "Photo / Screenshot / Image" field: paste a path to an image
    file, e.g. images/profile.jpg (put the actual image file in the images/
    folder first). Leave it blank to keep the current placeholder box.
  - Save the file, then refresh the site in your browser to see the change.
    (You must be viewing the site via a local server, e.g. VS Code's "Live
    Server", not by double-clicking the .html files — see README/spec notes.)
-->

# Profile
- Name: Iverson Labastida
- GitHub Username: Iver-Labs
- Photo: images/profile.jpg
- Snapshot 1: images/about-snapshot-1.png
- Snapshot 2: images/hayler-se-core.jpg
- Snapshot 3: images/hayler-se-telemetry.jpg

# Home Hero Images
- Image 1: images/hayler-se-workstation.jpg
- Image 2: images/hayler-se-core.jpg
- Image 3: images/hayler-se-telemetry.jpg

# Prelims

## prelims-01
- Activity Number: Activity 01
- Week: Week 2
- Title: WW-P2: Introduction to NLP Concepts
- Description: Completed Microsoft Learn's "Introduction to natural language
  processing concepts" module and tested three NLP tools hands-on: a local
  summarization model, a language detector and a PII analyzer. The IEEE-format
  reflection compares tokenization, TF-IDF and embeddings and documents where
  each tool broke.
- Tags: Python, NumPy
- Screenshot 1: images/week_2_thumbnail.png
- Screenshot 2: images/about-snapshot-1.png
- Reflection: Tokenization granularity turned out to be a real design
  trade-off — word-level tokens stay interpretable but choke on rare or
  out-of-vocabulary terms, character-level tokens handle anything but
  inflate sequence length and compute cost, and sub-word tokenization is the
  practical middle ground. Comparing representations hands-on also clarified
  when each is worth its cost: TF-IDF is a sparse, interpretable, cheap
  baseline good for keyword-driven tasks but blind to semantics; static
  embeddings add dense semantic structure that supports similarity search;
  and transformer-style contextual embeddings refine token meaning using
  surrounding context, which matters once disambiguation and nuance are in
  play. The tools reinforced this from the failure side: the Phi-3.5-mini
  summarizer ran well locally but occasionally dropped nuanced content, the
  language-detection playground misfired on short or mixed-language input,
  and the hybrid generative-plus-pattern-matching PII analyzer produced both
  false positives and false negatives on nonstandard formats — a reminder
  that production-grade text analytics needs deterministic validation and
  human review layered on top of a model's raw output, not just a bigger
  model.

## prelims-02
- Activity Number: Activity 02
- Week: Week 3
- Title: PT-P1: Deep Learning (Neural Networks)
- Description: Built a three-class intent classifier for ride-hailing customer
  feedback on the no-code Machine Learning for Kids platform, tested it on 35
  phrases it had never seen, then connected it to a working MIT App Inventor
  chat app.
- Tags: Machine Learning for Kids, No-Code ML
- Screenshot 1: images/week_3_snapshot.png
- Screenshot 2:
- Reflection: Working through this without writing code still required real
  design thinking — explicit IF/ELSE keyword rules break down on natural
  language because the same intent can be phrased endless ways, keywords
  can't disambiguate context (e.g. "great" as praise vs. sarcasm), and the
  rule set would grow unmanageably as new phrasing appeared; a trained model
  instead learns statistical word-to-label associations directly from tagged
  examples and generalizes to unseen phrasing by similarity. Dataset size
  and diversity per class had a measurable effect: classes with fewer or
  narrower examples produced less stable, lower-confidence predictions,
  while broader phrasing per class improved both accuracy and confidence
  consistency. Tracing the platform's three stages also pinned down exactly
  where feature extraction happens — during the Learn & Test stage's "Train"
  step, where raw tagged text is first converted into numerical tokens
  before any weight updates occur, acting as the translation layer between
  human language (Train stage) and the trained model's numerical inference
  (Make stage). The main failure mode across testing was sarcasm and
  out-of-vocabulary phrasing, which the classifier consistently misread — a
  reminder that a model is only as good as the patterns present in its
  training examples.

## prelims-03
- Activity Number: Activity 03
- Week: Week 4
- Title: PT-P2: Neural Network Training (Hyperparameters)
- Description: Trained a Keras feedforward network on a ride-hailing text
  dataset across 20 logged runs, using training and validation loss curves to
  diagnose overfitting and underfitting. Growing the dataset mattered more than
  any single hyperparameter; dropout then stabilized the final model.
- Tags: TensorFlow, Keras
- Screenshot 1: images/prelims-03-screenshot-1.png
- Screenshot 2: images/prelims-03-training-loop.png
- Reflection: Training on just 35 rows caused outright memorization — by
  epoch 30, training loss collapsed to 0.0291 while validation loss climbed
  to 1.5693 (a 1.54 generalization gap), capping validation accuracy at 20%,
  and reducing hidden-layer width on its own couldn't fix it. Expanding the
  dataset to 500 rows was the actual fix, lifting validation accuracy to
  85–86% and shrinking the generalization gap below 0.3. From there, tuning
  the learning rate down to 0.0003 with a smaller hidden layer (12 units)
  stabilized convergence; scaling epochs upward revealed a plateau around
  epoch 60 before overfitting crept back in at epoch 70; and adding 0.30
  dropout in the final run eliminated that late-epoch divergence, closing at
  a validation loss of 0.3586 and F1 of 0.8275. Having this level of
  code-level control — inspecting loss curves epoch-by-epoch, choosing the
  optimizer, tuning gradient-level hyperparameters — gave diagnostic
  visibility that the no-code baseline's black-box heuristics never offered,
  even though that baseline's raw accuracy was still slightly higher.


# Midterms

## midterms-01
- Activity Number: Activity 01
- Week: Week 7
- Title: Text Preprocessing & Word Embeddings
- Description: Cleaned and tokenized a raw text corpus, then trained Word2Vec
  embeddings to explore semantic similarity between words in the vector space.
- Tags: Python, Gensim
- Screenshot 1:
- Screenshot 2:
<!-- TODO: replace with your reflection — what you learned, what was
     difficult, or what you'd do differently. -->
- Reflection: Reflection coming soon.

## midterms-02
- Activity Number: Activity 02
- Week: Week 9
- Title: Sentiment Classification with an LSTM
- Description: Trained a recurrent network with LSTM cells to classify movie
  review sentiment, comparing performance against a plain feedforward baseline
  on the same embeddings.
- Tags: TensorFlow, LSTM
- Screenshot 1:
- Screenshot 2:
<!-- TODO: replace with your reflection — what you learned, what was
     difficult, or what you'd do differently. -->
- Reflection: Reflection coming soon.

# Finals

## finals-01
- Activity Number: Activity 01
- Week: Week 12
- Title: PT-F1: Optimizing Chunk Size and Overlap
- Description: Built and audited a two-component Retrieval-Augmented Generation
  (RAG) document-indexing and question-answering pipeline in Google Colab over
  the 12-page AlalayOFW Source B compilation of Department of Migrant Workers
  (DMW) and POEA advisories (95 passages). The pipeline slices each page into
  1,000-character chunks with 200-character overlap (50 chunks total), exports
  an Excel inspection workbook, indexes 384-dimensional MiniLM embeddings in
  FAISS, and evaluates grounded generation with 4-bit quantized
  Llama-SEA-LION-v3-8B-IT across bilingual and multi-hop legal test questions.
- Tags: FAISS, MiniLM, SEA-LION, RAG
- Screenshot 1: images/finals-01-screenshot-1.svg
- Screenshot 2: images/finals-01-screenshot-2.svg
- Reflection: Working through Component I of the notebook taught me what
  actually happens between uploading a raw PDF and turning it into searchable
  knowledge. Before a language model can read a document, pypdf has to extract
  the text layer page by page, and regular-expression cleanup is needed to
  collapse messy line breaks, tabs, and extra spaces into clean, continuous
  sentences—while also checking that the file is not just a scanned image that
  would require Optical Character Recognition (OCR). From there, I learned how
  sliding-window chunking balances context and precision through two settings:
  chunk size and chunk overlap. Because the splitter cuts purely by character
  count rather than grammar, a fixed window can easily slice a sentence or a
  legal rule right down the middle. Setting a 200-character overlap solves this
  by repeating the ending of one chunk at the beginning of the next chunk on the
  same page, acting as a bridge so the full thought stays intact in at least one
  chunk. Exporting all 50 chunks into a formatted Excel workbook with pandas and
  openpyxl (complete with frozen headers and filter drop-downs) showed me why
  manual inspection is so important: I could see how the overlap kept
  multi-sentence POEA advisories together in Q07 and Q10, while also spotting
  where a wide 1,000-character window bundled too many separate checklist tips
  into one chunk (Q06) or left behind tiny, repetitive tail fragments at the
  very end of a page. || The second major group of concepts I learned centered
  on how dense embeddings and FAISS vector indexing turn text search into
  meaning search. Instead of looking for exact word matches like a standard
  search bar, the SentenceTransformer model (all-MiniLM-L6-v2) converts each
  chunk into a 384-dimensional vector where passages with similar meanings point
  in similar directions—which is why even our Tagalog question in Q04 matched
  the right Filipino passage so accurately. Going through the notebook's code
  explanations also revealed a crucial hidden constraint: MiniLM only reads up
  to 256 word-piece tokens per chunk and silently ignores anything past that
  limit, meaning that if we set our chunk size too large, the tail end of a
  chunk is never even represented in its embedding vector. I also learned why
  the pipeline normalizes embeddings to unit length and converts them to 32-bit
  floats before adding them to faiss.IndexFlatIP: normalizing puts every vector
  on the same scale so inner-product search measures pure semantic angle (cosine
  similarity) without favoring longer chunks. Just as importantly, because FAISS
  only stores numbers and returns integer row positions, we have to maintain a
  chunk lookup dictionary and serialize the index, chunk metadata, and
  configuration settings together using pickle so our retrieval results can be
  mapped back to actual page numbers and text across sessions. || In Component
  II, I learned that retrieval is only half the battle—how we prioritize,
  budget, and format the prompt determines whether the language model succeeds
  or fails. Testing retrieval on its own before involving the LLM made it clear
  that a generator is completely bound by what top_k retrieval brings back: if
  the right chunk does not make the top three results, the model has no way to
  answer accurately from the document. Once chunks are retrieved, token-limited
  prompt construction prevents silent errors. Language models read sub-word
  tokens rather than characters, and every model has a strict input token
  ceiling. Instead of dumping all retrieved text into a prompt and letting the
  tokenizer blindly chop off the bottom, the notebook taught me how to keep the
  user's question and grounding instructions safe at the top of the prompt,
  reserve a small token safety margin for special end-of-sequence tokens, and
  pack the highest-scoring chunks into the remaining budget one by one—trimming
  only at clean token boundaries if space runs out. Pairing that structured
  prompt with strict anti-hallucination instructions (telling the model to match
  people and departments only to explicitly stated roles and refuse to guess)
  and deterministic generation (switching the model to evaluation mode,
  disabling gradient tracking to save memory, and using beam search instead of
  random sampling) ensures that the system gives repeatable, evidence-backed
  answers. || Finally, comparing the notebook's baseline google/flan-t5-base
  model against our Step 4 evaluation with Llama-SEA-LION-v3-8B-IT showed me how
  all of these technical concepts must work together when tuning a RAG pipeline.
  Under a smaller encoder–decoder model like FLAN-T5, a 512-token input limit is
  too tight to hold three 1,000-character chunks at once, and a 32-token output
  limit cuts off detailed legal answers. By using 4-bit quantization
  (bitsandbytes NF4) on a Tesla T4 GPU, we were able to fit an
  8-billion-parameter Southeast Asian instruction-tuned model into memory and
  expand the input budget to 2,048 tokens and the output cap to 256 tokens,
  allowing all three retrieved chunks to fit without any truncation and enabling
  natural bilingual responses in both English and Filipino. At the same time,
  the remaining misses in Q06 and Q12 taught me what each parameter adjustment
  actually fixes: tightening chunk size (or splitting by section headers) stops
  individual tips from getting lost inside crowded chunks; stopping the
  page-chunking window once it reaches the end of a page removes duplicate tail
  fragments that distract the retriever; and raising top_k gives multi-part
  questions enough slots to gather facts spread across multiple pages.
  Understanding the role of every step in the notebook gave me the practical
  foundation to tune our AlalayOFW system with confidence.

## finals-02
- Activity Number: Activity 02
- Week: Week 14
- Title: PT-F2: Experimenting to Determine the Best Chunk Size and Overlap
- Description: Conducted a controlled 12-configuration retrieval experiment over
  the 12-page bilingual DMW/POEA anti-illegal recruitment compilation (95
  passages, 25 sections), crossing chunk sizes of 300, 500, 750, and 1,000
  characters with relative overlaps of 0%, 10%, and 20% in newly built FAISS
  IndexFlatIP stores using all-MiniLM-L6-v2 embeddings. Evaluated across 12
  verified questions (20 evidence units) using Precision@3, Recall@3, MRR@3, and
  efficiency benchmarks, identifying C11 (1,000-character chunks, 100-character
  overlap) as the most balanced configuration—surpassing the Part 1 baseline
  (1,000/200) on every metric while indexing fewer chunks.
- Tags: FAISS, MiniLM, Precision@3, Recall@3, MRR@3
- Screenshot 1: images/finals-02-screenshot-1.svg
- Screenshot 2: images/finals-02-screenshot-2.svg
- Reflection: Working through the PT-F2 experiment notebook taught me how to
  turn chunking from guesswork into a controlled scientific test. In Part 1 we
  only saw how one baseline configuration behaved, so in Part 2 I learned why
  every other variable had to be locked down: extracting the 12 PDF pages once,
  encoding the 12 test questions into query vectors a single time, keeping the
  embedding model and retrieval depth fixed at three chunks, and building a
  brand-new FAISS index from scratch for each of the 12 configurations. Defining
  overlap as a percentage of chunk size rather than a fixed number of characters
  was another important concept, because it let us compare small and large
  chunks at the exact same relative overlap. Just as importantly, setting up the
  ground truth around 20 verifiable evidence units—each requiring both the
  correct source page and an exact check phrase cleaned for Unicode quotes,
  case, and spacing—showed me how automated scoring avoids rewarding chunks that
  merely mention a related topic or a look-alike scam. Auditing all 432
  retrieval rows in Table C also taught me how boundary cuts interact with
  strict phrase matching: when five chunks contained the actual answer right at
  the edge of a window but clipped the end of the check phrase, recording
  transparent manual overrides with written justifications kept the evaluation
  fair and reproducible across every configuration. || The second major group of
  concepts I learned came from seeing why both small chunks and heavy overlap
  failed in ways I did not initially expect. Before running the grid, it seemed
  natural to assume that smaller 300-character chunks would pinpoint single
  facts more accurately and that 20% overlap would always be safer than 0% or
  10% overlap. Instead, the 300-character configurations performed worst on
  every metric because they broke the link between section headings and the
  facts written underneath them: on Q02, the retriever found the chunk holding
  the heading for the Pre-Employment Overseas Seminar (PEOS), but the phrase
  stating that it has eight modules sat roughly 400 characters further down in a
  separate chunk that lacked the heading's keywords, whereas every chunk size of
  500 characters or larger kept the heading and module count together. At the
  same time, comparing 0%, 10%, and 20% overlap revealed why excessive overlap
  hurts ranking quality: at 20% overlap, Mean Reciprocal Rank was lower than at
  0% overlap for every single chunk size while inflating the number of stored
  vectors by up to 24%. Inspecting the retrieved chunks showed what happens
  behind the scenes—when consecutive chunks share too much repeated text,
  near-duplicate neighbors compete for the same three retrieval slots and crowd
  out the second or third distinct passage a multi-part question needs. ||
  Third, analyzing the results across Table A, Table B, and the efficiency logs
  taught me what each retrieval metric actually measures and why no single
  number is enough on its own. Because most of our questions only need one or
  two passages to be answered completely, at most one or two of the three
  retrieved chunks can ever be relevant at once, which explains why Precision@3
  topped out around one-third across the entire study. Comparing Recall@3 (how
  many of the required facts were found in the top three) against MRR@3 (how
  high up the first relevant chunk ranked) exposed real trade-offs between
  configurations: for example, C9 (750 characters with 150 overlap) tied for the
  highest recall but dropped to eighth place in MRR@3 because its relevant
  chunks appeared lower down in the ranking, while C4 and C7 placed relevant
  chunks at Rank #1 more often but missed more facts overall. Pairing those
  quality scores with efficiency diagnostics in Step 8 also highlighted a
  critical hardware and model concept: while smaller chunks multiply index
  storage size and embedding time linearly, making chunks too large runs into
  the embedding model's 256-token reading limit. At 1,000 characters, between
  4.0% and 6.8% of the chunks already exceeded 256 tokens, meaning
  all-MiniLM-L6-v2 silently truncated their trailing words before computing the
  vector—proving why testing chunk sizes above 1,000 characters would
  increasingly blind the retriever to text at the end of a chunk. || Finally,
  bringing all of these findings together showed me both why C11
  (1,000-character chunks with 100-character overlap) is the best choice for our
  document and where chunk tuning reaches its natural ceiling. Reducing overlap
  from the Part 1 baseline's 200 characters down to 100 characters kept headings
  and paragraphs intact while cutting down neighbor duplication, which allowed
  C11 to recover both placement-fee tips on Q06, achieve 100% recall on Average
  questions, lead the entire study on Difficult-question recall (including
  finding two of the three passages on Q11), and rank in the top four on all
  three metrics while storing fewer vectors. Compared with C10 (1,000 characters
  with zero overlap), keeping a 10% overlap bridge prevented Difficult-question
  recall from collapsing. Even so, the persistent failures on Q09—where every
  configuration reached the right pages but retrieved look-alike scam paragraphs
  instead of the exact peso amounts—and on Q04—where the Filipino question
  failed in half the configurations because all-MiniLM-L6-v2 was trained
  primarily on English—taught me an essential engineering lesson for our
  AlalayOFW project: chunk size and overlap can fix context fragmentation and
  slot duplication, but solving look-alike disambiguation and cross-lingual
  retrieval requires upgrading the retriever itself with a multilingual
  embedding model, sentence-aware boundaries, and a slightly larger retrieval
  depth.

## finals-03
- Activity Number: Activity 03
- Week: Week 15
- Title: WW-F1 & WW-F2: RAG Optimization and GPU Benchmarking
- Description: Optimized and benchmarked AlalayOFW, our group's trilingual
  (English, Tagalog, and Taglish) RAG assistant designed to help aspiring
  Overseas Filipino Workers verify licensed recruitment agencies and answer
  pre-departure orientation questions. Combining an 18-page POEA PEOS prose PDF
  with a 335-page PDF of 3,792 DMW agency records inside a single Chroma vector
  store powered by all-MiniLM-L6-v2 and Llama-SEA-LION-v3-8B-IT, we evaluated
  15 parameter and prompt configurations in Part A and measured Google Colab CPU
  versus Tesla T4 GPU execution times in Part B.
- Tags: Chroma, SEA-LION v3-8B, GPU Benchmark, AlalayOFW, Trilingual RAG
- Screenshot 1: images/finals-03-screenshot-1.svg
- Screenshot 2: images/finals-03-screenshot-2.svg
- Reflection: Working through this combined WW-F1 and WW-F2 experiment taught me
  what actually happens when a RAG system has to serve two completely different
  document formats inside the same knowledge base. In our earlier exercises,
  every source followed one style, whereas AlalayOFW combines the 18-page POEA
  Pre-Employment Orientation Seminar prose module with a 335-page registry of
  3,792 structured DMW agency records. Seeing how PyPDFLoader extracts the PEOS
  module with a line break after almost every single word explained why nominal
  character counts can be misleading: a 400-character PEOS chunk held only
  twenty to thirty real words, which cut the Overseas Employment Certificate
  rule right before its two-month validity period and caused the model to guess
  "6 na buwan" in Tagalog. At the same time, shrinking DMW chunks to 500
  characters in Run I helped retrieve 101 MOJO for the first time, yet sliced
  other 450-character agency entries right down the middle before their
  expiration date, pushing the model to invent fake validity dates. Meanwhile,
  widening chunks to 1,200 characters in Run C helped multi-sentence PEOS
  answers but blended roughly three separate agencies into one embedding vector,
  causing licensing accuracy to drop sharply. Even more surprising was Run D,
  where raising overlap from 100 to 200 characters added 308 near-duplicate
  chunks that crowded the top three retrieval slots with repeats and dragged
  correctness down to near zero. || Inspecting how Chroma and all-MiniLM-L6-v2
  behaved across Sections 4, 5, and 10 of the notebook gave me a much clearer
  mental model of shared vector indexing and multilingual retrieval. Keeping
  both PDFs inside one Chroma collection while tuning per-file chunk settings
  in SOURCE_SETTINGS revealed an unexpected coupling: even when we left the PEOS
  chunks untouched and only shrunk the DMW chunk size in Run H, a Taglish PEOS
  question suddenly dropped because the newly shaped DMW vectors shifted in
  similarity and outranked the true PEOS page inside the shared index. I also
  discovered two practical engineering quirks from debugging the notebook cells
  directly. First, rebuilding Chroma twice in a single Colab session crashed
  until we added SharedSystemClient.clear_system_cache() to close the cached
  database client before deleting the folder. Second, analyzing our 18
  trilingual test versions exposed the limitations of an English-centric
  embedder: Taglish queries still retrieved the right passages whenever they
  kept English terms like "placement fee" or "licensed," whereas pure Tagalog
  questions regularly drifted toward DMW records on PEOS topics, and short
  unique agency names like 101 MOJO proved hard for pure semantic similarity to
  match without exact keyword or fuzzy lookup. || In Part B, benchmarking the
  exact same pipeline on Colab's CPU runtime versus a Tesla T4 GPU showed me the
  critical difference between hardware bottlenecks across the RAG stages.
  Separating Section 4 (loading and chunking PDFs) from Section 5 (encoding
  chunks into embeddings) proved that document parsing runs at essentially the
  same speed on both devices because reading PDFs and splitting strings are
  CPU-bound work. By contrast, turning chunks into dense vectors with
  all-MiniLM-L6-v2 accelerated dramatically on the GPU—cutting indexing from
  several minutes down to around fifteen seconds—while answer generation exposed
  an outright memory wall. Because BitsAndBytesConfig 4-bit quantization
  requires CUDA, the CPU runtime was forced to load Llama-SEA-LION-v3-8B-IT in
  unquantized 16-bit precision, which requires more memory than the CPU
  runtime's 13.6 GB of RAM. As a result, Transformers split the model and
  offloaded 24 of its 36 parts onto disk, starving inference so severely that
  not a single CPU run finished even one question before hitting our 600-second
  timeout guard. On the Tesla T4 GPU, the 4-bit model fit cleanly in memory and
  answered each query in roughly eleven seconds—making the GPU essential for
  usability rather than just a convenience. || Finally, combining the parameter
  sweep, prompt engineering in Section 10.4, and hardware telemetry showed me
  how every adjustment works together to build a trustworthy system for real
  Filipino jobseekers. Raising TOP_K from three to five in Runs E and N*
  increased raw recall on paper, yet actually lowered answer accuracy and slowed
  down generation because the extra slots brought in unrelated agency records
  that distracted the model. Keeping 800/100 with TOP_K = 3 on the T4 GPU
  preserved consistent top-rank retrieval across repetitions, and layering our
  stricter system prompt on top—explicitly telling the model to inspect the
  Currently Valid: field, never combine fields from separate records, and state
  clearly when a record is missing instead of guessing "not licensed"—cut
  generation time more than in half while eliminating unsupported verdicts.
  Looking ahead to our capstone deployment of AlalayOFW, these findings give us
  a concrete roadmap: clean the word-per-line breaks in the PEOS PDF before
  chunking, separate structured agency verification into a hybrid
  keyword-plus-vector search index, swap in a multilingual embedding model so
  pure Tagalog questions retrieve accurately, and use greedy decoding during
  automated benchmarks so sampling noise never obscures real improvements.

## finals-04
- Activity Number: Activity 04
- Week: Week 18
- Title: P-F1: Individual ePortfolio Completion & AlalayOFW Project Reflection
- Description: For P-F1 (Individual ePortfolio Completion and Final Project
  Learning Reflection), Group DaBig3 completed the end-to-end development,
  empirical evaluation, and public cloud deployment of AlalayOFW—a trilingual
  Retrieval-Augmented Generation (RAG) assistant that helps Overseas Filipino
  Workers (OFWs) verify recruitment agency licensing from the 3,792-record
  Department of Migrant Workers (DMW) directory and answer pre-departure policy
  questions from the Pre-Employment Orientation Seminar (PEOS) module across
  English, Tagalog, and Taglish. Across our seven final deliverables (D1–D7),
  systematic pipeline engineering raised end-to-end correctness from 54.5% in
  the raw baseline (R0) to 97.0% (32/33) in the final notebook configuration
  (R6 / FINAL). As Website Programmer, Architecture Designer, and Deployment
  Lead in our Member Responsibility Matrix (D6), I designed the single-container
  Google Cloud Run architecture, built the Next.js 16 DMW Info Demo web
  application and GitHub repository (https://github.com/Iver-Labs/dmw-demo),
  implemented a 7-test automated configuration parity suite, executed the
  33-question Playwright live evaluation (achieving 33/33 or 100% live
  correctness at 2.44 s mean browser latency), and authored the AlalayOFW
  Deployment, Integration and Parity Report alongside IEEE Section V.
- Tags: Cloud Run, Next.js 16, Hybrid RRF, ONNX e5-small, SEA-LION 70B, AlalayOFW
- Screenshot 1: images/finals-04-screenshot-1.svg
- Screenshot 2: images/finals-04-screenshot-2.svg
- Reflection: Taking ownership of the web architecture, RAG integration, and
  cloud deployment for AlalayOFW taught me that turning a research notebook into
  a real public application starts with respecting the structure of the
  underlying documents and the safety needs of the end users. Early in our
  project, I saw how our baseline pipeline struggled whenever the Pre-Employment
  Orientation Seminar prose and the Department of Migrant Workers recruitment
  agency directory were sliced with the same uniform character splitter, because
  cutting across agency rows merged fragments of different companies into a
  single vector while applying overlap created hundreds of near-duplicate
  directory chunks. Working with my teammates to separate those two data
  sources—keeping every single one of the 3,792 recruitment agency records
  intact as its own self-contained chunk while applying text cleaning and
  sliding-window chunking only to the 57 narrative orientation passages—showed
  me why data representation must match document structure before any web
  integration begins. When I designed the Next.js 16 DMW Info Demo platform and
  baked that exact 3,849-chunk index directly into our container image, I also
  learned that deploying civic-facing AI for Overseas Filipino Workers carries
  real ethical design responsibilities: adding a permanent unofficial demo
  banner linking to the official government portal, stripping official seals,
  marking every page so search engines do not index it, rate-limiting requests,
  and enforcing a strict privacy rule so the chatbot never asks for passport or
  Overseas Employment Certificate numbers are just as critical as retrieval
  accuracy. || The second major group of concepts I learned centered on porting
  a hybrid retrieval pipeline across programming languages and proving zero
  configuration drift between Python research code and a TypeScript production
  server. While implementing the retrieval engine inside our GitHub repository,
  I learned how dense semantic embeddings and lexical keyword search solve
  complementary failure modes: our multilingual embedding model maps English,
  Tagalog, and Taglish phrasings into a shared 384-dimensional space when given
  proper query and passage prefixes, while BM25 lexical scoring excels at
  pinpointing rare, exact agency names and license numbers that dense vectors
  often smooth over. Combining the top twenty candidates from both retrievers
  through Reciprocal Rank Fusion allowed our system to reach perfect agency
  recall across all three languages without requiring fragile score calibration
  between cosine similarity and keyword weights. More importantly, building the
  seven automated parity tests taught me how easily a web deployment can
  silently diverge from a notebook if a tokenizer splits punctuation differently
  or a parameter changes; writing unit tests that verify the exact system
  prompt, chunk count, embedding prefixes, tokenizer rules, and BM25 numerical
  scores against the Python reference library gave me a repeatable engineering
  workflow for guaranteeing that what we evaluated in research is truly what
  runs in production. || In leading the live website evaluation and authoring
  both the deployment deliverables report and Section V of our IEEE paper, I
  learned how to audit end-to-end system behavior under real browser conditions
  and diagnose subtle runtime differences. By building an automated Playwright
  testing harness that launched a fresh headless browser session for each of the
  33 trilingual evaluation questions and captured 39 full and cropped evidence
  screenshots, I was able to measure realistic user-facing latency alongside
  factual correctness and source support. Investigating the five questions where
  the live website retrieved a slightly different top-three chunk order than the
  final notebook run taught me an eye-opening lesson about cross-platform
  machine learning deployment: even when every hyperparameter and index file is
  proven identical by automated tests, tiny floating-point differences between a
  Python GPU embedding runtime and a CPU ONNX runtime can nudge nearly tied
  similarity scores across rank boundaries. Seeing that shift promote the
  relevant orientation passage to the top rank on our hardest Tagalog
  license-verification question—turning the notebook's sole fallback refusal
  into a correct answer and achieving 33 out of 33 on the live site—reinforced
  why empirical parity auditing and prompt-driven fallback rules are far more
  reliable than arbitrary similarity score thresholds when protecting users from
  hallucinated legal or financial advice. || Finally, collaborating with Antonio
  Lontoc and Isabela Loraine Reyes across our seven project deliverables
  reshaped how I view both full-stack AI engineering and team accountability.
  Our stage-by-stage ablation results gave me a permanent engineering takeaway:
  swapping an eight-billion-parameter language model for a
  seventy-billion-parameter model while keeping broken retrieval left our
  accuracy virtually unchanged at just over fifty percent, whereas fixing
  document boundaries, adding hybrid retrieval, and switching to a compact
  multilingual embedding model drove correctness to ninety-seven percent in the
  notebook and one hundred percent on our deployed website. On a personal level,
  owning the cloud deployment pipeline—from containerizing the ONNX embedding
  model and configuring Google Cloud Build and Artifact Registry to injecting
  API credentials securely through Secret Manager—gave me hands-on confidence in
  shipping serverless AI systems that scale to zero cost when idle. Working
  under a clear Member Responsibility Matrix where Antonio led the notebook
  architecture and experiment checkpoints, Isabela designed the trilingual
  evaluation rubric and chunking workbooks, and I owned the web platform,
  repository, and parity verification showed me how disciplined handoffs and
  honest scientific reporting turn an ambitious classroom concept into a
  cohesive, trustworthy capstone product.
