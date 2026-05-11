import type { Component } from "solid-js";

const LessonCompressionAlgorithmsWhatIsCompressionAndWhyDoesItMatterAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Compression and Why Does It Matter at Scale?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Definition
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Compression</strong> reduces data size by encoding
                information more efficiently. It trades CPU cycles for smaller
                storage and faster network transfers, critical when dealing with
                petabytes of data.
              </div>
            </div>
            <strong>The Core Problem:</strong> At large scale, a single product
            can generate tens of petabytes of logs monthly and serve millions of
            requests per second. Without compression, three things become
            prohibitive: storage costs, replication traffic, and query latency.
            Think of it this way: If you're storing 200 terabytes of raw event
            data per day and replicating it three times for durability, that's
            600 TB daily just for one pipeline. Over a year, you're paying for
            storage and network capacity for 219 petabytes.
            <strong>How Compression Helps:</strong> By shrinking data before
            storage or transmission, you reduce all three bottlenecks. A 4x
            compression ratio turns that 219 petabytes into roughly 55
            petabytes, a massive cost difference.
            <strong>The Three Key Metrics:</strong> Every compression algorithm
            is measured by three dimensions. First,{" "}
            <strong>compression ratio</strong>: original size divided by
            compressed size, typically ranging from 2x to 10x in practice. A 1
            GB file compressed to 250 MB has a 4x ratio. Second,{" "}
            <strong>compression speed</strong>: measured in megabytes per second
            (MB/s) that one CPU core can compress. Third,{" "}
            <strong>decompression speed</strong>: how fast you can expand the
            data back, also in MB/s per core.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Typical Compression Impact
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">2x to 10x</div>
                  <div style="font-size: 10px; font-weight: 600">
                    RATIO RANGE
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">70%</div>
                  <div style="font-size: 10px; font-weight: 600">
                    NETWORK SAVINGS
                  </div>
                </div>
              </div>
            </div>
            The fundamental insight is that compression lets you move the
            bottleneck. If storage and network capacity grow slower than your
            data volume, compression becomes essential infrastructure, not
            optional optimization.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Raw Data: 1 GB</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Original size
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">
                  ↓ Compression
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Compressed: 250 MB</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    4x ratio achieved
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓ Results</div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; font-size: 12px">
                    <strong>75% less storage</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; font-size: 12px">
                    <strong>75% less bandwidth</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Compression ratio divides original size by compressed size,
                  typically achieving 2x to 10x reduction in practice
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Three core metrics define any codec: compression ratio,
                  compression speed (MB/s per core), and decompression speed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At scale, compression directly reduces storage costs,
                  replication traffic, and query latency by shrinking data
                  before it moves
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Trading CPU cycles for smaller data becomes essential when
                  storage and network capacity grow slower than data volume
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A large pipeline generating 200 TB daily can save hundreds of
                  petabytes annually with effective compression
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
                  A social network ingesting 5 GB/s of raw events (5 million
                  events per second) can halve network traffic with 2x
                  compression, reducing infrastructure from 40 Gbit to 20 Gbit
                  links
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Storing 200 TB daily with 4x compression saves 150 TB per day,
                  which when replicated 3 times and stored for a year, creates
                  massive cost differences
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A 1 GB file compressed to 250 MB demonstrates a 4x compression
                  ratio, reducing both storage footprint and transfer time
                  proportionally
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonCompressionAlgorithmsWhatIsCompressionAndWhyDoesItMatterAtScale;
