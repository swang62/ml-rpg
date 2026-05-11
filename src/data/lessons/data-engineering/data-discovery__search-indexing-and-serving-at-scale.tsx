import type { Component } from "solid-js";

const LessonDataDiscoverySearchIndexingAndServingAtScale: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Search Indexing and Serving at Scale
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            From Metadata to Search:
          </div>
          Once metadata is collected and enriched, it must be indexed for fast,
          flexible search. The challenge is supporting full text search over
          names, descriptions, and column names while also enabling faceted
          filtering by owner, domain, type, freshness, classification, and
          quality score. Users expect Google level responsiveness: results in
          under 200 milliseconds even when the catalog has millions of entities.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Building the Search Index:
          </div>
          A dedicated search index is built from the metadata store, separate
          from the transactional store used for updates. This index supports
          multiple query patterns that would be slow in a relational database
          alone. Full text search covers entity names, descriptions, column
          names, documentation, and tags. For example, searching "daily active
          users" matches tables named{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            users_daily_active
          </code>
          ,{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            dau_android
          </code>
          , and any table with "daily active users" in its description. Faceted
          filters let users narrow results by selecting multiple criteria at
          once. "Show me datasets owned by the payments team, refreshed in the
          last hour, with high quality scores, containing PII." This requires
          inverted indexes on each filterable attribute.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Ranking and Relevance:
          </div>
          Poor ranking is a silent failure mode. If the correct dataset is
          buried on page three, users either pick the wrong table or give up.
          Custom ranking combines several signals: text relevance score, usage
          popularity from query logs, recency of last update, and endorsement
          signals like documentation completeness or number of downstream
          consumers.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Search Performance Targets
            </div>
            <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">200ms</div>
                <div style="font-size: 10px; font-weight: 600">
                  P95 SEARCH LATENCY
                </div>
              </div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">500ms</div>
                <div style="font-size: 10px; font-weight: 600">
                  LINEAGE GRAPH
                </div>
              </div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">100s</div>
                <div style="font-size: 10px; font-weight: 600">
                  QPS CAPACITY
                </div>
              </div>
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Handling Ambiguity:
          </div>
          Search must handle synonyms and abbreviations that vary across teams.
          "DAU" might mean daily active users in one team and daily active
          uploads in another. Historical datasets coexist with current
          recommended ones, and similarly named tables serve different purposes.
          The system needs to understand context from the user's team, recent
          queries, and dataset usage patterns. Caching is used heavily for
          popular entities, auto complete suggestions, and common filter
          combinations. In large organizations, discovery systems serve hundreds
          of queries per second, and caching reduces load on the backend
          metadata store.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Integration Beyond Search:
          </div>
          Discovery is not just a web UI. It exposes APIs that notebook
          environments, BI tools, and ML platforms call to let users pick
          datasets without leaving their tools. An ML platform might call the
          catalog to list all "customer features" with freshness under 15
          minutes, then mount them directly with end to end lineage
          automatically recorded.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 480px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center; width: 100%">
                <strong style="font-size: 14px">Full Text + Facets</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  "payments PII last 1 hour"
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center; width: 100%">
                <strong style="font-size: 14px">Search Index</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Inverted indexes on text + attributes
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center; width: 100%">
                <strong style="font-size: 14px">Ranked Results</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Text score + usage + recency + endorsement
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Target search latency is 100 to 200 milliseconds p95 for
                interactive use, with capacity for hundreds of queries per
                second in large organizations
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Custom ranking combines text relevance, usage popularity from
                query logs, recency, and endorsement signals like documentation
                completeness
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Poor ranking is a silent failure: if the right dataset is not in
                the top few results, users pick the wrong table or give up
                entirely
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                APIs enable programmatic integration so notebooks, BI tools, and
                ML platforms can search the catalog without users leaving their
                workflows
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
                Searching "daily active users" returns &lt;code style="padding:
                2px 6px; background: #f5f5f5; border: 1px solid #ddd;
                border-radius: 3px; font-family: monospace; font-size:
                0.9em;"&gt;users_daily_active&lt;/code&gt; ranked above &lt;code
                style="padding: 2px 6px; background: #f5f5f5; border: 1px solid
                #ddd; border-radius: 3px; font-family: monospace; font-size:
                0.9em;"&gt;users_daily_historical&lt;/code&gt; because it has
                100x more queries in the last month
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                An ML platform calls the catalog API to list all features tagged
                "customer" with &lt;code style="padding: 2px 6px; background:
                #f5f5f5; border: 1px solid #ddd; border-radius: 3px;
                font-family: monospace; font-size:
                0.9em;"&gt;freshness_minutes&lt;/code&gt; less than 15,
                returning 47 features in 120ms
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataDiscoverySearchIndexingAndServingAtScale;
