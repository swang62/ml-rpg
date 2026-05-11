import type { Component } from "solid-js";

const LessonTwoTowerModelsHowTwoTowerArchitectureWorks: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          How Two Tower Architecture Works
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
            <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
              Core Concept
            </div>
            <div style="font-size: 15px; line-height: 1.5">
              Each tower is a neural network that converts raw features into a
              fixed-size vector (64-256 dimensions). The user tower processes
              user features. The item tower processes item features. Both output
              vectors in the same space so their dot product measures affinity.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            What Each Tower Sees
          </p>
          <p style="margin-top: 0">
            The user tower receives everything known about the user at request
            time. This includes static features like user ID (mapped to a
            learnable embedding), demographics, and account age. It also
            includes dynamic features: recent interactions (last 50 items
            viewed, clicked, or purchased), current session context (device,
            location, time of day), and aggregated statistics (average order
            value, purchase frequency).
          </p>
          <p>
            The item tower receives everything known about the item. Item ID
            maps to a learnable embedding that captures collaborative signals
            from training. Content features include title (passed through a text
            encoder), category hierarchy, price range, and item age. Image
            features come from a pre-trained vision model. Behavioral statistics
            include click rate, conversion rate, and return rate from historical
            data.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Inside A Tower
          </p>
          <p style="margin-top: 0">
            A typical tower stacks 2-4 fully connected layers. First, each input
            feature becomes a vector: categorical features like category or
            brand are embedded (learned during training), numerical features
            like price are normalized, and text features are encoded. All these
            vectors are concatenated into one long input vector, often 500-2000
            dimensions.
          </p>
          <p>
            This input passes through dense layers with ReLU activations. Layer
            sizes typically decrease: 1024 -&gt; 512 -&gt; 256 -&gt; 128. The
            final layer has no activation, allowing positive and negative values
            in the output embedding. Batch normalization between layers
            stabilizes training. Dropout (0.1-0.3) prevents overfitting. Total
            parameters per tower: typically 1-10 million.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Computing The Score
          </p>
          <p style="margin-top: 0">
            User-item affinity is the dot product: score = sum(user_vector[i] *
            item_vector[i]) for all dimensions. With 128-dimension vectors, this
            is 128 multiplications and 127 additions. A GPU computes millions of
            these per second. Higher scores mean stronger predicted affinity.
          </p>
          <p>
            Some systems normalize vectors to unit length and use cosine
            similarity instead. This bounds scores between -1 and +1 and ignores
            vector magnitude. The choice matters: dot product lets the model
            learn that some users engage more overall and some items are
            universally popular. Cosine similarity focuses purely on direction,
            which can be better when you want to emphasize relative preferences
            over absolute engagement levels.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>💡 Interview Tip:</strong> When asked "how would you choose
            embedding dimension?", walk through this calculation: 10M items ×
            128 dimensions × 4 bytes = 5GB. Then explain the trade-off: larger
            dimensions capture more nuance but increase storage and latency
            linearly. Start with 64-128, benchmark retrieval recall versus
            latency, and only increase if recall is the bottleneck.
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                User tower input: demographics, last 50 clicks, categories
                browsed, time of day, device. Item tower input: category, tags,
                title words, price, publish date, view count
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Towers compress inputs through layers: 512 → 256 → 128. The
                final 128 numbers are the embedding used for similarity
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                History encoding option 1 - Average pooling: average embeddings
                of last N items. Simple, fast, but treats old clicks same as new
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                History encoding option 2 - Weighted average: learn weights per
                item (today click = 0.7, last month = 0.1). More expressive,
                slightly slower
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                History encoding option 3 - Sequential: process items in order
                to capture patterns like A→B suggests C. Most expressive, 3-5x
                slower than averaging
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Towers MUST stay separate so item embeddings depend only on item
                features. Sharing information would require recomputing 100M
                item embeddings per request
              </span>
            </div>
          </div>
        </div>
        <div class="Learn_examplesSection p-4 mb-4">
          <div class="Learn_examplesHeader mb-3 pb-3">📌 Interview Tips</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">1</span>
              <span class="flex-grow-1 Learn_cardContent">
                When asked about training at scale: explain in-batch negatives
                (using 1023 other items in batch as negatives) as a
                compute-efficient alternative to sampling from the full catalog.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                For interview depth: mention logQ correction at serving time to
                counteract popularity bias introduced during training (subtract
                log of item frequency from scores).
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                When discussing loss functions: explain that softmax over dot
                products teaches the model to score positive items higher than
                negatives in the batch.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonTwoTowerModelsHowTwoTowerArchitectureWorks;
