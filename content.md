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
- Snapshot 2:
- Snapshot 3:

# Home Hero Images
- Image 1: images/Pasted image 20260915084651.png
- Image 2: 
- Image 3:

# Prelims

## prelims-01
- Activity Number: Activity 01
- Week: Week 2
- Title: WW-P2 : Introduction to NLP Concepts
- Description: Completed Microsoft Learn's "Introduction to NLP Concepts"
  module (assessment passed), studying the text-processing pipeline behind
  modern NLP systems — word/sub-word/character tokenization, frequency-based
  statistical weighting (TF-IDF), and vector-space semantic models ranging
  from static embeddings to transformer-based contextual embeddings — then
  applied these concepts hands-on through a Phi-3.5-mini-powered
  summarization tool, a language-identification playground, and a hybrid
  pattern-matching PII extractor.
- Tags: Python, NumPy
- Screenshot 1:
- Screenshot 2:
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
- Title: Exercise PT-P1: Deep Learning (Neural Networks)
- Description: Built a three-class no-code neural network text classifier
  (Positive Review, Negative Review, Urgent Support) on the Machine Learning
  for Kids platform, training it through the platform's Train → Learn & Test
  → Make pipeline on 35 tagged examples (10 Positive, 15 Negative, 10
  Urgent), then evaluated the trained model against 35 unseen test phrases
  for a per-class accuracy of 80.0% (Positive), 93.3% (Negative), and 90.0%
  (Urgent) — 88.6% overall.
- Tags: Machine Learning for Kids, No-Code ML
- Screenshot 1:
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
- Title: PT-P2 - Neural Network Training (Hyperparameters)
- Description: Designed and trained a Keras Sequential feedforward network
  (Embedding → GlobalAveragePooling1D → Dense(ReLU) → Dropout →
  Dense(Softmax)) on a tokenized ride-hailing text dataset — vocabulary
  capped at 300 tokens, sequences padded/truncated to length 15 — using a
  70/15/15 train/validation/test split (random_state=42). Ran 20 structured
  experiments (EXP-001–EXP-020), systematically varying hidden-layer width,
  learning rate, epoch count, and dropout rate while reading
  training-vs-validation loss curves to diagnose overfitting and
  underfitting, benchmarked against a 90.8%-accuracy, 88.61%-F1 no-code
  baseline.
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
- Reflection: Reflection pending — add your thoughts on what you learned, what
  was difficult, or what you'd do differently.

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
- Reflection: Reflection pending — add your thoughts on what you learned, what
  was difficult, or what you'd do differently.

# Finals

## finals-01
- Activity Number: Activity 01
- Week: Week 12
- Title: Sequence-to-Sequence Text Summarization
- Description: Built an encoder-decoder model with attention to generate short
  summaries of news articles, evaluating output quality with ROUGE scores
  against reference summaries.
- Tags: TensorFlow, Seq2Seq
- Screenshot 1:
- Screenshot 2:
- Reflection: Reflection pending — add your thoughts on what you learned, what
  was difficult, or what you'd do differently.

## finals-02
- Activity Number: Activity 02
- Week: Week 14
- Title: Fine-Tuning a Transformer for Text Classification
- Description: Fine-tuned a pretrained transformer model on a labeled text
  classification dataset, comparing results against the LSTM baseline from
  Midterms.
- Tags: PyTorch, Transformers
- Screenshot 1:
- Screenshot 2:
- Reflection: Reflection pending — add your thoughts on what you learned, what
  was difficult, or what you'd do differently.
