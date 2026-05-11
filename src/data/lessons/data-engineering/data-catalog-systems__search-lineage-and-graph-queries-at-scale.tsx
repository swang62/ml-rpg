import type { Component } from "solid-js";

const LessonDataCatalogSystemsSearchLineageAndGraphQueriesAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Search, Lineage, and Graph Queries at Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Search Problem:</strong>
            When an analyst types "monthly active users" into a catalog search
            box, they expect results in under 300 ms. Behind the scenes, the
            system queries an index that might contain billions of metadata
            documents covering millions of tables, columns, dashboards, and
            metrics. The search index is built from denormalized metadata. For a
            table entity, the index includes not just the table name and
            description, but also column names, owner usernames, tag keywords,
            and frequently co occurring search terms. Indexing pipelines compute
            derived signals: popularity score based on query counts over the
            last 30 days, freshness indicator showing when data was last
            updated, trust level from certification status and data quality
            checks.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Typical Search Performance
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">300ms</div>
                  <div style="font-size: 10px; font-weight: 600">
                    P95 LATENCY
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">99.9%</div>
                  <div style="font-size: 10px; font-weight: 600">
                    AVAILABILITY
                  </div>
                </div>
              </div>
            </div>
            Ranking matters critically. A search for "users" might match 5,000
            tables. Without good ranking, analysts see noise and revert to
            asking colleagues. Production catalogs use signals like how many
            people have queried this table in the last week, how recently the
            data was updated, whether it's certified by a data platform team,
            and how often this result gets clicked for this search term. This
            transforms raw matches into a ranked list where the top 10 results
            are genuinely useful.
            <strong>The Lineage Graph Challenge:</strong>
            Lineage queries answer questions like "if I change this table, what
            breaks downstream?" or "where does this dashboard's data originally
            come from?" This requires traversing a directed graph where nodes
            are data assets and edges represent data flow. At scale, naive graph
            traversal becomes a performance problem. A single highly connected
            table might feed 500 downstream jobs. Each of those might feed 10
            more tables. A recursive query can explode exponentially. At
            companies like LinkedIn with hundreds of millions of edges, an
            unbounded traversal could take minutes.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Graph queries that work fine at
              100,000 edges can become unusably slow at 100 million edges. You
              must design with limits from the start.
            </div>
            Production systems apply several techniques. First, depth limits:
            show downstream dependencies up to 3 or 4 hops, then stop. Second,
            breadth limits: if a node has over 100 outgoing edges, sample the
            most important ones based on usage. Third, caching: heavily queried
            paths (like lineage for production dashboards) are precomputed and
            cached. Fourth, async expansion: show immediate dependencies in
            under 200 ms, then let users click to load deeper levels. With these
            optimizations, a catalog can keep lineage queries under 500 ms p99
            even at LinkedIn scale, while providing clear UI warnings when
            results are partial.
            <strong>Policy and Governance:</strong>
            The policy engine decides what metadata each user can see and what
            actions they can perform. When someone searches for tables, the
            catalog filters results based on their permissions. When they try to
            mark a table as certified, the system checks if they're in the data
            platform owner group. Many catalogs don't directly enforce access to
            the underlying data. The warehouse or lake handles that. Instead,
            the catalog controls catalog visibility: whether you can see that a
            sensitive table exists, read its schema and lineage, or modify its
            metadata. This separation lets you adopt a catalog without
            refactoring your entire security model.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Search indexes denormalize metadata and compute derived
                  signals (popularity, freshness, trust) to enable sub 300 ms
                  p95 query latency over billions of documents
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Ranking uses signals like recent query counts, certification
                  status, and click through rates to surface genuinely useful
                  results instead of overwhelming users with thousands of
                  matches
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Lineage queries apply depth limits (3 to 4 hops), breadth
                  limits (sample top 100 edges), caching of hot paths, and async
                  expansion to keep p99 under 500 ms at scale
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Precomputing transitive closures and caching heavily queried
                  lineage paths (production dashboards) prevents exponential
                  graph traversal costs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Policy engine controls catalog visibility and metadata actions
                  separately from underlying data access, allowing adoption
                  without security model refactoring
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
                  An analyst searches for "revenue". The catalog returns 50
                  matches, ranked by popularity. The top result is
                  &lt;code&gt;finance.monthly_revenue&lt;/code&gt;, queried by
                  200 people this month and certified by the finance data team.
                  Lower results are deprecated or test tables.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  An engineer opens a table that feeds 500 downstream jobs. The
                  UI shows the immediate 500 dependencies in 150 ms. When they
                  click "expand downstream", the system loads the next hop of
                  2,000 tables in another 200 ms, then warns that further
                  expansion is limited.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A table contains personally identifiable information (PII).
                  The policy engine checks user group membership. Privileged
                  users see full schema including &lt;code&gt;email&lt;/code&gt;
                  and &lt;code&gt;phone&lt;/code&gt; columns. Non privileged
                  users see the table exists but marked as restricted, with PII
                  columns hidden from search results.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataCatalogSystemsSearchLineageAndGraphQueriesAtScale;
