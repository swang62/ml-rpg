import type { Component } from "solid-js";

const LessonCompressionAlgorithmsHowCompressionAlgorithmsWorkBuildingBlocksAndCommonCodecs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Compression Algorithms Work: Building Blocks and Common Codecs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Two Core Techniques:</strong> Most compression
            algorithms combine two fundamental approaches. First,{" "}
            <strong>dictionary or LZ style compression</strong> finds repeated
            sequences in data and encodes them as references to earlier
            occurrences. When you see "the quick brown fox" multiple times,
            instead of storing it repeatedly, you store it once and use pointers
            for subsequent instances. Second, <strong>entropy coding</strong>{" "}
            assigns shorter codes to frequently appearing symbols and longer
            codes to rare ones. Methods like Huffman coding, arithmetic coding,
            or Asymmetric Numeral Systems (ANS) implement this principle. If the
            letter "e" appears 100 times and "z" appears twice, "e" gets a short
            code.
            <strong>The Codec Spectrum:</strong> Different algorithms make
            different trade offs across this foundation. Understanding where
            each codec sits on the speed versus ratio spectrum helps you choose
            correctly.
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Speed Focused (LZ4, Snappy):</strong> Compress at
                  hundreds of MB/s per core with ratios around 1.5x to 2.5x.
                  Perfect when CPU budget is tight and latency matters.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Balanced (zlib/gzip, Zstd):</strong> Classic zlib
                  delivers 3x ratio with moderate CPU cost. Zstandard (Zstd)
                  achieves zlib level ratios while running 3 to 5 times faster,
                  or better ratios at the same speed.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Ratio Focused (XZ, bzip2):</strong> Achieve 5x to 10x
                  on text and logs but consume high CPU and take seconds for
                  gigabyte scale data. Used for cold archives.
                </div>
              </div>
            </div>
            <strong>Why Zstandard Stands Out:</strong> Zstd represents modern
            codec design by combining wide windows (many megabytes versus zlib's
            32 KB), branchless decoding that reduces CPU branch mispredictions,
            and ANS based entropy coding. The result: at the same ratio as zlib,
            Zstd compresses 3 to 5 times faster and decompresses roughly 2 times
            faster.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The codec choice isn't about finding the 'best' algorithm. It's
                about matching the algorithm's profile to your workload's CPU
                budget, latency constraints, and read/write ratio."
              </div>
            </div>
            <strong>Practical Example:</strong> A logging pipeline ingesting 5
            GB/s might use Snappy at the producer level, which can compress at
            400 MB/s per core and adds under 1 millisecond to p99 latency. This
            halves network traffic from producers to brokers. For long term
            storage, the same data gets recompressed with Zstd at a higher
            level, achieving 4x ratio and cutting storage costs substantially.
            The data is written once with high compression, then read many times
            where fast decompression matters.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="text-align: center; font-weight: 700; margin-bottom: 12px; font-size: 14px">
                Codec Performance Spectrum
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="display: flex; align-items: center; gap: 8px">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 100px; text-align: center; font-size: 13px">
                    <strong>LZ4/Snappy</strong>
                  </div>
                  <div style="flex: 1; font-size: 12px">
                    400 MB/s, 2x ratio, 1 ms p99
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 100px; text-align: center; font-size: 13px">
                    <strong>Zlib</strong>
                  </div>
                  <div style="flex: 1; font-size: 12px">
                    3x ratio, moderate CPU
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 100px; text-align: center; font-size: 13px">
                    <strong>Zstd</strong>
                  </div>
                  <div style="flex: 1; font-size: 12px">
                    3x to 4x ratio, 3 to 5x faster than zlib
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 100px; text-align: center; font-size: 13px">
                    <strong>XZ/bzip2</strong>
                  </div>
                  <div style="flex: 1; font-size: 12px">
                    5x to 10x ratio, high CPU, seconds per GB
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
                  Dictionary compression finds repeated sequences and encodes
                  them as references, while entropy coding assigns shorter codes
                  to frequent symbols
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LZ4 and Snappy prioritize speed (hundreds of MB/s per core)
                  with 2x ratios, adding under 1 ms to p99 latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Zstandard achieves zlib level 3x to 4x ratios while running 3
                  to 5 times faster on compression and 2 times faster on
                  decompression
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Zstd uses wide windows (many MB versus 32 KB), branchless
                  decoding, and ANS entropy coding for better CPU efficiency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  XZ and bzip2 reach 5x to 10x ratios but take seconds per
                  gigabyte, suitable only for cold archives where read frequency
                  is low
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
                  A 5 GB/s logging pipeline uses Snappy at producers (400 MB/s
                  per core, 2x ratio) to halve network traffic with minimal
                  latency impact
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The same pipeline recompresses to Zstd for storage, achieving
                  4x ratio and turning 200 TB daily into 50 TB, saving 150 TB
                  per day
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Zlib with a 32 KB window limits historical context, while Zstd
                  with multi MB windows can reference patterns from much earlier
                  in the stream
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonCompressionAlgorithmsHowCompressionAlgorithmsWorkBuildingBlocksAndCommonCodecs;
