import type { Component } from "solid-js";

const LessonMultilingualSystemsOfflineDocumentTranslationVsOnlineQueryTranslationTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Offline Document Translation vs Online Query Translation Trade-offs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              OFFLINE DOCUMENT TRANSLATION
            </p>
            <p>
              Translate all documents into a canonical language (usually
              English) at indexing time. Search and retrieval operate in the
              canonical language only.
            </p>
            <p>
              <strong>Advantages:</strong> Simpler retrieval architecture.
              Single language index. No query translation latency. Higher
              retrieval quality because documents were translated offline with
              more compute.
            </p>
            <p>
              <strong>Disadvantages:</strong> Translation quality affects all
              downstream tasks. Storage cost (store original + translated).
              Translation errors propagate. Cannot handle language-specific
              nuances that are lost in translation.
            </p>
            <p>
              Best for: document search, knowledge bases where translation
              quality is acceptable and retrieval quality is paramount.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ONLINE QUERY TRANSLATION
            </p>
            <p>
              Keep documents in original languages. Translate user queries into
              document languages at query time, or use multilingual embeddings
              for language-agnostic search.
            </p>
            <p>
              <strong>Advantages:</strong> Documents preserved in original form.
              No translation storage cost. Can update translation models without
              re-indexing. Supports language-specific features.
            </p>
            <p>
              <strong>Disadvantages:</strong> Query latency includes translation
              time (50-200ms). Query translation errors affect retrieval. Need
              to translate to multiple languages if documents span many
              languages.
            </p>
            <p>
              Best for: real-time search where documents must remain in original
              language, or where language diversity is high.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HYBRID APPROACH
            </p>
            <p>
              Use multilingual embeddings that map all languages into a shared
              vector space. No explicit translation needed—semantically similar
              content clusters together regardless of language.
            </p>
            <p>
              <strong>Trade-off:</strong> Multilingual embeddings are less
              precise than monolingual ones. Cross-lingual retrieval recall is
              typically 10-20% lower than same-language retrieval. Acceptable
              for many use cases.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>When To Use:</strong> Offline translation for
              document-heavy systems with quality requirements. Online
              translation for real-time, high-diversity scenarios. Multilingual
              embeddings when simplicity matters more than peak precision.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 580px">
              <div style="display: flex; gap: 12px">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px; display: block; margin-bottom: 8px">
                    Offline Document Translation
                  </strong>
                  <div style="font-size: 11px; line-height: 1.5">
                    <strong>Cost:</strong> $500 per 28M tokens
                    <br />
                    <strong>Latency:</strong> 0ms at query time
                    <br />
                    <strong>Use case:</strong> Static content
                    <br />
                    <strong>Quality:</strong> Human reviewable
                    <br />
                    <strong>Freshness:</strong> Batch delay
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px; display: block; margin-bottom: 8px">
                    Online Query Translation
                  </strong>
                  <div style="font-size: 11px; line-height: 1.5">
                    <strong>Cost:</strong> Per request API call
                    <br />
                    <strong>Latency:</strong> +120-250ms
                    <br />
                    <strong>Use case:</strong> Dynamic content
                    <br />
                    <strong>Quality:</strong> Automated only
                    <br />
                    <strong>Freshness:</strong> Real time
                  </div>
                </div>
              </div>
              <div style="margin-top: 12px; padding: 10px; border: 2px solid; border-radius: 6px">
                <strong style="font-size: 12px">Production Pattern:</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Translate static docs offline (majority traffic) + Online
                  translation fallback (low recall cases) + Aggressive caching
                  (frequent queries)
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
                  Offline translation: simpler retrieval, single language index;
                  translation errors propagate, storage cost 2x
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Online translation: preserve original documents; adds 50-200ms
                  query latency, translation errors affect retrieval
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multilingual embeddings: no explicit translation; 10-20% lower
                  cross-lingual recall vs same-language
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
                  Interview Tip: Compare offline vs online translation
                  tradeoffs: storage/quality vs latency/flexibility.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain multilingual embedding approach and its
                  recall penalty.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultilingualSystemsOfflineDocumentTranslationVsOnlineQueryTranslationTradeOffs;
